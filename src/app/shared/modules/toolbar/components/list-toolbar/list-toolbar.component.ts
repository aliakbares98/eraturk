import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckUtilities } from 'src/app/shared/utilities/check.utilities';

@Component({
  selector: 'era-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss']
})
export class ListToolbarComponent implements OnInit {
  @Output() onAdd: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
  @Input() addAction: string;
  param = { value: '' };
  constructor() { }

  ngOnInit(): void {
    CheckUtilities.checkRequiredField('addAction', this.addAction);
  }

  add(event: MouseEvent): void {
    this.onAdd.emit(event);
  }

  search(): void {
    this.onSearch.emit(null);
  }


}
