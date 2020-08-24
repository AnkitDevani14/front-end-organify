import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './header/admin-header/admin-header.component';
import { AdminFooterComponent } from './footer/admin-footer/admin-footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { IntercepterService } from './service/intercepter/intercepter.service';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { UserHomeComponent } from './user-pages/user-home/user-home.component';
import { UserHeaderComponent } from './header/user-header/user-header.component';
import { UserShopComponent } from './user-pages/user-shop/user-shop.component';
import { UserContactComponent } from './user-pages/user-contact/user-contact.component';
import { ProductViewComponent } from './user-pages/product-view/product-view.component';
import { UserCartComponent } from './user-pages/user-cart/user-cart.component';
import { UserAddressComponent } from './user-pages/user-address/user-address.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { UserChangePwdComponent } from './user-pages/admin-change-pwd/admin-change-pwd.component';
import { AdminSalesComponent } from './pags/admin-sales/admin-sales.component';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    CategoryProductsComponent,
    EditProductComponent,
    AdminProfileComponent,
    UserHomeComponent,
    UserHeaderComponent,
    UserShopComponent,
    UserContactComponent,
    ProductViewComponent,
    UserCartComponent,
    UserAddressComponent,
    AdminChangePwdComponent,
    UserChangePwdComponent,
    AdminSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFontAwesomeModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxLoadingModule.forRoot({ animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
