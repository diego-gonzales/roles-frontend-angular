import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../interfaces/sales-response.interface';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  sales: Sale[] = [];


  constructor( private saleService: SaleService ) { }

  ngOnInit(): void {
    this.getSalesAndFillArray();
  };


  getSalesAndFillArray(): void {
    this.saleService.getSales()
        .subscribe( resp => {
          console.log(resp)
          this.sales = resp;
        });
  };

  deleteSale(idSale: string) {

  }

}
