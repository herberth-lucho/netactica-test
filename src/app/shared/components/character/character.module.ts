import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [CharacterComponent],
  imports: [CommonModule, DirectivesModule, PipesModule, NgbModule],
  exports: [CharacterComponent],
})
export class CharacterModule {}
