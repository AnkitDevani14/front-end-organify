import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  username: string;
  cart;

  constructor(private authService:AuthService,
    private shopify:ShopifyService,private router:Router) { }

  ngOnInit(): void {
    this.count();
  }

  logout(){
    this.authService.logout();
  }
  logIn(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('username') != 'admin')
    {
      return true;
    }
    return false;

  }

  

  count(){
    this.username = sessionStorage.getItem('username');
      this.shopify.findUserByUsername(this.username).subscribe(
        (data)=> {
          this.shopify.count(data).subscribe(
            (data) => {
              this.cart = data;
            }
          )
        })
        
      }

}
