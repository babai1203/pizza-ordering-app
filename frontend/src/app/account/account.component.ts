import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  is_login: Boolean;
  name: string;
  email: string;
  password: string;
  error: Boolean;
  url: string;
  constructor(
    private router: Router,
    private global: GlobalService,
    private location: Location,
    private http: HttpClient
  ) {
    this.url = environment.url;
    this.is_login = true;
    this.name = '';
    this.email = '';
    this.password = '';
    this.error = false;
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  stop(event) {
    event.stopPropagation();
  }

  alter() {
    this.is_login = !this.is_login;
  }

  login() {
    if(this.email == '' || this.password == '') return this.error = true;
    this.error = false;
    this.http.post(this.url + 'auth/login', { 'email': this.email, 'password': this.password}).subscribe((response: any)=>{
      this.global.set_user(response);
      this.back();
    },function(err){
      console.log(err);
      alert('Technical Error. Please try again.');
    });
  }

  register() {
    if(this.name == '' || this.password == '' || this.email == '') return this.error = true;
    this.error = false;
    this.http.post(this.url + 'users/signup', { 'name': this.name, 'email': this.email, 'password': this.password}).subscribe((response: any)=>{
      this.global.set_user(response);
      this.back();
    },function(err){
      console.log(err);
      alert('Technical Error. Please try again.');
    });
  }

}
