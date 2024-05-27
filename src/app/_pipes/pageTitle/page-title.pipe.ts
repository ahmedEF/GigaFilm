import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageTitle',
})
export class PageTitlePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}
