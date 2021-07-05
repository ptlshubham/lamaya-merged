import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Reviews } from './reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  getReview(): Observable<Reviews[]>{
    
    return this.httpClient.get<any>(ApiService.getReviewsListURL);
  }
  updateRating(admin: Reviews): Observable<any>{
    
    return this.httpClient.post<any>(ApiService.updatereviewsURL, admin);
  }
  removeRating(id){
    
    return this.httpClient.get<any>(ApiService.removeReviewsURL+id);

  }

}


