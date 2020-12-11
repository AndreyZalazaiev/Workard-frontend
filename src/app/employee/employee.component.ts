import {Component, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../domain/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  @Input('employees') employees: Employee[]=[];
  selectedEmployee:Employee;
  displayedColumns: string[] = ['id', 'idRoom', 'idEmployee', 'entryTime','exitTime'];
  constructor() {
  }

  ngOnInit(): void {
  }

  createEmployee(){

  }

}
