import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct, Product } from '../models';

const API_URL = !environment.production ? '/assets/data' : '';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http.get<IProduct[]>(`${API_URL}/products.json`).pipe(
      delay(2000),
      map((response) =>
        response && response.length > 0
          ? response.map((res) => new Product(res))
          : []
      )
    );
  }

  public getProduct(upc: string) {
    // ToDo Need to add mock file by upc
    return this.http.get<IProduct>(`${API_URL}/product.json`).pipe(
      delay(2000),
      map((response) => new Product(response))
    );
  }
}
