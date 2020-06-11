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
  orders: any;
  user: string;
  cart: any;
  currency: string;
  currency_sub: BehaviorSubject<any>;
  cart_sub: BehaviorSubject<any>;
  order_sub: BehaviorSubject<any>;
  constructor(
    private http: HttpClient
  ) {
    this.menu = {};
    this.url = environment.url;
    this.cart = window.sessionStorage.cart ? JSON.parse(window.sessionStorage.cart) : {"type":"cart","user":"","currency":"euro","items":[],"sub_total":0,"discount":0,"delivery_charge":0,"total_amount":0,"address":""};
    this.orders = window.sessionStorage.orders ? JSON.parse(window.sessionStorage.orders) : [];
    this.currency_sub = new BehaviorSubject<any>('euro');
    this.cart_sub = new BehaviorSubject<any>(this.cart);
    this.order_sub = new BehaviorSubject<any>(this.orders);
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
  async get_cart_status() {
    this.set_cart(this.cart);
  }
  async get_order_history() {
    this.set_orders(this.orders);
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
  get_orders(): Observable<string> {
    return this.order_sub.asObservable();
  }
  set_orders(arr): void {
    this.order_sub.next(arr);
    window.sessionStorage.orders = JSON.stringify(arr);
  }
  async add_order_history(order_no) {
    let response;
    try {
      response = await this.http.get(this.url + 'orders/' + order_no).toPromise();
      this.orders.push(response);
      window.sessionStorage.orders = JSON.stringify(this.orders);
    } catch(e) {
      console.log(e);
      alert('Technical Error. Please try again.');
    }
  }
}
