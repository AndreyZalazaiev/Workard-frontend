import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Routes, RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  getUserName(): string {
    return localStorage.getItem('username')
  }
  getUserEmail():string{
    return localStorage.getItem('email');
  }
  clearAuthInfo(){
    this.router.navigateByUrl("/login");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }


  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {
  }

  ngOnInit(): void {
  }

}
