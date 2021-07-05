import { Component, OnInit } from '@angular/core';
import { BannersService } from '../banners.service';
import { Webbanners } from '../webhome/webhome.model';

@Component({
  selector: 'app-mobilehome',
  templateUrl: './mobilehome.component.html',
  styleUrls: ['./mobilehome.component.css']
})
export class MobilehomeComponent implements OnInit {
  isAddShow = true;
  isActive = false;
  image: any;
  positiion: any = []
  selectedPosition: any;
  public WebbannersModel: Webbanners = new Webbanners;
  public webImage: Webbanners[] = [];
  constructor(
    private bannersServie: BannersService,
  ) {
    this.positiion = [
      {
        name: 'Top'
      },
      {
        name: 'Middle',
      },
      {
        name: 'End',
      },
      {
        name: 'Offer'
      }
    ]
    this.getBanners();
  }

  ngOnInit(): void {
  }
  addNewImages() {
    this.isAddShow = false;
  }
  cancelAddImage() {
    this.isAddShow = true;
  }
  selectPosition(name) {
    this.positiion.forEach(element => {
      if (element.name == name) {
        this.selectedPosition = element.name;
      }
    })

  }
  select(event) {
     
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const formdata = new FormData();
      formdata.append('file', file);

       
      this.bannersServie.uploadMobileBannersImage(formdata).subscribe((response) => {
        this.image = response;
        console.log(response);
      })

    }
  }
  saveBannersImage() {
     
    this.WebbannersModel.bannersimage = this.image;
    this.WebbannersModel.name = this.selectedPosition;
    this.WebbannersModel.status = true;
    this.bannersServie.saveMobileBannersImage(this.WebbannersModel).subscribe(response => {
      this.isAddShow = true;
      this.getBanners();
    })
  }
  getBanners() {
    this.bannersServie.getMobileBanners().subscribe((data: any) => {
      this.webImage = data;
    });

  }
  removeBannersImage(id) {
     
    this.bannersServie.removeMobileBanners(id).subscribe((req) => {
      this.getBanners();
    })
  }
  activeBanners(id){
    this.webImage[id].status =true;
    this.bannersServie.activeDeavctiveBanners( this.webImage[id]).subscribe((req)=>{

    })
  }
  deactiveBanners(id){
    this.webImage[id].status =false;
    this.bannersServie.activeDeavctiveBanners( this.webImage[id]).subscribe((req)=>{

    })
  }
}