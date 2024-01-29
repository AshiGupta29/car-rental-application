import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.bcService.set('@OrderDetailed', `Order# ${order.id}`);
        },
      });
  }

  returnCar(
    id: number,
    buyerEmail: string,
    orderdate: string,
    total: number,
    startDate: string,
    returnDate: string,
    isReturned: number,
    carId: number,
    carName: string,
    imageUrl: string,
    model: number,
    rentalPrice: number
  ) {
    const orderUpdate: Order = {
      id: id,
      buyerEmail: buyerEmail,
      orderdate: orderdate,
      total: total,
      startDate: startDate,
      returnDate: returnDate,
      isReturned: 2,
      carId: carId,
      carName: carName,
      imageUrl: this.trimUrl(imageUrl),
      model: model,
      rentalPrice: rentalPrice,
    };

    this.orderService.updateOrder(id, orderUpdate).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error adding car:', error);
      }
    );
  }

  public totalDays(startDate2: string,returnDate2: string) {
    const startDateStr = startDate2;
    const returnDateStr = returnDate2;

    // Parse the date strings as Date objects
    const startDate = new Date(startDateStr);
    const returnDate = new Date(returnDateStr);

    // Calculate the total days
    const totalDays = Math.floor(
      (returnDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return totalDays;
  }

  private trimUrl(url: string): string {
    const startIndex = url.indexOf('/', url.indexOf('//') + 2);
    if (startIndex !== -1) {
      return url.substring(startIndex + 1);
    }
    return url;
  }
}
