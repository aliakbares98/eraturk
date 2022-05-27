export interface FeatureValueConstraint {
    type: string;
    description: string;
    allowCustomOption: boolean;
}

export interface ValidOptionsConstraintDTO extends FeatureValueConstraint {
    value: string[] | Object[];
}

export interface ValidRangesConstraintDTO extends FeatureValueConstraint {
    value: RangeDTO[];
}

export interface RangeDTO {
    from: number;
    to: number;
    uom: string;
} 