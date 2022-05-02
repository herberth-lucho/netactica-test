import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterResult } from '../../models/character.model';
import { ModalOpeningCrawlComponent } from '../modal-opening-crawl/modal-opening-crawl.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  @Input() characterData: CharacterResult[];
  @Input() collectionSize: number;
  @Input() page: string;
  @Input() pageSize: number;
  @Output() selectedPage = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {}

  pageChange(e) {
    this.selectedPage.emit(e);
  }

  showCrawl(item) {
    const modalRef = this.modalService.open(ModalOpeningCrawlComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      scrollable: false,
    });
    modalRef.componentInstance.filmUrl = item;
  }
}
