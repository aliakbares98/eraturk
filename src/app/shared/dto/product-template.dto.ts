import { featureConstraint, productType } from "../data";
import { Selectable } from "../models/selectable.model";
import { ProductCategoryDTO } from "./product-category.dto";

export class ProductTemplateDTO extends Selectable { 
    id: string;
    title: string;
    description: string;
    categoryId: string;
    isService: boolean;
    featureCategories: FeatureCategoryDTO[];
    featureDefinitions: FeatureDefinitionDTO[];
    code: string;
}

export interface ProductTemplateViewDTO extends ProductTemplateDTO{ 
    type: productType;
    category: ProductCategoryDTO;
}

export interface FeatureCategoryDTO {
    order: number;
    code: string;
    title: string;
}

export interface FeatureDefinitionDTO {
    order: number;
    featureCategory: string;
    code: string;
    title: string;
    featureType: string;
    constraints: featureConstraint[];
    isOptional: boolean;
    description: string;
}

export interface ProductTemplateResponseDTO extends ProductTemplateDTO {
    subType: productType;
    category: ProductCategoryDTO;
}
