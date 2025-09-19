import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/service/wishList/wish-list.service';
import { CartService } from '../../core/service/cart/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  ngOnInit(): void {
    this.getWishList();
  }

  private wishListService = inject(WishListService);
  private toastr = inject(ToastrService);
  private cartService = inject(CartService);
  dataList!: any[];
  getWishList() {
    this.wishListService.getWishList().subscribe({
      next: (res) => {
        // this.isFavorite = true;
        this.dataList = res.data;
        console.log('res.data', res.data);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

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

  removeFromWishList(productId: string) {
    console.log('productId', productId);

    this.wishListService.removeProductToWishList(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success(res.message, 'Success');
        this.getWishList();
        // this.wishListService.productCount.next(res.numOfWishListItems);
      },
      error: (err) => {
        // console.log(err);
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
