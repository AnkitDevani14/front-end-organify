import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/Category';
import { Products } from 'src/app/model/Product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  user;
  category;
  product;
  sales;

   page:number=0;
   users:Array<any>;
   pages:Array<number>;
 

  categotyList : Category[] = [];
 
  constructor(private shopifyService:ShopifyService,
  private toastr:ToastrService,private sanitizer: DomSanitizer) { }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getUser();
  }

  ngOnInit(): void {
    this.getCategory();
    this.getUser();
    this.shopifyService.countUser().subscribe(
      (data) => {
        this.user = data;

        this.user = this.user-1;
      }
    )
    this.shopifyService.countCategory().subscribe(
      (data) => {
        this.category  = data;
        
      }
    )
    this.shopifyService.countProduct().subscribe(
      (data) => {
        this.product = data;
      }
    )
    this.shopifyService.countSales().subscribe(
      (data) => {
        this.sales = data;
      }
    )
  }

  getCategory(){
    this.shopifyService.listCategory().subscribe(
      (data : Category [])=> {
        this.categotyList = data;
        console.log(this.categotyList);
        
      },
      error => {
        this.toastr.error("Error!!!!",'category',{
          closeButton:true,
          progressBar:true
        })
        
      }
    )
  }

  deleteCategory(id){
    this.shopifyService.deleteCategory(id).subscribe(
      (data)=>{
       
      },(error) => {
        this.toastr.success("category Deleted","Delete",{
          progressBar:true,
          closeButton:true
        })
        this.getCategory();
      }
    )
  }

  getUser(){
    this.shopifyService.getUser(this.page).subscribe(
      (data) => {
        this.users = data['content'];
        console.log(this.users);
        this.pages = new Array(data['totalPages']);
      },(error) => {
        console.log(error);
      }
    )
  }
  

 
}
