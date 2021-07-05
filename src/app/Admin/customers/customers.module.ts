import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersRoutes } from './customers.routing';
import { RouterModule } from '@angular/router';
import { CustomerListService } from './customerlist/customerlist.service';



@NgModule({
  declarations: [CustomerlistComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(CustomersRoutes),
  ],
  providers: [
    CustomerListService
  ],
})
export class CustomersModule { }
