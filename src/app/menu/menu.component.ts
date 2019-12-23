import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  role: any;
  nom :any;
  prenom :any;
  imageName:any
  info :[];
  constructor(private _router: Router,private _auth:AuthService,  private location: Location) { }
 
      ngOnInit() {

    }
    
getRole(){
  this.role = localStorage.getItem('roles');
  console.log(this.role);
  
  return this.role;

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
}
