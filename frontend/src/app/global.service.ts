import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  menu: any;
  url: string;
  orders: any;
  user: any;
  cart: any;
  currency: string;
  currency_sub: BehaviorSubject<any>;
  cart_sub: BehaviorSubject<any>;
  order_sub: BehaviorSubject<any>;
  user_sub: BehaviorSubject<any>;
  token: any;
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
    this.user = window.sessionStorage.user ? JSON.parse(window.sessionStorage.user) : {};
    this.user_sub = new BehaviorSubject<any>(this.user);
  }
  get_menu() {
    if(Object.keys(this.menu).length == 0) {
      if(window.sessionStorage.menu) {
        this.menu = JSON.parse(window.sessionStorage.menu);
        return this.menu;
      }
      this.http.get(this.url + 'menus').subscribe((response: any)=>{
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
  get_user_details() {
    if(Object.keys(this.user).length > 0) {
      this.set_user(this.user);
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
  get_user(): Observable<string> {
    return this.user_sub.asObservable();
  }
  set_user(obj): void {
    this.user = obj;
    window.sessionStorage.user = JSON.stringify(obj);
    window.sessionStorage.removeItem('orders');
    this.add_order_history('abc');
    this.user_sub.next(obj);
  }
  async add_order_history(str) {
    if(this.user.id) {
      let headers = new HttpHeaders();
      headers = headers.set('token', this.user.token);
      let response;
      try {
        response = await this.http.get(this.url + 'orders/history', { headers: headers }).toPromise();
        this.orders = response.reverse();
        window.sessionStorage.orders = JSON.stringify(this.orders);
        this.set_orders(this.orders);
      } catch(e) {
        console.log(e);
        alert('Technical Error. Please try again.');
      }
    } else {
      let response;
      try {
        response = await this.http.get(this.url + 'orders/' + str).toPromise();
        this.orders.unshift(response);
        window.sessionStorage.orders = JSON.stringify(this.orders);
        this.set_orders(this.orders);
      } catch(e) {
        console.log(e);
        alert('Technical Error. Please try again.');
      }
    }
  }
}
