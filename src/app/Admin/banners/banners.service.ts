import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Webbanners } from './webhome/webhome.model';


@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  
  uploadImage(img): Observable<any>{
     
    return this.httpClient.post<any>(ApiService.uploadBannersImageURL, img);

  }
  saveWebBannersImage(admin: Webbanners): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.saveWebBannersURL, admin);
  }
  getWebBanners(): Observable<Webbanners[]>{
    return this.httpClient.get<any>(ApiService.getWebBannersURL);
  }
  removeWebBanners(id){
    let bnr={
      id:id
    }
    return this.httpClient.post<any>(ApiService.removeWebBannersURL,bnr);
  }
  saveMobileBannersImage(admin: Webbanners): Observable<any>{
     
    return this.httpClient.post<any>(ApiService.saveMobileBannersURL, admin);
  }
  getMobileBanners(): Observable<Webbanners[]>{
    return this.httpClient.get<any>(ApiService.getMobileBannersURL);
  }
  removeMobileBanners(id){
     
    let bnr={
      id:id
    }
    return this.httpClient.post<any>(ApiService.removeMobileBannersURL,bnr);
  }
  uploadMobileBannersImage(img): Observable<any>{
     
    return this.httpClient.post<any>(ApiService.uploadMobileImageURL, img);

  }
  activeDeavctiveBanners(admin: Webbanners): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.updateActiveStatusURL, admin);
  }
  activeDeavctiveWebBanners(admin: Webbanners): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.updateActiveWebStatusURL, admin);
  }
}


