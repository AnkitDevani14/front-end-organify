import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  constructor(private http:HttpClient) { }

  registerUsers(userModel){
    return this.http.post(`http://localhost:8080/api/register/user`,userModel);
  }

  addCategory(uploadImageData){
    return this.http.post(`http://localhost:8080/api/admin/add-category`,uploadImageData).pipe(
      catchError(this.handleError));
  }

  updatePassword(uploadImageData){
    return this.http.post(`http://localhost:8080/api/admin/change-password`,uploadImageData).pipe(
      catchError(this.handleError));
  }

  updatePasswordUser(uploadImageData){
    return this.http.post(`http://localhost:8080/api/user/change-password`,uploadImageData).pipe(
      catchError(this.handleError));
  }

  private handleError(error){
   
    return throwError(error.message );
    
  }

  listCategory(){
    return this.http.get('http://localhost:8080/api/categpory-product/list-category').pipe(
      catchError(this.handleError));
  
  }

   
  listProducts(){
    return this.http.get('http://localhost:8080/api/categpory-product/list-products').pipe(
      catchError(this.handleError));
  
  }

  listProductsById(id){
    return this.http.get(`http://localhost:8080/api/categpory-product/products/${id}`).pipe(
      catchError(this.handleError));
  
  }

  findUserByUsername(username){
    return this.http.get(`http://localhost:8080/api/user/username/${username}`).pipe(
      catchError(this.handleError));
  }

  findUser(username){
    return this.http.get(`http://localhost:8080/api/register/username/${username}`).pipe(
      catchError(this.handleError));
  }

  addToCart(Cart){
    return this.http.post('http://localhost:8080/api/user/add-cart',Cart).pipe(
      catchError(this.handleError));
  }

  activeCart(id,uid){
    return this.http.get(`http://localhost:8080/api/user/count/${id}/${uid}`).pipe(
      catchError(this.handleError));
  }

  listSales(month,year){
    return this.http.get(`http://localhost:8080/api/register/list-sales/${month}/${year}`).pipe(
      catchError(this.handleError));
  }


  deleteCart(id,uid){
    return this.http.delete(`http://localhost:8080/api/user/delete/${id}/${uid}`).pipe(
      catchError(this.handleError));
  }

  count(uid){
    return this.http.get(`http://localhost:8080/api/user/count/${uid}`).pipe(
      catchError(this.handleError));
  }

  address(uid){
    return this.http.get(`http://localhost:8080/api/user/address/${uid}`).pipe(
      catchError(this.handleError));
  }

  report(uid){
    return this.http.get(`http://localhost:8080/api/register/report/${uid}`).pipe(
      catchError(this.handleError));
  }

  saveToSales(uid){
    return this.http.post(`http://localhost:8080/api/user/add-sales/${uid}`,uid).pipe(
      catchError(this.handleError));
  }

  countUser(){
    return this.http.get(`http://localhost:8080/api/admin/count-user`).pipe(
      catchError(this.handleError));
  }

  countCategory(){
    return this.http.get(`http://localhost:8080/api/admin/count-category`).pipe(
      catchError(this.handleError));
  }
  countSales(){
    return this.http.get(`http://localhost:8080/api/admin/count-sales`).pipe(
      catchError(this.handleError));
  }
  countProduct(){
    return this.http.get(`http://localhost:8080/api/admin/count-product`).pipe(
      catchError(this.handleError));
  }

  checkpwd(uid,pwd){
    return this.http.get(`http://localhost:8080/api/register/check-pwd/${uid}/${pwd}`).pipe(
      catchError(this.handleError));
  }

  saveAddress(AddresModel){
    return this.http.post(`http://localhost:8080/api/user/user-address`, AddresModel).pipe(
      catchError(this.handleError));
  }

  pay(AddresModel){
    return this.http.post(`http://localhost:8080/api/paypal/pay`, AddresModel).pipe(
      catchError(this.handleError));
  }

  addProductToCart(id,uid){
    return this.http.post(`http://localhost:8080/api/user/add/${id}/${uid}`,id).pipe(
      catchError(this.handleError));
  }

  removeProductToCart(id,uid){
    return this.http.post(`http://localhost:8080/api/user/remove/${id}/${uid}`,id).pipe(
      catchError(this.handleError));
  }

  getUser(page:number){
    return this.http.get(`http://localhost:8080/api/admin/list-user?page=${page}`).pipe(
      catchError(this.handleError));
  }

  getCart(id){
    return this.http.get(`http://localhost:8080/api/user/get-cart/${id}`).pipe(
      catchError(this.handleError));
  }

  getCartTotal(id){
    return this.http.get(`http://localhost:8080/api/user/get-cart-total/${id}`).pipe(
      catchError(this.handleError));
  }

  

 deleteProduct(id){
   return this.http.delete(`http://localhost:8080/api/admin/delete-product/${id}`).pipe(
    catchError(this.handleError));
 }

 deleteCategory(id){
  return this.http.delete(`http://localhost:8080/api/admin/delete-category/${id}`).pipe(
   catchError(this.handleError));
}

  addProduct(uploadData){
    return this.http.post(`http://localhost:8080/api/admin/add-product`,uploadData).pipe(
      catchError(this.handleError));
  }

  getProductById(id){
    return this.http.get(`http://localhost:8080/api/categpory-product/get-product/${id}`).pipe(
      catchError(this.handleError));
  }

  updateProduct(uploadData){
    return this.http.post(`http://localhost:8080/api/admin/update-product`,uploadData).pipe(
      catchError(this.handleError));
  }

  updateProfile(){
    return this.http.get('http://localhost:8080/api/admin/get-profile').pipe(
      catchError(this.handleError));
  }

  UpdateProfileData(userModel){
    return this.http.post('http://localhost:8080/api/admin/update-profile',userModel).pipe(
      catchError(this.handleError));
  }
}
