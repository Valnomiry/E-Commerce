import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}products`);
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}products/${id}`);
  }
}
