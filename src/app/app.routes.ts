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
import { WishlistComponent } from './features/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    canActivate: [lodedInGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    canActivate: [lodedInGuard],
  },
  {
    path: 'resetPassword',
    loadComponent: () =>
      import('./features/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
    canActivate: [lodedInGuard],
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'productDetails/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'wishList',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/all-order/all-order.component').then(
        (m) => m.AllOrderComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
