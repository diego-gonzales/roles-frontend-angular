import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users-response.interface';
import { showLoading } from 'app/shared/helpers/sweetalert.helper';
import { closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User;

  myForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor( private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private userService: UserService ) { }

  ngOnInit(): void {
    this.checkIfUserExistAndGetUserId();
  }


  submit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    showLoading('Please, wait...');

    const { password } = this.myForm.value;

    this.userService.updatePasswordToUser(this.user._id, { password } )
        .subscribe( () => {
          closeLoading();
          showNotification('bottom', 'center', 'PASSWORD has been successfully changed');
          this.router.navigateByUrl('/pages/users/list');
        }, (err) => {
          closeLoading();
        });
  };

  checkIfUserExistAndGetUserId() {
    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.userService.getUser(id) )
        ).subscribe( resp => {
          this.user = resp;
        }, err => {
          this.router.navigateByUrl('pages/users/list');
        });
  };

  fieldIsInvalid(): boolean {
    return this.myForm.get('password').invalid && this.myForm.get('password').touched;
  };

  errorMessage(): string {
    const control = this.myForm.get('password');

    if (control.hasError('required')) return 'Field required';
    else if (control.hasError('minlength')) return 'Must be at least 6 characters';
    else return '';
  };

  back(): void {
    window.history.back();
  };

}
