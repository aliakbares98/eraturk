import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';
import { FEATURE_TYPES, FEATURE_TYPES_LIST } from 'src/app/modules/product-template/data/feature-types.data';
import { EditBaseComponent } from 'src/app/shared/components/base';
import { matDialogConfig } from 'src/app/shared/configs';
import { COMMON_MESSAGES, featureConstraint } from 'src/app/shared/data';
import { FeatureConstraintTypes, FEATURE_CONSTRAINT_TYPE } from 'src/app/shared/data/feature-constraint-type.data';
import { CommandResponseDTO, FeatureDefinitionDTO, ProductTemplateDTO, ProductTemplateViewDTO } from 'src/app/shared/dto';
import { ValidOptionsConstraintDTO } from 'src/app/shared/dto/feature-constraint.dto';
import { ProductCategoryViewDTO } from 'src/app/shared/dto/product-category.dto';
import { SearchParams } from 'src/app/shared/models';
import { InputConfig } from 'src/app/shared/modules/input-types/interfaces/input-config.interface';
import { SelectCategoryComponent } from 'src/app/shared/modules/select-category/select-category.component';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { uniqueCategoryValidator } from '../../direcitives/unique-category-code-validator.directive';

@Component({
  selector: 'era-product-template-edit',
  templateUrl: './product-template-edit.component.html',
  styleUrls: ['./product-template-edit.component.scss']
})
export class ProductTemplateEditComponent extends EditBaseComponent<ProductTemplateDTO> implements OnInit, OnDestroy {

  constructor(public productService: ProductService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router) {
    super(productService);
  }

  featureTypesList = FEATURE_TYPES_LIST;
  form: FormGroup;
  loading = false;
  data: ProductTemplateViewDTO;

  ngOnInit(): void {
    super.ngOnInit();
    this.getProductTemplate();
  }

