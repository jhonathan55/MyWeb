import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductI } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$!:Observable<ProductI[] > ;
  constructor(
    private http: HttpClient
  
  ) { }

  getAllProducts():Observable<ProductI[] | void> {
    
  this.products$ = this.http.get<ProductI[]>(environment.api_url + '/products');
  return this.products$;

  }
}
