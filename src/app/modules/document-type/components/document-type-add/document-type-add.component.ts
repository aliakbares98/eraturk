import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/base/add-base/add-dialog/add-dialog.component';
import { REGEX } from 'src/app/shared/data';
import { DocumentTypeDTO } from 'src/app/shared/dto/document-type.dto';
import { DocumentTypeService } from 'src/app/shared/services/document-type.service';

@Component({
  selector: 'era-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.scss'],
})
export class DocumentTypeAddComponent extends AddDialogComponent<DocumentTypeDTO> implements OnInit, OnDestroy {

  constructor(public documentTypeService: DocumentTypeService,
    public dialogRef: MatDialogRef<DocumentTypeAddComponent>) {
    super(documentTypeService, dialogRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
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
  addLimitation(): void {
    const limitation = this.formBuilder.group({
      extension: [null, [Validators.required, Validators.pattern(REGEX.fileExtension)]],
      maxSizeInByte: [null, [Validators.required]]
    });

    (this.form.controls.fileLimitations as any).push(limitation);
  }

  removeLimitation(index: number) : void{
    (this.form.controls.fileLimitations as any).removeAt(index);
  }

  prepareModel(): DocumentTypeDTO {
    return this.form.value;
  }

  fileLimitations(): FormGroup[] {
    return (this.form.get('fileLimitations') as FormArray).controls as FormGroup[];
  }
  
  ngOnDestroy(): void { 
    super.ngOnDestroy()
  }
}
