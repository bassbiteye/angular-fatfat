import { Component, OnInit ,ViewChild} from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Router } from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import {Transaction} from '../../model/transaction';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from '../../model/data-model';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-detail-partenare',
  templateUrl: './detail-partenare.component.html',
  styleUrls: ['./detail-partenare.component.scss']
})
export class DetailPartenareComponent implements OnInit {
  form: FormGroup

  dataTable: any;
  displayedColumns: string[] = ['montantTransaction', 'dateEnvoi', 'tarif','commission', 'agent','beneficiaire', 'expediteur'];
  dataSource: MatTableDataSource<Transaction>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  detail :Transaction[]
  date1 :{}
 // const date1 = new Date();
  constructor( private _detailP :TransactionService,
     private _router: Router,private _auth:AuthService, private fb: FormBuilder) {
      this.createForm();
      }
      createForm() {
        this.form = this.fb.group({
          dateTo: ['', Validators.required ],
          dateFrom: ['', Validators.required ]
        }, {validator: this.dateLessThan('dateFrom', 'dateTo')});
      }
      dateLessThan(from: string, to: string) {
        return (group: FormGroup): {[key: string]: any} => {
          let f = group.controls[from];
          let t = group.controls[to];
          const now=new Date();
          if (f.value > t.value) {
            return {
              dates: "Date de debut doit etre plus petit que Date de fin"
            };
          }
          if (t.value > now) {
            return {
              dates: "Date de fin doit etre plus grand  qu\'aujourd\'hui"
            };
          }
          return {};
        }
      }
onSubmit() {
  this._detailP.detailEnvoiP(this.form.value)
  .subscribe(
    (detail: Transaction[])=>{
      this.detail=detail;
      this.dataSource = new MatTableDataSource(this.detail);
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
        inSubmit() {
          this._detailP.detailRetraitP(this.form.value)
          .subscribe(
            (detail: Transaction[])=>{
              this.detail=detail;
              this.dataSource = new MatTableDataSource(this.detail);
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

  ngOnInit() {

}
detailEnvoi(){
  this._detailP.detailEnvoi(this.date1)
  .subscribe(
    (detail: Transaction[])=>{
      this.detail=detail;
      this.dataSource = new MatTableDataSource(this.detail);
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

}
