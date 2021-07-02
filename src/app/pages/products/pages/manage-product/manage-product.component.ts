import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CategoryService } from '../../../categories/services/category.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/products-response.interface';
import { showLoading, closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  product: Product;
  categoryNames: string [] = [];

  myForm: FormGroup = this.fb.group({
    name:     [ '', [Validators.required] ],
    category: [ '', [Validators.required] ],
    price:    [ '', [Validators.required, Validators.min(0)] ],
    stock:    [ '', [Validators.required, Validators.min(0)] ],
    status:   [ 1, [Validators.required] ]
  });

  constructor( private productService: ProductService,
               private categoryService: CategoryService,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getListCategories();
    this.checkIfItsUpdateModeAndFillForm();
  };


  submit(): void {
    const { name, category, price, stock, status } = this.myForm.value;

    if (this.myForm.invalid || name.trim() === '' ) {
      this.myForm.markAllAsTouched();
      return;
    };

    showLoading('Saving...');

    const myProduct: Product = { name, category, price, stock, status };

    (!this.product)
        ? this.createNewProduct(myProduct)
        : this.updateProduct(myProduct);

  };


  createNewProduct( newProduct: Product ): void {
    this.productService.postProduct(newProduct)
          .subscribe( () => {
            this.router.navigateByUrl('/pages/products/list');
            closeLoading();
            showNotification('bottom', 'center', 'PRODUCT has been successfully added');
          }, err => {
            console.log(err);
          });
  };

  updateProduct( updatedProduct: Product ): void {
    this.productService.updateProduct(this.product._id, updatedProduct)
          .subscribe( () => {
            this.router.navigateByUrl('/pages/products/list');
            closeLoading();
            showNotification('bottom', 'center', 'PRODUCT has been successfully updated');
          }, err => {
            console.log(err);
          });
  };


  getListCategories(): void {
    this.categoryService.getCategoryNames()
        .subscribe( resp => {
          this.categoryNames = resp;
        });
  };

  checkIfItsUpdateModeAndFillForm(): void {
    if ( this.router.url.includes('update') ) {
      this.activatedRoute.params
          .pipe(
            switchMap( params => this.productService.getProduct(params['id']) )
          ).subscribe( resp => {
            this.product = resp;
            this.myForm.reset({
              name: resp.name,
              category: resp.category.name,
              price: resp.price,
              stock: resp.stock,
              status: resp.status
            });
          }, err => {
            this.router.navigateByUrl('/pages/products/list');
          });
    };
  };

  back() {
    window.history.back();
  };

  fieldIsInvalid(controlName: string): boolean {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  };

}
