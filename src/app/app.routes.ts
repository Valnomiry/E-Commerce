import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { sign } from 'crypto';
import { SignupComponent } from './features/signup/signup.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CartComponent } from './features/cart/cart.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';
import { lodedInGuard } from './core/guard/loded-in.guard';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AllOrderComponent } from './features/all-order/all-order.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [lodedInGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [lodedInGuard] },
  {
    path: 'resetPassword',
    component: ForgetPasswordComponent,
    canActivate: [lodedInGuard],
  },
  { path: 'product', component: ProductsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'allorders', component: AllOrderComponent, canActivate: [authGuard] },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
