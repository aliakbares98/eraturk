import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { AddPageComponent } from 'src/app/shared/components/base/add-base/add-page/add-page.component';
import { FILTER_OPERATION } from 'src/app/shared/data';
import {
  FeatureCategoryDTO,
  FeatureDefinitionDTO, ProductDTO, ProductTemplateDTO, ProductViewDTO
} from 'src/app/shared/dto';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { Filter, SearchParams } from 'src/app/shared/models';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'era-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent extends AddPageComponent<ProductDTO> implements OnInit, OnDestroy {
  productTemplates: ProductTemplateDTO[] = [];

  constructor(public productService: ProductService) {
    super(productService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getProductTemplates();
  }

  getTitleToken(): string {
    return 'MENU.PRODUCT';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      code: [null, Validators.required],
      description: [null],
      productIdInput: [null, Validators.required],
      parentId: [null, Validators.required],
      features: this.formBuilder.array([])
    });
  }

  selectedTemplate: ProductTemplateDTO;
  onTemplateSelected(productTemplate: ProductTemplateDTO): void {
    this.setSelectedTemplateState(productTemplate);
    this.resetFeatureForms();
    this.selectedTemplate = productTemplate;
    this.createFeatureForms(this.selectedTemplate);
  }

  setSelectedTemplateState(productTemplate: ProductTemplateDTO): void {
    this.productTemplates.filter(t => t.id !== productTemplate.id).forEach(t => {
      t.selected = false;
    });
    productTemplate.selected = true;
  }

  featuresOfCategory(category: FeatureCategoryDTO): FormGroup[] {
    return this.features
      .filter((f: FormGroup) => this.selectedTemplate.featureDefinitions
        .find(fd => fd.code === f.controls.code.value)?.featureCategory === category.code) as FormGroup[];
  }

  getFeatureFormId(feature: FormGroup): number {
    return findIndex(this.features, (f) => f === feature);
  }

  resetFeatureForms(): void {
    let length = (this.form.controls.features as FormArray).controls.length - 1;
    while (length >= 0) {
      this.removeFeatureForm(length);
      length--;
    }
  }

  createFeatureForms(productTemplate: ProductTemplateDTO): void {
    productTemplate.featureDefinitions.forEach(d => {
      this.addFeatureForm(d);
    })
  }

  getSearchParams(): SearchParams {
    let initialFilter = <Filter>{
      field: 'subType',
      operator: FILTER_OPERATION.equal,
      value: "ProductTemplate"
    };
    const params = new SearchParams();
    params.filter = JSON.stringify(initialFilter);

    return params;
  }

  getProductTemplates(): void {
    const subResult = this.productService.getAll<ProductTemplateDTO>(this.getSearchParams().stringify()).subscribe(result => {
      this.productTemplates = [...result.items];
      this.productTemplates = this.productTemplates.map(t => ({ ...t, selected: false }))
    });

    this.subscriptions$.add(subResult);
  }

  addFeatureForm(featureDefinition: FeatureDefinitionDTO): FormGroup {
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

  removeFeatureForm(i: number): void {
    (this.form.controls.features as any).removeAt(i);
  }

  getFeatureForm(index: number): FormGroup {
    return (this.form.controls.features as FormArray).at(index) as FormGroup;
  }

  get features(): FormGroup[] {
    return (this.form.controls.features as FormArray).controls as FormGroup[];
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

  prepareModel(): ProductDTO {
    delete this.form.value.productIdInput;
    (this.form.value as ProductViewDTO).features.forEach((f: any) => {
      delete f.type;
    });
    return this.form.value;
  }

  getListPageAddress(): string {
    return '/profile/product/list';
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
