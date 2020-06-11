import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menu: Array<string>;
  items: any;
  active_tab: number;
  hover_tab: number;
  order: any;
  filtered_items: any;
  currency: string;
  orders: any;
  user: any;
  constructor(
    private router: Router,
    private global: GlobalService
  ) {
    this.items = global.get_menu();
    this.menu = Object.keys(this.items);
    this.active_tab = 0;
    this.hover_tab = -1;
    this.filtered_items = this.items[this.menu[this.active_tab]];
    global.get_order_history();
    global.get_cart_status();
    global.get_user_details();
  }

  ngOnInit(): void {
    this.global.get_currency().subscribe((str)=>{
      this.currency = str;
    });
    this.global.get_cart().subscribe((obj)=>{
      this.order = obj;
    });
    this.global.get_orders().subscribe((arr)=>{
      this.orders = arr;
    });
    this.global.get_user().subscribe((obj)=>{
      this.user = obj;
    });
  }

  currency_change() {
    this.order.items.forEach((a)=>{
      this.items['Pizza'].forEach((d)=>{
        if(d._id == a.item) a.price = d.price[this.currency];
      });
      this.items['Desserts'].forEach((d)=>{
        if(d._id == a.item) a.price = d.price[this.currency];
      });
    });
    this.order.currency = this.currency;
    this.global.set_currency(this.currency);
    this.calculate();
  }

  highlight(num) {
    this.hover_tab = num;
  }

  remove_highlight() {
    this.hover_tab = -1;
  }

  select_tab(num) {
    this.active_tab = num;
    this.filtered_items = this.items[this.menu[this.active_tab]];
  }

  get_quantity(id) {
    let num = 0;
    if(this.order.type == 'cart') {
      this.order.items.forEach((a)=>{
        if(a.item == id) {
          num = a.quantity;
        }
      });
    }
    return num;
  }

  add(item) {
    if(this.order.type == 'cart') {
      this.order.items.push({
        item: item._id,
        quantity: 1,
        price: item.price[this.currency]
      });
    }
    this.calculate();
  }

  sub_quantity(id) {
    this.order.items.forEach((a,i)=>{
      if(a.item == id) {
        if(a.quantity == 1) this.order.items.splice(i,1);
        else a.quantity--;
      }
    });
    this.calculate();
  }

  add_quantity(id) {
    this.order.items.forEach((a)=>{
      if(a.item == id) {
        a.quantity++;
      }
    });
    this.calculate();
  }

  go_to_orders() {
    this.router.navigate(['/menu/history']);
  }

  go_to_cart() {
    this.router.navigate(['/menu/cart']);
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

  go_to_login() {
    this.router.navigate(['/menu/user']);
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    window.sessionStorage.removeItem('orders');
    location.reload();
  }

}
