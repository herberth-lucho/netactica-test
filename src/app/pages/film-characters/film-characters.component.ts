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
export class FilmCharactersComponent {
  film$: Observable<FilmResult>;
  characterData: CharacterResult[] = [];
  backCharacterData: CharacterResult[] = [];

  eyeColorData: string[] = [];
  genderData: string[] = [];
  selectedEyeColor = '';
  selectedGender = '';
  formDirection = 'dropdown';

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
        tap((data) => {
          this.characterData.push(data);
          this.backCharacterData.push(data);
          this.eyeColorData.push(data.eye_color);
          this.genderData.push(data.gender);
        })
      )
      .subscribe(() => {
        const eye = this.eyeColorData;
        this.eyeColorData = [];
        this.eyeColorData = [...new Set(eye)];
        const gender = this.genderData;
        this.genderData = [];
        this.genderData = [...new Set(gender)];
      });
  }

  pageChange(e) {
    this.page = e;
  }

  onChangeEye(e) {
    this.selectedEyeColor = e;
    this.eyeFilter();
    if (this.selectedGender !== '') {
      this.twoFilters();
    }
    if (this.selectedEyeColor === '') {
      this.genderFilter();
    }
    if (this.selectedEyeColor === '' && this.selectedGender === '') {
      this.characterData = this.backCharacterData;
    }
  }

  onChangeGender(e) {
    this.selectedGender = e;
    this.genderFilter();
    if (this.selectedEyeColor !== '') {
      this.twoFilters();
    }
    if (this.selectedGender === '') {
      this.eyeFilter();
    }
    if (this.selectedEyeColor === '' && this.selectedGender === '') {
      this.characterData = this.backCharacterData;
    }
  }

  twoFilters() {
    this.characterData = this.backCharacterData.filter(
      (data) =>
        data.gender === this.selectedGender.toLowerCase() &&
        data.eye_color.includes(this.selectedEyeColor.toLowerCase())
    );
  }

  eyeFilter() {
    this.characterData = this.backCharacterData.filter(
      (data) =>
        data.eye_color.includes(this.selectedEyeColor.toLowerCase())
    );
  }

  genderFilter() {
    this.characterData = this.backCharacterData.filter(
      (data) =>
        data.gender === this.selectedGender.toLowerCase()
    );
  }
}
