import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Car } from 'src/app/shared/models/car';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent {
  @Input() car?: Car;

  constructor(public accountService : AccountService,private toastr: ToastrService){}

  

}
