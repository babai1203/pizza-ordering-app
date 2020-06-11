import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: any;
  constructor(
    private router: Router,
    private global: GlobalService,
    private location: Location,
    private http: HttpClient
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
