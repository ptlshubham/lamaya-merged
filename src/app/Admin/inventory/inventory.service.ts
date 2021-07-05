import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Product } from 'app/Admin/category/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  getProduct(): Observable<Product[]>{
    return this.httpClient.get<any>(ApiService.getAdminProductListURL);
  }
  getSize(id){
    let data={
      id:id
    }
    return this.httpClient.post(ApiService.GetSizeListURL,data);

  }
  getFilterProduct(data){
    return this.httpClient.post<any>(ApiService.GetFilterProductsURL,data)
  }
  removeProduct(id) {

    return this.httpClient.get<any>(ApiService.removeProductListItemURL + id);
  }
  addToNewArrivals(data){
    return this.httpClient.post(ApiService.addToNewArrivalsURL,data);

  }
  addToBestProduct(data){
    return this.httpClient.post(ApiService.addToBestProductURL,data);

  }
  addTohotProduct(data){
    return this.httpClient.post(ApiService.addToHotProductURL,data);

  }
  addToSale(data){
    return this.httpClient.post(ApiService.addToOnSaleURL,data);

  }
}
