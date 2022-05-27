import { FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemSettingDTO } from '../../../../shared/dto/system-setting.dto';
import { SystemSettingService } from '../../../../shared/services/system-setting.service';
import { EditDialogComponent } from '../../../../shared/components/base/edit-base/edit-dialog/edit-dialog.component';


@Component({
  selector: 'era-system-setting-edit',
  templateUrl: './system-setting-edit.component.html',
  styleUrls: ['./system-setting-edit.component.scss']
})
export class SystemSettingEditComponent extends EditDialogComponent<SystemSettingDTO> implements OnInit {

  constructor(public systemSettingService: SystemSettingService,
    public dialogRef: MatDialogRef<SystemSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SystemSettingDTO) {
    super(systemSettingService, dialogRef)
  }

  ngOnInit() {
    super.ngOnInit();
    this.patchFormValue();
  }

  getTitleToken(): string {
    return 'MENU.SYSTEM_SETTING';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id:[null],
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  patchFormValue(): void {
    this.form.patchValue(this.data);
    this.form.controls.code.disable();

  }

  updateWithPut(): boolean {
    return false;
  }

  prepareModel(): SystemSettingDTO {
    return this.form.value;
  }
 
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
