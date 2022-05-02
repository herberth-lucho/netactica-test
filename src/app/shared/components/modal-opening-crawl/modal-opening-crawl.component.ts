import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { FilmResult } from '../../models/film.model';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-modal-opening-crawl',
  templateUrl: './modal-opening-crawl.component.html',
  styleUrls: ['./modal-opening-crawl.component.scss'],
})
export class ModalOpeningCrawlComponent implements OnInit {
  @Input() filmData: FilmResult;
  @Input() filmUrl: string;
  romanNumber = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  constructor(
    public activeModal: NgbActiveModal,
    public swapiService: SwapiService,
  ) {}

  ngOnInit(): void {
    if (this.filmUrl) {
      const val = this.filmUrl.split('/');
      this.swapiService.getFilmById(val[5]).pipe(
        map((film) => ({
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          url: film.url,
          characters: film.characters,
        })),
      ).subscribe(data => {
        this.filmData = data;
      });
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
    this.filmData = null;
  }
}
