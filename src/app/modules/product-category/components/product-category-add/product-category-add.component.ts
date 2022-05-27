import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';

@Component({
  selector: 'era-product-category-add',
  templateUrl: './product-category-add.component.html',
  styleUrls: ['./product-category-add.component.scss']
})
export class ProductCategoryAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private dialogRef : MatDialogRef<ProductCategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { parentId: string },
    private translate : TranslateService
    ) { }

  form: FormGroup = this.formBuilder.group({
    title: [null, Validators.required],
    parentId: [null]
  });
  loading = false;

  ngOnInit(): void {
    this.form.controls.parentId.setValue(this.data.parentId);
    this.setTitle();
  }

  title = '';
  setTitle():void{
    this.translate.get("ROOT").subscribe(value => {
      this.translate.get('ADD_THIS', { value }).subscribe(value => {
        this.title = value;
      });
    });
  }

  save():void {
    this.loading = true;

    this.productCategoryService.create(this.form.value).subscribe(result => { 
      this.dialogRef.close(result);
      this.loading = false;
    }, error => { 
        this.loading = false;
    });
  }

  closeDialog():void {
    this.dialogRef.close();
  }
}
