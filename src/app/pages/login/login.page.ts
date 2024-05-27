import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toasts/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  passwordType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  getPasswordIcon() {
    return this.passwordType === 'password' ? 'eye-outline' : 'eye-off-outline';
  }
  ngOnInit() {
    const rememberedEmail = localStorage.getItem('email');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberedEmail) {
      this.loginForm.patchValue({
        email: rememberedEmail,
        rememberMe: rememberMe,
      });
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          if (response && rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('email');
          }
          this.toastService.presentToast(
            'Login successful',
            'success',
            'bottom'
          );
          this.router.navigate(['/app/home']);
        },
        (error) => {
          console.log(error);
          if (error) {
            this.loginError = error as string;
            this.toastService.presentToast(this.loginError, 'error', 'bottom');
          } else {
            this.loginError = 'An error occurred. Please try again later.';
            this.toastService.presentToast(this.loginError, 'error', 'bottom');
          }
        }
      );
    }
  }
}
