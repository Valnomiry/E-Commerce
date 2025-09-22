import {
  Component,
  Inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/service/products/products.service';
import { CardComponent } from '../../shared/component/card/card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search.pipe';
import { WishListService } from '../../core/service/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [CardComponent, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _productsService: ProductsService,
    private wishListService: WishListService
  ) {}
  searchText: string = '';
  ngOnInit(): void {
    this.getData();
    this.getWishList();
  }

  dataList: WritableSignal<any[]> = signal([]);
  wishlistIds: string[] = [];
  // private products = Inject(ProductsService);

  getData() {
    this._productsService.getAllProducts().subscribe({
      next: (res: any) => {
        // console.log('res.data', res.data);
        this.dataList.set(res.data);
      },
      error: (err: any) => {
        // console.log(err);
      },
    });
  }

  getWishList() {
    this.wishListService.getWishList().subscribe((wishlist) => {
      // console.log('wishlist', wishlist);
      this.wishlistIds = wishlist.data.map((item: any) => item._id); // extract IDs
      // console.log('wishlistIds', this.wishlistIds);
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds.includes(productId);
    // console.log('wishlistIds', this.wishlistIds);
  }

  handleToggleFavorite(productId: string) {
    if (this.isInWishlist(productId)) {
      this.wishListService.removeProductToWishList(productId).subscribe(() => {
        this.getData();
        this.getWishList(); // refresh after remove
        // console.log('productId', productId);
        // console.log('isInWishlist', this.isInWishlist(productId));
      });
    } else {
      this.wishListService.addProductToWishList(productId).subscribe(() => {
        this.getData();
        this.getWishList(); // refresh after add
        // console.log('productId', productId);
        // console.log('isInWishlist', this.isInWishlist(productId));
      });
    }
    this.getData();
    this.getWishList();
  }
}
