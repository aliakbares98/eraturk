export interface ProductCategoryDTO {
  id: string;
  title: string;
  parentId: string;
}

export interface ProductCategoryViewDTO extends ProductCategoryDTO {
  parent: ProductCategoryDTO;
}