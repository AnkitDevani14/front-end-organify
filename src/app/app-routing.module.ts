import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHeaderComponent } from './header/admin-header/admin-header.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { UserHomeComponent } from './user-pages/user-home/user-home.component';
import { UserShopComponent } from './user-pages/user-shop/user-shop.component';
import { UserContactComponent } from './user-pages/user-contact/user-contact.component';
import { ProductViewComponent } from './user-pages/product-view/product-view.component';
import { UserCartComponent } from './user-pages/user-cart/user-cart.component';
import { UserAddressComponent } from './user-pages/user-address/user-address.component';
import { UserGuard } from './guard/user.guard';
import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { UserChangePwdComponent } from './user-pages/admin-change-pwd/admin-change-pwd.component';
import { AdminSalesComponent } from './pags/admin-sales/admin-sales.component';




const routes: Routes = [
  {path:'',component:UserHomeComponent},
  {path:'shop',component:UserShopComponent},
  {path:'contact',component:UserContactComponent},
  {path:'view-product/:id',component:ProductViewComponent, canActivate: [UserGuard]},
  {path:'cart',component:UserCartComponent, canActivate: [UserGuard]},
  {path:'user-address',component:UserAddressComponent, canActivate: [UserGuard]},
  {path:'change-password',component:AdminChangePwdComponent, canActivate: [AdminGuardGuard]},
  {path:'sales',component:AdminSalesComponent,canActivate:[AdminGuardGuard]},
  {path:'change-password-user',component:UserChangePwdComponent, canActivate: [UserGuard]},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin-home',component:AdminHomeComponent, canActivate: [AdminGuardGuard]},
  {path:'category',component:AdminCategoryComponent, canActivate: [AdminGuardGuard]},
  {path:'product',component:AdminProductsComponent, canActivate: [AdminGuardGuard]},
  {path:'products', component:CategoryProductsComponent, canActivate: [AdminGuardGuard]},
  {path:'product-edit/:id',component:EditProductComponent,canActivate: [AdminGuardGuard]},
  {path:'admin-profile', component:AdminProfileComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
