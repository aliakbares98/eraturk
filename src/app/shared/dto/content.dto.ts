export class ContentDTO {
    id: string;
    text: string;
    attachments: Object; // todo: Specify type
    isRateable: true;
    isCommentable: true;
    type: string
}

export class ContentViewDTO extends ContentDTO {
    typeId: string;
    subType: string;
    contentId: string;
    content: Object; // todo: Specify type (ContentViewDTO without content)
    numberOfAgreeers: number;
    numberOfOpponents: number;
}