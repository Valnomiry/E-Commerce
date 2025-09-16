import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart/cart.service';
import { IcartProduct } from '../../core/interface/cart/icart-product';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.getCart();
  }
  cartId!: string;
  productList: IcartProduct[] = [];
  totaPrice: number = 0;

  private cart = inject(CartService);
  private toastr = inject(ToastrService);

  getCart() {
    this.cart.getCartProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.cartId = res.data._id;
        this.productList = res.data.products;
        this.totaPrice = res.data.totalCartPrice;
        this.cart.productCount.next(res.numOfCartItems);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  removeProductFromCart(id: string) {
    this.cart.deleteProductCart(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success('Prodcut Deleted', 'Success');
        this.getCart();
      },
      error: (err) => {
        // console.log(err);
        this.toastr.success(err.message, 'Error');
      },
    });
  }

  updateProductInCart(id: string, count: number, operation: number) {
    this.cart.updateProductCart(id, count + operation).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success('Prodcut updated.', 'Success');
        this.getCart();
      },
      error: (err) => {
        // console.log(err);
        this.toastr.success(err.message, 'Error');
      },
    });
  }

  clearCart() {
    this.cart.clearCart().subscribe({
      next: (res) => {
        // console.log(res);
        // this.toastr.success('Prodcut ', 'Success');
        this.getCart();
      },
      error: (err) => {
        // console.log(err);
        this.toastr.success(err.message, 'Error');
      },
    });
  }
}
