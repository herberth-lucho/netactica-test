import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ModalOpeningCrawlComponent } from 'src/app/shared/components/modal-opening-crawl/modal-opening-crawl.component';
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
  selectedEyeColor = null;
  selectedGender = null;
  formDirection = 'dropdown';

  page = 1;
  pageSize = 10;

  constructor(
    public activatedRoute: ActivatedRoute,
    public swapiService: SwapiService,
    private modalService: NgbModal
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
    this.filter();
  }

  onChangeGender(e) {
    this.selectedGender = e;
    this.filter();
  }

  open(data: FilmResult) {
    const modalRef = this.modalService.open(ModalOpeningCrawlComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      scrollable: false,
    });
    modalRef.componentInstance.filmData = data;
  }

  filter() {
    if (
      this.selectedEyeColor === null &&
      this.selectedGender === null
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

      this.characterData = tempCharacters;
    }
  }
}
