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
    global.get_order().then((response)=>{
      this.order = response;
    });
  }

  ngOnInit(): void {
    this.global.get_currency().subscribe((str)=>{
      this.currency = str;
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

}
