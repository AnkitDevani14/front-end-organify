import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from 'src/app/model/Product';
import { Category } from 'src/app/model/Category';
import { ShopifyService } from 'src/app/service/shopify/shopify.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  product : Products = new Products('',0 ,0 , '');

  productFile:File;
  category  ;
  

  categotyList : Category[] = [];
  constructor(private shopifyService:ShopifyService,
    private toastr:ToastrService) {

   }

  onFileSelect(event) {
    this.productFile  = event.target.files[0];
    console.log(this.productFile);
    console.log(this.product);
    console.log(this.category);
    console.log(this.product.price.toString(),this.product.quantity.toString());
  } 

  onCategorySelect(event){
    if(event.target.value === '0'){
      this.toastr.error("error");
      
    }
    else{
      this.category = event.target.value;
    }
   
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
 
  ngOnInit(): void {
    this.getCategory();
  }

  addProduct(){
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.productFile, this.productFile.name);
    uploadImageData.append('productName', this.product.productName);
    uploadImageData.append('price', this.product.price.toString());
    uploadImageData.append('quantity', this.product.quantity.toString());
    uploadImageData.append('description', this.product.description);
    uploadImageData.append('cate', this.category);
    this.shopifyService.addProduct(uploadImageData).subscribe(
      (data)=> {
        console.log(data);
        this.toastr.success("Sucess");
      },
      (error) => {
        this.toastr.error("error");
      }

    )
  }

}
