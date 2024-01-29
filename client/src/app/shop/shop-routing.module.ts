import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component: ShopComponent},
  {path:':id',component: CarDetailsComponent, data: {breadcrumb: {alias: 'carDetails'}}},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
