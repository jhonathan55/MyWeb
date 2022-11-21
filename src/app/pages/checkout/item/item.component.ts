import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { ProductI } from '../../interfaces/product-interface';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  total$ = this.shoppingCartSvc.totalActions$;
  card$ = this.shoppingCartSvc.cartActions$;
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'price', 'qty','total','actions'];
  constructor(
    private shoppingCartSvc: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    
    this.getProduct();
  }
  getProduct(): void {
    this.shoppingCartSvc.cartActions$.subscribe((products:ProductI[]) => {
      this.dataSource = new MatTableDataSource<ProductI>(products);
    });
  }
  onEdit(item: any): void {
    console.log('Edit item', item);
  }
  onDelete(item: any): void {
    console.log('Delete item', item);
  }
}
