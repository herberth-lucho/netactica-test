import { PipesModule } from './../../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [FilmsComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    PipesModule,
    DirectivesModule,
    NgxSpinnerModule,
  ],
})
export class FilmsModule {}
