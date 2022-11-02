import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductService } from '../services/product.service';
import { ProductI } from '../interfaces/product-interface';
import { Observable, of } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  public colSize = 3;
  public rowHeight = '2:3';
  products$:Observable<ProductI[]>;
  
  contacFrm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    phone: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductService,
    private shoppingCartSvc: ShoppingCartService,
  ) { }

 

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(): void {
    this.productSvc.getAllProducts().subscribe((products:ProductI[]) => {
      this.products$ =of(products);
    });
  }

  comprar(product:ProductI): void {
   this.shoppingCartSvc.updateCart(product);
  }

  //validación de form
  isValidField(field: string): string {
    const validatedField = this.contacFrm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  sendMessage(): void {
    console.log(this.contacFrm.value);
  }
}
