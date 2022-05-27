import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { StorageService } from 'src/app/shared/client-services';
import { EditPageComponent } from 'src/app/shared/components/base/edit-base/edit-page/edit-page.component';
import {
  applicationLanguage,
  FILTER_OPERATION,
  LanguageTextStructure,
  productTemplates,
  PRODUCT_CREATION_TEXT
} from 'src/app/shared/data';
import { ProductTemplate, PRODUCT_TEMPLATES_LIST } from 'src/app/shared/data/product-template.data';
import { FeatureDefinitionDTO, ProductDTO, ProductTemplateDTO, ProductTemplateViewDTO, ProductViewDTO } from 'src/app/shared/dto';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { Filter, SearchParams } from 'src/app/shared/models';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'era-supplier-product-edit',
  templateUrl: './supplier-product-edit.component.html',
  styleUrls: ['./supplier-product-edit.component.scss']
})
export class SupplierProductEditComponent extends EditPageComponent<ProductDTO> implements OnInit, OnDestroy {

  constructor(public productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ProductViewDTO,
    public route: ActivatedRoute,
    private storageService: StorageService) {
    super(productService);
  }

  currentLanguage: applicationLanguage;
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

    this.setCurrentLanguage();
  }

  setCurrentLanguage(): void {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang as applicationLanguage :
      (this.storageService.getSelectedLanguage() ? this.storageService.getSelectedLanguage() : 'en') as applicationLanguage;
  }

  getTitleToken(): string {
    return 'MENU.SUPPLIER_PRODUCT';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
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
      this.onChangeProductTemplate();
      this.patchFormValue();
    });
  }

  productTemplates: ProductTemplateDTO[] = [];

  get getSearchParams(): SearchParams {
    let initialFilter = <Filter>{
      field: 'type',
      operator: FILTER_OPERATION.equal,
      value: "ProductTemplate"
    };
    const params = new SearchParams();
    params.filter = JSON.stringify(initialFilter);

    return params;
  }

  productTemplatesList: ProductTemplate[] = PRODUCT_TEMPLATES_LIST;
  onChangeProductTemplate(): void {
    this.resetFeatureForms();
    this.prepareProductCreationText();
    this.createRequiredFeaturesList();
    this.createOptionalFeaturesList();
    this.createFeatureForms(this.requiredFeaturesList);
    this.createFeatureForms(this.optionalFeaturesList);
  }

  productCreationText: LanguageTextStructure;
  prepareProductCreationText(): void {
    this.productCreationText = PRODUCT_CREATION_TEXT[this.selectedTemplate.title as productTemplates][this.currentLanguage];
  }

  patchFormValue(): void {
    this.form.controls.id.setValue(this.data.id);
    this.form.controls.title.setValue(this.data.title);
    this.form.controls.code.setValue(this.data.code);
    this.form.controls.description.setValue(this.data.description);
    this.form.controls.productTemplate.setValue(this.selectedTemplate);
    this.form.controls.parentId.setValue(this.selectedTemplate.title);
    this.form.controls.features.patchValue(this.data.features);

    this.form.controls.parentId.disable();
  }

  resetFeatureForms(): void {
    let length = (this.form.controls.features as FormArray).controls.length - 1;
    while (length >= 0) {
      this.removeFeatureForm(length);
      length--;
    }
  }

  requiredFeaturesList: FeatureDefinitionDTO[] = [];
  requiredFeaturesObject: any;
  createRequiredFeaturesList(): void {
    this.requiredFeaturesObject = this.productCreationText.required;
    this.requiredFeaturesList = [];
    this.requiredFeaturesList = this.selectedTemplate.featureDefinitions.filter(fd => fd.isOptional === false);
  }

  optionalFeaturesList: FeatureDefinitionDTO[] = [];
  optionalFeaturesObject: any;
  createOptionalFeaturesList(): void {
    this.optionalFeaturesObject = this.productCreationText.optional;
    this.optionalFeaturesList = [];
    this.optionalFeaturesList = this.selectedTemplate.featureDefinitions.filter(fd => fd.isOptional === true);
  }

  getCommonSentencePartBefore(name: string): string {
    return this.productCreationText?.required[name];
  }

  //#region Managing featureForms
  createFeatureForms(featureDefinitions: FeatureDefinitionDTO[]): void {
    featureDefinitions.forEach(d => {
      this.addFeatureForm(d);
    })
  }

  addFeatureForm(featureDefinition: FeatureDefinitionDTO): FormGroup {
    let initialValue = null;
    switch (featureDefinition.featureType) {
      case FeatureTypeEnum[FeatureTypeEnum.String]:
        initialValue = null;
        break;
      case FeatureTypeEnum[FeatureTypeEnum.Numeric]:
        initialValue = null;
        break;
      case FeatureTypeEnum[FeatureTypeEnum.Boolean]:
        initialValue = false;
        break;
      case FeatureTypeEnum[FeatureTypeEnum.DateTime]:
        initialValue = null;
        break;

      default:
        break;
    }

    let validation = featureDefinition.isOptional ? null : Validators.required;
    const group: FormGroup = this.formBuilder.group({
      value: [initialValue],
      code: [featureDefinition.code],
      type: [FeatureTypeEnum[featureDefinition.featureType as any]]
    });

    (this.form.controls.features as FormArray).push(group);

    return group;
  }

  removeFeatureForm(i: number): void {
    (this.form.controls.features as any).removeAt(i);
  }

  get features(): FormGroup[] {
    return (this.form.controls.features as FormArray).controls as FormGroup[];
  }

  getFeatureFormId(feature: FormGroup): number {
    return findIndex(this.features, (f) => f === feature);
  }
  //#endregion 

  //#region Managing required sentence
  getRequiredFeatureFormId(feature: FormGroup): number {
    return findIndex(this.requiredFeatures, (f) => f === feature);
  }

  get requiredFeatures(): FormGroup[] {
    let requireds = this.features
      .filter((f: FormGroup) => this.requiredFeaturesList
        .find(fd => fd.code === f.controls.code.value)) as FormGroup[];
    return requireds;
  }

  getRequiredSentencePart(feature: FormGroup): string {
    let featureDifinition = this.getRequiredFeatureDefinition(this.getRequiredFeatureFormId(feature));
    return this.requiredFeaturesObject[featureDifinition.code].before ?
      this.requiredFeaturesObject[featureDifinition.code].before : this.requiredFeaturesObject[featureDifinition.code];
  }

  getRequiredSentenceTail(feature: FormGroup): string {
    let featureDifinition = this.getRequiredFeatureDefinition(this.getRequiredFeatureFormId(feature));
    return this.requiredFeaturesObject[featureDifinition.code].after ?
      this.requiredFeaturesObject[featureDifinition.code].after : "";
  }

  getRequiredFeatureDefinition(index: number): FeatureDefinitionDTO {
    return this.requiredFeaturesList[index];
  }
  //#endregion 

  //#region Managing optional sentence
  getOptionalFeatureFormId(feature: FormGroup): number {
    return findIndex(this.optionalFeatures, (f) => f === feature);
  }

  get optionalFeatures(): FormGroup[] {
    return this.features
      .filter((f: FormGroup) => this.optionalFeaturesList
        .find(fd => fd.code === f.controls.code.value)) as FormGroup[];
  }

  getOptionnalSentencePart(feature: FormGroup): string {
    let featureDifinition = this.getOptionalFeatureDefinition(this.getOptionalFeatureFormId(feature));
    let featureText = this.optionalFeaturesObject[featureDifinition.code];
    return featureText.before ?
      featureText.before :
      featureText;
  }

  getOptionnalSentenceTail(feature: FormGroup): string {
    let featureDifinition = this.getOptionalFeatureDefinition(this.getOptionalFeatureFormId(feature));
    return this.optionalFeaturesObject[featureDifinition.code].after ?
      this.optionalFeaturesObject[featureDifinition.code].after : "";
  }

  getOptionalFeatureDefinition(index: number): FeatureDefinitionDTO {
    return this.optionalFeaturesList[index];
  }
  //#endregion 

  getFeatureForm(index: number): FormGroup {
    return (this.form.controls.features as FormArray).at(index) as FormGroup;
  }

  getFeatureDefinition(featureForm: FormGroup): FeatureDefinitionDTO {
    return this.selectedTemplate.featureDefinitions.find(fd => fd.code === featureForm.controls.code.value) as FeatureDefinitionDTO;
  }

  prepareInputConfig(featureForm: FormGroup): InputConfig {
    let featureDefinition = this.getFeatureDefinition(featureForm);
    let formGroup: FormGroup = (featureDefinition.featureType === FEATURE_TYPES.range ?
      featureForm.controls.value :
      featureForm) as FormGroup;

    let config: InputConfig = {
      formGroup: formGroup,
      title: featureDefinition.title,
      featureType: featureDefinition.featureType,
      placeHolder: featureDefinition.title,
      controlName: 'value',
      required: !featureDefinition.isOptional
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
    return '/profile/supplier-product/list';
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
