import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Customer } from '../../interfaces/customer-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showLoading, closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

  customer: Customer;

  myCustomerForm: FormGroup = this.fb.group({
    documentNumber: [ '', [Validators.required] ],
    name:           [ '', [Validators.required] ],
    address:        [ '' ],
    phoneNumber:    [ '', [Validators.required] ],
  });

  constructor( private customerService: CustomerService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.checkIfItsUpdateModeAndFillForm();
  };


  checkIfItsUpdateModeAndFillForm(): void {
    if (this.router.url.includes('update')) {
      this.activatedRoute.params
          .pipe(
            switchMap( ({id}) => this.customerService.getCustomer(id) )
          ).subscribe( resp => {
            this.customer = resp;
            this.myCustomerForm.reset({
              documentNumber: resp.documentNumber,
              name: resp.name,
              address: resp.address,
              phoneNumber: resp.phoneNumber
            });
          }, (err) => {
            this.router.navigateByUrl('/pages/customer/list');
          });
    };
  };

  submit(): void {
    const { documentNumber, name, address, phoneNumber} = this.myCustomerForm.value;

    if (this.myCustomerForm.invalid || documentNumber.trim() === '' || name.trim() === '' || phoneNumber.trim() === '') {
      this.myCustomerForm.markAllAsTouched();
      return;
    };

    showLoading('Please, wait...');

    const myCustomer: Customer = { documentNumber, name, address, phoneNumber };

    (!this.customer)
        ? this.createNewCustomer(myCustomer)
        : this.updateCustomer(myCustomer);

  };

  createNewCustomer(newCustomer: Customer): void {
    this.customerService.postCustomer(newCustomer)
        .subscribe( () => {
          closeLoading();
          showNotification('bottom', 'center', 'CUSTOMER has been successfully created');
          this.router.navigateByUrl('/pages/customers/list');
        });
  };

  updateCustomer(updatedCustomer: Customer): void {
    this.customerService.updateCustomer(this.customer._id, updatedCustomer)
        .subscribe( () => {
          closeLoading();
          showNotification('bottom', 'center', 'CUSTOMER has been succesfully updated');
          this.router.navigateByUrl('/pages/customers/list');
        });
  };

  fieldIsInvalid(controlName: string): boolean {
    return this.myCustomerForm.get(controlName).invalid && this.myCustomerForm.get(controlName).touched;
  };

  back(): void {
    window.history.back();
  };

}
