import { FiltersModule } from '../../shared/filters/filters.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmCharactersRoutingModule } from './film-characters-routing.module';
import { FilmCharactersComponent } from './film-characters.component';
import { CharacterModule } from 'src/app/shared/components/character/character.module';


@NgModule({
  declarations: [FilmCharactersComponent],
  imports: [
    CommonModule,
    FilmCharactersRoutingModule,
    DirectivesModule,
    PipesModule,
    NgbModule,
    CharacterModule,
    FiltersModule,
  ]
})
export class FilmCharactersModule { }
