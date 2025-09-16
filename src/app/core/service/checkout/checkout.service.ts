import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  checkoutSession(
    shoppingAddress: any,
    cartId: string | null
  ): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shoppingAddress },
      { headers: { token: this.cookies.get('token') } }
    );
  }

  payCash(shoppingAddress: any, cartId: string): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}orders/${cartId}`,
      { shippingAddress: shoppingAddress },
      { headers: { token: this.cookies.get('token') } }
    );
  }
}
