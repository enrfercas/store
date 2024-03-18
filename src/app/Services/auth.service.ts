import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authResponse: { token: string, roles: string[] } | undefined;
  private baseUrl: string = 'http://localhost:4242/api/auth/';
  public isLoggedIn: boolean = false;
  public isLogged = new BehaviorSubject<boolean>(false);
  public $isLogged: Observable<boolean> = this.isLogged.asObservable();
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
        this.isLogged.next(false);


      } else {
        this.isLogged.next(true);

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
    this.authResponse = undefined;
    this.isLoggedIn = false;
    this.roles = [];
    this.isLogged.next(false);
    this.isLogged.unsubscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    console.log("Se ha cerrado la sesión");
    //window.location.reload();
  }

  onAddUser(user: IUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup', user);
  }

}
