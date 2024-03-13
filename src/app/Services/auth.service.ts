import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  public userId: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  async onLoggIn(user:any): Promise<any> {

    const response = this.http.post<any>(this.baseUrl + 'signin',user).toPromise();

    response.then((data)=>{
      this.authResponse = data;
      this.token = data.token;
      this.userId = data.userId;
      localStorage.setItem('token', data.token);
      localStorage.setItem('roles', data.roles);
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

  onLogout(): void {


    this.http.post(this.baseUrl + 'signout', {}).subscribe();
    this.router.navigate(['/login']);
    this.authResponse = undefined;
    this.isLoggedIn = false;
    this.roles = [];
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    console.log("Se ha cerrado la sesión");
    window.location.reload();
    return;


  }

}
