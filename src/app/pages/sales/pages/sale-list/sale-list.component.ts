import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../interfaces/sale-response.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  // sales: Sale[] = [];
  
  // constructor( private saleService: SaleService ) { }
  
  // ngOnInit(): void {
  //   this.getSalesAndFillArray();
  // };

  // getSalesAndFillArray(): void {
  //   this.saleService.getSales()
  //       .subscribe( resp => {
  //         this.sales = resp.reverse();
  //       });
  // };

  sales: Sale[] = [];
  displayedColumns: string[] = ['createdAt', 'customer', 'user', 'totalPrice', '_id'];
  dataSource = new MatTableDataSource<Sale>(this.sales);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( private saleService: SaleService ) { }

  ngOnInit(): void {
    this.getSalesAndFillArray();
  };


  getSalesAndFillArray(): void {
    this.saleService.getSales()
        .subscribe( resp => {
          this.sales = resp.reverse();
          this.dataSource = new MatTableDataSource<Sale>(this.sales);
          this.dataSource.paginator = this.paginator;
        });
  };
}