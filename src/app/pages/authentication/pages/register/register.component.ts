import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { showLoading, closeLoading, showErrorMessage } from '../../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myRegisterForm: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  })
  constructor( private fb: FormBuilder,
               private authService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void { }


  signup() {
    const { username, email, password } = this.myRegisterForm.value;

    if (this.myRegisterForm.invalid || username.trim() === '' || email.trim() === '') {
      return;
    };

    showLoading('Please wait...');

    this.authService.signUp(username, email, password)
        .subscribe( resp => {
            closeLoading();
            this.router.navigateByUrl('/pages/dashboard');
        }, err => {
          // De acuerdo a mi API, me sale este error 500 cuando ya existe un usuario en mi base
          if (err.error.statusCode === 500) {
            showErrorMessage('Username or email have already been registered');
          };
        });
  };
}
