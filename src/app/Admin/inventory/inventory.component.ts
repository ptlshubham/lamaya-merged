import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'app/Admin/category/product.model';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { ClothSize } from '../category/clothsize.model';
import { InventoryService } from './inventory.service';
declare var require: any
declare var $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  moduleId: module.id,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public ProductModel: Product = new Product;
  public product: Product[] = [];
  public Chagesproduct: Product[] = [];
  public dataTable: DataTable;
  public ClothSizeModel: ClothSize = new ClothSize;
  public clothsize: ClothSize[] = [];
  
  selectClothSize: any;
  model: Date;
  restock: any = {};
  index:any;
  selectedCheck:boolean=false;
  popularProduct: boolean = true;
  addSelectFields: any = [];
  value = 0;
  selectedCat: any;
  selectedSubCat: any;
  selectedSubProCat: any;
  maincatid:any;
  subcatid:any;
  subtosubid:any;
  isdef:boolean=true;
  isntdef:boolean=false;
  selectedCategory:any;
  addnewarrival:boolean=false;
  addbestprdt:boolean=false;
  addhotprdt:boolean=false;
  addsale:boolean=false;
  
  public category: Category[] = [];
  public subcategory: Category[] = [];
  public subprodcat: Category[] = [];
  subToSubCat: any;
  productCategory: any = [];
  constructor(

    private categoryService: CategoryService,
    private inventoryService: InventoryService,
    private router:Router
  ) {
    this.productCategory = [
      {
        name: 'Hot Product'
      },
      {
        name: 'Sale Product',
      },
      {
        name: 'New Arrivals',
      },
      {
        name:'Best Product'
      }
      
    ]
    this.getProductList();
    this.getMainCategory(0);
  }

  ngOnInit(): void {
    this.addSelectFields = [{ name: this.value }];
    this.value++;
    this.model = new Date();
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }
  }
  selectProductCategory(name){
    this.selectedCategory = name;
    if(name == 'Hot Product'){
      let data={
        filter:'hot'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data:any)=>{
        this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });

      })
    }
    else if(name == 'Best Product'){
      let data={
        filter:'best'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data:any)=>{
        this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
      })
    }
    else if(name == 'Sale Product'){
      let data={
        filter:'sale'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data:any)=>{
        this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
      })
    }
    else{
      let data={
        filter:'new'
      }
      this.inventoryService.getFilterProduct(data).subscribe((data:any)=>{
        this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
      })
    }
    // this.productCategory.forEach(element => {
    //   if (element.name == name) {
    //     this.selectedCategory = element.name;
    //   }
    // })
  }
  ngAfterViewInit(){
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }
    });
    var table = $('#datatable').DataTable();
  }
  getMainCategory(id) {
    this.categoryService.getMainCat(id).subscribe(data => {
      this.category = data;
    });
  }
  editproduct(){
    this.router.navigate(['category'], {
      queryParams: {
        value: JSON.stringify(this.Chagesproduct)
      },
    });
  }
  cateMain(id) {
    this.maincatid = null;
    this.subcatid = null;
    this.subToSubCat = null;
    this.maincatid = id;
    let data={
      maincatid:this.maincatid,
      catid:null,
      subid:null
    }
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
    });
    this.category.forEach(element => {
      if (element.id == id) {
        this.selectedCat = element.name;
        
      }
    })
    this.getSubCategory(id);

  }
  getSubCategory(id) {
    this.subToSubCat = id;
    let data={
      maincatid:this.maincatid,
      catid:this.subcatid,
      subid: this.subToSubCat
    }
     
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
       
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
    });
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subcategory = data;
    });
  }
  cateCategory(id) {
    this.subcatid = id;
    let data={
      maincatid:this.maincatid,
      catid:this.subcatid,
      subid:null
    }
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
    });
    this.subcategory.forEach(element => {
      if (element.id == id) {
        this.selectedSubCat = element.name;
      }
    })
    this.getProductSubCategory(id);
  }
  getProductSubCategory(id) {
    
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subprodcat = data;
    });
  }
  subProCategory(id) {
    this.subToSubCat = id;
    this.subToSubCat = id;
    let data={
      maincatid:this.maincatid,
      catid:this.subcatid,
      subid: this.subToSubCat
    }
     
    this.categoryService.GetFilterProduct(data).subscribe(data => {
      this.product = data;
       
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      });
    });
    this.ProductModel.subCategory = id;
    this.subprodcat.forEach(element => {
      if (element.id == id) {
        this.selectedSubProCat = element.name;
      }
    })
  }
  addSelectSize(i) {
     
    let data={
      productid:this.restock.id,
      size:'',
      quantity:'0',
      soldquantity:0
    }
    this.addSelectFields=[];
    if(this.isntdef == false){
      this.isntdef = true;
      this.isdef = false;
      // this.restock.sizeList=data;
      this.addSelectFields = this.restock.sizeList;
      this.addSelectFields.push(data);
    }
    else{
      this.isntdef = false;
      this.isdef = true;
      this.addSelectFields = this.restock.sizeList;
      this.addSelectFields.push(data);
    }
   
  }
  removeSelectSize(value) {
    this.addSelectFields.splice(value, 1);
  }
  getProductList() {
     
    this.inventoryService.getProduct().subscribe((data: any) => {
      this.product = data;
      this.product.forEach(element => {
        this.inventoryService.getSize(element.id).subscribe((data:any)=>{
          element.sizeList = data;
        })
      })

     
     
      this.product.forEach(element => {
        element.selectedCheck = false;
      })
    });
  }
  removeProduct() {
    this.product.forEach(element => {
      if (element.selectedCheck == true) {
        this.inventoryService.removeProduct(element.id).subscribe((req) => {
          this.getProductList();
        })
      }
    })

  }
  selectAll(event) {
     
    if(event==true){
      this.selectedCheck=false;
      this.inventoryService.getProduct().subscribe((data: any) => {
        this.product = data;
        this.product.forEach(element => {
          element.selectedCheck = false;
          this.inventoryService.getSize(element.id).subscribe((data:any)=>{
            element.sizeList = data;
          })
        })
        this.Chagesproduct=[];
      });
    }
    else{
      this.selectedCheck=true;
      this.inventoryService.getProduct().subscribe((data: any) => {
        this.product = data;
        this.product.forEach(element => {
          element.selectedCheck = true;
          this.inventoryService.getSize(element.id).subscribe((data:any)=>{
            element.sizeList = data;
          })
        })
        this.Chagesproduct=this.product;
      });
    }
   
  }
  onChanges(sel,data,idx){
     
    if(sel == false){
      this.product[idx].selectedCheck = true;
      this.Chagesproduct.push(data);
    }
    else{
      this.product[idx].selectedCheck = false;
      for(let i=0;i<this.Chagesproduct.length;i++){
        if(this.Chagesproduct[i].id == data.id){
          this.Chagesproduct.splice(i,1);
        }
      }
    }
    

  }
  restokProduct(data,ind) {
     
    this.restock = data;
    this.restock.index = ind+1;  
    this.getClothSize();
    this.addSelectFields =this.restock.sizeList;

  }
  submitClothSize(id, index) {
    if (index != undefined) {

      this.clothsize.forEach(element => {
        if (element.id == id) {
          this.addSelectFields[index].size = element.size;
          // this.addSelectFields[index].soldquantity =0;
        }
      })
    }
    else {
      this.clothsize.forEach(element => {
        if (element.id == id) {
          this.selectClothSize = element.size;
        }
      })
    }
  }
  getClothSize() {
    this.categoryService.getCloth().subscribe((data: any) => {
      this.clothsize = data;

    });
  }

  //filter code from here
  AddToNewArrival(){
    if(this.addnewarrival == false){
      this.addnewarrival = true;
      this.addbestprdt = false;
      this.addsale = false;
      this.addhotprdt = false;
      this.inventoryService.addToNewArrivals(this.Chagesproduct).subscribe(data=>{
        alert("added");
      })
    }
    else{
      this.addnewarrival = false;;
    }
   
     
  }
  AddToBestProduct(){
    if(this.addbestprdt == false){
      this.addnewarrival = false;
      this.addbestprdt = true;
      this.addsale = false;
      this.addhotprdt = false;
      this.inventoryService.addToBestProduct(this.Chagesproduct).subscribe(data=>{
        alert("added");
      })
    }
    else{
      this.addbestprdt = false;
    }
   
  }
  AddToHotProduct(){
    if(this.addhotprdt == false){
      this.addnewarrival = false;
      this.addbestprdt = false;
      this.addsale = false;
      this.addhotprdt = true;
      this.inventoryService.addTohotProduct(this.Chagesproduct).subscribe(data=>{
        alert("added");
      })
    }
    else{
      this.addhotprdt = false;
    }
   
  }
  AddToSale(){
     
    if(this.addsale == false){
      this.addnewarrival = false;
      this.addbestprdt = false;
      this.addsale = true;
      this.addhotprdt = false;
      this.inventoryService.addToSale(this.Chagesproduct).subscribe(data=>{
        alert("added");
      })
    }
    else{
      this.addsale = false;
    }
   
  }
  // getMainCategory() {
  //   this.categoryService.getMainCat().subscribe(data => {
  //     this.category = data;
  //   });
  // }

}
