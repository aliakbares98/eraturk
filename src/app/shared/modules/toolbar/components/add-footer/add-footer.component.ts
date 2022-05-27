import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'era-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.scss']
})
export class AddFooterComponent {

  constructor() { }

  @Input() loading: boolean = false;
  @Input() form: FormGroup;
  @Input() disableSave: boolean = false;
  @Input() disableCancel: boolean = false;
  @Output() onSave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onCancel: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  save(event: MouseEvent): void {
    this.onSave.emit(event);
  }

  cancel(event: MouseEvent): void {
    this.onCancel.emit(event);
  }
}
