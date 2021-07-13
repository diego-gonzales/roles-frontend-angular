import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerService } from '../../../customers/services/customer.service';
import { Customer } from './../../../customers/interfaces/customer-response.interface';
import { ProductService } from '../../../products/services/product.service';
import { ProductElement, Product } from '../../interfaces/sale-response.interface';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { SaleService } from '../../services/sale.service';
import { showLoading, closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';
@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

  myCustomerControl: FormControl = this.fb.control('');
  myProductForm: FormGroup = this.fb.group({
    codeProduct: [ '', Validators.required ],
    quantity: [ 0, [Validators.required, Validators.min(0)] ]
  });
  customers: Customer[] = [];
  products: Product[] = [];
  customerFilteredOptions: Observable<Customer[]>;
  productFilteredOptions: Observable<Product[]>;
  productsToSale: ProductElement[] = [];


  constructor( private saleService: SaleService,
               private customerService: CustomerService,
               private productService: ProductService,
               private authenticationService: AuthenticationService,
               private fb: FormBuilder,
               private router: Router ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllProducts();
    this.fillCustomerFilteredOptions();
    this.fillProductFilteredOptions();
  };


  getAllCustomers(): void {
    this.customerService.getCustomers()
        .subscribe( resp => this.customers = resp );
  };

  getAllProducts(): void {
    this.productService.getProducts()
        .subscribe( resp => this.products = resp );
  };

  fillCustomerFilteredOptions(): void {
    this.customerFilteredOptions = this.myCustomerControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCustomers(value))
        );
  };

  fillProductFilteredOptions(): void {
    this.productFilteredOptions = this.myProductForm.get('codeProduct').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterProducts(value))
        );
  };

  private _filterCustomers(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer => customer.name.toLowerCase().includes(filterValue));
  };

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  };


  addProduct(): void {
    if (this.myProductForm.invalid) {
      this.myProductForm.markAllAsTouched();
      return;
    };

    const { codeProduct, quantity } = this.myProductForm.value;

    const productAlreadyExistInArray: boolean = this.productsToSale.some(productElement => productElement.product._id === codeProduct);

    (productAlreadyExistInArray)
          ? this.onlyModifyQuantityToProduct(codeProduct, quantity)
          : this.pushProductToArray(codeProduct, quantity);

    this.myProductForm.reset({
      codeProduct: '',
      quantity: 0
    });

  };

  onlyModifyQuantityToProduct(codeProduct: string, quantity: number) {
    this.productsToSale.forEach( productElement => {
      if (productElement.product._id === codeProduct) {
        productElement.quantity += quantity;
      };
    });
  };

  pushProductToArray(codeProduct: string, quantity: number) {
    this.productService.getProduct(codeProduct)
          .subscribe( resp => {
            this.productsToSale.push({ product: resp, quantity});
          });
  };

  removeProduct(idProduct: string) {
    this.productsToSale = this.productsToSale.filter( productElement => productElement.product._id !== idProduct);
  };

  getTotalToPay(): number {
    let total = 0;
    this.productsToSale.forEach( productElement => {
      total += productElement.quantity * productElement.product.price;
    });
    return total;
  };

  makeSale(): void {
    // esta es la forma de objeto que recibe mi API para crear una nueva venta
    const newSale = {
      customer: this.myCustomerControl.value,
      user: this.authenticationService.currentUser.sub,
      products: this.productsToSale.map(({product, quantity}) => {
        return {
          product: product._id,
          quantity
        }
      }),
      totalPrice: this.getTotalToPay()
    };

    if (this.myCustomerControl.value === '') delete newSale.customer;

    showLoading('Please, wait...');

    this.saleService.postSale(newSale)
        .subscribe( () => {
          this.router.navigateByUrl('/pages/sales/list');
          closeLoading();
          showNotification('bottom', 'center', 'SALE has been successfully added');
        });
  };

  fieldIsInvalid(): boolean {
    return this.myProductForm.get('codeProduct').invalid && this.myProductForm.get('codeProduct').touched;
  };

  back(): void {
    window.history.back();
  };

}
