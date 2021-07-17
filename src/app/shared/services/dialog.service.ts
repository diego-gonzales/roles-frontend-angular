import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor( private dialog: MatDialog) { }


  showDialog(title: string, message: string, showButtonOk: boolean) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title,
        message,
        showButtonOk
      }
    });

    return dialogRef;
  };
}
