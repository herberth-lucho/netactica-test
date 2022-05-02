import { PipesModule } from '../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';



@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [FiltersComponent]
})
export class FiltersModule { }
