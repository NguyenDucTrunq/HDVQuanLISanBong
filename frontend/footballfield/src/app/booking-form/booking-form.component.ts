// src/app/components/booking-form/booking-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FieldService } from '../service/field.service';
import { BookingService } from '../service/booking.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  booking: any = {
    userId: 1,  // Giả sử người dùng có ID là 1
    fieldId: 0,
    startTime: '',
    endTime: '',
    name: '',
    location: '',
    pricePerHour: 0,
    isAvailable: true
  };

  fields: any[] = [];  // Danh sách sân có sẵn hoặc tất cả các sân

  constructor(
    private fieldService: FieldService,
    private bookingService: BookingService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    // Lấy danh sách sân từ API
    this.fieldService.getFields().subscribe((fields) => {
      this.fields = fields;
    });
  }

  onSubmit(): void {
    this.bookingService.addBooking(this.booking).subscribe(
      () => {
        alert('Đặt sân thành công!');
        this.cdRef.detectChanges(); // Cập nhật lại giao diện
      },
      (error) => {
        alert('Có lỗi xảy ra khi đặt sân!');
      }
    );
  }
  // Xử lý đăng xuất
  onLogout(): void {
    this.authService.logout  // Đăng xuất
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }

  
}
