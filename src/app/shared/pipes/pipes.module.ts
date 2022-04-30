import { RomanNumberPipe } from './roman-number.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNameFromMovieUrlPipe } from './movie-name-from-movie-url.pipe';



@NgModule({
  declarations: [RomanNumberPipe, MovieNameFromMovieUrlPipe],
  imports: [CommonModule],
  exports: [RomanNumberPipe, MovieNameFromMovieUrlPipe],
})
export class PipesModule {}
