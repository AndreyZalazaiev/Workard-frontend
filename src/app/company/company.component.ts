import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../service/company.service';
import {Company} from '../../domain/company';
import {Router} from '@angular/router';
import {RoomComponent} from '../room/room.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthComponent} from '../auth/auth.component';
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

  @ViewChild(RoomComponent) child: RoomComponent;

  constructor(private companyService: CompanyService, private router: Router, private  dialog: MatDialog, private modalService: NgbModal) {

  }

  openDialog() {
    this.dialog.open(CompanyFormComponent);
    this.dialog.afterAllClosed.subscribe(data => this.loadCompanies());
  }

  onCompanyClick(company) {
    this.child.selectedCompany = company;
    this.getHotSpots(company.id);
    this.findRooms(company.id);

  }

  findRooms(idCompany) {
    this.child.rooms = this.companies.filter(c => c.id == idCompany)[0].rooms;
  }

  delete(Company) {
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.companyService.deleteCompany(Company).subscribe();
          this.companies = this.companies.filter(c => c.id != Company.id);
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }

  getHotSpots(idCompany: number) {
    this.companyService.getHotSpots(idCompany)
      .subscribe(data => {
        this.child.hotSpots = data;
      });
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => console.log(error));
  }

  ngOnInit(): void {
    this.loadCompanies();
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
