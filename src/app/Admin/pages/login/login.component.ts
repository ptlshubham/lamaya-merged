import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginService } from './login.service';
import { ApiService } from 'app/api.service';
import { FormGroup } from '@angular/forms';
import { AdminRegister } from './login.model';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
  focus;
  focus1;
  focus2;
  public loginModel: AdminRegister[] = [];
  loginForm: FormGroup;
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    }  // formBuilder: FormBuilder;
    submitted=false;
    onSubmit(){this.submitted=true};
 
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(private element : ElementRef,
        public loginservice:LoginService,
        private router:Router,
        private apiservice:ApiService
        ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    login(credentials){
         
        console.log("......data...." + credentials.email);
        this.loginservice.login(credentials).subscribe(data=>{
          if(data ==1){
              this.apiservice.showNotification('top','right','Wrong Email!','danger');
          }
          else if(data ==2){
            
            this.apiservice.showNotification('top','right','Wrong Password!','danger');
            
          }
          else{
            this.apiservice.showNotification('top','right','Admin successfully Login.','success');
            localStorage.setItem('authenticationAdminToken', data[0].token);
            localStorage.setItem('AdminId',data[0].id);
            localStorage.setItem('AdminName',data[0].firstname + ' ' + data[0].lastname);
            this.router.navigate(['dashboard']);
          }
        
        });
      }
    
}
