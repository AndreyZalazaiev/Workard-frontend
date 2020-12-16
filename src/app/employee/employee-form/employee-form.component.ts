import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {CompanyComponent} from '../../company/company.component';
import {CompanyService} from '../../service/company.service';
import {Company} from '../../../domain/company';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../../domain/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  formGroup: FormGroup;
  selectedEmployee:Employee;
  idCompany: number;
  title: string = 'Create employee';

  constructor(private dialogRef: MatDialogRef<CompanyComponent>, private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      employeeName: new FormControl('', [Validators.required,Validators.maxLength(18)]),
      employeeRFID: new FormControl('', [Validators.required]),
      employeeOccupation: new FormControl('', [Validators.required,Validators.maxLength(12)])
    });
    if(this.selectedEmployee){
      this.formGroup.controls['employeeName'].setValue(this.selectedEmployee.name);
      this.formGroup.controls['employeeOccupation'].setValue(this.selectedEmployee.occupation);
      this.formGroup.controls['employeeRFID'].setValue(this.selectedEmployee.rfidtag);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createEmployee() {
    let e:Employee = new Employee();

    if (this.formGroup.valid) {
      if(this.selectedEmployee!=null)
      {
        e.id=this.selectedEmployee.id;
      }
      e.name=this.formGroup.controls['employeeName'].value;
      e.occupation=this.formGroup.controls['employeeOccupation'].value;
      e.rfidtag=this.formGroup.controls['employeeRFID'].value;
      e.idCompany=this.idCompany;
      console.log(e);

      this.employeeService.createEmployee(e).subscribe();
      this.closeDialog();
    }
  }
}
