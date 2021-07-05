import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
    if( localStorage.getItem('authenticationToken')){
      if (localStorage.getItem('AdminId')) {
        return true;
      }
      else{
        this.router.navigate(['pages/login']);
        return false;
      }
    }
    else{
      return true;
    }
    
    

    
  }
  
}
