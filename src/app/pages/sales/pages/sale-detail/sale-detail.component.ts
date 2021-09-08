import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../interfaces/sale-response.interface';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @ViewChild('boletaHTML') boletaHTML: ElementRef<HTMLDivElement>;
  sale: Sale;

  constructor( private saleService: SaleService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getSale();
  };


  getSale(): void {
    this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.saleService.getSale(id) )
        ).subscribe( resp => {
          this.sale = resp;
        });
  };

  back(): void {
    window.history.back();
  };

  showPDF() {

    const documentDefinition: TDocumentDefinitions = {
      footer: {
        text: 'GRACIAS POR SU VISITA.\nMi Empresa SAC\tJr. Encuéntrame 123\tCel: 987654321',
        margin: [30, 0]
      },
      content: [
        {
          text: 'Boleta de venta\n\n',
          style: 'header'
        },
        {
          text: 'Mi Empresa SAC\n',
          style: 'subheader'
        },
        'RUC: 202121291023\n',
        'Diego Gonzales\n\n\n',
        {
          alignment: 'justify',
          columns: [
            {
              text: [
                { text: 'Cód. Boleta:\t', bold: true },
                `${this.sale._id}\n`,
                { text: 'Fecha:\t', bold: true },
                `${new Date(Date.parse(this.sale.createdAt)).toLocaleString()}\n\n`
              ]
            }
          ]
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1, // how many rows should be treated as headers
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            widths: ['*', 200, '*', '*'],
            body: [
              [
                {text: 'CANT.', style: 'tableHeader'},
                {text: 'DESCRIPCIÓN', style: 'tableHeader'},
                {text: 'PRECIO UNIT.', style: 'tableHeader'},
                {text: 'IMPORTE', style: 'tableHeader'}
              ],
              ...this.getProductsForTable()
              /* remember that spread operator copies what is inside an array, in this case getProductsForTable() method
              return [[], [], [], ...] and the spread operator ...this.getProductsForTable() return only [], [], [], ... */
            ]
          }
        },
        {
          alignment: 'right',
          margin: [0, 50],
          columns: [
            {
              text: [
                { text: 'TOTAL A PAGAR:\t', bold: true, fontSize: 22 },
                { text: `S/.${this.sale.totalPrice.toLocaleString()}`, bold: true, fontSize: 22 }
              ]
            }
          ]
        },
        {
          alignment: 'right',
          qr: 'text in QR'
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 50, 0, 0]
        },
        subheader: {
          fontSize: 18,
          bold: true
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: 'center'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  getProductsForTable()  {
    const array = this.sale.products.map( productElement => {
      return [
        {text: productElement.quantity.toString(), italics: 'tableHeader'},
        {text: productElement.product.name.toString(), italics: 'tableHeader'},
        {text: `S/.${productElement.product.price.toString()}`, italics: 'tableHeader'},
        {text: `S/.${(productElement.product.price * productElement.quantity).toString()}`, italics: 'tableHeader'}
      ]
    });
    return array; // return an array of the form: [ [], [], [], ... ]
  };
}