import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { environment } from 'src/enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }
  getRentalsForAdmin() {
    return this.http.get<Order[]>(this.baseUrl + 'rentals');
  }
  getOrderDetailed(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }

  updateOrder(id: number,  orderToUpdate: Order){
    return this.http.put<Order>(this.baseUrl + 'orders/' + id,orderToUpdate);
  }

  deleteOrder(id: number) {
    return this.http.delete(this.baseUrl + 'rentals/' + id);
  }

}