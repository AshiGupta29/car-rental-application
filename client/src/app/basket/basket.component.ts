import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket } from '../shared/models/basket';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  dateSelectionForm!: FormGroup;
  constructor(
    public basketService: BasketService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.dateSelectionForm = this.fb.group({
      startDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

 

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) return;
    this.basketService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.toastr.success(
          'Order created successfully with order id ' + order.id
        );
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      },
    });
  }

  private getOrderToCreate(basket: Basket) {
    if (!basket.startDate || !basket.returnDate) {
      return null;
    }
    return {
      basketId: basket.id,
      startDate: basket.startDate,
      returnDate: basket.returnDate
    };
  }

  checkTotal(dateSelectionForm: FormGroup) {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket) {
      const startDateStr = dateSelectionForm.value.startDate;
      const returnDateStr = dateSelectionForm.value.returnDate;
  
      // Parse the date strings as Date objects
      const startDate = new Date(startDateStr);
      const returnDate = new Date(returnDateStr);
  
      // Calculate the total days
      const totalDays = Math.floor((returnDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
     

      // Update the basket in the service
      this.basketService.addItemBasket( startDateStr, returnDateStr, totalDays);
    }
  }
  
}
