import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookieService);
  let newRequest = req.clone({ setHeaders: { token: cookies.get('token') } });
  return next(newRequest);
};
