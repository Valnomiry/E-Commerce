import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/auth/login.service';

export const lodedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router);
  if (auth.userData.getValue() !== null) {
    return router.parseUrl('/home');
  } else {
    // router.navigate(['/login']);
    // return false;
    return true;
  }
};
