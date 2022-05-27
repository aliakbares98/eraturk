
export const PRODUCT_CREATION_TEXT: ProductCreationText = {
    MDF: {
        en: {
            required: {
                template: 'A',
                title: 'product, named',
                height: 'with a length of',
                width: 'meter, width of',
                thickness: 'meter, thickness of',
                quality: 'meter, quality level of',
                color: 'with',
                colorful: 'color, and',
                brand: 'of it is colored. Its brand is',
                country: {
                    before: 'and from',
                    after: '.'
                }
            },
            optional: {
                pack_volume: 'pack_volume sentence',
                stock: 'stock sentence',
                picture: 'picture sentence',
                density: 'density sentence',
                price: {
                    before: 'price before sentence',
                    after: 'price after tail.'
                }
            }
        },
        tr: {
            required: {},
            optional: {}
        }
    },
    Tomruk: {
        en: {
            required: {
                template: 'A',
                title: 'product, named',
                number_feature: ', with a number feature',
                string_feature: ', string feature',
                boolean_feature: ', boolean feature',
                datetime_feature: ', datetime feature',
                range_feature: ', range feature',
                quantity_feature: {
                    before: 'and quantiry feature',
                    after: '.'
                }
            },
            optional: {}
        },
        tr: {
            required: {},
            optional: {}
        }
    }
}

export interface ProductCreationText {
    MDF: TemplateText;
    Tomruk: TemplateText;
}

export interface TemplateText {
    en: LanguageTextStructure;
    tr: LanguageTextStructure;
}

export interface LanguageTextStructure {
    required: any;
    optional?: any;
}
