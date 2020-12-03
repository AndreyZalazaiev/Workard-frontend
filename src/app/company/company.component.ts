import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {Company} from '../../domain/company';
import {Router} from '@angular/router';
import {HotSpot} from '../../domain/DTO/hotSpot';
import {Room} from '../../domain/room';
import {RoomComponent} from '../room/room.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  companies: Company[];

  @ViewChild(RoomComponent) child:RoomComponent;

  constructor(private companyService: CompanyService, private router: Router) {

  }
  onCompanyClick(company){
    this.child.selectedCompany=company;
    this.getHotSpots(company.id);
    this.findRooms(company.id);

  }

  findRooms(idCompany) {
    this.child.rooms=this.companies.filter(c => c.id == idCompany)[0].rooms;
  }
  getHotSpots(idCompany: number) {
    this.companyService.getHotSpots(idCompany)
      .subscribe(data => {this.child.hotSpots = data;});
  }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => console.log(error));
  }

}
