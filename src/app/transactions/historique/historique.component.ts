import { Component, OnInit ,ViewChild } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import {Operations} from '../../model/operations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  displayedColumns: string[] = ['numCompte','solde','montantdepose','monatantAvantDepot','DateDepot'];
  dataSource: MatTableDataSource<Operations>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  operation :any;

    constructor( private _trans :TransactionService,
       private _router: Router,private _authService: AuthService) { }
 
    ngOnInit() {
  
      this._authService.historique().subscribe(
          (operations: Operations[])=>{
        
            this.operation=operations;
            this.dataSource = new MatTableDataSource(this.operation=operations);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.dataSource);
  
          },
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this._authService.logoutUser();        }
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
    

  }
  


