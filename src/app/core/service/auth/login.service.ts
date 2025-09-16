import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRegister } from '../../interface/auth/iregister';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private cookieService: CookieService
  ) {
    // if (isPlatformBrowser(this.platformId)) {
    //   if (localStorage.getItem('token')) {
    //     this.decodeToken();
    //   }
    // }
    if (this.cookieService.get('token')) {
      this.decodeToken();
    }
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Send a signin form request to the server.
   *
   * @param userData The signin form data, must contain 'email' and 'password'.
   * @returns An Observable of the signin response.
   */
  /*******  970d2c24-c5e9-4115-a16f-51b11ed1f79d  *******/
  sendForm(userData: IRegister | any): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signin`, userData);
  }

  decodeToken(): any {
    // const token = localStorage.getItem('token')!;
    const token = this.cookieService.get('token')!;
    const decodedToken = jwtDecode(token);
    // console.log('decodedToken', decodedToken);
    this.userData.next(decodedToken);
  }

  logOut() {
    // localStorage.removeItem('token');
    this.cookieService.delete('token');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
