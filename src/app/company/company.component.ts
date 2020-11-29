import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {Company} from '../../domain/company';
import {Router} from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  idOfSelectedCompany:number;

  constructor(private companyService: CompanyService,private router:Router) {

  }
  findRooms(id){
    return this.companies.filter(c=> c.id==id)[0].rooms;
  }
  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => console.log(error));
  }

}
