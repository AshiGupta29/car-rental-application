import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Car } from '../shared/models/car';
import { ShopService } from './shop.service';
import {  Maker } from '../shared/models/maker';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;
  cars: Car[] = [];
  makers: Maker[]= [];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getCars();
    this.getMakers();
  }

  getCars(){
    this.shopService.getCars(this.shopParams).subscribe({
      next: response => {
        this.cars = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getMakers(){
    this.shopService.getMakers().subscribe({
      next: response => this.makers = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onMakerSelected(makerId: number){
    this.shopParams.makerId = makerId;
    this.shopParams.pageNumber = 1;
    this.getCars();
  }

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getCars();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getCars();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getCars();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getCars();
  }

}
