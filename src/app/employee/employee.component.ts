import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../../domain/employee';
import {Room} from '../../domain/room';
import {CompanyFormComponent} from '../company/company-form/company-form.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {EmployeeService} from '../service/employee.service';

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


  constructor(private  dialog: MatDialog, private modalService: NgbModal, private  employeeService:EmployeeService) {
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
  updateEmployee(employee:Employee) {
    var dialog=this.dialog.open(EmployeeFormComponent);
    dialog.componentInstance.idCompany=this.idCompany;
    dialog.componentInstance.selectedEmployee=employee;
    dialog.componentInstance.title='Update employee';
    this.dialog.afterAllClosed.subscribe(data => this.loadEmployees());//not updating
  }
  deleteEmployee(employee:Employee){
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.employeeService.deleteEmployee(employee).subscribe(data => console.log(data));
          this.employees = this.employees.filter(c => c.id != employee.id);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {size: dialogSize});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
