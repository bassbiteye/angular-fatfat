import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  constructor(private _trans:TransactionService,
    private _router: Router,private _auth :AuthService) { }
    Compte
    CompteData ={}

  ngOnInit() {
  }
  findCompte(){
    this._trans.findCompte(this.CompteData)
    .subscribe(
    
   res =>{this.Compte =res
 },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          
        }
      }
    )
  }
  depot(){
    this._trans.depot(this.CompteData)
    .subscribe(
      res => {
        if (res.message) {
          Swal.fire({
            type: 'warning',
            title: res.message,
            showConfirmButton: true,
          
          })
        }
        this._router.navigate(['/historique'])
      },
      err => {
        if (err.message) {
          Swal.fire({
            type: 'success',
            title: err.message,
            showConfirmButton: true,
          
          })
        }
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        
      }
    )
  }
}
