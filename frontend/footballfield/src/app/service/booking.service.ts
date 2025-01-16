// src/app/service/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5102/api/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addBooking(booking: any): Observable<any> {
    return this.http.post(API_URL, booking);
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  updateBooking(id: number, booking: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
