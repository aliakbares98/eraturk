import { DocumentTypeDTO } from "./document-type.dto";

export interface DocumentDTO {
    id: string;
    type: string;
    file: File;
}

export interface DocumentViewDTO{
    id: string;
    typeId: string;
    type: DocumentTypeDTO;
    fileName: string;
    fileContent: string;
}