import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient, private cookies: CookieService) {
    console.log("this.cookies.get('token')", this.cookies.get('token'));

    if (this.cookies.get('token') !== null) {
      console.log("this.cookies.get('token')777", this.cookies.get('token'));
      this.getCartProduct().subscribe({
        next: (res) => {
          this.productCount.next(res.numOfCartItems);
        },
      });
    }
  }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}cart`, { productId });
  }

  getCartProduct(): Observable<any> {
    // console.log('token', this.cookies.get('token'));
    // console.log('url', `${environment.baseUrl}cart`);

    return this.http.get(`${environment.baseUrl}cart`);
  }

  updateProductCart(id: string, count: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}cart/${id}`, { count });
  }

  deleteProductCart(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart`);
  }
}
