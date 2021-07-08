import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { switchMap } from 'rxjs/operators';
import { Sale, Product } from '../../interfaces/sales-response.interface';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  sale: Sale;


  constructor( private saleService: SaleService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getSale();
  };


  getSale(): void {
    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.saleService.getSale(id) )
        ).subscribe( resp => {
          console.log(resp)
          this.sale = resp;
        });
  };

  back(): void {
    window.history.back();
  };
}
