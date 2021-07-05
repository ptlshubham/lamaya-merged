import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { ClothSize } from './clothsize.model';
import { Images } from './images.model';
import { Product } from './product.model';
import { QuantityWithSize } from './quantity.model';
// ...
declare var $: any;
declare var require: any
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  mainCateRegForm: FormGroup;
  cateRegForm: FormGroup;
  subCateRegForm: FormGroup;
  productRegForm: FormGroup;
  submitted = false;
  onSubmit() { this.submitted = true; }
  startRating: boolean = false;
  avibilityStatus: boolean = false;
  emiOptiions: boolean = false;
  relatedProduct: boolean = false;
  isShow: boolean = false;
  isshowsub: boolean = false;
  isProduct: boolean = false;
  isCatData: boolean = false;
  isMainShow: boolean = false;
  isMainCatData: boolean = false;
  isSubCatData: boolean = false;
  public CategoryModel: Category = new Category;
  public ProductModel: Product = new Product;
  public ImagesModel: Images = new Images;
  public ClothSizeModel: ClothSize = new ClothSize;
  public QuantityWithSizeModel: QuantityWithSize = new QuantityWithSize;
  public quantitysize: QuantityWithSize[] = [];
  public images: Images[] = [];
  public clothsize: ClothSize[] = [];
  public product: Product[] = [];
  public category: Category[] = [];
  public subcategory: Category[] = [];
  public subprodcat: Category[] = [];
  selectedCat: any;
  selectedSubCat: any;
  selectedSubProCat: any;
  selectedSubCatid: any;
  selectClothSize: any;
  subToSubCat: any;
  editMain: any = {};
  editCat: any = {};
  addingprdtimg: any = [];
  val = 0;
  myForm: FormGroup;
  disabled: boolean = false;
  ShowFilter: boolean = false;
  limitSelection: boolean = false;
  image: any;
  categoryimage: any;
  multi: any = [];
  files: File[] = [];
  addSelectFields: any = [];
  value = 0;
  multiplefile: any = [];
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  color1: '#2883e9'
  isEdit:boolean=false;

  constructor(
    private categoryService: CategoryService,
    private fm: FormBuilder,
    private apiservice: ApiService,
    private router: Router,
    private activatedRoutes:ActivatedRoute
  ) {
    this.mainNavCategory();
    this.getMainCategory(0).then();
    this.ProductModel.startRating = false;
    this.ProductModel.avibilityStatus = false;
    this.ProductModel.emiOptiions = false;
    this.ProductModel.relatedProduct = false;
    this.ProductModel.discountPrice = 0;
    this.activatedRoutes.queryParams.subscribe((res:any) => {
      if(res){
         
        let data = JSON.parse(res.value);
         
        this.ProductModel = data[0];
        this.isEdit=true;
        this.isProduct = true;
        this.isShow = false;
        this.isshowsub = false;
        this.isCatData = false;
        this.isMainShow = false;
        this.isMainCatData = false;
        this.isSubCatData = false;
        this.addSelectFields = this.ProductModel.sizeList;
        this.getdetailImages(this.ProductModel.id);
        this.cateMain(this.ProductModel.mainCategory);
        this.cateCategory(this.ProductModel.category);
        if(this.ProductModel.subCategory != null || this,this.ProductModel.subCategory != undefined){
          this.subProCategory(this.ProductModel.subCategory);
        }
        this.getClothSize();
     
      }
    });
  }

  ngOnInit(): void {
    this.addSelectFields = [{  selsize : '',
    quantity :0,
    color :'#ffffff'}];
    this.value++;
    this.mainCateRegForm = this.fm.group({
      name: ['', Validators.required, Validators.name,],
    });
    this.cateRegForm = this.fm.group({
      subname: ['', Validators.required, Validators.name,],
    })
    this.subCateRegForm = this.fm.group({
      name: ['', Validators.required, Validators.name,],
    });
    this.productRegForm = this.fm.group({
      productName: ['', Validators.required, Validators.name,],
      brandName: ['', Validators.required, Validators.name,],
      manufacturerName: ['', Validators.required, Validators.name,],
      productCode: ['', Validators.required, Validators.name],
      productPrice: ['', Validators.required, Validators.name],
      productSRNumber: ['', Validators.required, Validators.name],
      discountPrice: ['', Validators.required, Validators.name],
    });
  }
  enteredquant(ind){
    debugger
  }
  mainNavCategory() {
    this.isMainShow = true;
    this.isshowsub = false;
    this.isProduct = false;
    this.isCatData = false;
    this.isShow = false;
    this.isSubCatData = false;

  }
  mainCategory() {
    this.isShow = true;
    this.isshowsub = false;
    this.isProduct = false;
    this.isCatData = false;
    this.isMainShow = false;
    this.isMainCatData = false;
    this.isSubCatData = false;
  }
  subCategory() {
    this.isshowsub = true;
    this.isShow = false;
    this.isProduct = false;
    this.isCatData = false;
    this.isMainShow = false;
    this.isMainCatData = false;
  }
  addProduct() {
    this.isProduct = true;
    this.ProductModel = {};
    this.isEdit = false;
    this.isShow = false;
    this.isshowsub = false;
    this.isCatData = false;
    this.isMainShow = false;
    this.isMainCatData = false;
    this.isSubCatData = false;
    this.getClothSize();

  }
  ngAfterViewInit() {
    $('[rel="tooltip"]').tooltip();
  }
  onEventLog(ev,color,i){
    debugger
    if(ev == 'colorPickerClose'){
      this.addSelectFields[i].color = color.color;
    }
   
  }
  submitMainCategory() {
    this.CategoryModel.parent = 0;
    this.CategoryModel.isactive = 1;
    this.categoryService.saveMainCat(this.CategoryModel).subscribe(response => {
      this.apiservice.showNotification('top', 'right', 'Main Category added Successfully.', 'success');
      // this.router.navigate(['/', 'labourlist']);
      this.getMainCategory(0);

    })
  }
  onEvent(val,ev){
     
  }
  getdetailImages(id){
    this.categoryService.getProductDetailImages(id).subscribe(res =>{
      this.addingprdtimg = res;
       
    })
  }
  async getMainCategory(id) {
    this.categoryService.getMainCat(id).subscribe(data => {
      this.category = data;
      if(this.isEdit == true){
        this.cateMain(this.ProductModel.mainCategory);
       
      
      }
    });
  }
  mainCatEdit(data) {
     
    this.editMain = data;
  }
  updateMainCate(data) {
     
    this.CategoryModel.isactive = 1;
    this.categoryService.updateMainCategory(data).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Updated Main Category Successfully.', 'success');
      this.getMainCategory(0);
    })
  }

  mainCatRemove(id) {
     
    this.categoryService.removeMainCatList(id).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Main Category removed Successfully.', 'success');
      this.getMainCategory(0);
      this.getProductSubCategory(this.selectedSubCatid);
      this.getSubCategory(this.subToSubCat);
    })
  }
  editCategory(Data) {
     
    this.editCat = Data;
  }
  updatemaincatddl(parent, name) {
     
    this.editCat.parent = parent;
    this.selectedCat = name;
  }
  EditedSaveCategory(data) {
     data.bannerimage = this.categoryimage;
    this.categoryService.updateMainCat(data).subscribe((req) => {
      console.log(req);
      this.apiservice.showNotification('top', 'right', 'Successfully updated.', 'success');
      this.getSubCategory(this.subToSubCat);

    })
  }
  
  cateMain(id) {
     
    this.ImagesModel.mainCategoryId = id;
    this.ProductModel.mainCategory = id;
    this.category.forEach(element => {
      if (element.id == id) {
        this.selectedCat = element.name;
      }
    })
    this.getSubCategory(id);

  }
  submitCategory() {
    this.category.forEach(element => {
      if (element.name == this.selectedCat) {
        this.CategoryModel.parent = element.id;
        this.CategoryModel.isactive = 1;
        this.CategoryModel.bannersimage = this.categoryimage;
      }
    })
    this.categoryService.saveCat(this.CategoryModel).subscribe((response) => {
      console.log(response);
      this.apiservice.showNotification('top', 'right', 'Category successfully added.', 'success');
      this.getSubCategory(this.subToSubCat);
    })
  }
  cateCategory(id) {
    this.ProductModel.category = id;
    this.ImagesModel.categoryId = id;

    this.selectedSubCatid = id;
    this.subcategory.forEach(element => {
      if (element.id == id) {
        this.selectedSubCat = element.name;
      }
    })
    this.getProductSubCategory(id);
  }
  getSubCategory(id) {
     
    this.subToSubCat = id;
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subcategory = data;
      if(this.isEdit == true){
        this.cateCategory(this.ProductModel.category);
      }
    });
  }
  submitSubCategory() {
    this.subcategory.forEach(element => {
      if (element.name == this.selectedSubCat) {
        this.CategoryModel.parent = element.id;
        this.CategoryModel.isactive = 1;
      }
    })
    this.categoryService.saveCat(this.CategoryModel).subscribe((response) => {
      this.apiservice.showNotification('top', 'right', 'Sub Category successfully added.', 'success');
      this.getProductSubCategory(this.CategoryModel.parent);
    })
    this.isSubCatData = true;
  }
  getProductSubCategory(id) {
     
    this.categoryService.getMainCat(id).subscribe(data => {
      this.subprodcat = data;
      if(this.isEdit == true){
        if(this.ProductModel.subCategory != null || this,this.ProductModel.subCategory != undefined){
          this.subProCategory(this.ProductModel.subCategory);
        }
      }
    });
  }
  subProCategory(id) {
    this.ImagesModel.subCategoryId = id;
    this.ProductModel.subCategory = id;
    this.subprodcat.forEach(element => {
      if (element.id == id) {
        this.selectedSubProCat = element.name;
      }
    })
  }

  addImageUploader() {
    this.val++;
    this.addingprdtimg.push({ name: this.val });
  }
  removeImageUploader(val) {
    this.addingprdtimg.splice(val, 1);
  }

  select(event) {
     
    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 800;
      max_width = 600;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);

             
            this.categoryService.selectUploadImage(formdata).subscribe((response) => {
              this.image = response;
              console.log(response);


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Multiple Image Uploader

  onSelect(event) {
    let max_height;
    let max_width;
     
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 800;
      max_width = 600;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            const formdata = new FormData();
            formdata.append('file', file);
            formdata.append('catid', this.ImagesModel.mainCategoryId);
            formdata.append('subcatid', this.ImagesModel.categoryId);
            formdata.append('grandchild', this.ImagesModel.subCategoryId);


            this.categoryService.selectMultiUploadImage(formdata).subscribe((response) => {
              this.multi.push(response);
              console.log(response);

            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  addSelectSize() {
    this.value++;
    let data={
      selsize : '',
      quantity :0,
      color :'#ffffff'
    }
    
     this.addSelectFields.push(data);
  }
  removeSelectSize(value) {
    this.addSelectFields.splice(value, 1);
  }
  getClothSize() {
    this.categoryService.getCloth().subscribe((data: any) => {
      this.clothsize = data;

    });
  }
  selectClothsSize(id) {
    this.clothsize.forEach(element => {
      if (element.id == id) {
        this.selectClothSize = element.size;
      }
    })
  }
  submitClothSize(id, index) {
    if (index != undefined) {

      this.clothsize.forEach(element => {
        if (element.id == id) {
          this.addSelectFields[index].selsize = element.size;
          this.addSelectFields[index].soldquantity = 0;
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


  submitAddProduct() {
     
    this.ProductModel.isActive = 0;
    this.ProductModel.productMainImage = this.image;
    this.ProductModel.selectedSize = this.addSelectFields;
    this.ProductModel.multi = this.multi;
    if (this.ProductModel.subCategory == undefined) {
      this.ProductModel.subCategory = null;
    }
    // this.ImagesModel.
    // this.QuantityWithSizeModel.addSelectFields = this.addSelectFields;
    this.categoryService.saveAddProduct(this.ProductModel).subscribe((response) => {
      this.apiservice.showNotification('top', 'right', 'Product successfully added.', 'success');
      // this.router.navigate(['/inventory']);
    })
  }
  // removeOrChangedImage() {
  //    

  //   this.categoryService.removeOrChanged().subscribe((req) => {
  //   })
  // }


  selectBanners(event) {
     
    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      max_height = 380;
      max_width = 1930;
      const allowed_types = ['image/png', 'image/jpeg'];
      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);

             
            this.categoryService.uploadCategoryBannersImage(formdata).subscribe((response) => {
              this.categoryimage = response;
              console.log(response);
            })

            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

  }
}


