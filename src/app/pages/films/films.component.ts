import { element } from 'protractor';
import { FilmResult } from './../../shared/models/film.model';
import { SwapiService } from './../../shared/services/swapi.service';
import { Component, OnInit } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { FilmResponse } from 'src/app/shared/models/film.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent {
  films$ = this.swapiService.getFilms().pipe(
    filter((result) => result.results !== []),
    map((result) => result.results),
    map((data) =>
      data.map((film) => ({
        title: film.title,
        episode_id: film.episode_id,
        opening_crawl: film.opening_crawl,
        director: film.director,
        url: film.url,
      }))
    )
  );

  constructor(public swapiService: SwapiService) {}
}
