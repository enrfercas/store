import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authResponse: { token: string, roles: string[] } | undefined;
  private baseUrl: string = 'http://localhost:4242/api/auth/';
  public isLoggedIn: boolean = false;
  public roles: string [] = [];
  public token : string | undefined;

  constructor(private http: HttpClient) {}

  async onLoggIn(user:any): Promise<any> {
    
    const response = this.http.post<any>(this.baseUrl + 'signin',user).toPromise();

    response.then((data)=>{
      this.authResponse = data;
      this.token = data.token;
      localStorage.setItem('token', data.token);
      console.log("Respuesta del post",data);
      if(this.authResponse){
        this.roles = this.authResponse.roles;
        console.log("Respuesta de la petición en el servicio",this.authResponse);

      }
      if (this.authResponse?.token === "") {
        this.isLoggedIn = false;


      } else {
        this.isLoggedIn = true;

      }
    });

    return response;





    /* this.http.post<{ token: string, roles: string[] }>(this.baseUrl + 'signin',user).subscribe((data: any) => {
      this.authResponse = data;
      this.token = data.token;
      console.log("Respuesta del post",data);
      if(this.authResponse){
        this.roles = this.authResponse.roles;
        console.log("Respuesta de la petición en el servicio",this.authResponse);

      }
      if (this.authResponse?.token === "") {
        this.isLoggedIn = false;


      } else {
        this.isLoggedIn = true;

      }

    }); */




    /* console.log("El user antes de la llamada a Post",user);
    return this.http.post(this.baseUrl + 'signup', user); */
  }

  onLogout(): void {}

}
