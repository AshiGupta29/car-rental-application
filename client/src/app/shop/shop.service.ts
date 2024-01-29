import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../shared/models/pagination';
import { Car } from '../shared/models/car';
import { Maker } from '../shared/models/maker';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:5002/api/'

  constructor(private http: HttpClient) { }

  getCars(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.makerId > 0) params = params.append('makerId', shopParams.makerId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if(shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination<Car[]>>(this.baseUrl + 'cars', {params});
  }

  getCar(id: number){
    return this.http.get<Car>(this.baseUrl + 'cars/' + id);
  }

  getMakers() {
    return this.http.get<Maker[]>(this.baseUrl + 'cars/makers');
    
  }
}
