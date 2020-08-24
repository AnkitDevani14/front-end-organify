import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private router:Router) { }

  authenticate(username,password){
    return this.http.post<any>("http://localhost:8080/api/authenticate", { username, password }).pipe(
      catchError(this.handleError))
      
    
  }

  private handleError(error){
   
    return throwError(error.message );
    
  }

  findUserRole(username){
    return this.http.get<any>(`http://localhost:8080/api/userRole/${username}`);
  }

  loggedIn(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('username') === 'admin')
    {
      return true;
    }
    return false;

  }

  logIn(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('username') != 'admin')
    {
      return true;
    }
    return false;

  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.router.navigate(['login']);
  }
}
