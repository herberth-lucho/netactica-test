import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmResponse, FilmResult } from '../models/film.model';

export const API_URL = 'https://swapi.dev/api/';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getFilms() {
    return this.http.get<FilmResponse>(API_URL + 'films');
  }

  getFilmById(id: string) {
    return this.http.get<FilmResult>(API_URL + 'films/' + id);
  }

  getCharacters() {
    return this.http.get(API_URL + 'people');
  }

  getCharacterById(id: string) {
    return this.http.get(API_URL + 'people/' + id);
  }

  search(text: string, resource: string) {
    return this.http.get(
      API_URL + 'https://swapi.dev/api/' + resource + '/?search=' + text
    );
  }
}
