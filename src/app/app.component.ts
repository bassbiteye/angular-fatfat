import { logging } from 'protractor';
import { Component } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Transfert';
  roles: any;
  nom :any;
  prenom :any;
  imageName:any
  info :[];
  constructor(private _router: Router,private _auth:AuthService) { }

      ngOnInit() {

        this._auth.getInfo().subscribe(
          res =>{
            this.info=res
          },
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {
                  this._auth.logoutUser()
                }
              }
            }
        )
        this.getRole();
        this.getNom();
        this.getPrenom();
       this.getImageName();

    }
getRole(){
  this.roles = localStorage.getItem('roles');
  console.log(this.roles);
  return this.roles;

}
getNom(){
  this.nom = localStorage.getItem('nom');
  console.log(this.nom);
  return this.nom;
}
getPrenom(){
  this.prenom = localStorage.getItem('prenom');
  console.log(this.prenom);
  return this.prenom;

}
getImageName(){
  this.imageName = localStorage.getItem('imageName');
  console.log(this.imageName);
  return this.imageName;

}
isAuthenticate(){
  console.log('ceci est un test', this.roles)

  return !this.roles && (this.roles=="ROLE_SUPER"||this.roles=="ROLE_ADMIN"||this.roles=="ROLE_USERS"||this.roles=="ROLE_CAISSIER")
}
}
