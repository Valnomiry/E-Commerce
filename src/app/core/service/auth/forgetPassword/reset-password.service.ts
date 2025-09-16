import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IForgetPassword,
  IPassword,
  IResetPassword,
} from '../../../interface/auth/ipassword';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  sendForgetPassword(payload: IForgetPassword): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}auth/forgotPasswords`,
      payload
    );
  }
  resetCode(payload: IResetPassword): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}auth/verifyResetCode`,
      payload
    );
  }
  resetPassword(payload: IPassword): Observable<any> {
    return this.http.put(`${environment.baseUrl}auth/resetPassword`, payload);
  }
}
