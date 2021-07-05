import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Emi } from './emi.model';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  saveBankList(admin: Emi): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveBankListURL, admin);
  }
  getBankList(): Observable<Emi[]>{
    return this.httpClient.get<any>(ApiService.getBankListURL);
  }
  addEmiOption(data){
    return this.httpClient.post<any>(ApiService.saveEmioptionURL,data);
  }
  getRateOfIntrest(): Observable<Emi[]>{
    return this.httpClient.get<any>(ApiService.getROIListURL);
  }
  removeROIList(id){
    let data={
      id:id
    };
    return this.httpClient.post<any>(ApiService.removeROIListURL,data);
  }
}