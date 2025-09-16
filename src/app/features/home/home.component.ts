import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CategoriesComponent } from "../categories/categories.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, CategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
