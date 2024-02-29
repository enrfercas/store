import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any;
  public token: { token: string } | undefined;
  private baseUrl: string = 'http://localhost:4242/api/auth/';
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  onLoggIn(user:any): boolean {

    this.http.post(this.baseUrl + 'signin',user).subscribe((data: any) => {
      this.token = data;
      console.log("Respuesta del post",data);

    });


    if (this.token?.token === "") {
      this.isLoggedIn = false;
      return this.isLoggedIn

    } else {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }
    /* console.log("El user antes de la llamada a Post",user);
    return this.http.post(this.baseUrl + 'signup', user); */
  }

  onLogout(): void {}

}
