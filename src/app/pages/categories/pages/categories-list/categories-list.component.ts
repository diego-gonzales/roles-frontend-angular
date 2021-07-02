import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { showNotification } from '../../../../shared/helpers/notifications.helper';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];


  constructor( private categoryService: CategoryService,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCategoriesAndFillArray();
  };


  getCategoriesAndFillArray() {
    this.categoryService.getCategories()
        .subscribe( resp => {
          this.categories = resp;
          console.log(resp);
        });
  };

  // Con MatDialog
  deleteCategory(idCategory: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Dialog',
        message: 'Are you sure to delete this record?',
        showButtonOk: false
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.categoryService.deleteCategory(idCategory)
            .subscribe( () => {
              this.categories = this.categories.filter( category => category._id !== idCategory );
              showNotification('bottom', 'center', 'CATEGORY has been successfully deleted')
            }, err => {
              console.log(err);
            });
      };
    });
  };

}
