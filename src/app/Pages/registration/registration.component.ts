import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

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
      registerUsername: ["", [Validators.required, Validators.minLength(4)]],
      registerEmail: ["", [Validators.required, Validators.email]],
      registerPassword: ["", [Validators.required, Validators.minLength(4)]],
      registerRepeatPassword: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(user: IUser) {
    const token = this.auth.onAddUser(user).subscribe(data => { const token = data })
    console.log(user);
    this.router.navigate(['']);
  }
}
