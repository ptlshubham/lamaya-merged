import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { AdminRegister } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  
  saveAdmin(admin: AdminRegister): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveAdminRegisterURL, admin);
  }
}
