import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(productList: any[], title: string): any[] {
    return productList.filter((prosuct) => {
      return prosuct.title.toUpperCase().includes(title.toUpperCase());
    });
  }
}
