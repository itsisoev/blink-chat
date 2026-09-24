import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginStore } from '@features/auth/login/store/login.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
  ],
  selector: 'app-login',
  styleUrls: ['../auth.scss'],
  templateUrl: './login.component.html',
  providers: [LoginStore],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  readonly loginStore = inject(LoginStore);

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid || this.loginStore.loading()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.loginStore.login({
      userName: username,
      password,
    });
  }
}
