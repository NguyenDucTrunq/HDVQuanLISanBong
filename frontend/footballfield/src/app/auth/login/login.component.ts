import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = ''; // Đảm bảo khai báo biến password
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    console.log(this.username);
    console.log(this.password);

    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        // Lưu token vào localStorage khi đăng nhập thành công
        this.authService.saveToken(response.token);
        this.authService.saveRole(response.role);
        if(this.authService.getRole() == 'ADMIN') {
          this.router.navigate(['/fields']);
        }
        else {
          this.router.navigate(['/booking']);
        }

        // Chuyển hướng đến trang "Đặt sân"
        
      },
      (error) => {
        this.errorMessage = 'Đăng nhập thất bại. Kiểm tra lại thông tin đăng nhập.';
      }
    );
    
  }
  register(): void {
    // Chuyển hướng đến trang đăng ký
    this.router.navigate(['/register']);
  }
}
