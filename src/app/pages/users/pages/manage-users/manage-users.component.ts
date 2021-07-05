import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users-response.interface';
import { showLoading, closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  user: User;

  myUserForm: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    email:    [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ],
    role:     [ 'user', [Validators.required] ]
  });


  constructor( private userService: UserService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private fb: FormBuilder,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.checkIfItsUpdateModeAndFillForm();
  };


  submit(): void {
    const { username, email, password, role } = this.myUserForm.value;

    if (this.myUserForm.invalid || username.trim() === '') {
      this.myUserForm.markAllAsTouched();
      return;
    };

    showLoading('Please, wait...');

    const myUser: User = {
      username,
      email,
      password,
      roles: [role] // mi api recibe un array de string por eso lo puse así
    };

    (!this.user)
        ? this.createNewUser(myUser)
        : this.updateUser(myUser);

  };

  createNewUser(newUser: User): void {
    this.userService.postUser(newUser)
        .subscribe( () => {
          this.router.navigateByUrl('/pages/users/list');
          closeLoading();
          showNotification('bottom', 'center', 'USER has already been successfully added');
        }, err => {
          closeLoading();
          if (err.error.statusCode === 500) {
            this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Message',
                message: 'Users has already been registered',
                showButtonOk: true
              }
            });
          }
        });
  };

  updateUser(updatedUser: User): void {
    // const user 
    this.userService.updateUser(this.user._id, updatedUser)
        .subscribe( () => {
            this.router.navigateByUrl('/pages/users/list');
            closeLoading();
            showNotification('bottom', 'center', 'USER has already been successfully updated');
        });
  };

  checkIfItsUpdateModeAndFillForm(): void {
    if ( this.router.url.includes('update') ) {
      this.activatedRoute.params
          .pipe(
            switchMap( ({id}) => this.userService.getUser(id) )
          ).subscribe( resp => {
            this.user = resp;
            this.myUserForm.reset({
              username: resp.username,
              email: resp.email,
              password: resp.password,
              role: resp.roles[0].name.toLowerCase()
            });
          }, err => {
            // se dispara cuando en la url, el id de user no es valido
            this.router.navigateByUrl('/pages/users/list');
          });
    };
  };

  back(): void {
    window.history.back();
  };

  fieldIsInvalid(controlName: string): boolean {
    return this.myUserForm.get(controlName).invalid && this.myUserForm.get(controlName).touched;
  };

  showErrorMessage(controlName: string): string {
    const control = this.myUserForm.get(controlName);

    switch (controlName) {
      case 'email':
        if ( control.hasError('required') ) return 'Field is required';
        else if (control.hasError('email')) return 'Enter a valid email';
        else return '';

      case 'password':
        if ( control.hasError('required') ) return 'Field is required';
        else if (control.hasError('minlength')) return 'Must be at least 6 characters';
        else return '';
    
      default:
        break;
    };
  };

}
