import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5100/api/users'; 

  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // Hàm lưu token vào localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Hàm lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Hàm lưu token vào localStorage
  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  // Hàm lấy token từ localStorage
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Hàm kiểm tra người dùng đã đăng nhập hay chưa
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData, { responseType: 'text' });
  }
  

  // Tạo header chứa token
  // getAuthHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  // }

  // Hàm đăng xuất
  // Đăng xuất
  logout(): void {
    localStorage.removeItem(this.tokenKey);  // Xóa token
  }
}