import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'app/api.service';
import { Reviews } from './reviews.model';
import { ReviewsService } from './reviews.service';
declare var require: any
declare var $:any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  public ReviewsModel:Reviews =new Reviews;
  public rating: Reviews[] = [];
  public editrating: Reviews[]=[];
  model: Date;
  constructor(
    private reviewsService: ReviewsService,
    private apiservice:ApiService
    
  ) { 
    this.getReviewList();
  }

  ngOnInit(): void {
    this.model = new Date();
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }
  }

  getReviewList(){
    this.reviewsService.getReview().subscribe((data: any) => {
      this.rating = data;

    });
  }
  editReview(data){
     
    this.editrating = data;
  }
  updateRatings(data){
     
    this.reviewsService.updateRating(data).subscribe((req) => {
    })

  }
  removeReview(id){
    this.reviewsService.removeRating(id).subscribe((req) => {
      this.getReviewList();
    })
  }
}
