import { DocumentViewDTO } from "src/app/shared/dto";

export interface UploaderConfig {
    documentTypeId: string;
    downloadable?: boolean;
    multiple?: boolean;
    files?: DocumentViewDTO[];
    enableActions?: boolean
}