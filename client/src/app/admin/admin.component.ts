import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { Car } from '../shared/models/car';
import { Maker } from '../shared/models/maker';
import { ShopService } from '../shop/shop.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
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

  onCategorySelected(categoryId: number){
    this.shopParams.makerId = categoryId;
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
