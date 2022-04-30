import { Pipe, PipeTransform } from '@angular/core';
import { MOVIEFLATDATA } from '../models/movie.data';

@Pipe({
  name: 'movieNameFromMovieUrl'
})
export class MovieNameFromMovieUrlPipe implements PipeTransform {

  transform(value: string): string {
    return MOVIEFLATDATA[
      Number(value.slice(value.length - 2, -1)) - 1
    ].name;
  }

}
