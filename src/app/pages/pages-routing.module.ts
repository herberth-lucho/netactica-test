import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'films',
        loadChildren: () =>
          import('./films/films.module').then((m) => m.FilmsModule),
      },
      {
        path: 'characters',
        loadChildren: () =>
          import('./characters/characters.module').then((m) => m.CharactersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }