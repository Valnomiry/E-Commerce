import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  private http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}categories`);
  }
}
