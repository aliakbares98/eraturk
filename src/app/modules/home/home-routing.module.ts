import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroGuard } from 'src/app/core/guards/intro.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IntroGuard],
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
