import { Component, OnDestroy, OnInit } from '@angular/core';
import { matDialogConfig } from 'src/app/shared/configs';
import { ComponentsResolver } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/services';
import { ListBaseComponent } from '../list-base.component';

@Component({
  selector: 'era-list-dialog',
  template: '',
})
export abstract class ListDialogComponent<T> extends ListBaseComponent<T> implements OnInit, OnDestroy {
  constructor(public baseService: BaseService<T>) {
    super(baseService);
  }

  abstract getComponentResolvers(): ComponentsResolver;

  ngOnInit(): void {
    super.ngOnInit();

    // this.openAdd();
  }

  /**
   * @description Open MatDialog for Add component
   */
  openAdd(): void {
    const dialogRef = this.dialog.open(this.getComponentResolvers().add() as any, matDialogConfig);
    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllByFilter();
      }
    });

    this.subscriptions$.add(sub);
  }

  /**
   * @description Open MatDialog for Edit component
   */
  openEdit(row: T): void {
    const dialogRef = this.dialog.open(this.getComponentResolvers().edit() as any, { ...matDialogConfig, data: row });
    const sub = dialogRef.afterClosed().subscribe(result => {
      this.getAllByFilter();
    });

    this.subscriptions$.add(sub);
  }
}
