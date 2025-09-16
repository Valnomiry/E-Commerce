import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../core/service/auth/signup.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private signupService = inject(SignupService);
  private router = inject(Router);
  errorMessage: string = '';
  isLoading: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  register() {
    this.isLoading = true;
    this.confirmPassword();
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this.signupService.register(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log('response', res);
          if (res.message === 'success') {
            this.router.navigate(['/login']);
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

      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(): void {
    if (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('rePassword')?.value
    ) {
      this.registerForm.get('rePassword')?.setErrors(null);
    } else {
      this.registerForm.get('rePassword')?.setErrors({ notMatch: true });
    }
  }
}
