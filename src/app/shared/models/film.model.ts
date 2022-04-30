export interface FilmResponse {
  count: number;
  next?: any;
  previous?: any;
  results: FilmResult[];
}

export interface FilmResult {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  characters: string[];
  url: string;
}
