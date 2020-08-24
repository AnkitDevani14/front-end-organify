import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService:AuthService,private toastr:ToastrService,
    private router:Router){ }
  
    canActivate(): boolean{
      if(this.authService.logIn()){
        
        return true;
      }else{
        this.router.navigateByUrl('login');
        this.toastr.error("Time Out..","LOGIN Failed",{
          closeButton:true,
          progressBar:true
        })
        return false;
      }
    }
  
}
