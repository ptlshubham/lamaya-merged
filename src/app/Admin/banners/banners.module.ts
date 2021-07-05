import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebhomeComponent } from './webhome/webhome.component';
import { MobilehomeComponent } from './mobilehome/mobilehome.component';
import { BannersRoutes } from './banners.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannersService } from './banners.service';



@NgModule({
  declarations: [WebhomeComponent, MobilehomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(BannersRoutes),
  ],
  providers: [
    BannersService
  ],
})
export class BannersModule { }
