import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5101/api/field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private http: HttpClient) { }

  getFields(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  addField(field: any): Observable<any> {
    return this.http.post(API_URL, field);
  }

  getFieldById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  updateField(id: number, field: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, field);
  }

  deleteField(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
