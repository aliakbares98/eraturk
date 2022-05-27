import { AddDialogComponent } from 'src/app/shared/components/base/add-base/add-dialog/add-dialog.component';
import { ListDialogComponent } from 'src/app/shared/components/base/list-base/list-dialog/list-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsResolver } from 'src/app/shared/interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'era-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit {



  @Input('data') meals: string[] = [];
  page: number = 1;

  isActive: boolean = false;
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {


  }
  clickAll() {
    this.isActive = !this.isActive;
    this.router.navigate(['/products'], { relativeTo: this.activeRoute })
  }
  /**
  * @description Waiting for the final .   
  */
  openAdd() {

  }

}
