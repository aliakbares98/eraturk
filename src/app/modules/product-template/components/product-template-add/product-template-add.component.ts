import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES, FEATURE_TYPES_LIST } from 'src/app/modules/product-template/data/feature-types.data';
import { AddBaseComponent } from 'src/app/shared/components/base';
import { matDialogConfig } from 'src/app/shared/configs';
import { COMMON_MESSAGES, featureConstraint } from 'src/app/shared/data';
import { FeatureConstraintTypes, FEATURE_CONSTRAINT_TYPE } from 'src/app/shared/data/feature-constraint-type.data';
import { CommandResponseDTO, FeatureDefinitionDTO, ProductTemplateDTO } from 'src/app/shared/dto';
import { ProductCategoryViewDTO } from 'src/app/shared/dto/product-category.dto';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { SelectCategoryComponent } from 'src/app/shared/modules/select-category/select-category.component';
import { ProductService } from 'src/app/shared/services';
import { uniqueCategoryValidator } from '../../direcitives/unique-category-code-validator.directive';

@Component({
  selector: 'era-product-template-add',
  templateUrl: './product-template-add.component.html',
  styleUrls: ['./product-template-add.component.scss']
})
export class ProductTemplateAddComponent extends AddBaseComponent<ProductTemplateDTO> implements OnInit, OnDestroy {

  constructor(public productService: ProductService,
    public dialogRef: MatDialogRef<ProductTemplateAddComponent>,
    private dialog: MatDialog) {
    super(productService);
  }

  featureTypesList = FEATURE_TYPES_LIST;
  form: FormGroup;

  ngOnInit(): void {
    super.ngOnInit();
  }

  // doSomething() {
  //   this.form.controls.featureCategoryForm.patchValue({
  //     title: 'test',
  //     code: 'test',
  //     order: 10
  //   });
  //   this.pushFeatureCategory();

  //   this.addFeatureDefinition({ stopPropagation: () => { } } as MouseEvent, this.featureCategoryForms[0])
  //   this.featureDefinitionForms[0].controls.featureType.setValue(FeatureTypeEnum[FeatureTypeEnum.Numeric]);
  // }

