import { Component, Input, OnInit } from '@angular/core';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { RangeDTO } from 'src/app/shared/dto/feature-constraint.dto';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { InputConfig } from '../../interfaces/input-config.interface';

@Component({
  selector: 'era-input-types-material',
  templateUrl: './input-types-material.component.html',
  styleUrls: ['./input-types-material.component.scss']
})
export class InputTypesMaterialComponent implements OnInit {

  constructor() { }

  @Input() config: InputConfig;

  featureTypeEnum = FeatureTypeEnum;
  featureTypes = FEATURE_TYPES;
  constraintValues: any[] = [];
  customOptionIsAllowed = false;
  customOptionIsSelected = false;
  ngOnInit(): void {
    if (this.config.constraints?.length) {
      this.constraintValues = this.config.constraints[0]?.value;
      this.customOptionIsAllowed = this.config.constraints[0]?.allowCustomOption;
    }
  }

  determineVisibility(featureType: FeatureTypeEnum): boolean {
    return this.config.featureType === FeatureTypeEnum[featureType]
  }

  onChangeValidOptionsConstraints(value: string): void {
    this.customOptionIsSelected = value === 'Others';
    let fromControlValue = this.customOptionIsSelected ? null : value;
    this.config.formGroup.controls.value.setValue(fromControlValue);
  }

  onChangeRangeConstraints(value: RangeDTO | string): void {
    this.customOptionIsSelected = value === 'Others';

    let fromControlValue = this.customOptionIsSelected ? null : (value as RangeDTO).from;
    let toControlValue = this.customOptionIsSelected ? null : (value as RangeDTO).to;
    let uomControlValue = this.customOptionIsSelected ? null : (value as RangeDTO).uom;

    this.config.formGroup.controls.from.setValue(fromControlValue);
    this.config.formGroup.controls.to.setValue(toControlValue);
    this.config.formGroup.controls.uom.setValue(uomControlValue);
  }
}
