import { SwapiService } from './../../shared/services/swapi.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilmResponse } from 'src/app/shared/models/film.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent {
  films$ = this.swapiService
    .getFilms()
    .pipe(
      map((film: FilmResponse) => {
        return film.results;
      })
    );

  constructor(public swapiService: SwapiService) {}
}
