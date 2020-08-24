import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  constructor(private shopify:ShopifyService,
    private toastr:ToastrService,
    private router:Router,private spinner: NgxSpinnerService) { }
  cart ;
  total;
  username;
  userId;
  valid;
  price = 50;

  ngOnInit(): void {
  
      this.load();
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      
  }

  totalFound(){
    if(this.total>1){
      return true;
    }else{
      return false;
    }
  }

  load(){
    this.shopify.findUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data) => {
        this.userId = data;
        console.log(this.userId);
        console.log(data);
        this.shopify.getCart(this.userId).subscribe(
          (data) => {
            this.cart = data;
            console.log(this.cart);
          }
        )
        this.shopify.getCartTotal(this.userId).subscribe(
          (data) => {
            this.total = data;
            console.log(this.total);
          }
        )
      }
    )
  }

  deleteCart(pid,uid){
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.shopify.deleteCart(pid,uid).subscribe(
      (data) => {
        if(data === true){
          this.toastr.success("Product Deleted","Cart",{
            progressBar:true,
            closeButton:true
          })
         this.load();
        }
        else{
          this.toastr.error("Product Deleted","Cart Error",{
            progressBar:true,
            closeButton:true
          })
        }
      }
    )
  }

  addCart(pid,uid){
    this.shopify.addProductToCart(pid,uid).subscribe(
      (data) => {
        
        console.log(data);
        this.load();
      },(error)=>{
        
        console.log(error);
      }

    )
  }

  removeCart(pid,uid){
    this.shopify.removeProductToCart(pid,uid).subscribe(
      (data) => {
        
        console.log(data);
        this.load();
      },(error)=>{
       
        console.log(error);
      }
    )
  }

}
