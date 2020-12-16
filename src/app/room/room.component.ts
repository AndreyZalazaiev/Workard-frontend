import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Company} from '../../domain/company';
import {Room} from '../../domain/room';
import {HotSpot} from '../../domain/DTO/hotSpot';
import {EmployeeComponent} from '../employee/employee.component';
import {MatDialog} from '@angular/material/dialog';
import {RoomFormComponent} from './room-form/room-form.component';
import {RoomService} from '../service/room.service';
import {CompanyService} from '../service/company.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  rooms: Room[];
  hotSpots: HotSpot[];
  selectedCompany: Company;
  @ViewChild(EmployeeComponent) employeeComp: EmployeeComponent;
  @Output() refreshCompanyData = new EventEmitter<String>();

  constructor(private  dialog: MatDialog, private  roomService: RoomService, private companyService: CompanyService, private _snackBar: MatSnackBar) {
  }

  createRoomDialog(room: Room) {
    let dialogRef = this.dialog.open(RoomFormComponent);
    if (room != null) {
      dialogRef.componentInstance.room = room;
      dialogRef.componentInstance.title = 'Edit room';
    }
    dialogRef.componentInstance.idCompany = this.selectedCompany.id;
    this.dialog.afterAllClosed.subscribe(() => this.refreshCompanyData.emit('Refresh'));
  }

  delete(room) {
    this.roomService.deleteRoom(room).subscribe(() => {
      this.refreshCompanyData.emit('Delete');
    }, () => this.rooms = this.rooms.filter(r => r != room));
  }

  refresh(event) {
    this.refreshCompanyData.emit('Delete');
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

  generateRecom() {
    if (this.selectedCompany.recommendations.length == 0) {
      this.companyService.generateRecom(this.selectedCompany).subscribe(data => {
        if (data.length == 0) {
          this.openSnackBar('No data found');
        }
        this.selectedCompany.recommendations = data;
      });
    }
  }

  openSnackBar(text) {
    this._snackBar.open(text, '', {
      duration: 6000,
    });
  }
}
