import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth-service';
import {Router} from '@angular/router';
import {User} from '../../domain/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private authService: AuthService, private  router:Router,private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  registerUser(){
    if(this.formGroup.valid) {
      let u = new User();
      u.username=this.formGroup.controls['username'].value;
      u.email=this.formGroup.controls['email'].value;
      u.password=this.formGroup.controls['password'].value;
      this.authService.register(u).subscribe(data=> data!=null?this.openSnackBar('Registered!'):this.openSnackBar('Already registered!'));
      this.router.navigateByUrl("/login");
    }
  }
  openSnackBar(text) {
    this._snackBar.open(text, '', {
      duration: 2000,
    });
  }

}
