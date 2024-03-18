import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

    this.authService.isLogged.subscribe((res) => {
      this.isLoggedIn = res;
    })

  }

  async onSubmit(formValue: FormGroup): Promise<void> {
    if(this.form.valid) {
      console.log(formValue);

      const res = await this.authService.onLoggIn(formValue).then((data: any) =>{

        console.log("Subscripción desde el componente",data);

        if((this.isLoggedIn)){
          if((this.authService.roles.includes("admin")) || (this.authService.roles.includes("moderator"))) {

            this.router.navigate(['owners']);
          } else {
            this.router.navigate(['']);
          }
        }else {
          alert("Wrong password or username");
        }
      });
      console.log("El token desde el componente: ",this.authService.token);
      console.log("IsLogged: ",this.authService.isLoggedIn);
      console.log("El role desde el componente: ",this.authService.roles);

    }
  }
}
