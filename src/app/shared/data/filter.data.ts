
export const FILTER_OPERATION: FilterOperation = {
    equal: 'eq',
    notEqual: 'neq',
    lessThan: 'lt',
    lessThanEqual: 'lte',
    greaterThan: 'gt',
    greaterThanEqual: 'gte',
    inArray: 'in',
    notInArray: 'notIn',
    startWith: 'startWith',
    endWith: 'endWith',
    contains: 'contains'
}
export interface FilterOperation {
    equal: 'eq',
    notEqual: 'neq',
    lessThan: 'lt',
    lessThanEqual: 'lte',
    greaterThan: 'gt',
    greaterThanEqual: 'gte',
    inArray: 'in',
    notInArray: 'notIn',
    startWith: 'startWith',
    endWith: 'endWith',
    contains: 'contains'
}

export const FILTER_LOGIC: FilterLogic = {
    and: 'and',
    or: 'or'
}

export interface FilterLogic {
    and: 'and';
    or: 'or';
}
