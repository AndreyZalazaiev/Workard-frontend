import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Company} from '../../domain/company';
import {Room} from '../../domain/room';
import {HotSpot} from '../../domain/DTO/hotSpot';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  rooms:Room[];
  hotSpots: HotSpot[];
  selectedCompany:Company;

  constructor() { }

  ngOnInit(): void {
  }
  findHotSpotbyIdRoom(idRoom){
    if(this.hotSpots)
    for(let i=0;i<this.hotSpots.length;i++){
      if(this.hotSpots[i].idRoom==idRoom){
        return this.hotSpots[i].employeesNow/this.hotSpots[i].recommendedValue*100;
      }
    }
    return 0;
  }

}
