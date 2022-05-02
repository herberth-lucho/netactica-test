import { CharacterResult } from './../../shared/models/character.model';
import { Component } from '@angular/core';
import { filter, first, map, skip, take, tap } from 'rxjs/operators';
import { SwapiService } from 'src/app/shared/services/swapi.service';
import { interval, Observable } from 'rxjs';

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
  page = 1;
  pageSize = 10;

  characterData: CharacterResult[] = [];
  backCharacterData: CharacterResult[] = [];

  eyeColorData: string[] = [];
  genderData: string[] = [];
  selectedEyeColor = '';
  filmData: string[] = [];
  selectedFilm = '';
  selectedGender = '';
  formDirection = 'inline';

  constructor(public swapiService: SwapiService) {
    this.getFilterData();
  }

  pageChange(e) {
    this.page = e;
  }

  getFilterData() {
    const numbers = interval(100);
    numbers.pipe(take(10), skip(1)).subscribe({
      next: (n) => {
        this.curentPage = n;
        this.getCharactersData()
          .pipe(
            tap((data) => {
              data.forEach((element) => {
                this.characterData.push(element);
                this.backCharacterData.push(element);
                this.eyeColorData.push(element.eye_color);
                this.genderData.push(element.gender);
                element.films.forEach((filmUrl) => {
                  this.filmData.push(filmUrl);
                });
              });
            })
          )
          .subscribe(() => {
            const eye = this.eyeColorData;
            this.eyeColorData = [];
            this.eyeColorData = [...new Set(eye)];
            const gender = this.genderData;
            this.genderData = [];
            this.genderData = [...new Set(gender)];
            const film = this.filmData;
            this.filmData = [];
            this.filmData = [...new Set(film)];
          });
      },
      complete: () => (this.curentPage = 1),
    });
  }

  getCharactersData() {
    return this.swapiService.getCharactersByPage(this.curentPage).pipe(
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
      )
    );
  }

  onChangeEye(e: string) {
    this.selectedEyeColor = e;
    this.oneFilter(this.eyefilter);
    if (this.selectedGender !== '') {
      this.twoFilters();
    }
    if (this.selectedEyeColor === '') {
      this.oneFilter(this.genderfilter);
    }
    if (this.selectedEyeColor === '' && this.selectedGender === '') {
      this.characterData = this.backCharacterData;
    }
  }

  onChangeGender(e: string) {
    this.selectedGender = e;
    this.oneFilter(this.genderfilter);
    if (this.selectedEyeColor !== '') {
      this.twoFilters();
    }
    if (this.selectedGender === '') {
      this.oneFilter(this.eyefilter);
    }
    if (this.selectedEyeColor === '' && this.selectedGender === '') {
      this.characterData = this.backCharacterData;
    }
  }

  onChangeFilm(e: string) {
    this.selectedFilm = e;
    this.oneFilter(this.filmfilter);
    if (this.selectedFilm === '') {
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

  eyefilter = (data: CharacterResult) => {
    return data.eye_color.includes(this.selectedEyeColor.toLowerCase());
  }

  genderfilter = (data: CharacterResult) => {
    return data.gender === this.selectedGender.toLowerCase();
  }

  filmfilter = (data: CharacterResult) => {
    return data.films.find((elem) => elem === this.selectedFilm);
  }

  oneFilter(callb: any) {
    this.characterData = this.backCharacterData.filter(callb);
  }
}
