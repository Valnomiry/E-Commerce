import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from '../../core/service/category/category-service';
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { CategorySliderComponent } from "../category-slider/category-slider.component";

@Component({
  selector: 'app-categories',
  imports: [MainSliderComponent, CategorySliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  ngOnInit(): void {
    this.getCategories();
  }
  private categoryService = inject(CategoryService);
  dataList: WritableSignal<any[]> = signal([]);
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        // console.log('res', res);
        this.dataList.set(res.data);
      },
      error: (err: any) => {
        // console.log('err', err);
      },
    });
  }
}
