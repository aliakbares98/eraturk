import { PERMISSIONS } from "./permissions";

export interface MenuItem {
    textToken: string;
    link: string;
    permission?: string;
    icon?: string;
    children?: MenuItem[]
}

export const PROFILE_MENU_ITEMS: MenuItem[] = [
    {
        textToken: 'MENU.PERSONL_INFO',
        link: 'personal-info',
        permission: PERMISSIONS.AllowedTemporarily,
        icon: 'person'
    },
    {
        textToken: 'MENU.MESSAGING',
        link: 'messaging',
        permission: PERMISSIONS.AllowedTemporarily,
        icon: 'message'
    },
    {
        textToken: 'MENU.SAVED_ITEMS',
        link: 'save',
        permission: PERMISSIONS.AllowedTemporarily,
        icon: 'bookmark'
    },

    {
        textToken: 'MENU.DOCUMENT_TYPE',
        link: 'document-type',
        permission: PERMISSIONS.ViewDocumentType,
        icon: 'description'
    },
    {
        textToken: 'MENU.CULTURE',
        link: 'culture',
        permission: PERMISSIONS.ViewCulture,
        icon: 'language'
    },
    {
        textToken: 'MENU.PRODUCT_CATEGORY',
        link: 'product-category',
        permission: PERMISSIONS.ViewProductCategory,
        icon: 'category'
    },
    {
        textToken: 'MENU.PRODUCT_TEMPLATE',
        link: 'product-template',
        permission: PERMISSIONS.ViewProductTemplate,
        icon: 'view_sidebar'
    },
    {
        textToken: 'MENU.PRODUCT',
        link: 'product',
        permission: PERMISSIONS.ViewProduct,
        icon: 'qr_code'
    },
    // {
    //     textToken: 'MENU.SUPPLIER_PRODUCT',
    //     link: 'supplier-product',
    //     permission: PERMISSIONS.ViewProduct,
    //     icon: 'qr_code'
    // },
    {
        textToken: 'MENU.INDIVIDUAL_PARTY',
        link: 'individual-party',
        permission: PERMISSIONS.ViewParty,
        icon: 'person'
    },
    {
        textToken: 'MENU.ORGANIZATION_PARTY',
        link: 'organization-party',
        permission: PERMISSIONS.ViewParty,
        icon: 'apartment'
    },
    {
        textToken: 'MENU.SYSTEM_SETTING',
        link: 'system-setting',
        permission: PERMISSIONS.AllowedTemporarily,
        icon: 'settings'
    },
]

export const HEADER_MENU_ITEMS: MenuItem[] = [
    {
        textToken: 'HEADER.HOME',
        link: '/',
        icon: 'home'
    },
    {
        textToken: 'HEADER.PRODUCTS',
        link: 'products',
        icon: 'qr_code'
    },
    {
        textToken: 'HEADER.MEDIA',
        link: 'media',
        icon: 'perm_media'
    },
    {
        textToken: 'HEADER.CONTACT_US',
        link: 'contact-us',
        icon: 'phone'
    },
    {
        textToken: 'HEADER.ABOOUT_US',
        link: 'about-us',
        icon: 'people_alt'
    },
    {
        textToken: 'HEADER.FAQ',
        link: 'faq',
        icon: 'help_outline'
    },
    {
        textToken: 'HEADER.CONDITIONS',
        link: 'conditions',
        icon: 'gavel'
    }
]
