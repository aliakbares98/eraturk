import { productType } from "../data";

interface ProductBase {
    id: string;
    title: string;
    description: string;
    parentId: string;
    features: FeatureValueDTO[];
    code: string;
}

export interface FeatureValueDTO {
    code: string;
    value: any;
}

export interface ProductDTO extends ProductBase{
    parentCode?: string;
    brandId?: string;
}

export interface ProductViewDTO extends ProductBase { 
    subType: productType;
    parent: ProductViewDTO;
}
