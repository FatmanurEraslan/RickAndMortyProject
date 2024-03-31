import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value || !filterString || !propName) {
      return value;
    }
  
    const result: any[] = [];
    value.forEach((a: any) => {
      if (a[propName] && typeof a[propName] === 'string' && a[propName].trim().toLowerCase().includes(filterString.trim().toLowerCase())) {
        result.push(a);
      }
    });
  
    return result;
  }
  

}