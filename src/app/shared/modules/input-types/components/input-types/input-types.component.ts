import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FEATURE_TYPES } from 'src/app/modules/product-template/data/feature-types.data';
import { FeatureTypeEnum } from 'src/app/shared/enums';
import { InputConfig } from '../../interfaces/input-config.interface';

@Component({
  selector: 'era-input-types',
  templateUrl: './input-types.component.html',
  styleUrls: ['./input-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTypesComponent implements OnInit {

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

  onChangeValidOptionsConstraints(value: any): void {
    this.customOptionIsSelected = value.value === 'Others';
    let fromControlValue = this.customOptionIsSelected ? null : value.value;
    this.config.formGroup.controls.value.setValue(fromControlValue);
  }

  onChangeRangeConstraints(value: any): void {
    this.customOptionIsSelected = value.value === 'Others';

    let fromControlValue = this.customOptionIsSelected ? null : value.value.split(' to ')[0];
    let toControlValue = this.customOptionIsSelected ? null : value.value.split(' to ')[1].split(' - ')[0];
    let uomControlValue = this.customOptionIsSelected ? null : value.value.split(' to ')[1].split(' - ')[1];

    this.config.formGroup.controls.from.setValue(fromControlValue);
    this.config.formGroup.controls.to.setValue(toControlValue);
    this.config.formGroup.controls.uom.setValue(uomControlValue);
  }
}
