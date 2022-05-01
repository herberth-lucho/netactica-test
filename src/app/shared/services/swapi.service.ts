import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmResponse, FilmResult } from '../models/film.model';
import { CharacterResponse, CharacterResult } from '../models/character.model';

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

  getCharactersByPage(pageNumber: number) {
    return this.http.get<CharacterResponse>(API_URL + 'people/?page=' + pageNumber);
  }

  getCharacterById(id: string) {
    return this.http.get<CharacterResult>(API_URL + 'people/' + id);
  }

  search(text: string, resource: string) {
    return this.http.get(
      API_URL + 'https://swapi.dev/api/' + resource + '/?search=' + text
    );
  }
}
