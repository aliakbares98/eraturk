
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/components/base/add-base/add-dialog/add-dialog.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { CultureDTO, CultureViewDTO, DocumentTypeDTO } from 'src/app/shared/dto';
import { Filter, SearchParams } from 'src/app/shared/models';
import { FileUploaderComponent } from 'src/app/shared/modules/file-uploader/file-uploader.component';
import { UploaderConfig } from 'src/app/shared/modules/file-uploader/interfaces/uploader-config.interface';
import { DocumentTypeService } from 'src/app/shared/services';
import { CultureService } from 'src/app/shared/services/culture.service';

@Component({
  selector: 'era-culture-add',
  templateUrl: './culture-add.component.html',
  styleUrls: ['./culture-add.component.scss']
})
export class CultureAddComponent extends AddDialogComponent<CultureDTO> implements OnInit, OnDestroy {

  constructor(public cultureService: CultureService,
    public dialogRef: MatDialogRef<CultureViewDTO>,
    private documentTypeService: DocumentTypeService
  ) {
    super(cultureService, dialogRef);
  }

  @ViewChild(FileUploaderComponent) uploader: FileUploaderComponent;

  ngOnInit(): void {
    super.ngOnInit();
    this.getDocumentType();
  }

  getTitleToken(): string {
    return 'MENU.CULTURE';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      rightToLeft: [false, Validators.required],
      translationFile: [null, Validators.required]
    })
  }

  documentType: DocumentTypeDTO;
  getDocumentType(): void {
    this.documentTypeService.getAll<DocumentTypeDTO>(this.documentTypeFilter.stringify()).subscribe(result => {
      this.documentType = result.items[0];
    });
  }

  get documentTypeFilter(): SearchParams {
    let params = new SearchParams();
    let filter = new Filter('code', FILTER_OPERATION.equal, 'TranslationFile');
    params.filter = JSON.stringify(filter);
    return params;
  }

  selectedFile: File;
  onFilesSelected(file: File): void {
    /**
     * @description To enable save button temporary
     */
    this.selectedFile = file;
    this.form.controls.translationFile.setValue(this.selectedFile.name);
  }

  get uploaderConfig(): UploaderConfig {
    return {
      documentTypeId: this.documentType?.id,
    };
  }

  prepareModel(): CultureDTO {
    return this.form.value;
  }

  save(): void {
    let formData = new FormData();
    formData.append('command', JSON.stringify({
      name: this.form.controls.name.value,
      rightToLeft: this.form.controls.rightToLeft.value
    }));
    formData.append('file', this.selectedFile);

    this.cultureService.create(formData).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
