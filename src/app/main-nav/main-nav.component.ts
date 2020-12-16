import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Routes, RouterModule, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CompanyComponent} from '../company/company.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  getUserName(): string {
     let login =localStorage.getItem('username');
    return  (login==null)?"guest":login
  }
  getUserEmail():string{
    return localStorage.getItem('email');
  }
  clearAuthInfo(){
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
  switchLang(lang){
    localStorage.setItem('lang',lang);
    this.translate.use(lang);
  }

  constructor(private breakpointObserver: BreakpointObserver,private router:Router,public translate: TranslateService) {
  }

  ngOnInit(): void {
    let lang =localStorage.getItem('lang')
    if(lang.length>0){
      this.translate.use(lang);
    }
  }

}
