import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Company} from '../../domain/company';
import {Room} from '../../domain/room';
import {HotSpot} from '../../domain/DTO/hotSpot';
import {EmployeeComponent} from '../employee/employee.component';
import {MatDialog} from '@angular/material/dialog';
import {RoomFormComponent} from './room-form/room-form.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent  {
  rooms: Room[];
  hotSpots: HotSpot[];
  selectedCompany: Company;
  toggleStatus: boolean = false;
  @ViewChild(EmployeeComponent) employeeComp: EmployeeComponent;
  @Output() refreshCompanyData = new EventEmitter<String>();

  constructor(private  dialog: MatDialog) {
  }
  createRoomDialog() {
    let dialogRef = this.dialog.open(RoomFormComponent);
    dialogRef.componentInstance.idCompany = this.selectedCompany.id;
    this.dialog.afterAllClosed.subscribe(()=>this.refreshCompanyData.emit("Refresh"));

  }

  findHotSpotbyIdRoom(idRoom) {
    if (this.hotSpots) {
      for (let i = 0; i < this.hotSpots.length; i++) {
        if (this.hotSpots[i].idRoom == idRoom) {
          return this.hotSpots[i].employeesNow / this.hotSpots[i].recommendedValue * 100;
        }
      }
    }
    return 0;
  }

  toggleChanged() {
    if (!this.toggleStatus) {
      this.toggleStatus = true;
      this.employeeComp.employees = this.selectedCompany.employees;
    } else {
      this.toggleStatus = false;
      this.employeeComp.employees = [];
    }
  }
}
