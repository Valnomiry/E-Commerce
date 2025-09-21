import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoriesComponent } from '../categories/categories.component';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { Transalte } from '../../core/service/translate/transalte.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    ProductsComponent,
    CategoriesComponent,
    MainSliderComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public transalte: Transalte) {}
}
