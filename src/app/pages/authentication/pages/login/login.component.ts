import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { showErrorMessage } from '../../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mySignInForm: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });

  get errorMessage() {
    const errors = this.mySignInForm.get('password').errors;
    if (errors.required) {
      return 'Field is required';
    } else if (errors.minlength) {
      return 'Must be at least 6 characters';
    } else {
      return ''
    }
  };

  constructor( private fb: FormBuilder,
               private authService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void {}


  signin() {
    const { username, password } = this.mySignInForm.value;

    if (this.mySignInForm.invalid || username.trim() === '' ) {
      return;
    };

    this.showLoading();

    this.authService.signIn( username, password )
        .subscribe( resp => {
          this.closeLoading();
          this.router.navigateByUrl('/pages/dashboard');
        }, err => {
          showErrorMessage(err.error.message);
        });

  };


  fieldIsInvalid(controlName: string): boolean {
    return this.mySignInForm.get(controlName).invalid && this.mySignInForm.touched;
  };


  showLoading() {
    Swal.fire({
      title: 'Please wait...',
      allowOutsideClick: false
    });

    Swal.showLoading();
  };

  closeLoading() {
    Swal.close();
  };

}
