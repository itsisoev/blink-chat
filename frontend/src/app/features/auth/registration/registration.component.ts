import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import {
  imageFileValidator,
  MAX_IMAGE_SIZE,
  maxFileSizeValidator,
} from '@shared/validators/file.validator';
import { RegistrationStore } from '@features/auth/registration/store/registration.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.value;

  if (!confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordsMismatch: true };
};

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    RouterLink,
    MatProgressSpinner,
  ],
  providers: [RegistrationStore],
  selector: 'app-registration',
  styleUrls: ['./registration.component.scss', '../auth.scss'],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  readonly registrationStore = inject(RegistrationStore);
  private readonly fb = inject(FormBuilder);

  readonly registrationForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    confirmPassword: ['', passwordsMatchValidator],
    avatar: [null as File | null, [imageFileValidator, maxFileSizeValidator(MAX_IMAGE_SIZE)]],
  });

  readonly showConfirmPassword = toSignal(
    this.registrationForm.controls.password.valueChanges.pipe(takeUntilDestroyed()),
    {
      initialValue: '',
    },
  );

  constructor() {
    const passwordControl = this.registrationForm.controls.password;
    const confirmPasswordControl = this.registrationForm.controls.confirmPassword;

    passwordControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((password) => {
      if (password) {
        confirmPasswordControl.setValidators([Validators.required, passwordsMatchValidator]);
      } else {
        confirmPasswordControl.clearValidators();

        confirmPasswordControl.reset('', {
          emitEvent: false,
        });
      }

      confirmPasswordControl.updateValueAndValidity({
        emitEvent: false,
      });
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.registrationForm.controls.avatar.setValue(file);
  }

  onSubmit(): void {
    if (this.registrationForm.invalid || this.registrationStore.loading()) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { username, password, avatar } = this.registrationForm.getRawValue();

    this.registrationStore.register({
      userName: username.trim().toLowerCase(),
      password,
      avatar,
    });
  }
}
