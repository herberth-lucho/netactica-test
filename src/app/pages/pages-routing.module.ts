import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./films/films.module').then((m) => m.FilmsModule),
      },
      {
        path: 'films',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./films/films.module').then((m) => m.FilmsModule),
          },
          {
            path: ':id',
            loadChildren: () =>
              import('./film-characters/film-characters.module').then(
                (m) => m.FilmCharactersModule
              ),
          },
        ],
      },
      {
        path: 'characters',
        loadChildren: () =>
          import('./characters/characters.module').then(
            (m) => m.CharactersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
