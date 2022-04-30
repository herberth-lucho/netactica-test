import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romanNumber',
})
export class RomanNumberPipe implements PipeTransform {
  romanNumber = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  transform(value: number): string {
    return this.romanNumber[value - 1];
  }
}