  getTitleToken(): string {
    return 'MENU.PRODUCT_TEMPLATE';
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      code: [null, Validators.required],
      categoryId: [null, Validators.required],
      description: [null],
      featureCategoryForm: this.formBuilder.group({
        title: [null],
        code: [null],
        order: [0],
        allowCustomOption:[null],
        allowCustomOptionCustom:[null],
      }),
      featureCategories: this.formBuilder.array([]),
      featureDefinitions: this.formBuilder.array([]),
      isService: [true, Validators.required]
    }, { validator: uniqueCategoryValidator });
  }

  selectedCategory: ProductCategoryViewDTO;
  openCategoriesDialog() {
    let dialogRef = this.dialog.open(SelectCategoryComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe((result: ProductCategoryViewDTO) => {
      this.selectedCategory = result ? result : this.selectedCategory;
      this.form.controls.categoryId.setValue(this.selectedCategory.id);
    });
  }

  enableFeatureCategoryButton(): boolean {
    return !Boolean(this.featureCategoryForm.controls.title.value &&
      this.featureCategoryForm.controls.code.value &&
      this.featureCategoryForm.valid);
  }

  pushFeatureCategory(): void {
    this.addFeatureCategory(this.featureCategoryForm);
    this.featureCategoryForm.setValue({
      title: null,
      code: null,
      order: 0
    });
  }

  get featureCategoryForm(): FormGroup {
    return this.form.controls.featureCategoryForm as FormGroup;
  }

  addFeatureCategory(featureCategory?: FormGroup): void {
    const group = this.formBuilder.group({
      title: [featureCategory?.value.title ? featureCategory.value.title : null, Validators.required],
      code: [featureCategory?.value.code ? featureCategory.value.code : null, [Validators.required]],
      order: [0, Validators.required]
    });

    (this.form.controls.featureCategories as FormArray).push(group);
  }

  removeFeatureCategory(index: number): void {
    const form: FormGroup = (this.form.controls.featureCategories as any).at(index);
    this.repairFeatureDefinitions(form);

    (this.form.controls.featureCategories as FormArray).removeAt(index);
  }

  addFeatureDefinition(event: MouseEvent, featureCategory?: FormGroup): void {
    const group = this.formBuilder.group({
      title: [null, Validators.required],
      code: [null, Validators.required],
      order: [0, Validators.required],
      featureCategory: [featureCategory ? featureCategory.controls.code.value : null, Validators.required],
      featureType: [null, Validators.required],
      constraints: this.formBuilder.array([]),
      isOptional: [false],
      description: [null]
    });

    (this.form.controls.featureDefinitions as FormArray).push(group);

    event.stopPropagation();
  }

  removeFeatureDefinition(index: number): void {
    (this.form.controls.featureDefinitions as FormArray).removeAt(index);
  }

  featureDefinitionsByCategory(featureCategory: FormGroup): FormGroup[] {
    return this.featureDefinitionForms.filter(fd => fd.controls.featureCategory.value === featureCategory.controls.code.value);
  }

  featureDefinitionLengthByCategory(featureCategory: FormGroup): number {
    return ((this.form.controls.featureDefinitions as FormArray).controls as FormGroup[])
      .filter(fd => fd.controls.featureCategory.value === featureCategory.controls.code.value
      ).length;
  }

  getFeatureDefinitionFormId(feature: FormGroup): number {
    return findIndex(this.featureDefinitionForms, (f) => f === feature);
  }

  /**
   * @description After deleting a FeatureCategory, we must repair all
   * featureDefinition forms that have deleted FeatureCategory
   *  as thier featureCategory (featureDefinition.featureCategory)
   * @param {FormGroup} featureCategoryForm Deleted featureCategory
   */
  repairFeatureDefinitions(featureCategoryForm: FormGroup): void {
    this.featureDefinitionForms.forEach((featureDefinitionForm: FormGroup) => {
      if (featureDefinitionForm.controls.featureCategory.value === featureCategoryForm.controls.code.value) {
        featureDefinitionForm.controls.featureCategory.setValue(null);
      }
    })
  }

  get featureCategoryForms(): FormGroup[] {
    return (this.form.controls.featureCategories as FormArray).controls as FormGroup[];
  }

  get featureDefinitionForms(): FormGroup[] {
    return (this.form.controls.featureDefinitions as FormArray).controls as FormGroup[];
  }

  //#region Management of Constraints
  addConstraint(featureDefinition: FormGroup): void {
    let constraintType = featureDefinition.controls.featureType.value === FEATURE_TYPES.range ?
      FEATURE_CONSTRAINT_TYPE.validRanges : FEATURE_CONSTRAINT_TYPE.validOptions;
    let formGroup: FormGroup = this.formBuilder.group({
      type: [constraintType, Validators.required],
      description: [null],
      allowCustomOption: [false],
      value: this.formBuilder.array([])
    });
    (featureDefinition.controls.constraints as FormArray).push(formGroup);
  }

  getConstraints(featureFormId: number): FormArray {
    return this.featureDefinitionForms[featureFormId].controls.constraints as FormArray;
  }

  featureConstraints(featureDefinition: FormGroup): FormGroup[] {
    return <FormGroup[]>(featureDefinition.controls.constraints as FormArray).controls;
  }

  removeConstraint(featureFormId: number, constraintId: number): void {
    this.getConstraints(featureFormId).removeAt(constraintId);
  }

  getConstraintValue(featureFormId: number, constraintId: number): FormArray {
    return <FormArray>(this.getConstraints(featureFormId).at(constraintId) as FormGroup).controls.value;
  }

  addConstraintValue(constraintForm: FormGroup): void {
    let formGroup: FormGroup;
    if (constraintForm.controls.type.value !== FEATURE_CONSTRAINT_TYPE.validRanges) {
      formGroup = this.formBuilder.group({
        value: [null, Validators.required]
      })
    } else {
      formGroup = this.formBuilder.group({
        from: [null, Validators.required],
        to: [null, Validators.required],
        uom: [null, Validators.required],
      })
    }

    (constraintForm.controls.value as FormArray).push(formGroup);
  }

  removeConstraintValue(constraintForm: FormGroup, valueId: number): void {
    (constraintForm.controls.value as FormArray).removeAt(valueId);
  }

  featureConstraintTypes: FeatureConstraintTypes = FEATURE_CONSTRAINT_TYPE;
  constraintValues(constraint: FormGroup): FormGroup[] {
    return <FormGroup[]>(constraint.controls.value as FormArray).controls;
  }

  constraintButtonShoudBeDisabled(featureDefinition: FormGroup): boolean {
    return !featureDefinition.controls.featureType.value ||
      featureDefinition.controls.featureType.value === FEATURE_TYPES.boolean ||
      featureDefinition.controls.featureType.value === FEATURE_TYPES.dateTime;
  }

  prepareInputConfig(constraintForm: FormGroup, featureDefinitionForm: FormGroup): InputConfig {
    let config: InputConfig = {
      formGroup: constraintForm,
      title: 'Value',
      featureType: featureDefinitionForm.controls.featureType.value,
      placeHolder: 'Value',
      controlName: 'value',
      required: true
    };
    return config;
  }

  onChangeFeatureType(event: string, index: number): void {
    let featureDefinition: FormGroup = this.featureDefinitionForms[index];
    let constraintType = event === FEATURE_TYPES.range ?
      FEATURE_CONSTRAINT_TYPE.validRanges :
      FEATURE_CONSTRAINT_TYPE.validOptions;

    (featureDefinition.controls.constraints as FormArray).controls
      .forEach(constraintForm => {
        (constraintForm as FormGroup).controls.type.setValue(constraintType);
        ((constraintForm as FormGroup).controls.value as FormArray).clear();
      });
  }
  //#endregion

  save(): void {
    this.loading = true;
    const subResult = this.productService.createTemplate(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.router.navigate(['/profile/product-template/list']);
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful)
    });

    this.subscriptions$.add(subResult);
  }

  prepareModel(): ProductTemplateDTO {
    delete this.form.value.featureCategoryForm;
    (this.form.value as ProductTemplateDTO).featureCategories.forEach((fc, index) => {
      fc.order = index;
    });
    (this.form.value as ProductTemplateDTO).featureDefinitions.forEach((fd, index) => {
      fd.order = index;
    });
    (this.form.value as ProductTemplateDTO).featureDefinitions.forEach((feature: FeatureDefinitionDTO) => {
      feature.constraints.forEach((constraint: featureConstraint) => {
        if (constraint.type === FEATURE_CONSTRAINT_TYPE.validOptions) {
          constraint.value = (constraint.value as any[]).map((i: any) => i.value);
        }
      })
    });

    return this.form.value;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
