import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import * as jsPDF from 'jspdf';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {
  laDate: Date = new Date();

  constructor(private _trans: TransactionService,
              private _router: Router, private _auth: AuthService) { }
    @ViewChild("rows")rows: ElementRef;
    downloadPdf() {
      var printContents = document.getElementById('contrat').innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
    code;
    info: [];
    valide = {}
    recu = false;
  ngOnInit() {

 this._auth.getInfo().subscribe(
   res => {
     this.info = res
     console.log(this.info)
   },
   err => {
    if ( err instanceof HttpErrorResponse ) {
      if (err.status === 401) {
        this._auth.logoutUser();
           }
    }
  }
)



}

  verifier() {
    this._trans.verifier(this.valide)
    .subscribe(

   res => {

    if (res.message) {
      Swal.fire(
        {
          type: 'warning',
          title: 'Oops...',
          html: '<h1>' + res.message + '</h1>',
        })

    }
    if (res.status) {
      Swal.fire(
        {
          type: 'warning',
          title: 'Oops...',
        html: '<h1>' + res.message + '</h1>',
        })
  } else {
      this.code = res;
    }
  },
      err => {
        if (err) {
          Swal.fire(
            {
              type: 'error',
              title: 'Oops...',
              html: '<h3>ce code n\'est pas valide<h3>',
            })
        }
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();             }
        }
      }

    )
  }
  retrait() {
    this._trans.retrait(this.valide)
    .subscribe(
      res => {
          Swal.fire({
            title: 'Le retrait a été fait avec success !',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Imprimer recu!',
            cancelButtonText:  'annuler'
          }).then((result) => {
            if (result.value) {
              this.downloadPdf();

            }
          });
          this.recu=true;
    },
      err => {
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();             }
        }

      }
    )
  }
}
