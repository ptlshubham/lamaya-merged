import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersRoutes } from './orders.routing';
import { PendingComponent } from './pending/pending.component';
import { CompleteComponent } from './complete/complete.component';
import { RunningComponent } from './running/running.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CurrentComponent } from './current/current.component';



@NgModule({
  declarations: [
    CurrentComponent,
    PendingComponent,
    CompleteComponent,
    RunningComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(OrdersRoutes),
  ]
})
export class OrdersModule { }
