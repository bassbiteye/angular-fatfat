import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { SuperService } from '../../service/super.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import {Partenaire} from '../../model/partenaire';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import * as jsPDF from 'jspdf';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.scss'],

})
export class SuperComponent implements OnInit {
  title = 'liste '
  dataTable: any;
  displayedColumns: string[] = ['raisonSocial', 'ninea', 'adresse', 'etat', 'Modifier'];
  dataSource: MatTableDataSource<Partenaire>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  listePar :Partenaire[]
  addparData= []
  etat=[]
  constructor( private _superService :SuperService,
     private _auth: AuthService,private router:Router) { }
     downloadPdf(){
      console.log('test pdf');
      const doc = new jsPDF();
      doc.text(this.displayedColumns,15,15)
      doc.save('fist.pdf');
    }
  ngOnInit() {

    this._superService.getListePar()
    .subscribe(
      (listePar: Partenaire[])=>{
        this.listePar=listePar;
        this.dataSource = new MatTableDataSource(this.listePar);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        }

    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  bloquer(id: number){

    this._superService.bloquer(id).subscribe(
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
    },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        }
    );
  }
  goToView(Partenaire: any){
    this._superService.selectedPart = Partenaire;
    this.router.navigateByUrl('/updatepart');
    }
}
