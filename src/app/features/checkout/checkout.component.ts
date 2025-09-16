import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutService } from '../../core/service/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  ngOnInit(): void {
    this.getCartId();
  }
  cartId!: string | null;
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  private actyivatedRout = inject(ActivatedRoute);
  errorMessage: string = '';
  isLoading: boolean = false;

  checkoutForm = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });
  getCartId() {
    this.actyivatedRout.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id');
      },
    });
  }

  PaySession() {
    this.isLoading = true;
    if (this.checkoutForm.valid) {
      // console.log(this.loginForm.value);
      this.checkoutService
        .checkoutSession(this.checkoutForm.value, this.cartId)
        .subscribe({
          next: (res) => {
            console.log('response', res);
            if (res.status === 'success') {
              window.location.href = res.session.url;
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

      this.checkoutForm.markAllAsTouched();
    }
  }
}
