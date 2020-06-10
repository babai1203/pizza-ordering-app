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
  constructor(
    private router: Router,
    private global: GlobalService
  ) {
    this.items = global.get_menu();
    this.menu = Object.keys(this.items);
    this.active_tab = 0;
    this.hover_tab = -1;
    this.filtered_items = this.items[this.menu[this.active_tab]];
    global.get_order();
  }

  ngOnInit(): void {
    this.global.get_currency().subscribe((str)=>{
      this.currency = str;
    });
    this.global.get_cart().subscribe((obj)=>{
      this.order = obj;
    });
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
        price: {
          currency: this.currency,
          value: item.price[this.currency]
        }
      });
    }
    this.global.set_cart(this.order);
  }

  sub_quantity(id) {
    this.order.items.forEach((a,i)=>{
      if(a.item == id) {
        if(a.quantity == 1) this.order.items.splice(i,1);
        else a.quantity--;
      }
    });
    this.global.set_cart(this.order);
  }

  add_quantity(id) {
    this.order.items.forEach((a)=>{
      if(a.item == id) {
        a.quantity++;
      }
    });
    this.global.set_cart(this.order);
  }

  go_to_orders() {
    this.router.navigate(['/menu/order']);
  }

}
