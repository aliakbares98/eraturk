import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterOperation, FILTER_LOGIC, FILTER_OPERATION } from 'src/app/shared/data';
import { DeepFilter, Filter } from 'src/app/shared/models';

@Component({
  selector: 'era-filter-component',
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public filter: DeepFilter
  ) {
  }

  form: FormGroup = this.formBuilder.group({
    operator1: [null],
    value1: [null],
    logic: [FILTER_LOGIC.and],
    operator2: [null],
    value2: [null]
  });

  filterOperation: FilterOperation = FILTER_OPERATION;

  loading = false;
  ngOnInit(): void {
    this.setFormValue();
  }

  setFormValue() :void{
    this.form.controls.logic.setValue(this.filter.logic);
    if (this.filter.filters.length > 0) {
      this.form.controls.operator1.setValue(this.filter.filters[0].operator);
      this.form.controls.value1.setValue(this.filter.filters[0].value);
    }

    if (this.filter.filters.length === 2) {
      this.form.controls.operator2.setValue(this.filter.filters[1].operator);
      this.form.controls.value2.setValue(this.filter.filters[1].value);
    }
  }

  save() :void{
    this.loading = true;
    this.closeDialog();
  }

  resetFilters() :void{
    this.form.reset();
    this.dialogRef.close();
  }

  closeDialog() :void{
    this.dialogRef.close(this.formIsValid() ? this.getCreatedFilter() : null);
  }

  formIsValid(): boolean {
    return this.form.controls.operator1.value !== null &&
      this.form.controls.value1.value !== null;
  }

  getCreatedFilter(): DeepFilter {
    let filter: Filter = {
      field: this.filter.name,
      operator: this.form.controls.operator1.value,
      value: this.form.controls.value1.value,
    }
    let deepFilter: DeepFilter = {
      name: this.filter.name,
      logic: this.form.controls.logic.value,
      filters: [filter]
    };

    if (this.form.controls.operator2.value) {
      let filter: Filter = {
        field: this.filter.name,
        operator: this.form.controls.operator2.value,
        value: this.form.controls.value2.value,
      }
      deepFilter.filters.push(filter);
    }

    return deepFilter;
  }
}
