import { FormArray, FormGroup } from '@angular/forms';

/**
 * @description to use validator comperatively in Reactive Forms
 * @param controlToBeComfirmedName {string} Name of the control that will be confirmed - i.e : password
 */
export function uniqueCategoryValidator(form: FormGroup) {
  let categories = (form.controls.featureCategories as FormArray).controls as FormGroup[];
  let featureCategoryForm: FormGroup = form.controls.featureCategoryForm as FormGroup;

  categories.forEach(() => {
    let searchedCategoryOnCode = categories
      .find(fc => fc.controls.code.value === featureCategoryForm.controls.code.value);
    let searchedCategoryOnTitle = categories
      .find(fc => fc.controls.title.value === featureCategoryForm.controls.title.value);

    if ((featureCategoryForm.controls.code as any).value && searchedCategoryOnCode) {
      featureCategoryForm.controls.code.setErrors({
        categoryCodeMustUnique:
          { name: (featureCategoryForm.controls.code as any).name }
      })
    }

    if ((featureCategoryForm.controls.title as any).value && searchedCategoryOnTitle) {
      featureCategoryForm.controls.title.setErrors({
          categoryCodeMustUnique:
            { name: (featureCategoryForm.controls.title as any).name }
        })
    }
  });


}

