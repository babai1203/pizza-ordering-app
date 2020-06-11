import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currency: string;
  order: any;
  menu: any;
  url: string;
  error: Boolean;
  user: any;
  constructor(
    private router: Router,
    private global: GlobalService,
    private location: Location,
    private http: HttpClient
  ) {
    this.error = false;
    this.url = environment.url;
    this.menu = global.get_menu();
    global.get_user_details();
  }

  ngOnInit(): void {
    this.global.get_currency().subscribe((str)=>{
      this.currency = str;
    });
    this.global.get_cart().subscribe((obj)=>{
      this.order = obj;
    });
    this.global.get_user().subscribe((obj)=>{
      this.user = obj;
    });
  }

  back() {
    this.global.set_cart(this.order);
    this.location.back();
  }

  stop(event) {
    event.stopPropagation();
  }

  get_name(item) {
    let str = '';
    this.menu['Pizza'].forEach((d)=>{
      if(d._id == item) str = d.title;
    });
    this.menu['Desserts'].forEach((d)=>{
      if(d._id == item) str = d.title;
    });
    return str;
  }

  sub_quantity(num) {
    if(this.order.items[num].quantity == 1) this.order.items.splice(num,1);
    else this.order.items[num].quantity--;
    this.calculate();
  }

  add_quantity(num) {
    this.order.items[num].quantity++;
    this.calculate();
  }

  currency_change() {
    this.order.items.forEach((a)=>{
      this.menu['Pizza'].forEach((d)=>{
        if(d._id == a.item) a.price = d.price[this.currency];
      });
      this.menu['Desserts'].forEach((d)=>{
        if(d._id == a.item) a.price = d.price[this.currency];
      });
    });
    this.order.currency = this.currency;
    this.global.set_currency(this.currency);
    this.calculate();
  }

  calculate() {
    this.order.sub_total = 0;
    this.order.discount = 0;
    this.order.delivery_charge = 10.00;
    this.order.total_amount = 0;
    this.order.items.forEach((a)=>{
      this.order.sub_total += a.price * a.quantity;
    });
    this.order.discount = this.order.sub_total * (10/100);
    this.order.total_amount = this.order.sub_total + this.order.delivery_charge - this.order.discount;
    this.order.sub_total = parseFloat(this.order.sub_total.toFixed(2));
    this.order.discount = parseFloat(this.order.discount.toFixed(2));
    this.order.total_amount = parseFloat(this.order.total_amount.toFixed(2));
    this.global.set_cart(this.order);
  }

  place_order() {
    if(this.user.id) this.order.user = this.user.id;
    if(this.order.user == '' || this.order.address == '') return this.error = true;
    this.error = false;
    this.http.post(this.url + 'orders', this.order).subscribe((response: any)=>{
      this.global.set_cart({"type":"cart","user":"","currency":"euro","items":[],"sub_total":0,"discount":0,"delivery_charge":0,"total_amount":0,"address":""});
      this.global.add_order_history(response.order_no);
      this.location.back();
    },function(err){
      console.log(err);
      alert('Technical Error. Please try again.');
    });
  }

}
