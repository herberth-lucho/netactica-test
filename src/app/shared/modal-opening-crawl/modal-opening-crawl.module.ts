import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOpeningCrawlComponent } from './modal-opening-crawl.component';



@NgModule({
  declarations: [ModalOpeningCrawlComponent],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [ModalOpeningCrawlComponent]
})
export class ModalOpeningCrawlModule { }
