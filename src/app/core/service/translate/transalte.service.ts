import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class Transalte {
  constructor(
    private transateService: TranslateService,
    private cookies: CookieService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    let defaultLang = 'en';
    if (this.cookies.get('lang') !== null) {
      defaultLang = this.cookies.get('lang');
    }
    // this.transateService.use(defaultLang);
    if (this.platformId === 'browser') {
      this.changeLange(defaultLang);
    }
  }

  changeLange(lang: string) {
    this.cookies.set('lang', lang);
    this, this.transateService.setDefaultLang(lang);
    this.transateService.use(lang);
    this.chengeDirection(lang);
  }

  chengeDirection(lang: string) {
    if (lang === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }
  }
}
