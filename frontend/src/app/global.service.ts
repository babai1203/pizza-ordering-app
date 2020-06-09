import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  toppings: Array<any>;
  constructor() {
    this.toppings = [{"name":"Roast Beef","price":13},{"name":"Bell Peppers","price":12},{"name":"Mushrooms","price":12},{"name":"Onions","price":14},{"name":"Tomatoes","price":14},{"name":"Marinara","price":11}];
  }
  get_toppings() {
    return this.toppings;
  }
}
