import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/shared/components/base/edit-base/edit-dialog/edit-dialog.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { CultureDTO, CultureViewDTO, DocumentTypeDTO, DocumentViewDTO } from 'src/app/shared/dto';
import { Filter, SearchParams } from 'src/app/shared/models';
import { FileUploaderComponent } from 'src/app/shared/modules/file-uploader/file-uploader.component';
import { UploaderConfig } from 'src/app/shared/modules/file-uploader/interfaces/uploader-config.interface';
import { DocumentTypeService } from 'src/app/shared/services';
import { CultureService } from 'src/app/shared/services/culture.service';

@Component({
  selector: 'era-culture-edit',
  templateUrl: './culture-edit.component.html',
  styleUrls: ['./culture-edit.component.scss']
})
export class CultureEditComponent extends EditDialogComponent<CultureDTO> implements OnInit, OnDestroy {
  constructor(public cultureService: CultureService,
    public dialogRef: MatDialogRef<CultureEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CultureViewDTO,
  private documentTypeService: DocumentTypeService) {
    super(cultureService, dialogRef);
  }

  @ViewChild(FileUploaderComponent) uploader: FileUploaderComponent;

  ngOnInit(): void {
    super.ngOnInit();
    this.getDocumentType();
    this.getCulture();
  }

  getTitleToken(): string {
    return 'MENU.CULTURE';
  }

  getCulture(): void {
    this.cultureService.get<CultureViewDTO>(this.data.id, 'translationFile').subscribe(result => {
      this.culture = result;
      this.files.push(this.culture.translationFile as DocumentViewDTO);
      this.patchFormValue();
    })
  }

  culture: CultureViewDTO;
  files: DocumentViewDTO[] = [];
  loading = false;
  form: FormGroup;

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      rightToLeft: [null, Validators.required],
      translationFile: [null, Validators.required]
    })
  }

  patchFormValue(): void {
    this.form.setValue({
      id: this.culture.id,
      name: this.culture.name,
      rightToLeft: this.culture.rightToLeft,
      translationFile: this.culture.translationFile?.id
    });
    this.form.controls.name.disable();
  }

  updateWithPut(): boolean {
    return false;
  }

  prepareModel(): CultureDTO {
    return this.form.value;
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

  selectedFile: File | string;
  onFilesSelected(file: File) {
    /**
     * @description To enable save button temporary
     */
    this.selectedFile = file;
    this.form.controls.translationFile.setValue(this.selectedFile.name);
  }

  get uploaderConfig(): UploaderConfig {
    return {
      documentTypeId: this.documentType?.id,
      downloadable: true,
      files: this.files
    }
  }

  save(): void {
    if (!this.selectedFile) {
      this.cultureService.updatePatch(this.form.value).subscribe(result => {
        this.closeDialog(result);
      });
    } else {
      let formData = new FormData();
      formData.append('command', JSON.stringify({
        rightToLeft: this.form.controls.rightToLeft.value
      }));
      formData.append('file', this.selectedFile);
      this.cultureService.updateWithFormData(formData, this.form.controls.id.value).subscribe(result => {
        this.closeDialog(result);
      });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
