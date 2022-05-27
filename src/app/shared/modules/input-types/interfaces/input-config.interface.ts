import { FormGroup } from "@angular/forms";
import { featureConstraint } from "src/app/shared/data";

export interface InputConfig {
    formGroup: FormGroup;
    title: string;
    featureType: string;
    placeHolder: string;
    controlName: string;
    required: boolean;
    constraints?: featureConstraint[]; // string[] | RangeDTO[];
    style?: 'material'
}