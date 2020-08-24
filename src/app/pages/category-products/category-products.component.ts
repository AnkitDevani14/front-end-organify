import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/Category';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Productslist } from 'src/app/model/Products-full';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  categotyList : Category[] = [];
   productList : [] = [];

   constructor(private shopifyService:ShopifyService,
   private toastr:ToastrService,
   private router:Router) { }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
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

  getProducts(){
    this.shopifyService.listProducts().subscribe(
      (data : [])=> {
        this.productList = data;
        console.log(this.productList);
        
      },
      error => {
        this.toastr.error("Error!!!!",'category',{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

  getProductById(id){
    this.shopifyService.listProductsById(id).subscribe(
      (data : [])=> {
        this.productList = data;
        console.log(this.productList);
        
      },
      error => {
        this.toastr.error("Error!!!!",'category',{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

  deleteProduct(id){
    this.shopifyService.deleteProduct(id).subscribe(
      (data) => {

        this.toastr.success("Deleted Successfully!","Delete",{
          progressBar:true,
          closeButton:true
        })
        this.getProducts();
      },
      (error) => {
        console.log(error);
        this.toastr.error("Deleted Error!","Delete",{
          progressBar:true,
          closeButton:true
        })
        this.getProducts();
      }
    )
  }

  editProduct(id){
    
    this.router.navigate(['/product-edit', id]);
  }

}
