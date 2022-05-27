import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { indexOf as _indexOf, remove as _remove } from 'lodash-es';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { StorageService } from 'src/app/shared/client-services';
import { DocumentViewDTO } from 'src/app/shared/dto';
import { DocumentService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import { CheckUtilities } from '../../utilities';
import { UploaderConfig } from './interfaces/uploader-config.interface';

@Component({
  selector: 'era-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  

  ngOnInit(): void {
    // this.initalizeUploader();
    // CheckUtilities.checkRequiredField('documentTypeId', this.config.documentTypeId);
    this.config.files = [];
  }

  uploader: FileUploader;
  URL: string = `${environment.apiEndPoint}/documents`;

  @Input() config: UploaderConfig;
  @Output() onFilesSelected: EventEmitter<File> = new EventEmitter<File>();
  @ViewChild('singleInput') singleInput: ElementRef;

  constructor(private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private documentService: DocumentService) {
  }

  initalizeUploader(): void {
    this.uploader = new FileUploader({
      url: this.URL,
      authToken: 'Bearer ' + this.storageService.getAccessToken() as string,
    });
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('command', JSON.stringify({ type: this.config.documentTypeId }));
    };
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onProgressItem = (progress: any) => {
      return this.changeDetector.detectChanges();
    }
    this.uploader.onAfterAddingFile = (item: FileItem) => {
      this.onFilesSelected.emit(item._file);

      this.handleSingleUploader();
    }

    this.uploader.response.subscribe(
      (res: any) => {
      }, (error: any) => {
      });
  }

  handleSingleUploader(): void {
    if (!this.config.multiple) {
      this.config.files?.pop();
      if (this.uploader.queue.length > 1) {
        this.uploader.queue.shift();
      }
    }
  }

  downloadFile(file: DocumentViewDTO): void {
    this.documentService.download(file.id).subscribe(result => {
      this.downloadObjectAsJson(result, file.fileName);
    });
  }

  downloadObjectAsJson(exportObj: any, exportName: string): void {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  removeFile(index: number): void {
    let indexOfFile;
    if (this.config && this.config.files) {
      indexOfFile = _indexOf(this.config.files, this.config.files[0]);
    }
    _remove(this.config?.files as DocumentViewDTO[], (file) => {
      return _indexOf(this.config.files, file) === index;
    });
    if (this.config?.files?.length === 0) {
      this.resetInput();
      this.onFilesSelected.emit([] as any);
    }
  }

  resetInput(): void {
    this.singleInput.nativeElement.value = '';
  }
}
