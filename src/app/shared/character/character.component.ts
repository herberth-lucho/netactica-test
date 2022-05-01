import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterResult } from '../models/character.model';

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

  pageChange(e) {
    this.selectedPage.emit(e);
  }
}
