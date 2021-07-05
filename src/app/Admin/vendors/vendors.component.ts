import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  isAdd: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  addVendors() {
     
    this.isAdd = true;
  }
  saveVendor(){
    this.isAdd =false;
  }

}
