import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/users-response.interface';
import { UserService } from '../../services/user.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { showNotification } from '../../../../shared/helpers/notifications.helper';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];


  constructor( private userService: UserService,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getUsersAndFillArray();
  };


  getUsersAndFillArray() {
    this.userService.getUsers()
        .subscribe( resp => {
          this.users = resp;
        })
  };


  deleteUser(idUser: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Dialog',
        message: 'Are you sure to delete this record?',
        showButtonOk: false
      }
    });

    dialogRef.afterClosed()
             .subscribe(result => {
               if (result) {
                 this.userService.deleteUser(idUser)
                     .subscribe( () => {
                       this.users = this.users.filter(user => user._id !== idUser);
                       showNotification('bottom', 'center', 'USER has been successfully deleted');
                     });
               };
             });

  };
}
