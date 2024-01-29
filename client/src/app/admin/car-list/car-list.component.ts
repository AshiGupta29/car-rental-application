import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/shared/models/car';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { CarCreate } from 'src/app/shared/models/carCreate';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  @Input() car?: Car;

  errors: string[] | null = null;
  closeResult = '';
  carForm!: FormGroup;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.carForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        ],
      ],
      model: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/),
        ],
      ],
      carMaker: ['', [Validators.required]],
      availabilityStatus: [
        '',
        [Validators.required, Validators.pattern(/^(true|false)$/i)],
      ],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern(/.*\.(?:png|jpg|jpeg)/i)],
      ],
      rentalPrice: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe(
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

  onSubmit(id: number, carForm: FormGroup) {
    if (carForm.valid) {
      // Ensure that availabilityStatus is treated as a string and convert it to lowercase
      const availabilityStatus: string = carForm.value.availabilityStatus
        .toString()
        .toLowerCase();

      // Create the car object with the form inputs
      const carCreate: CarCreate = {
        name: carForm.value.name,
        model: carForm.value.model,
        carMakerId: this.getCarMakerId(carForm.value.carMaker),
        availabilityStatus: availabilityStatus === 'true',
        imageUrl: this.trimUrl(carForm.value.imageUrl),
        rentalPrice: carForm.value.rentalPrice,
      };

      this.adminService.UpdateCar(id, carCreate).subscribe(
        (response) => {
          this.toastr.success('Car updated Successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    }
  }

  open(content: any) {
    this.carForm.patchValue({
      name: this.car?.name,
      model: this.car?.model,
      carMaker: this.car?.carMaker,
      imageUrl: this.car?.imageUrl,
      rentalPrice: this.car?.rentalPrice,
      availabilityStatus: this.car?.availabilityStatus,
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

  private getCarMakerId(carName: string): number {
    switch (carName) {
      case 'Maruti Suzuki':
        return 1;
      case 'Honda':
        return 2;
      case 'Toyota':
        return 3;
      case 'Tata':
        return 4;
      case 'Hyundai':
        return 5;
      default:
        return 0;
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
