import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currency: string;
  order: any;
  constructor(
    private router: Router,
    private global: GlobalService,
    private location: Location
  ) {
    global.get_order();
  }

  ngOnInit(): void {
    this.global.get_currency().subscribe((str)=>{
      this.currency = str;
    });
    this.global.get_cart().subscribe((obj)=>{
      this.order = obj;
      console.log(this.order);
    });
  }

  back() {
    this.location.back();
  }

  stop(event) {
    event.stopPropagation();
  }

}
