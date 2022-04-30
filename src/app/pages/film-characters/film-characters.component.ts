import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SwapiService } from 'src/app/shared/services/swapi.service';

@Component({
  selector: 'app-film-characters',
  templateUrl: './film-characters.component.html',
  styleUrls: ['./film-characters.component.scss'],
})
export class FilmCharactersComponent implements OnInit {
  film$: Observable<any>;

  constructor(
    public activatedRoute: ActivatedRoute,
    public swapiService: SwapiService
  ) {
    this.activatedRoute.parent.params.subscribe((queryParams: any) => {
      this.film$ = this.swapiService.getFilmById(queryParams.id);
    });
  }

  ngOnInit(): void {
    // this.film$.subscribe(data => console.log(data));
  }
}
