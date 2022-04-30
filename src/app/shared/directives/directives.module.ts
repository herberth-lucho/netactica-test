import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCoverDirective } from './movie-cover/movie-cover.directive';
import { MovieCoverComponent } from './movie-cover/movie-cover.component';



@NgModule({
  declarations: [MovieCoverDirective, MovieCoverComponent],
  imports: [
    CommonModule
  ],
  exports: [MovieCoverDirective]
})
export class DirectivesModule { }
