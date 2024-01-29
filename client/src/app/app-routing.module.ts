import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CarDetailsComponent } from './shop/car-details/car-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/Auth.guard';
import { AllRentalsComponent } from './admin/all-rentals/all-rentals.component';

const routes: Routes = [
  {path:'',component: ShopComponent, data: {breadcrumb: 'Home'}},
  {path:'shop/:id',component: CarDetailsComponent,data: {breadcrumb: {alias: 'carDetails'}}},
  {path:'test-error', component: TestErrorComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {
    path: 'orders', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: 'admin/car-list', component: AddCarComponent},
  {path: 'admin/add-car', component: AddCarComponent},
  {path: 'admin/all-rentals', component:AllRentalsComponent},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path:'**',redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
