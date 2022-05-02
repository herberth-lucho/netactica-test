import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterModule } from 'src/app/shared/components/character/character.module';
import { FiltersModule } from 'src/app/shared/components/filters/filters.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CharacterModule,
    FiltersModule,
    NgxSpinnerModule,
  ],
})
export class CharactersModule {}
