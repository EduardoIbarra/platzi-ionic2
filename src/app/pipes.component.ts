import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}

@Pipe({name: "sortBy"})
export class SortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if ( a[args].toLowerCase() < b[args].toLowerCase() ){
        return -1;
      }else if( a[args].toLowerCase() > b[args].toLowerCase() ){
        return 1;
      }else{
        return 0;
      }
    });
    return array;
  }
}
