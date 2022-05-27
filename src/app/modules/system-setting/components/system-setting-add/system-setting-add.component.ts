import { FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SystemSettingDTO } from 'src/app/shared/dto/system-setting.dto';
import { AddDialogComponent } from 'src/app/shared/components/base/add-base/add-dialog/add-dialog.component';
import { SystemSettingService } from './../../../../shared/services/system-setting.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'era-system-setting-add',
  templateUrl: './system-setting-add.component.html',
  styleUrls: ['./system-setting-add.component.scss']
})
export class SystemSettingAddComponent extends AddDialogComponent<SystemSettingDTO> implements OnInit, OnDestroy {

  constructor(public systemSettingService: SystemSettingService,
    public dialogRef: MatDialogRef<SystemSettingAddComponent>) {
    super(systemSettingService, dialogRef)
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getTitleToken(): string {
    return 'MENU.SYSTEM_SETTING'
  }

  form: FormGroup;
  buildForm(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  prepareModel(): SystemSettingDTO {
    return this.form.value;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
