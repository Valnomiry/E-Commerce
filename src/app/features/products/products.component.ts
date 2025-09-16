import {
  Component,
  Inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/service/products/products.service';
import { CardComponent } from '../../shared/component/card/card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search.pipe';

@Component({
  selector: 'app-products',
  imports: [CardComponent, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private _productsService: ProductsService) {}
  searchText: string = '';
  ngOnInit(): void {
    this.getData();
  }

  dataList: WritableSignal<any[]> = signal([]);
  // private products = Inject(ProductsService);

  getData() {
    this._productsService.getAllProducts().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.dataList.set(res.data);
      },
      error: (err: any) => {
        // console.log(err);
      },
    });
  }
}
