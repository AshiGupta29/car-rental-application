import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarCreate } from '../shared/models/carCreate';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:5002/api/';

  constructor(private http: HttpClient) {}

  UpdateCar(id: number, car: CarCreate) {
    return this.http.put<CarCreate>(this.baseUrl + 'cars/' + id, car);
  }

  deleteCar(id: number) {
    return this.http.delete(this.baseUrl + 'cars/' + id);
  }

  addCar(carCreate: CarCreate) {
    return this.http.post<CarCreate>(this.baseUrl + 'cars', carCreate);
  }

}
