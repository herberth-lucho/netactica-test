import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CharacterResult } from 'src/app/shared/models/character.model';
import { FilmResult } from 'src/app/shared/models/film.model';
import { SwapiService } from 'src/app/shared/services/swapi.service';

@Component({
  selector: 'app-film-characters',
  templateUrl: './film-characters.component.html',
  styleUrls: ['./film-characters.component.scss'],
})
export class FilmCharactersComponent implements OnInit {
  film$: Observable<FilmResult>;
  characterData: CharacterResult[] = [];

  page = 1;
  pageSize = 10;

  constructor(
    public activatedRoute: ActivatedRoute,
    public swapiService: SwapiService
  ) {
    this.activatedRoute.parent.params.subscribe((queryParams: any) => {
      this.film$ = this.swapiService.getFilmById(queryParams.id).pipe(
        map((film) => ({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          url: film.url,
          characters: film.characters,
        })),
        tap((data) => {
          this.getCharactersIDs(data);
        })
      );
    });
  }

  ngOnInit(): void {}

  getCharactersIDs(value) {
    value.characters.forEach((element) => {
      this.getCharacterData(element);
    });
  }

  getCharacterData(element) {
    const val = element.split('/');
    this.swapiService
      .getCharacterById(val[5])
      .pipe(
        map((character) => ({
          name: character.name,
          eye_color: character.eye_color,
          gender: character.gender,
          films: character.films,
          url: character.url,
        })),
        tap((data) => this.characterData.push(data))
      )
      .subscribe();
  }

  pageChange(e) {
    this.page = e;
  }
}
