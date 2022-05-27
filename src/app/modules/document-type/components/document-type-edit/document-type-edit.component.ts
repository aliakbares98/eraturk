import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/shared/components/base/edit-base/edit-dialog/edit-dialog.component';
import { REGEX } from 'src/app/shared/data';
import { DocumentTypeDTO } from 'src/app/shared/dto/document-type.dto';
import { DocumentTypeService } from 'src/app/shared/services/document-type.service';

@Component({
  selector: 'era-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent extends EditDialogComponent<DocumentTypeDTO> implements OnInit, OnDestroy {
  constructor(public documentTypeService: DocumentTypeService,
    public dialogRef: MatDialogRef<DocumentTypeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentTypeDTO) {
    super(documentTypeService, dialogRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.patchFormValue();
  }

  getTitleToken(): string {
    return 'MENU.DOCUMENT_TYPE';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = <FormGroup>this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      code: [null, Validators.required],
      fileLimitations: this.formBuilder.array([])
    });
  }

  patchFormValue() : void{
    while (this.data.fileLimitations.length !== this.fileLimitations.length) {
      this.addLimitation();
    }
    this.form.patchValue(this.data);
    this.form.controls.code.disable();
  }

  addLimitation(): void {
    const limitation = this.formBuilder.group({
      extension: [null, [Validators.required, Validators.pattern(REGEX.fileExtension)]],
      maxSizeInByte: [null, [Validators.required]]
    });

    (this.form.controls.fileLimitations as FormArray).push(limitation);
  }

  removeLimitation(index: number) : void{
    (this.form.controls.fileLimitations as FormArray).removeAt(index);
  }

  updateWithPut(): boolean {
    return false;
  }

  prepareModel(): DocumentTypeDTO {
    return this.form.value;
  }

  get fileLimitations(): FormGroup[] {
    return (this.form.controls.fileLimitations as FormArray).controls as FormGroup[];
  }

  ngOnDestroy() : void{
    super.ngOnDestroy();
  }
}
