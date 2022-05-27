import { FeatureTypeEnum } from "../../../shared/enums";

export const FEATURE_TYPES_LIST = [
    FeatureTypeEnum[FeatureTypeEnum.Boolean],
    FeatureTypeEnum[FeatureTypeEnum.Numeric],
    FeatureTypeEnum[FeatureTypeEnum.String],
    FeatureTypeEnum[FeatureTypeEnum.DateTime],
    FeatureTypeEnum[FeatureTypeEnum.Quantity],
    FeatureTypeEnum[FeatureTypeEnum.Range]
]

export const FEATURE_TYPES: FeatureTypes = {
    boolean: FeatureTypeEnum[FeatureTypeEnum.Boolean],
    numeric: FeatureTypeEnum[FeatureTypeEnum.Numeric],
    string: FeatureTypeEnum[FeatureTypeEnum.String],
    dateTime: FeatureTypeEnum[FeatureTypeEnum.DateTime],
    quantity: FeatureTypeEnum[FeatureTypeEnum.Quantity],
    range: FeatureTypeEnum[FeatureTypeEnum.Range]
}

export interface FeatureTypes {
    boolean: string;
    numeric: string;
    string: string;
    dateTime: string;
    quantity: string;
    range: string;
}