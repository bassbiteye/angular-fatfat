import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';

import {User} from '../../model/user';
import { FormBuilder } from '@angular/forms';

import { Profils } from '../../model/profils';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //  registerUserData = new User('','',2,'','','','');
  registerUserData ={};
  imageName: File = null;
  imageUrl: string = "/assets/img/user.jpg";
  listeProfile;
  message : any ;
  role : any = localStorage.getItem('roles');
  constructor(private fb: FormBuilder, private _auth: AuthService,
              private _router: Router) { }

              ngOnInit() {


                this._auth.getListeProfile()
                .subscribe(
                  res => {
                    this.listeProfile = res;
                  // tslint:disable-next-line: triple-equals
                    if (this.role == 'ROLE_SUPER') {
                    this.listeProfile =  [this.listeProfile[0], this.listeProfile[3]];
                  // tslint:disable-next-line: triple-equals
                  } else  if (this.role == 'ROLE_ADMIN') {
                    this.listeProfile = [this.listeProfile[1], this.listeProfile[2]]  ;
                  }


                 console.log(this.listeProfile);
                  }
                ,

                  err => {
                    if ( err instanceof HttpErrorResponse ) {
                      if (err.status === 401) {
                        this._auth.logoutUser();                         }
                    }
                  }
                );
              }
  handleFileInput(file: FileList) {
    this.imageName = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.imageName );
  }
  registerUser() {

    this._auth.registerUser(this.registerUserData, this.imageName)
    .subscribe(
      res => {
        console.log(this.registerUserData);
        if (res) {
            Swal.fire({
              type: 'success',
               title: 'l\'utilisateur a été ajouté avec succes',
              showConfirmButton: false,

            });
        }

        this._router.navigate(['/accueil']);
      },
      err => {
        if ( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
        }
      }
    );

  }

}
