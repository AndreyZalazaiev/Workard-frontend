import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {CompanyComponent} from '../../company/company.component';
import {Company} from '../../../domain/company';
import {Room} from '../../../domain/room';
import {RoomService} from '../../service/room.service';
import {Device} from '../../../domain/device';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  formGroup: FormGroup;
  deviceForm: FormGroup;
  idCompany: number;
  createdCompany: Company;
  room: Room;
  title: string = 'Create new room';

  constructor(private dialogRef: MatDialogRef<CompanyComponent>, private roomService: RoomService) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      roomName: new FormControl('', [Validators.required]),
      roomSize: new FormControl('', [Validators.required])
    });
    this.deviceForm = new FormGroup({
      deviceCode: new FormControl('')
    });
    this.formGroup.controls['roomName'].setValue(this.room.name);
    this.formGroup.controls['roomSize'].setValue(this.room.recommendedValue);
  }

  closeDialog() {
    this.dialogRef.close(this.createdCompany);
  }


  createRoom() {
    let r: Room = new Room();
    if (this.formGroup.valid) {
      r.name = this.formGroup.controls['roomName'].value;
      r.idCompany = this.idCompany;
      if (this.room) {
        r.id = this.room.id;
        r.devices = this.room.devices;
      }
      r.recommendedValue = this.formGroup.controls['roomSize'].value;
      console.log(r);
      this.roomService.createRoom(r).subscribe(() => this.closeDialog());

    }
  }

  pushDevice() {
    if (this.deviceForm.valid && !this.isAlreadyInList(this.deviceForm.controls['deviceCode'].value)) {
      let d: Device = new Device();
      d.deviceCode = this.deviceForm.controls['deviceCode'].value;
      d.idRoom = this.room.id;
      this.room.devices.push(d);

    }
  }

  deleteFromDevices(device) {
    this.room.devices = this.room.devices.filter(d => d.deviceCode != device.deviceCode);
  }

  isAlreadyInList(deviceCode): boolean {
    return this.room.devices.filter(d => d.deviceCode == deviceCode).length > 0;
  }

}
