import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckUtilities } from 'src/app/shared/utilities/check.utilities';

@Component({
  selector: 'era-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  constructor() { }

  @Input() disableDelete: boolean = false;
  @Input() disableEdit: boolean = false;
  @Output() onEdit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input('updateAction') updateAction: string;
  @Input('deleteAction') deleteAction: string;

  ngOnInit(): void {
    CheckUtilities.checkRequiredField('updateAction', this.updateAction);
    CheckUtilities.checkRequiredField('deleteAction', this.updateAction);
  }

  edit(event: MouseEvent) : void{
    this.onEdit.emit(event);
  }

  remove(event: MouseEvent): void {
    this.onRemove.emit(event);
  }
}
