import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FiltersComponent } from './filters/filters.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'menu',
    component: HomeComponent,
    children:  [
      {
        path: 'filters',
        component: FiltersComponent
      },
      {
        path: 'order',
        component: OrderComponent
      }
    ]
  },
  {
    path: 'details',
    component: ItemDetailsComponent,
    children:  [
      {
        path: 'order',
        component: OrderComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
