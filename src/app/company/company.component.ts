import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {Company} from '../../domain/company';
import {Router} from '@angular/router';
import {RoomComponent} from '../room/room.component';
import {MatDialog} from '@angular/material/dialog';
import {CompanyFormComponent} from './company-form/company-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[];

  @ViewChild(RoomComponent) roomComponent: RoomComponent;

  constructor(private companyService: CompanyService, private router: Router, private  dialog: MatDialog, private modalService: NgbModal) {
  }

  openDialog() {
    this.dialog.open(CompanyFormComponent);
    this.dialog.afterAllClosed.subscribe(data => this.loadCompanies());
  }
  updateDialog(idCompany) {
   let dialogRef = this.dialog.open(CompanyFormComponent);
    dialogRef.componentInstance.idCompany = idCompany;
    dialogRef.componentInstance.title="Update info";

    this.dialog.afterAllClosed.subscribe(data => this.loadCompanies());
  }

  onCompanyClick(company) {
    this.roomComponent.selectedCompany = company;
    this.getHotSpots(company.id);
    this.findRooms(company.id);

  }
  loadCompanies() {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => console.log(error));
  }

  findRooms(idCompany:number) {
    this.roomComponent.rooms = this.companies.filter(c => c.id == idCompany)[0].rooms;
  }

  delete(Company:Company) {
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed ) {
          this.companyService.deleteCompany(Company).subscribe(data => console.log(data));
          this.companies = this.companies.filter(c => c.id != Company.id);
          this.roomComponent.selectedCompany=this.companies[0];
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }

  getHotSpots(idCompany: number) {
    this.companyService.getHotSpots(idCompany)
      .subscribe(data => {
        this.roomComponent.hotSpots = data;
      });
  }

  refresh(content) {
    console.log("Invokation in company")
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
      this.findRooms(this.roomComponent.selectedCompany.id);
      this.roomComponent.selectedCompany=this.companies.filter(c=>c.id==this.roomComponent.selectedCompany.id)[0]
    });

  }

  ngOnInit(): void {
    this.loadCompanies();
    console.log("Loading companies");
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
