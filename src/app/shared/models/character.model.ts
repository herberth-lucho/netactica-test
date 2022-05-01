export interface CharacterResponse {
  count: number;
  next?: any;
  previous: string;
  results: CharacterResult[];
}

export interface CharacterResult {
  name: string;
  eye_color: string;
  gender: string;
  films: string[];
  url: string;
}