  getTitleToken(): string {
    return 'MENU.PRODUCT_TEMPLATE';
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      code: [null, Validators.required],
      categoryId: [null, Validators.required],
      description: [null],
      featureCategoryForm: this.formBuilder.group({
        title: [null],
        code: [null],
        order: [0]
      }),
      featureCategories: this.formBuilder.array([]),
      featureDefinitions: this.formBuilder.array([]),
      isService: [true, Validators.required]
    }, { validator: uniqueCategoryValidator });
  }

  getProductTemplate(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.productService.get<ProductTemplateViewDTO>(params.id).subscribe(result => {
          this.data = result;
          this.getProductCategories();
        });
      }
    })
  }

  categoriesList: ProductCategoryViewDTO[] = [];
  getProductCategories() {
    const params: SearchParams = new SearchParams();
    params.pageSize = 100;
    params.pageIndex = 0;

    this.productCategoryService.getAll<ProductCategoryViewDTO>(params.stringify()).subscribe(result => {
      this.categoriesList = result.items;
      this.selectedCategory = this.categoriesList.find(c => c.id === this.data.categoryId) as ProductCategoryViewDTO;
      this.patchFormValue();
    });
  }

  patchFormValue(): void {
    while (this.data.featureCategories.length !== this.featureCategoryForms.length) {
      const formGroup = this.addFeatureCategoryForm();
      formGroup.controls.code.disable();
    }

    this.data.featureDefinitions.forEach(fd => {
      let featureCategoryForm = this.featureCategoryForms.find(fcf => fcf.controls.code.value === fd.featureCategory);
      const featureDefinitionForm = this.addFeatureDefinitionForm(undefined, featureCategoryForm, fd);

      fd.constraints.forEach((constraint, index) => {
        let constraintForm = this.addConstraintForm(featureDefinitionForm);

        if (constraint.type === FEATURE_CONSTRAINT_TYPE.validOptions) {
          this.mapPrimitiveValueToObject(constraint, fd);
        }

        constraint.value.forEach(v => {
          this.addValuePartOfConstraintForm(constraintForm);
        })
      });

      featureDefinitionForm.disable();
    })

    this.form.patchValue(this.data);
  }

  mapPrimitiveValueToObject(constraint: ValidOptionsConstraintDTO, featureDefinition: FeatureDefinitionDTO): void {
    constraint.value = (constraint.value as string[]).map((v: string) => {
      let value = featureDefinition.featureType === FEATURE_TYPES.numeric ? +v : v;
      return { value: value }
    }) as Object[];
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
      this.featureCategoryForm.controls.code.value);
  }

  pushFeatureCategory(): void {
    this.addFeatureCategoryForm(this.featureCategoryForm);
    this.featureCategoryForm.setValue({
      title: null,
      code: null,
      order: 0
    });
  }

  get featureCategoryForm(): FormGroup {
    return this.form.controls.featureCategoryForm as FormGroup;
  }

  addFeatureCategoryForm(featureCategory?: FormGroup): FormGroup {
    const group = this.formBuilder.group({
      title: [featureCategory?.value.title ? featureCategory.value.title : null, Validators.required],
      code: [featureCategory?.value.code ? featureCategory.value.code : null, Validators.required],
      order: [0, Validators.required]
    });

    (this.form.controls.featureCategories as FormArray).push(group);

    return group;
  }

  removeFeatureCategory(index: number): void {
    const form: FormGroup = (this.form.controls.featureCategories as any).at(index);
    this.repairFeatureDefinitions(form);

    (this.form.controls.featureCategories as any).removeAt(index);
  }

  addFeatureDefinitionForm(event?: MouseEvent, featureCategory?: FormGroup, featureDefinition?: FeatureDefinitionDTO): FormGroup {
    const group = this.formBuilder.group({
      title: [null, Validators.required],
      code: [null, Validators.required],
      order: [0, Validators.required],
      featureCategory: [featureCategory ? featureCategory.controls.code.value : null, Validators.required],
      featureType: [featureDefinition ? featureDefinition.featureType : null, Validators.required],
      constraints: this.formBuilder.array([]),
      isOptional: [false],
      description: [null]
    });

    (this.form.controls.featureDefinitions as FormArray).push(group);

    event?.stopPropagation();

    return group;
  }

  removeFeatureDefinitionForm(index: number): void {
    (this.form.controls.featureDefinitions as any).removeAt(index);
  }

  featureDefinitionsByCategory(featureCategory: FormGroup): FormGroup[] {
    let definitions = this.featureDefinitionForms.filter(fd => fd.controls.featureCategory.value === featureCategory.controls.code.value);
    return definitions;
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
        featureDefinitionForm.enable();
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
  addConstraintForm(featureDefinitionForm: FormGroup): FormGroup {
    let constraintType = featureDefinitionForm.controls.featureType.value === FEATURE_TYPES.range ?
      FEATURE_CONSTRAINT_TYPE.validRanges : FEATURE_CONSTRAINT_TYPE.validOptions;
    let formGroup: FormGroup = this.formBuilder.group({
      type: [constraintType, Validators.required],
      description: [null],
      allowCustomOption: [false],
      value: this.formBuilder.array([])
    });
    (featureDefinitionForm.controls.constraints as FormArray).push(formGroup);

    return formGroup;
  }

  getConstraintForms(featureFormId: number): FormArray {
    return this.featureDefinitionForms[featureFormId].controls.constraints as FormArray;
  }

  featureConstraints(featureDefinition: FormGroup): FormGroup[] {
    return <FormGroup[]>(featureDefinition.controls.constraints as FormArray).controls;
  }

  removeConstraintForm(featureFormId: number, constraintId: number): void {
    this.getConstraintForms(featureFormId).removeAt(constraintId);
  }

  getConstraintValue(featureFormId: number, constraintId: number): FormArray {
    return <FormArray>(this.getConstraintForms(featureFormId).at(constraintId) as FormGroup).controls.value;
  }

  addValuePartOfConstraintForm(constraintForm: FormGroup): void {
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
      required: true,
      style: 'material'
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
    const subResult = this.productService.updateTemplate(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.router.navigate(['/profile/product-template/list']);
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
    });

    this.subscriptions$.add(subResult);
  }

  prepareModel(): ProductTemplateDTO {
    let formValue = this.form.getRawValue();
    delete formValue.featureCategoryForm;
    (formValue as ProductTemplateDTO).featureCategories.forEach((fc, index) => {
      fc.order = index;
    });
    (formValue as ProductTemplateDTO).featureDefinitions.forEach((fd, index) => {
      fd.order = index;
    });
    (formValue as ProductTemplateDTO).featureDefinitions.forEach((feature: FeatureDefinitionDTO) => {
      feature.constraints.forEach((constraint: featureConstraint) => {
        if (constraint.type === FEATURE_CONSTRAINT_TYPE.validOptions) {
          constraint.value = (constraint.value as any[]).map((i: any) => {
            return feature.featureType === FEATURE_TYPES.numeric ? +i.value : i.value;
          });
        }
      })
    });
    return formValue;
  }

  updateWithPut(): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
