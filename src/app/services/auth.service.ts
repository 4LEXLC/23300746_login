import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { ResponseLogin } from '../models/responselogin';



@Injectable({
  providedIn: 'root'

})


export class AuthService {
 private url = 'http://localhost:3000/api';

 constructor(private http: HttpClient) {}

 login(user: Credentials): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.url}/login`, user);
 }

 saveToken(token: string, role: string, name: string){
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name );
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

 // isAuthenticated(){
  //  return this.getToken() !== null;
 // }
  isAuthenticated(): boolean {
  const token = this.getToken();

  if (!token) {
    return false;
  }

  try {
    const payload = token.split('.')[1];

    if (!payload) {
      throw new Error('Invalid token');
    }

    const base64 = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const paddedBase64 = base64.padEnd(
      Math.ceil(base64.length / 4) * 4,
      '='
    );

    const decoded: { exp?: number } = JSON.parse(
      atob(paddedBase64)
    );

    if (
      typeof decoded.exp !== 'number' ||
      decoded.exp * 1000 <= Date.now()
    ) {
      this.logout();
      return false;
    }

    return true;
  } 
  catch {
    this.logout();
    return false;
  }
}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }

  getRole(){
    return localStorage.getItem('role');
  } 

  hasRole(allowedRoles: string[]): boolean {
    const role = this.getRole();
    return role !== null && allowedRoles.includes(role);
  }

  getName (): string | null {
    return localStorage.getItem('name');
  }
}
