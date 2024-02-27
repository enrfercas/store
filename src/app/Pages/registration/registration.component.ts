import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,){
    this.form = fb.group({
      registerName: ["", [Validators.required, Validators.minLength(4)]],
      registerUsername: ["", [Validators.required, Validators.minLength(4)]],
      registerEmail: ["", [Validators.required, Validators.email]],
      registerPassword: ["", [Validators.required, Validators.minLength(4)]],
      registerRepeatPassword: ["", [Validators.required]]
    });
  }

  onSubmit(user: FormGroup) {

    console.log(user);
    this.router.navigate(['']);

  }

}
