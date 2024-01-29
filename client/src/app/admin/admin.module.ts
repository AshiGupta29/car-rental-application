import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddCarComponent } from './add-car/add-car.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { AllRentalsComponent } from './all-rentals/all-rentals.component';



@NgModule({
  declarations: [
    AdminComponent,
    AddCarComponent,
    CarListComponent,
    AllRentalsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
