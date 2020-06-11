import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: any;
  constructor(
    private global: GlobalService,
    private location: Location
  ) {
    this.orders = [];
    global.get_order_history();
  }

  async ngOnInit() {
    this.global.get_orders().subscribe((arr)=>{
      this.orders = arr;
    });
  }

  back() {
    this.location.back();
  }

  stop(event) {
    event.stopPropagation();
  }

}
