import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MatInputModule} from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.component.html',
  styleUrls: ['./envoi.component.scss']
})
export class EnvoiComponent implements OnInit {
  EnvoiData = {};
  tarif;
  afficherRecu = false;
  transactionService: any;
  sendForm: any;
  entrepriseService: any;
  rep: any;
  laDate: Date = new Date();

  constructor(private _trans: TransactionService, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  downloadPdf() {
    var printContents = document.getElementById('contrat').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
frais() {
  this._trans.frais(this.EnvoiData)
  .subscribe(

 res => {this.tarif = res;
         console.log(this.tarif);
},
    err => {
      if ( err instanceof HttpErrorResponse ) {
        if (err.status === 401) {
          this._authService.logoutUser();        }
      }
    }
  );
}


// tslint:disable-next-line: adjacent-overload-signatures
envoi() {
this._trans.envois(this.EnvoiData).then(
  rep => {
this.rep = rep;
if (rep.status) {
  Swal.fire(
    {
      type: 'warning',
      title: 'Oops...',
    html: '<h1>' + rep.message + '</h1>',
    })
}
if (rep) {
  Swal.fire({
    title: 'Le transfert a été fait avec success !',
    type: 'success',
    html:
    '<h2>Bénéficiaire</h2>'
    +'<p>Nom : '+rep.beneficiaire.nomb+'</p>'
    +'<p>Prenom : '+rep.beneficiaire.prenomb+'</p>'
    +'<p>Téléphone : '+rep.beneficiaire.telephoneb+'</p>'
    +'<h2>Envoyeur</h2>'
    +'<p>Nom : '+rep.expediteur.nomE+'</p>'
    +'<p>prenom : '+rep.expediteur.prenomE+'</p>'
    +'<p>Téléphone : '+rep.expediteur.telephoneE+'</p>'
    +'<h2>Transaction</h2>'
    +'<p>Code : <strong>'+rep.codeSecret+'</strong></p>'
    +'<p>Montant retiré : '+rep.montantTransaction+' </p>',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK',
    cancelButtonText:  'annuler'
  }).then((result) => {
    if (result.value) {
      this.downloadPdf();
    }
    this.afficherRecu=false;

  });
  }
  },
  error => {
    console.log('Erreur : ' + error.message);
    if ( error instanceof HttpErrorResponse ) {
      if (error.status === 401) {
        this._authService.logoutUser();
           }
    }
  }
);
}

}
