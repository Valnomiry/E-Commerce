import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../pipe/on-sale.pipe';
import { CartService } from '../../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink, UpperCasePipe, DatePipe, CurrencyPipe, OnSalePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() productData: any;
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  addToCart(productId: string) {
    // console.log('productId', productId);

    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success(res.message, 'Success');
        this.cartService.productCount.next(res.numOfCartItems);
      },
      error: (err) => {
        // console.log(err);
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
