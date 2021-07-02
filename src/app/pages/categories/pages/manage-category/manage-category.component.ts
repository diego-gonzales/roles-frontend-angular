import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Category } from '../../interfaces/category-response.interface';
import { CategoryService } from '../../services/category.service';
import { showLoading, closeLoading } from '../../../../shared/helpers/sweetalert.helper';
import { showNotification } from '../../../../shared/helpers/notifications.helper';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  category: Category;

  myForm: FormGroup = this.fb.group({
    name: [ '', Validators.required ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private categoryService: CategoryService,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.checkIfItsUpdateModeAndFillForm();
  };


  submit() {
    const { name } = this.myForm.value;

    if (this.myForm.invalid || name.trim() === '') {
      this.myForm.markAllAsTouched();
      return;
    };

    showLoading('Please, wait...');

    const myCategory: Category = { name };

    (!this.category)
        ? this.createNewCategory(myCategory)
        : this.updateCategory(myCategory);

  };

  createNewCategory(newCategory: Category) {
    this.categoryService.postCategory(newCategory)
        .subscribe( () => {
          this.router.navigateByUrl('/pages/categories/list');
          closeLoading();
          showNotification('bottom', 'center', 'CATEGORY has been successfully added');
        }, err => {
          closeLoading();
          if (err.error.statusCode === 400) {
            this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Message',
                message: err.error.message,
                showButtonOk: true
              }
            });
          }
        });
  };

  updateCategory(updatedCategory: Category) {
    this.categoryService.updateCategory(this.category._id, updatedCategory)
        .subscribe( () => {
          this.router.navigateByUrl('/pages/categories/list');
          closeLoading();
          showNotification('bottom', 'center', 'CATEGORY has been successfully updated');
        }, err => {
          console.log(err);
        });
  };

  checkIfItsUpdateModeAndFillForm() {
    if ( this.router.url.includes('update') ) {
      this.activatedRoute.params
          .pipe(
            switchMap(({id}) => this.categoryService.getCategory(id))
          ).subscribe( resp => {
            this.category = resp;
            this.myForm.reset({
              name: resp.name
            });
          }, err => {
            this.router.navigateByUrl('/pages/categories/list');
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
