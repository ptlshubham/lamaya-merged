import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  getCustomer(): Observable<[]>{
     
    return this.httpClient.get<any>(ApiService.getCustomerListURL);
  }
//   updateRating(): Observable<any>{
//      
//     return this.httpClient.post<any>(ApiService.updatereviewsURL, admin);
//   }
  removeRating(id){
     
    return this.httpClient.get<any>(ApiService.removeReviewsURL+id);

  }

}


