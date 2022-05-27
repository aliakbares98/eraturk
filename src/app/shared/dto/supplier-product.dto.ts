import { ProductDTO, ProductViewDTO, SupplierViewDTO } from ".";

interface SupplierProductBase {
    id: string;
    productId: string;
    supplierId: string;
    price: string;
    availability: string;
}

export interface SupplierProductDTO extends SupplierProductBase {
    product: ProductDTO;
}

export interface SupplierProductResponseDTO extends SupplierProductDTO {
    product: ProductViewDTO;
    supplier: SupplierViewDTO;
}