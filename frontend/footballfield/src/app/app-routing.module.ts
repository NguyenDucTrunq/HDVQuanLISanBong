import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FieldListComponent } from './fields/field-list/field-list.component';
import { FieldFormComponent } from './fields/field-form/field-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RegisterComponent } from './register/register.component';

import path from 'path';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fields', component: FieldListComponent },
  { path: 'fields/add', component: FieldFormComponent },
  { path: 'booking', component: BookingFormComponent},
  { path: 'booking-list', component: BookingListComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
