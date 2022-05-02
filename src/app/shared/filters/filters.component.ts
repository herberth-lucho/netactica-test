import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() eyeColorData: string[];
  @Input() genderData: string[];
  @Input() filmData: string[];
  @Input() formDirection: 'inline' | 'dropdown';
  @Output() selectedEye = new EventEmitter<string>();
  @Output() selectedGender = new EventEmitter<string>();
  @Output() selectedFilm = new EventEmitter<string>();

  onChangeEye(e) {
    this.selectedEye.emit(e);
  }

  onChangeGender(e) {
    this.selectedGender.emit(e);
  }

  onChangeFilm(e) {
    this.selectedFilm.emit(e);
  }
}
