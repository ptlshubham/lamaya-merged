import { Component, OnInit } from '@angular/core';
import { CustomerList } from './customerlist.model';
import { CustomerListService } from './customerlist.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  public CustomerListModel: CustomerList = new CustomerList;
  public customerlist: CustomerList[] = [];

  constructor(
    private customerListService: CustomerListService,
  ) { 
    this.getCustomerList();
  }

  ngOnInit(): void {
  }
  getCustomerList(){
    this.customerListService.getCustomer().subscribe((data: any) => {
      this.customerlist = data;

    });
  }
}
