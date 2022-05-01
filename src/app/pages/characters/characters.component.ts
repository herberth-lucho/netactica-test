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
  selectedGender = '';
  formDirection = 'inline';

  constructor(public swapiService: SwapiService) {
    // this.getData();
    this.getFilterData();
  }

  pageChange(e) {
    this.page = e;
    // this.getData();
  }

  /* getData() {
    this.characters$ = this.getCharactersData();
  } */

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
    this.characterData = this.backCharacterData.filter((data) =>
      data.eye_color.includes(this.selectedEyeColor.toLowerCase())
    );
  }

  genderFilter() {
    this.characterData = this.backCharacterData.filter(
      (data) => data.gender === this.selectedGender.toLowerCase()
    );
  }
}
