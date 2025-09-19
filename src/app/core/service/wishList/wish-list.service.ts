import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient, private cookies: CookieService) {
    // if (this.cookies.get('token') !== null) {
    //   console.log("this.cookies.get('token')777", this.cookies.get('token'));
    //   this.getCartProduct().subscribe({
    //     next: (res) => {
    //       this.productCount.next(res.numOfCartItems);
    //     },
    //   });
    // }
  }

  addProductToWishList(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}wishlist`, { productId });
  }
  removeProductToWishList(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}wishlist/${productId}`);
  }
  getWishList(): Observable<any> {
    return this.http.get(`${environment.baseUrl}wishlist`);
  }
}
