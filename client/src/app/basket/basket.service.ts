import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Car } from '../shared/models/car';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  setBasket(basket: Basket) {
    console.log("set",basket);
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        console.log("set:next",basket);
        this.calculateTotals();
      },
    });
  }



  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Car | BasketItem) {
    if (this.isCar(item)) item = this.mapCarItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.item = item;
    this.setBasket(basket);
  }

  addItemBasket(startDate: string, returnDate: string, totalDays: number) {
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.startDate = startDate; // Set startDate
    basket.returnDate = returnDate; // Set returnDate
    basket.totalDays = totalDays; // Set totalDays
    this.setBasket(basket);
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapCarItemToBasketItem(item: Car): BasketItem {
    return {
      id: item.id,
      carName: item.name,
      rentalPrice: item.rentalPrice,
      model: item.model,
      imageUrl: item.imageUrl,
      carMaker: item.carMaker,
    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const totalDays = basket.totalDays;
    const subtotal = basket.totalDays * basket.item.rentalPrice;
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal ,totalDays});
  }

  private isCar(item: Car | BasketItem): item is Car {
    return (item as Car).carMaker !== undefined;
  }

  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
}
