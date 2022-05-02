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
  selectedEyeColor = null;
  filmData: string[] = [];
  selectedFilm = null;
  selectedGender = null;
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
    this.filter();
  }

  onChangeGender(e: string) {
    this.selectedGender = e;
    this.filter();
  }

  onChangeFilm(e: string) {
    this.selectedFilm = e;
    this.filter();
  }

  filter() {
    if (
      this.selectedEyeColor === null &&
      this.selectedGender === null &&
      this.selectedFilm === null
    ) {
      this.characterData = this.backCharacterData;
    } else {
      let tempCharacters = this.backCharacterData;

      if (this.selectedEyeColor !== null) {
        tempCharacters = tempCharacters.filter((character) =>
          character?.eye_color?.includes(this.selectedEyeColor.toLowerCase())
        );
      }

      if (this.selectedGender !== null) {
        tempCharacters = tempCharacters.filter(
          (character) =>
            character.gender.toLowerCase() ===
            this.selectedGender?.toLowerCase()
        );
      }

      if (this.selectedFilm !== null) {
        tempCharacters = tempCharacters.filter((character) => {
          return character.films.find((elem) => elem === this.selectedFilm);
        });
      }

      this.characterData = tempCharacters;
    }
  }
}
