export const PRODUCT_TEMPLATES = {
    mdf: 'mdf',
    tomruk: 'tomruk'
}

export const PRODUCT_TEMPLATES_LIST : ProductTemplate[] = [
    {title: 'MDF'},
    {title: 'Tomruk'},
    {title: 'template 3'},
    {title: 'template 4'},
    {title: 'template 5'},
    {title: 'template 6'},
    {title: 'template 7'},
]

export interface ProductTemplate {
    title: string;
}