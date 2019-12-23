import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { SuperService } from '../../service/super.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-addpar',
  templateUrl: './addpar.component.html',
  styleUrls: ['./addpar.component.scss']
})
export class AddparComponent implements OnInit {
  listePar = [];
    partform: FormGroup;
    imageName: File = null;
    imageUrl = '/assets/img/user.jpg';
    laDate: Date = new Date();
    recu = false;
    res: any;
  addparData = {nom: '', ninea: null, username: '', prenom : '', raisonSocial: '', fix: '' , mail: '', adresse: '' };
  errorMsg: any;

  constructor( private formBuilder: FormBuilder, private _superService: SuperService,
               private _auth: AuthService, private _router: Router) { }

  ngOnInit() {}
  downloadPdf() {
    var printContents = document.getElementById('contrat').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  handleFileInput(file: FileList) {
  this.imageName = file.item(0);

    // Show image preview
  const reader = new FileReader();
  reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
  reader.readAsDataURL(this.imageName );
  }
  addPar() {
    this._superService.addPar(this.addparData, this.imageName).then(
      res => {
        this.res = res;
        if (res) {
          console.log(res);

          Swal.fire({
            title: '<strong>Partenaire enregistré</strong>',
            type: 'success',
            html:
                 '<p>Raison Sosiale : ' + this.addparData.raisonSocial + '</p>'
                + '<p>Pays : Sénégal </p>'
                + '<p>Adresse : ' + this.addparData.adresse + '</p>'
                + '<p><strong> numéro compte ' +res.message + '</strong></p>'
                + '<p>ninea : ' + this.addparData.ninea + '</p>'
                + '<h2>Responsable</h2>'
                + '<p>Nom : ' + this.addparData.nom + '</p>'
                + '<p>Login : ' + this.addparData.username + '</p>'
                + '<p>Téléphone : ' + this.addparData.fix + '</p>'
                + '<p>Email : <strong>' + this.addparData.mail + '</strong></p>',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Imprimer contrat!',
                cancelButtonText:  'annuler'

          }).then((result) => {
            if (result.value) {
              this.downloadPdf();
            }
          });
          this.recu=true;

          console.log(res);
        }
      },
      err => {
        this.errorMsg = err.statusText;
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }

      }
    );
  }
}



