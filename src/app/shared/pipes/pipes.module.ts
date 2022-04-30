import { RomanNumberPipe } from './roman-number.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [RomanNumberPipe],
  imports: [
    CommonModule
  ],
  exports: [RomanNumberPipe]
})
export class PipesModule { }
