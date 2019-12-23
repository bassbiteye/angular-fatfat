import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-conteiner',
  templateUrl: './conteiner.component.html',
  styleUrls: ['./conteiner.component.scss']
})
export class ConteinerComponent implements OnInit {

  info :any;
  count :[];
  nom :any;
  affiche=false;
  constructor(private _router: Router,private _auth:AuthService) { }

      ngOnInit() {
           //     window.location.reload();

        this._auth.getInfo().subscribe(
          res =>{
            this.info=res
            if( this.info){
              this.affiche=true;

            }
            console.log(this.affiche);
          },
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {
                  this._router.navigate(['/login'])
                }
              }
            }
        )
        this._auth.getCount().subscribe(
          res =>{
            this.count=res
            console.log(this.count)
          },
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {
                  this._router.navigate(['/login'])
                }
              }
            }
        )
        this.getNom();
}
getNom(){
  this.nom = localStorage.getItem('nom');
  return this.nom;
}
}

