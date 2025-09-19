import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrandService } from '../../core/service/brand/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  ngOnInit(): void {
    this.getBrands();
  }
  private brandService = inject(BrandService);
  private toastr = inject(ToastrService);
  dataList: WritableSignal<any[]> = signal([]);

  getBrands() {
    this.brandService.getAllBrands().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.dataList.set(res.data);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
