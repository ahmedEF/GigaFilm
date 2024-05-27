import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    const storedEmail = localStorage.getItem('userEmail');
    const storedUsername = localStorage.getItem('username');

    if (storedEmail && storedUsername) {
      this.profileForm.patchValue({
        username: storedUsername,
        email: storedEmail,
      });
    }
  }
  onLogout() {
    localStorage.removeItem('_authToken');
    localStorage.removeItem('_refreshToken');

    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
