import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  role: any;
  nom :any;
  prenom :any;
  info :[];
  constructor(private _auth:AuthService) { }

      ngOnInit() {
        this.getRole();
        this.getNom();
        this.getPrenom();

    }

getRole(){
  this.role = localStorage.getItem('roles');
  return this.role;

}
getNom(){
  this.nom = localStorage.getItem('nom');
  return this.nom;
}
getPrenom(){
  this.prenom = localStorage.getItem('prenom');
  return this.prenom;
}
}
