import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  // Phương thức để đăng xuất
  logout(): void {
    // Thực hiện hành động đăng xuất, như xóa token hoặc thông tin đăng nhập
    localStorage.removeItem('token'); // Hoặc sessionStorage.removeItem('token');
    
    // Chuyển hướng về trang đăng nhập
    this.router.navigate(['/login']); 
  }
}
