import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Userorders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  saveStatus(admin: Userorders): Observable<any>{
    return this.httpClient.post<any>(ApiService.updateOrdersStatusURL, admin);
  }

  getOrders(data): Observable<Userorders[]>{
    
    return this.httpClient.post<any>(ApiService.getOrdersListURL,data);
  }
  acceptOrder(id){
    let data={
      id:id
    }
    return this.httpClient.post<any>(ApiService.acceptUserOrderURL, data);
  }
}
