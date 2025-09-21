import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/service/flowbite-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/service/auth/login.service';
import { CartService } from '../../../core/service/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { Transalte } from '../../../core/service/translate/transalte.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  cartProductCount!: number;
  constructor(
    private flowbiteService: FlowbiteService,
    private loginService: LoginService,
    private cartService: CartService,
    public transalte: Transalte
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();

      this.cartService.productCount.subscribe({
        next: (res) => {
          this.cartProductCount = res;
        },
      });
    });
    // this.isLoggedIn = this.loginService.userData ? true : false;
    this.loginService.userData.subscribe((data) => {
      this.isLoggedIn = data ? true : false;
      // console.log('isLoggedIn', this.isLoggedIn);
    });
  }

  signOut() {
    this.loginService.logOut();
  }
}
