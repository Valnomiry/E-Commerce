import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../../interface/auth/iregister';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  register(userData: IRegister | any): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signup`, userData);
  }
}
//https://ecommerce.routemisr.com/api/v1/auth/signup
