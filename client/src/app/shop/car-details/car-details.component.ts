import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models/car';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  car?: Car;
  quantityInBasket = 0;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    public accountService: AccountService,
  ) {
    this.bcService.set('@carDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getCar(+id).subscribe({
        next: (car) => {
          this.car = car;
          this.bcService.set('@carDetails', car.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.item;
            },
          });
        },
        error: (error) => console.log(error),
      });
  }
  
  addItem(car: Car) {
    this.basketService.addItemToBasket(car);
  }


  get buttonText() {
    return this.quantityInBasket == 0 ? 'Add to basket' : 'Update basket';
  }

  getUsernameFromEmail(email: string): string {
    const username = email.split('@')[0];
    return username;
  }
}
