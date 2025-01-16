import { Component, OnInit } from '@angular/core';
import { FieldService } from '../../service/field.service';  // Adjust the path if needed
import { Field } from '../../models/field.model';  // Adjust the path if needed

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {
  fields: Field[] = [];

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {
    this.fieldService.getFields().subscribe((data: Field[]) => {
      this.fields = data;
    });
  }
}
