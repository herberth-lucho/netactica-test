import { FooterModule } from './../shared/footer/footer.module';
import { HeaderModule } from './../shared/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderModule,
    FooterModule,
  ]
})
export class PagesModule { }