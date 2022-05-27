import { DocumentViewDTO } from "./document.dto";

interface CultureBase {
    id: string;
    name: string;
    rightToLeft: boolean;
}

export interface CultureDTO extends CultureBase {
    file: string;
}

export interface CultureViewDTO extends CultureBase{
    translationFileId: string;
    translationFile?: DocumentViewDTO;
}
