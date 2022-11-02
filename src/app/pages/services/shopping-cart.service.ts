import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductI } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: ProductI[] = [];
  private cartSubject = new BehaviorSubject<ProductI[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalActions$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityActions$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartActions$(): Observable<ProductI[]> {
    return this.cartSubject.asObservable();
  }
  updateCart(product: ProductI): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcularTotal();
  }
  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }
  private addToCart(product: ProductI): void {
    const isProductInCart = this.products.find(({ id }) => id === product.id)
    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 })
    }
    this.cartSubject.next(this.products);
  }
  private quantityProducts(): void {
    const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
    console.log('quantity', quantity);
    this.quantitySubject.next(quantity);
  }
  private calcularTotal(): void {
    const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    this.totalSubject.next(total);
  }

}
