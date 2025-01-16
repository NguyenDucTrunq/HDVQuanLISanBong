import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Lưu ý sửa thành 'styleUrls' (số nhiều) thay vì 'styleUrl'
})
export class AppComponent {
  title = 'footballfield';
  showHeader: boolean = true;

  constructor(private router: Router) {
    // Lắng nghe sự thay đổi của route và kiểm tra nếu là trang login hoặc booking thì ẩn header
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute(): void {
    // Kiểm tra nếu đường dẫn là /login hoặc /booking thì ẩn header
    const currentRoute = this.router.url;
    this.showHeader = !(currentRoute === '/login' || currentRoute === '/booking' || currentRoute === '/register');
  }
}
