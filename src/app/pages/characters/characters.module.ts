import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterModule } from 'src/app/shared/character/character.module';
import { FiltersModule } from 'src/app/shared/filters/filters.module';


@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CharacterModule,
    FiltersModule,
  ],
})
export class CharactersModule {}
