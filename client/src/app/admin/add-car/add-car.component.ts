import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CarCreate } from 'src/app/shared/models/carCreate';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbDate, NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit{
  errors: string[] | null = null;
  closeResult = '';
  addCar!: FormGroup;
  // selectedDate: NgbDate | null = null;
  carModalRef: NgbModalRef | null = null;
  carForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService : AdminService, private toastr: ToastrService,
    private modalService: NgbModal,private http: HttpClient){}

  ngOnInit() {
    this.addCar = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      model: ['', [Validators.required, Validators.pattern(/^(19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/)]],
      carMaker: ['', [Validators.required]],
      availabilityStatus: ['', [Validators.required,Validators.pattern(/^(true|false)$/i)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/.*\.(?:png|jpg|jpeg)/i)]],
      rentalPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  resetForm() {
    this.addCar.reset(); // Reset the form to its initial state
  }

  onSubmit(addCarForm: FormGroup) {
    if (addCarForm.valid) {
      // Create the Car object with the form inputs
      const car: CarCreate = {
        name: addCarForm.value.name,
        model: addCarForm.value.model,
        carMakerId: this.getCarMakerId(addCarForm.value.carMaker),
        availabilityStatus: addCarForm.value.availabilityStatus.toLowerCase() === 'true',
        imageUrl: this.trimUrl(addCarForm.value.imageUrl),
        rentalPrice: addCarForm.value.rentalPrice
      };

      // Call the service method to add the car
      this.adminService.addCar(car).subscribe(
        () => {
          this.toastr.success('Car added Successfully');
          // Refresh the page or perform any other necessary actions
          addCarForm.reset();
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    }

  }

  private getCarMakerId(makerName: string): number {
    switch (makerName) {
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
