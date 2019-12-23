import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import {User} from '../../model/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {


  displayedColumns: string[] = ['nom', 'prenom', 'telephone' ,'role','etat','affecter'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  listeUser :User[]
  addparData= []

    etat= []
    constructor( private _authService :AuthService,
       private _router: Router) { }
 
    ngOnInit() {
  
      this._authService.getListeUser()
      .subscribe(
          (listeUser: User[])=>{
            this.listeUser=listeUser;
            this.dataSource = new MatTableDataSource(this.listeUser);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          console.log(this.listeUser)
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._authService.logoutUser();
            }
          }
        }
      )
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    
   bloquerU (id: number){
      this._authService.bloquerU(id).subscribe(
        res => {
          this.etat =res
          if (res.messages) {
            Swal.fire({
              type: 'success',
              title: res.messages,
              showConfirmButton: false,
            
            })
      }
  this.ngOnInit()
      //window.location.reload();
         
      },
        err=>{
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._authService.logoutUser();
            }
          }
        }
      );
    }
    updateUserP(){

    }
  }
  

