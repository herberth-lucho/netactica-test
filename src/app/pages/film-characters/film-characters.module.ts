import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmCharactersRoutingModule } from './film-characters-routing.module';
import { FilmCharactersComponent } from './film-characters.component';


@NgModule({
  declarations: [FilmCharactersComponent],
  imports: [
    CommonModule,
    FilmCharactersRoutingModule,
    DirectivesModule,
  ]
})
export class FilmCharactersModule { }
