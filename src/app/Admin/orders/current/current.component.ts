import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrdersService } from '../orders.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// class Invoice {
//   customerName: string;
//   address: string;
//   contactNo: number;
//   email: string;
// }
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  currentOrders: any = [];
  Orderview:any={};
  // invoice = new Invoice();

  constructor(
    private ordersService: OrdersService,
  ) {
    this.getRecentOrders();
  }

  ngOnInit(): void {
  }
  getRecentOrders() {
    let data = {
      status: 'Pending'
    }
     
    this.ordersService.getOrders(data).subscribe((data: any) => {
      this.currentOrders = data;

    });
  }
  
  viewOrderDetails(data, ind) {
     
    this.Orderview = data;
    this.Orderview.userAdd = data.address+','+data.city+','+data.state+'-'+data.pincode;
     this.Orderview.index = ind + 1;
  }
  acceptOrders(id) {
     
    this.ordersService.acceptOrder(id).subscribe((data: any) => {
      this.getRecentOrders();
    })
  }
  rejectedOrders(data){

  }
  generateInvoicePDF(action = 'open') {
  
    let docDefinition = {
      content: [
        // {
        //   text: 'ELECTRONIC SHOP',
        //   fontSize: 16,
        //   alignment: 'center',
        //   color: '#047886'
        // },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },{},{},{},
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.Orderview.username,
                bold: true
              },
              { text:'Delivery Address:'+ this.Orderview.userAdd },
              { text: 'Contact No:'+this.Orderview.contactnumber },
              // { text: this.invoice.contactNo }
            ],
            [
              {
                text: 'delivery Date: '+this.Orderview.deliverydate,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },{},{},
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
               {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],

               ([this.Orderview.brandName, this.Orderview.productPrice, this.Orderview.quantity, (this.Orderview.productPrice * this.Orderview.quantity).toFixed(2)]),
              [{ text: 'Total Amount', colSpan: 3 }, {}, {},  (this.Orderview.productPrice * this.Orderview.quantity).toFixed(2)]
            ]
          }
        },
        {
          columns: [
            [{ qr: `${this.Orderview.username}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        },
      ]
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
}
