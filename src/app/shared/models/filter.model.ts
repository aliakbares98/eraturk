import { filterLogic, filterOperator, FILTER_LOGIC } from "../data";

export class Filter {
    field: string;
    operator: filterOperator;
    value: any;

    constructor(field?: string, operator?: filterOperator, value?: any) {
        this.field = field as string;
        this.operator = operator as filterOperator;
        this.value = value;
    }
}

export class DeepFilter {
    name: string;
    logic: filterLogic;
    filters: Filter[];

    constructor(name?: string, logic?: filterLogic, filters?: Filter[]) {
        this.name = name as string;
        this.logic = logic as filterLogic ? logic as filterLogic : FILTER_LOGIC.and;
        this.filters = filters ? filters as Filter[] : [];
    }
}

export class AdvancedFilter {
    logic: filterLogic;
    filters: DeepFilter[];

    constructor(logic?: filterLogic, filters?: DeepFilter[]) {
        this.logic = logic as filterLogic ? logic as filterLogic : FILTER_LOGIC.and;
        this.filters = filters ? filters as DeepFilter[] : [];
    }
}
