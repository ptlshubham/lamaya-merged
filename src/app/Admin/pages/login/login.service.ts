import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { AdminRegister } from '../register/register.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  login(credentials :AdminRegister): Observable<any> {
    
      const data = {
          email: credentials.email,
          password: credentials.password
      };
      return this.httpClient.post<any>(ApiService.saveAdminLoginURL, data);
  }
}
