import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Partenaire} from '../../model/partenaire';
import { AuthService } from 'src/app/service/auth.service';


@Component({

  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  constructor(private _trans:TransactionService,
    private _router: Router,private _auth:AuthService) { }
  ngOnInit() {
  }
  part ={}
  Partenaire : Partenaire[];
  findPartenaire(){
    this._trans.findPartenaire(this.part)
    .subscribe(
    
   res =>{this.Partenaire =res
    console.log(this.Partenaire)
  },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        }
      
    )
  }
  addC(){
    this._trans.addC(this.part)
    .subscribe(
      res => {
        if (res) {
          Swal.fire({
            type: 'success',
            text :'le nouveau numéro de compte',
            title: res.num,
            showConfirmButton: false,
         
          }
          )
        }

       // window.location.reload();

      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        }
      
    )
  }
}
