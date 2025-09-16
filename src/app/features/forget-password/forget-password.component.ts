import { Component, inject } from '@angular/core';
import { ResetPasswordService } from '../../core/service/auth/forgetPassword/reset-password.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  private resetPassord = inject(ResetPasswordService);
  private router = inject(Router);
  errorMessage: string = '';
  isLoading: boolean = false;
  step: number = 1;

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required]),
  });

  forgetPassword() {
    this.isLoading = true;
    this.resetPassord
      .sendForgetPassword(this.forgetPasswordForm.value)
      .subscribe({
        next: (res) => {
          // console.log('forgetPassword', res);
          this.errorMessage = '';

          // console.log(res);
          this.isLoading = false;
          if (res.statusMsg == 'success') {
            this.step = 2;
            // console.log('forgetPassword', 'step2');
          }
        },
        error: (err) => {
          // console.log(err);
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
  }
  resetCode() {
    this.isLoading = true;
    this.resetPassord.resetCode(this.resetCodeForm.value).subscribe({
      next: (res) => {
        this.errorMessage = '';
        // console.log(res);
        // console.log('res.status', res.status);
        this.isLoading = false;
        if (res.status == 'Success') {
          this.step = 3;
          // console.log('resetCode', 'step3');
        }
      },
      error: (err) => {
        // console.log(err);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }

  sendNewPassword() {
    this.isLoading = true;
    this.resetPassord.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this.errorMessage = '';
        // console.log(res);
        this.isLoading = false;
        if (res.token) {
          this.step = 0;
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        // console.log(err);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
