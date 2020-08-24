import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

   categoryFile:File;
   categoryName = '' ;
   categotyList : Category[] = [];

  constructor(private shopifyService:ShopifyService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCategory();
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
 
  onFileSelect(event) {
    this.categoryFile  = event.target.files[0];
    
  } 
  addCategory(){
   
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.categoryFile, this.categoryFile.name);
    uploadImageData.append('categoryName', this.categoryName);
    console.log(uploadImageData);
      this.shopifyService.addCategory(uploadImageData).subscribe(
      (data) => {
      
        this.toastr.success("data added",'category',{
          closeButton:true,
          progressBar:true
        })
      },
      (error) => {
        
        this.toastr.error("data not add",'category',{
          closeButton:true,
          progressBar:true
        })
      }
    )
  }

}
