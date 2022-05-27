import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { EditPageComponent } from 'src/app/shared/components/base/edit-base/edit-page/edit-page.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import {
  FeatureCategoryDTO,
  FeatureDefinitionDTO,
  ProductDTO,

  ProductTemplateViewDTO,
  ProductViewDTO
} from 'src/app/shared/dto';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { Filter, SearchParams } from 'src/app/shared/models';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'era-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends EditPageComponent<ProductDTO> implements OnInit, OnDestroy {

  constructor(public productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ProductViewDTO,
    public route: ActivatedRoute) {
    super(productService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.data.id) {
      this.getProductTemplate(this.data.parentId);
    } else {
      this.route.params.subscribe(params => {
        if (params.id) {
          this.productService.get<ProductViewDTO>(params.id).subscribe(result => {
            this.data = result;
            this.getProductTemplate(result.parentId);
          });
        }
      })
    }

  }

  getTitleToken(): string {
    return 'MENU.PRODUCT';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(2)]],
      code: [null, Validators.required],
      description: [null],
      productTemplate: [null, Validators.required],
      parentId: [null, Validators.required],
      features: this.formBuilder.array([])
    });
  }

  selectedTemplate: ProductTemplateViewDTO;
  getProductTemplate(id: string) {
    this.productService.get<ProductTemplateViewDTO>(id).subscribe(result => {
      this.selectedTemplate = result;
      this.patchFormValue();
    });
  }

  patchFormValue(): void {
    this.createFeatures(this.selectedTemplate);

    this.form.controls.id.setValue(this.data.id);
    this.form.controls.title.setValue(this.data.title);
    this.form.controls.code.setValue(this.data.code);
    this.form.controls.description.setValue(this.data.description);
    this.form.controls.productTemplate.setValue(this.selectedTemplate);
    this.form.controls.parentId.setValue(this.selectedTemplate.id);
    this.form.controls.features.patchValue(this.data.features);
    this.form.controls.productTemplate.disable();
  }

  templateSelected(productTemplate: ProductTemplateViewDTO) : void{
    this.resetFeatureForms();
    this.selectedTemplate = productTemplate;
    this.createFeatures(this.selectedTemplate);
  }

  featuresOfCategory(category: FeatureCategoryDTO): FormGroup[] {
    return this.features
      .filter((f: FormGroup) => this.selectedTemplate.featureDefinitions.find(fd => fd.code === f.controls.code.value)?.featureCategory === category.code) as FormGroup[];
  }

  getFeatureFormId(feature: FormGroup): number {
    return findIndex(this.features, (f) => f === feature);
  }

  resetFeatureForms():void {
    let length = (this.form.controls.features as FormArray).controls.length - 1;
    while (length >= 0) {
      this.removeFeature(length);
      length--;
    }
  }

  createFeatures(template: ProductTemplateViewDTO) :void{
    template.featureDefinitions.forEach(d => {
      this.addFeature(d);
    })
  }

  getSearchParams(): SearchParams {
    let initialFilter = <Filter>{
      field: 'type',
      operator: FILTER_OPERATION.equal,
      value: "ProductTemplate"
    };
    const params = new SearchParams();
    params.filter = JSON.stringify(initialFilter);

    return params;
  }

  addFeature(featureDefinition: FeatureDefinitionDTO): FormGroup {
    let group: FormGroup;
    let initialValue = featureDefinition.featureType === FEATURE_TYPES.boolean ? false : null;
    let validation = featureDefinition.isOptional ? null : Validators.required;

    if (featureDefinition.featureType === FEATURE_TYPES.range) {
      group = this.formBuilder.group({
        value: this.formBuilder.group({
          from: [null, Validators.required],
          to: [null, Validators.required],
          uom: [null, Validators.required],
        }),
        code: [featureDefinition.code, validation],
        type: [FeatureTypeEnum[featureDefinition.featureType as any], validation]
      });
    } else {
      group = this.formBuilder.group({
        value: [initialValue, validation],
        code: [featureDefinition.code, validation],
        type: [FeatureTypeEnum[featureDefinition.featureType as any], validation]
      });
    }
    (this.form.controls.features as FormArray).push(group);

    return group;
  }

  removeFeature(i: number):void {
    (this.form.controls.features as any).removeAt(i);
  }

  get features(): FormGroup[] {
    return (this.form.controls.features as FormArray).controls as FormGroup[];
  }

  featureType = FeatureTypeEnum;
  typeOfFormControl(index: number) :void{
    return this.getFeature(index).controls.type.value;
  }

  getFeature(index: number): FormGroup {
    return (this.form.controls.features as FormArray).at(index) as FormGroup;
  }

  getFeatureDefinition(index: number): FeatureDefinitionDTO {
    return this.selectedTemplate.featureDefinitions[index];
  }

  prepareInputConfig(featureForm: FormGroup): InputConfig {
    let featureDefinition = this.getFeatureDefinition(this.getFeatureFormId(featureForm));
    let formGroup: FormGroup = (featureDefinition.featureType === FEATURE_TYPES.range ?
      featureForm.controls.value :
      featureForm) as FormGroup;

    let config: InputConfig = {
      formGroup: formGroup,
      title: featureDefinition.title,
      featureType: featureDefinition.featureType,
      placeHolder: featureDefinition.title,
      controlName: 'value',
      required: !featureDefinition.isOptional,
      constraints: featureDefinition.constraints,
      style: 'material'
    };

    return config;
  }

  updateWithPut(): boolean {
    return true;
  }

  prepareModel(): ProductDTO {
    delete this.form.value.productTemplate;
    this.form.value.brandId = '';
    (this.form.value as ProductViewDTO).features.forEach((f: any) => {
      delete f.type;
    });
    return this.form.value;
  }

  getListPageAddress(): string {
    return '/profile/product/list';
  }

  ngOnDestroy():void {
    super.ngOnDestroy();
  }
}
