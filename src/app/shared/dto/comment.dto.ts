export interface CommentDTO {
    id: string;
    text: string;
    attachments: Object; // todo: Specify type
    post: string;
    referenceType: string;
    referenceId: string;
}

export interface CommentViewDTO {
    id: string;
    text: string;
    isRateable: boolean;
    isCommentable: boolean;
    attachments: Object;
    postId: string;
    numberOfAgreeers: number;
    numberOfOpponents: number;
}