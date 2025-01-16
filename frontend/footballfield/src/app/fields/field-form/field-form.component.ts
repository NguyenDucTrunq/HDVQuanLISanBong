import { Component } from '@angular/core';
import { FieldService } from '../../service/field.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent {
  field: any = {
    name: '',
    location: '',
    pricePerHour: 0,
    isAvailable: ''
  };

  constructor(private fieldService: FieldService, private router: Router) {}

  onSubmit(): void {
    this.field.isAvailable = (this.field.isAvailable === 'true'); // Chuyển đổi thành boolean
  
    this.fieldService.addField(this.field).subscribe(() => {
      this.router.navigate(['/fields']); // Chuyển hướng về trang danh sách sân
    });
  }
  
}
