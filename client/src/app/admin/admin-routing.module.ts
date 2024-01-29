import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarListComponent } from './car-list/car-list.component';
import { AllRentalsComponent } from './all-rentals/all-rentals.component';

const routes: Routes = [
  {path:'',component: AdminComponent},
  {path:'Add-Car',component: AddCarComponent, data: {breadcrumb: {alias: 'Add Car'}}},
  {path:'Car-List', component: CarListComponent},
  {path:'All-Rentals', component: AllRentalsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
