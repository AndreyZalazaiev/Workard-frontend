import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../../domain/employee';
import {Room} from '../../domain/room';
import {CompanyFormComponent} from '../company/company-form/company-form.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeFormComponent} from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  @Input('employees') employees: Employee[] = [];
  @Input('rooms') rooms: Room[] = [];
  @Input('idCompany') idCompany:number;
  selectedEmployee: Employee;

  headElements = ['Room','Entry time','Exit time'];


  constructor(private  dialog: MatDialog, private modalService: NgbModal) {
  }
  obtainRoomNameById(idRoom:number){
    return this.rooms.filter(r=>r.id==idRoom )[0].name;
  }

  ngOnInit(): void {

  }
  loadEmployees(){

  }

  createEmployee() {
    var dialog=this.dialog.open(EmployeeFormComponent);
    dialog.componentInstance.idCompany=this.idCompany;
    this.dialog.afterAllClosed.subscribe(data => this.loadEmployees());//not updating
  }
}
