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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {



  }

  onSubmit(formValue: FormGroup): void {
    if(this.form.valid) {
      console.log(formValue);
      console.log("La respuesta del servicio: ",this.authService.onLoggIn(formValue));
      console.log("El token desde el componente: ",this.authService.token);
      //this.router.navigate(['']);
    }
    /* const token = this.authService.onLoggIn(formValue);
    console.log(token); */

  }

}
