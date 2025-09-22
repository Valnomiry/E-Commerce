import {
  CurrencyPipe,
  DatePipe,
  NgClass,
  UpperCasePipe,
} from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../pipe/on-sale.pipe';
import { CartService } from '../../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/service/wishList/wish-list.service';
import { LoginService } from '../../../core/service/auth/login.service';

@Component({
  selector: 'app-card',
  imports: [
    RouterLink,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    OnSalePipe,
    NgClass,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.userData.subscribe((data) => {
      this.isLoggedIn = data ? true : false;
      // console.log('isLoggedIn', this.isLoggedIn);
    });
  }
  @Input() productData: any;
  private cartService = inject(CartService);
  private wishListService = inject(WishListService);
  private toastr = inject(ToastrService);
  @Input() isFavorite: boolean = true;
  dataList!: any[];
  @Output() toggleFavorite = new EventEmitter<string>();
  addToCart(productId: string) {
    // console.log('productId', productId);
    // console.log('fav', this.isFavorite);
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

  addRemoveFavorite(productId: string, isFavorite: boolean) {
    // console.log('productId', productId);

    if (!isFavorite) {
      this.wishListService.addProductToWishList(productId).subscribe({
        next: (res) => {
          // console.log(res);
          this.toastr.success(res.message, 'Success');
          // this.wishListService.productCount.next(res.numOfWishListItems);
        },
        error: (err) => {
          // console.log(err);
          this.toastr.error(err.error.message, 'Error');
        },
      });
    } else {
      this.wishListService.removeProductToWishList(productId).subscribe({
        next: (res) => {
          // console.log(res);
          this.toastr.success(res.message, 'Success');
          // this.wishListService.productCount.next(res.numOfWishListItems);
        },
        error: (err) => {
          // console.log(err);
          this.toastr.error(err.error.message, 'Error');
        },
      });
    }
    this.getWishList();
  }

  getWishList() {
    this.wishListService.getWishList().subscribe({
      next: (res) => {
        // this.isFavorite = true;
        this.dataList = res.data;
        // console.log('res.data', res.data);
      },
      error: (err) => {
        // console.log(err);
        this.isFavorite = false;
      },
    });
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.productData._id);
    this.getWishList();
  }
}
