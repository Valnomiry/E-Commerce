import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.getData();
  }
  private activatedurl = inject(ActivatedRoute);
  id = this.activatedurl.snapshot.paramMap.get('id');
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);

  productDetails: any;
  getIdFromUrl() {
    this.activatedurl.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });
  }

  getData() {
    this.productService.getProductDetails(this.id).subscribe({
      next: (res: any) => {
        // console.log('res', res);
        this.productDetails = res.data;
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
}
