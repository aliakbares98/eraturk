
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutherizationGuard } from './core/guards';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { ProfileLayoutComponent } from './layouts/profile/profile-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'product-details/:id',
        loadChildren: () => import('./modules/product-details/product-details.module').then(m => m.ProductDetailsModule),

      },
      {
        path: 'content-details/video/:id',
        loadChildren: () => import('./modules/video-details/video-details.module').then(m => m.VideoDetailsModule)
      },
      {
        path: 'content-details/image/:id',
        loadChildren: () => import('./modules/image-detail/image-detail.module').then(m => m.ImageDetailModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./modules/media/media.module').then(m => m.MediaModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./modules/contact-us/contact-us.module').then(m => m.ContactUsModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: 'conditions',
        loadChildren: () => import('./modules/conditions/conditions.module').then(m => m.ConditionsModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('./modules/privacy/privacy.module').then(m => m.PrivacyModule)
      },
      {
        path: 'not-available',
        loadChildren: () => import('./modules/not-available/not-available.module').then(m => m.NotAvailableModule)
      },
    ]
  },
  {
    path: 'profile',
    component: ProfileLayoutComponent,
    canActivate: [AutherizationGuard],
    children: [
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full'
      },

      {
        path: 'personal-info',
        loadChildren: () => import('./modules/personal-info/personal-info.module').then(m => m.PersonalInfoModule)
      },
      {
        path: 'messaging',
        loadChildren: () => import('./modules/messaging/messaging.module').then(m => m.MessagingModule),
      },
      {
        path: 'save',
        loadChildren: () => import('./modules/saved-items/saved-items.module').then(m => m.SavedItemsModule),
      },
      {
        path: 'document-type',
        loadChildren: () => import('./modules/document-type/document-type.module').then(m => m.DocumentTypeModule),
      },
      {
        path: 'culture',
        loadChildren: () => import('./modules/culture/culture.module').then(m => m.CultureModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./modules/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'supplier-product',
        loadChildren: () => import('./modules/supplier-product/supplier-product.module').then(m => m.SupplierProductModule)
      },
      {
        path: 'product-template',
        loadChildren: () => import('./modules/product-template/product-template.module').then(m => m.ProductTemplateModule)
      },
      {
        path: 'individual-party',
        loadChildren: () => import('./modules/individual-party/individual-party.module').then(m => m.IndividualPartyModule)
      },
      {
        path: 'organization-party',
        loadChildren: () => import('./modules/organization-party/organization-party.module').then(m => m.OrganizationPartyModule)
      },
      {
        path: 'system-setting',
        loadChildren: () => import('./modules/system-setting/system-setting.module').then(m => m.SystemSettingModule)
      },
    ]
  },
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./modules/intro/intro.module').then(m => m.IntroModule)
  },
  {
    path: '**',
    loadChildren: () => import('../app/modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
