import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
//get data
quantity$ = this.shoppingCartSvc.quantityActions$;
total$= this.shoppingCartSvc.totalActions$;
cart$ = this.shoppingCartSvc.cartActions$;

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private route:Router
  ) { }

  ngOnInit(): void {
  }
  onCheckout(): void {
    this.route.navigate(['/checkout']);
  }

}
