import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReviewsService } from './reviews.service';



@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'reviews',
        component:ReviewsComponent
      }
    ])
  ],
  providers: [
    ReviewsService
  ],
})
export class ReviewsModule { }
