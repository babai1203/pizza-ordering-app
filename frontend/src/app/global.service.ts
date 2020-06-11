import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  menu: any;
  url: string;
  order: any;
  order_no: string;
  user: string;
  cart: any;
  currency: string;
  currency_sub: BehaviorSubject<any>;
  cart_sub: BehaviorSubject<any>;
  constructor(
    private http: HttpClient
  ) {
    this.menu = {};
    this.url = environment.url;
    this.cart = window.sessionStorage.cart ? JSON.parse(window.sessionStorage.cart) : {"type":"cart","user":"","currency":"euro","items":[],"sub_total":0,"discount":0,"delivery_charge":0,"total_amount":0,"address":""};
    this.order = {};
    this.order_no = window.sessionStorage.order_no ? window.sessionStorage.order_no : '';
    this.currency_sub = new BehaviorSubject<any>('euro');
    this.cart_sub = new BehaviorSubject<any>(this.cart);
  }
  get_menu() {
    if(Object.keys(this.menu).length == 0) {
      if(window.sessionStorage.menu) {
        this.menu = JSON.parse(window.sessionStorage.menu);
        return this.menu;
      }
      this.http.get(this.url + 'menus').subscribe((response)=>{
        this.menu = response;
        window.sessionStorage.menu = JSON.stringify(response);
        return this.menu;
      },function(err){
        console.log(err);
        alert('Technical Error. Please try again.');
      });
    } else {
      return this.menu;
    }
  }
  set_order_no(value) {
    this.order_no = value;
  }
  async get_order() {
    if(Object.keys(this.order).length > 0) {
      this.set_cart(this.order);
    } else if(this.order_no) {
      this.http.get(this.url + 'orders/' + this.order_no).subscribe((response)=>{
        this.order = response;
        window.sessionStorage.order = JSON.stringify(response);
        this.set_cart(this.order);
      },function(err){
        console.log(err);
        alert('Technical Error. Please try again.');
      });
    } else {
      this.set_cart(this.cart);
    }
  }
  get_currency(): Observable<string> {
    return this.currency_sub.asObservable();
  }
  set_currency(str): void {
    this.currency_sub.next(str);
  }
  get_cart(): Observable<string> {
    return this.cart_sub.asObservable();
  }
  set_cart(obj): void {
    this.cart_sub.next(obj);
    window.sessionStorage.cart = JSON.stringify(obj);
  }
}
