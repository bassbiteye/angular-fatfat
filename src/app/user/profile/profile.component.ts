import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router,private _authService: AuthService ) { }
  profile: any;
  registerUser: {};
  ngOnInit() {
    this._authService.getProfile()
      .subscribe(
        res=>{
          this.profile=res,
          console.log(this.profile)
        }
        ,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
        )
  }

}
