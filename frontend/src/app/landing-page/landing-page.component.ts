import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  menu: any;
  constructor(
    private router: Router,
    private global: GlobalService
  ) {
    global.get_menu();
  }

  ngOnInit(): void {
  }

  order_now() {
    this.router.navigate(['/menu']);
  }

}
