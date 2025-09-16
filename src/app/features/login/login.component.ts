import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log } from 'console';
import { LoginService } from '../../core/service/auth/login.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private loginservice = inject(LoginService);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  login() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.loginservice.sendForm(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log('response', res);
          if (res.message === 'success') {
            // localStorage.setItem('token', res.token);
            this.cookieService.set('token', res.token);
            this.loginservice.decodeToken();
            this.router.navigate(['/home']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          // console.log('error', err);
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
      // return;
    } else {
      // console.log('form not valid');

      this.loginForm.markAllAsTouched();
    }
  }
}
