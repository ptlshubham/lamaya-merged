import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
declare var require: any
declare var $:any;
@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  model: Date;
  completedOrders:any;
  constructor(
    private ordersService: OrdersService
  ) {
    this.getCompletedOrders();
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
  requestReview(){
    
  }
  getCompletedOrders(){
      let data={
      status:'Completed'
    }
      this.ordersService.getOrders(data).subscribe((data: any) => {
        this.completedOrders = data;
      });
    }
}
