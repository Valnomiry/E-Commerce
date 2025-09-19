import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor() {}

  private http = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this.http.get(`${environment.baseUrl}brands`);
  }
}
