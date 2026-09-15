import { Component, DestroyRef, inject } from '@angular/core';
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
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatButton, RouterLink],
  selector: 'app-registration',
  styleUrls: ['./registration.component.scss', '../auth.scss'],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly registrationForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],

    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],

    confirmPassword: ['', passwordsMatchValidator],

    avatar: [null as File | null],
  });

  readonly showConfirmPassword = toSignal(
    this.registrationForm.controls.password.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)),
    {
      initialValue: '',
    },
  );

  constructor() {
    const passwordControl = this.registrationForm.controls.password;
    const confirmPasswordControl = this.registrationForm.controls.confirmPassword;

    passwordControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((password) => {
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
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { username, password, avatar } = this.registrationForm.getRawValue();

    const payload = {
      username: username?.trim().toLowerCase(),
      password,
      avatar,
    };

    console.log(payload);
  }
}
