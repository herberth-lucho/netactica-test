import { Component, Inject, OnInit } from '@angular/core';
import { CONFIGURATION, Configuration } from './configuration';

@Component({
  selector: 'app-movie-cover',
  templateUrl: './movie-cover.component.html',
  styleUrls: ['./movie-cover.component.scss'],
})
export class MovieCoverComponent {
  constructor(@Inject(CONFIGURATION) readonly configuration: Configuration) {}
}
