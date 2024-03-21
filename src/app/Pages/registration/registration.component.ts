import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private auth: AuthService){
    this.form = fb.group({
      registerName: ["", [Validators.required, Validators.minLength(4)]],
      username: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      registerRepeatPassword: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(user: any) {
    if(this.form.value.password === this.form.value.registerRepeatPassword){
      const reqBody = {
        username: user.username,
        email: user.email,
        password: user.password
      };
      const token = this.auth.onAddUser(reqBody).subscribe(data => { const token = data })
    console.log(user);
    this.router.navigate(['']);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
    }

  }
}
