import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toasts/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm: FormGroup;
  passwordType: string = 'password';
  signUpError: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,

    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(3)],
        ],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  getPasswordIcon() {
    return this.passwordType === 'password' ? 'eye-outline' : 'eye-off-outline';
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signUp(username, email, password).subscribe(
        (res) => {
          this.toastService.presentToast(
            'Signup successful',
            'success',
            'bottom'
          );
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error) {
            this.signUpError = error as string;
            this.toastService.presentToast(this.signUpError, 'error', 'bottom');
          } else {
            this.signUpError = 'An error occurred. Please try again later.';
            this.toastService.presentToast(this.signUpError, 'error', 'bottom');
          }
        }
      );
    }
  }
}
