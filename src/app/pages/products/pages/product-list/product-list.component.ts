import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products-response.interface';
// import { confirmDialog } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../../../authentication/services/authentication.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  displayedColumns: string[] = ['_id', 'name', 'category', 'price'];


  constructor( private productService: ProductService,
               private dialog: MatDialog,
               public authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.getProductsAndFillArray();
  };


  getProductsAndFillArray(): void {
    this.productService.getProducts()
        .subscribe( resp => {
          this.products = resp;
        });
  };

  // Con MatDialog
  deleteProduct(idProduct: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Dialog',
        message: 'Are you sure to delete this record?',
        showButtonOk: false
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.productService.deleteProduct(idProduct)
            .subscribe( () => {
              this.products = this.products.filter( product => product._id !== idProduct );
              showNotification('bottom', 'center', 'Product has been successfully deleted')
            }, err => {
              console.log(err);
            });
      };
    })
  };

  // Con Sweetalert2
  // deleteProduct(idProduct: string): void {
  //   confirmDialog()
  //     .then((result) => {
  //       if (result.isConfirmed) {

  //         this.productService.deleteProduct(idProduct)
  //             .subscribe( () => {
  //               this.products = this.products.filter( product => product._id !== idProduct );
  //               showNotification('bottom', 'center', 'Product has been successfully deleted')
  //             }, err => {
  //               console.log(err);
  //             });
  //       };

  //     });
  // };


}