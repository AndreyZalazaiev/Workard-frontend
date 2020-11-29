import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  erorInLoginFlag = false;

  constructor(private authService: AuthService, private  router:Router) {

  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        data => {
          localStorage.setItem('token', data);
          this.toMainPage();
          this.obtainUserData();
        },
        error => {
          this.erorInLoginFlag = true;
          console.log(error);
        });
    }
  }

toMainPage(){
  this.router.navigateByUrl("/");
}
  obtainUserData() {
    this.authService.obtainProfile().subscribe(
      data => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
      },
      error => console.log(error));
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


}
