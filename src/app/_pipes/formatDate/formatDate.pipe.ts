import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    return date.getFullYear().toString();
  }
}
