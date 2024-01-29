import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormate',
  standalone: true
})
export class DateFormatePipe implements PipeTransform {
  transform(date: Date): string | null {
    if (!date) {
      return '';
    }
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd/MM/yyyy');
  }
}