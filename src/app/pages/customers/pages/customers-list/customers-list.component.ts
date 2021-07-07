import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces/customer-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { showNotification } from '../../../../shared/helpers/notifications.helper';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Customer[] = [];


  constructor( private customerService: CustomerService,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCustomersAndFillArray();
  };


  getCustomersAndFillArray() {
    this.customerService.getCustomers()
        .subscribe( resp => {
          this.customers = resp;
        });
  };

  deleteUser(idCustomer: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Dialog',
        message: 'Are you sure to delete this record?',
        showButtonOk: false
      }
    });

    dialogRef.afterClosed()
             .subscribe( result => {
               if (result) {
                 this.customerService.deleteCustomer(idCustomer)
                     .subscribe( () => {
                       this.customers = this.customers.filter( customer => customer._id !== idCustomer );
                       showNotification('bottom', 'center', 'CUSTOMER has been successfully deleted');
                     });
               };
             });
  };

}
