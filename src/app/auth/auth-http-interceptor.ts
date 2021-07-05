import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
// import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("in interceptor");
        // this.router.navigate(['home']);
        const token: string = localStorage.getItem('authenticationToken');
        const adminToken: string =localStorage.getItem('authenticationAdminToken');
        if ((request.url.substring(22, 27) == 'admin') && request.url != ApiService.saveAdminRegisterURL && request.url != ApiService.saveAdminLoginURL) {
             
            if (adminToken == null || adminToken == undefined) {
                console.log("token is null");
                this.router.navigate(['userlogin']);
            }
            request = request.clone({ headers: request.headers.set('x-access-token', adminToken) });
        }
        else {
            
            if(token == null || token == undefined){
                return next.handle(request);
            }
            else{
                if(request.url == ApiService.saveAddToCartURL || request.url == ApiService.saveAddToWishURL || request.url == ApiService.getCartListURL || request.url == ApiService.getWishListURL || request.url == ApiService.removeUserAddressURL || request.url == ApiService.updateUserAddressURL || ApiService.removeCartListItemURL || ApiService.getOrdersForUserURL){
                    request = request.clone({ headers: request.headers.set('x-access-token', token) });
                }
                else{
                    return next.handle(request);
                }
            }
           
            
            // if (request.url != ApiService.loginURl && request.url != ApiService.saveUserRegisterURL) {
            //     if(token == null || token == undefined) {
            //          
            //         console.log("token is null");
            //         this.router.navigate(['userlogin']);
            //     }
            // request = request.clone({ headers: request.headers.set('x-access-token', token) });
            // }
        }

        // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request);
    }
}