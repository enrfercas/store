import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router){
    this.form = this.fb.group({
      loginName: ["", Validators.required],
      loginPassword: ["", Validators.required]
    });
  }

  onSubmit(formValue: FormGroup): void {
    if(this.form.valid) {
      console.log(formValue);
      this.router.navigate(['']);
    }

  }

}
