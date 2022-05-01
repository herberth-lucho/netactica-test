import {
  CharacterResult,
} from './../../shared/models/character.model';
import { Component } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { SwapiService } from 'src/app/shared/services/swapi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  count: number;
  next: string;
  previous: string;
  curentPage = 1;
  pageSize = 10;

  characters$: Observable<CharacterResult[]>;

  constructor(public swapiService: SwapiService) {
    this.getData();
  }

  pageChange(e) {
    this.curentPage = e;
    this.getData();
  }

  getData() {
    this.characters$ = this.swapiService
      .getCharactersByPage(this.curentPage)
      .pipe(
        filter((result) => result.results !== []),
        tap((data) => {
          this.count = data.count;
          this.next = data.next;
          this.previous = data.previous;
        }),
        map((data) =>
          data.results.map((film) => ({
            name: film.name,
            eye_color: film.eye_color,
            gender: film.gender,
            films: film.films,
            url: film.url,
          }))
        ),
        tap((data) => console.log(data))
      );
  }
}
