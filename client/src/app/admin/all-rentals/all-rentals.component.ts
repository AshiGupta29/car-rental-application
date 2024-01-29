import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/orders/orders.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.scss'],
})
export class AllRentalsComponent implements OnInit {
  orders: Order[] = [];
  order?: Order;
  orderForm!: FormGroup;
  closeResult = '';

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.orderForm = this.fb.group({
      id: ['',Validators.required],
      buyerEmail: ['',[Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      orderdate: ['',[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      total: ['',Validators.required],
      startDate: ['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      returnDate: ['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      isReturned: ['',Validators.required],
      carId: ['',Validators.required],
      carName: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern(/.*\.(?:png|jpg|jpeg)/i)],
      ],
      model: ['', [
        Validators.required,
        Validators.pattern(/^(19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/),
      ]],
      rentalPrice: ['',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
    
  }

  getOrders() {
    this.orderService.getRentalsForAdmin().subscribe({
      next: (orders) => (this.orders = orders),
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      () => {
        this.toastr.success('Car deleted successfully');
        window.location.reload();
        // Handle any further actions or UI updates
      },
      (error: any) => {
        this.toastr.warning('Error deleting car:', error);
        // Handle the error
      }
    );
  }

  ApproveReturnRequest(id: number,buyerEmail: string,orderdate: string,total: number,startDate: string,returnDate: string,isReturned: number,carId: number,carName: string,imageUrl: string,model: number,rentalPrice: number){
    const orderUpdate: Order = {
      id: id,
      buyerEmail: buyerEmail,
      orderdate: orderdate,
      total: total,
      startDate: startDate,
      returnDate: returnDate,
      isReturned: 3,
      carId: carId,
      carName: carName,
      imageUrl: this.trimUrl(imageUrl),
      model: model,
      rentalPrice: rentalPrice
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


  onSubmit( orderForm: FormGroup) {
    if (orderForm.valid) {
      // Create the car object with the form inputs
      const orderUpdate: Order = {
        id: parseFloat(orderForm.value.id),
        buyerEmail: orderForm.value.buyerEmail,
        orderdate: orderForm.value.orderdate,
        total: parseFloat(orderForm.value.total),
        startDate: orderForm.value.startDate,
        returnDate: orderForm.value.returnDate,
        isReturned: orderForm.value.isReturned,
        carId: parseFloat(orderForm.value.carId),
        carName: orderForm.value.carName,
        imageUrl: this.trimUrl(orderForm.value.imageUrl),
        model: parseFloat(orderForm.value.model),
        rentalPrice: parseFloat(orderForm.value.rentalPrice)
      };
      console.log("admin",orderUpdate);

      this.orderService.updateOrder(orderForm.value.id, orderUpdate).subscribe(
        (response) => {
          this.toastr.success('Agreement updated Successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    }
  }

  open(content: any,order: Order) {
    this.orderForm.patchValue({
      id: order.id,
      buyerEmail: order.buyerEmail,
      orderdate: this.formatDate(order.orderdate),
      total: order.total,
      startDate: this.formatDate(order.startDate),
      returnDate: this.formatDate(order.returnDate),
      isReturned : this.getIdReturnStatus(order.isReturned),
      carId: order.carId,
      carName: order.carName,
      imageUrl: order.imageUrl,
      model: order.model,
      rentalPrice: order.rentalPrice,
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private formatDate(inputDate: string) {
    const dateObject = new Date(inputDate);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
    return `${year}-${month}-${day}`;
  }

  
  private getIdReturnStatus(id: number): string {
    switch (id) {
      case 1:
        return 'Return not requested';
      case 2:
        return 'Return requested but not approved';
      case 3:
        return 'Return Approved';
      default:
        return 'none';
    }
  }

  private trimUrl(url: string): string {
    const startIndex = url.indexOf('/', url.indexOf('//') + 2);
    if (startIndex !== -1) {
      return url.substring(startIndex + 1);
    }
    return url;
  }
}
