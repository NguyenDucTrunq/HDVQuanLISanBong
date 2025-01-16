import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const registerData = { username: this.username, password: this.password };

    this.authService.register(registerData).subscribe(
      (response) => {
        this.successMessage = response; // Hiển thị thông báo đăng ký thành công từ backend
        this.errorMessage = ''; // Xóa thông báo lỗi nếu có
      },
      (error) => {
        this.errorMessage = error.error; // Hiển thị thông báo lỗi từ backend
        this.successMessage = ''; // Xóa thông báo thành công nếu có
      }
    );
  }
}
