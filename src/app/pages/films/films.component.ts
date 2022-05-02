import { FilmResult } from 'src/app/shared/models/film.model';
import { SwapiService } from './../../shared/services/swapi.service';
import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOpeningCrawlComponent } from 'src/app/shared/components/modal-opening-crawl/modal-opening-crawl.component';

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

  constructor(
    public swapiService: SwapiService,
    private modalService: NgbModal
  ) {}

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
}
