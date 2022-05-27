import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { StorageService } from 'src/app/shared/client-services';
import { AddPageComponent } from 'src/app/shared/components/base/add-base/add-page/add-page.component';
import { applicationLanguage, FILTER_OPERATION, productTemplates } from 'src/app/shared/data';
import { LanguageTextStructure, PRODUCT_CREATION_TEXT } from 'src/app/shared/data/product-template-text.data';
import { ProductTemplate, PRODUCT_TEMPLATES_LIST } from 'src/app/shared/data/product-template.data';
import { DocumentTypeDTO, FeatureDefinitionDTO, ProductTemplateDTO, ProductViewDTO } from 'src/app/shared/dto';
import { SupplierProductDTO } from 'src/app/shared/dto/supplier-product.dto';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { Filter, SearchParams } from 'src/app/shared/models';
import { UploaderConfig } from 'src/app/shared/modules/file-uploader/interfaces/uploader-config.interface';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { DocumentTypeService, ProductService } from 'src/app/shared/services';
import { SupplierProductService } from 'src/app/shared/services/supplier-product.service';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';

@Component({
  selector: 'era-supplier-product-add',
  templateUrl: './supplier-product-add.component.html',
  styleUrls: ['./supplier-product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductAddComponent extends AddPageComponent<SupplierProductDTO> implements OnInit, OnDestroy {
  productTemplates: ProductTemplateDTO[] = [];

  constructor(public supplierProductService: SupplierProductService,
    private productService: ProductService,
    private storageService: StorageService,
    private documentTypeService: DocumentTypeService) {
    super(supplierProductService);
  }

  currentLanguage: applicationLanguage;
  ngOnInit(): void {
    super.ngOnInit();
    this.getProductTemplates();
    this.setCurrentLanguage();
    this.getDocumentType();
  }

  getProductTemplates(): void {
    const subResult = this.productService.getAll<ProductTemplateDTO>(this.productTemplatesSearchParams.stringify()).subscribe(result => {
      this.productTemplates = [...result.items];

      if (!environment.production) {
        this.doSomething();
      }
    });

    this.subscriptions$.add(subResult);
  }

  doSomething(): void {
    this.form.controls.parentId.setValue('Tomruk');
  }

  get productTemplatesSearchParams(): SearchParams {
    let initialFilter = <Filter>{
      field: 'subType',
      operator: FILTER_OPERATION.equal,
      value: "ProductTemplate"
    };
    const params = new SearchParams();
    params.filter = JSON.stringify(initialFilter);

    return params;
  }

  setCurrentLanguage(): void {
    this.currentLanguage = (this.translate.currentLang ? this.translate.currentLang :
      (this.storageService.getSelectedLanguage() ? this.storageService.getSelectedLanguage() : 'en')) as applicationLanguage;
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

  getTitleToken(): string {
    return 'MENU.SUPPLIER_PRODUCT';
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      code: [v4(), Validators.required],
      description: [null],
      parentId: [null, Validators.required],
      features: this.formBuilder.array([])
    });
  }

  productTemplatesList: ProductTemplate[] = PRODUCT_TEMPLATES_LIST;
  selectedTemplate: ProductTemplateDTO;
  onChangeProductTemplate(templateTitle: string): void {
    this.resetFeatureForms();
    this.selectedTemplate = this.productTemplates.find(pt => pt.title === templateTitle) as ProductTemplateDTO;
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
  optionalFeaturesObject: any[];
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
      if (d === undefined) {
        alert('The feature is not defined in productTemplateText properly.')
      }
      this.addFeatureForm(d);
    })
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

  get features(): FormGroup[] {
    return (this.form.controls.features as FormArray).controls as FormGroup[];
  }

  getFeatureFormId(feature: FormGroup): number {
    return findIndex(this.features, (f) => f === feature);
  }

  getFeatureForm(index: number): FormGroup {
    return (this.form.controls.features as FormArray).at(index) as FormGroup;
  }

  getFeatureDefinition(featureForm: FormGroup): FeatureDefinitionDTO {
    return this.selectedTemplate.featureDefinitions.find(fd => fd.code === featureForm.controls.code.value) as FeatureDefinitionDTO;
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
    let featureDifinition = this.getRequiredFeature(this.getRequiredFeatureFormId(feature));
    return this.requiredFeaturesObject[featureDifinition.code as any].before ?
      this.requiredFeaturesObject[featureDifinition.code as any].before : this.productCreationText.required[featureDifinition.code];
  }

  getRequiredSentenceTail(feature: FormGroup): string {
    let featureDifinition = this.getRequiredFeature(this.getRequiredFeatureFormId(feature));
    return this.requiredFeaturesObject[featureDifinition.code as any].after ?
      this.requiredFeaturesObject[featureDifinition.code as any].after : "";
  }

  getRequiredFeature(index: number): FeatureDefinitionDTO {
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
    return this.optionalFeaturesObject[featureDifinition.code as any].before ?
      this.optionalFeaturesObject[featureDifinition.code as any].before :
      this.optionalFeaturesObject[featureDifinition.code as any];
  }

  getOptionnalSentenceTail(feature: FormGroup): string {
    let featureDifinition = this.getOptionalFeatureDefinition(this.getOptionalFeatureFormId(feature));
    return this.optionalFeaturesObject[featureDifinition.code as any].after ?
      this.optionalFeaturesObject[featureDifinition.code as any].after : "";
  }

  getOptionalFeatureDefinition(index: number): FeatureDefinitionDTO {
    return this.optionalFeaturesList[index];
  }
  //#endregion 

  prepareInputConfig(featureForm: FormGroup): InputConfig {
    let featureDefinition = this.getFeatureDefinition(featureForm);
    let formGroup: FormGroup = (featureDefinition.featureType === FEATURE_TYPES.range ?
      featureForm.controls.value :
      featureForm) as FormGroup;

    let config: InputConfig = {
      formGroup: formGroup,
      title: featureDefinition.title,
      featureType: featureDefinition.featureType,
      placeHolder: '',
      controlName: featureDefinition.featureType === FEATURE_TYPES.range ? 'from' : 'value',
      required: !featureDefinition.isOptional,
      constraints: featureDefinition.constraints as any
    };

    return config;
  }

  get uploaderConfig(): UploaderConfig {
    return {
      documentTypeId: this.documentType.id,
      multiple: true
    }
  }

  prepareModel(): SupplierProductDTO {
    this.form.value.parentId = this.productTemplates.find(p => p.title === this.form.controls.parentId.value)?.id;
    (this.form.value as ProductViewDTO).features.forEach((f: any) => {
      delete f.type;
    });
    return this.form.value;
  }

  getListPageAddress(): string {
    return '/profile/supplier-product/list';
  }


  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
