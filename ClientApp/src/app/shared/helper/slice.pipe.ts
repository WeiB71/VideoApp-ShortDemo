import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})

export class SlicePipe implements PipeTransform {
  transform(value: string, start: number, end?: number): string {
    if (!value) return ''; // Handle undefined or null
    return value.slice(start, end);
  }
}
