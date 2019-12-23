import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-affecter',
  templateUrl: './affecter.component.html',
  styleUrls: ['./affecter.component.scss']
})
export class AffecterComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  userData: any = {};
  listeCompte
  constructor(
    public _auth: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit() {
    this._auth.getListeCompte()
    .subscribe(
      res =>{
        this.listeCompte=res
      console.log(this.listeCompte)
    });
    this._auth.getUser(this.id)
      .subscribe(data => this.userData = data);
  }

  affecter() {
 
      Swal.fire({
        type: 'warning',
        title:'voulez vous vraiment affecter',
        showCancelButton: true,
        confirmButtonColor: 'btn btn-success',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui!',
        cancelButtonText:'non'
      }).then((result) => {
        if (result.value) {
          this._auth.affecter(this.id, this.userData)
              .subscribe(data => {
                this.router.navigate(['/users'])
              })
        }
        
      })
 
    // if(window.confirm('Are you sure you want to update?')) {
    //   this._auth.affecter(this.id, this.userData)
    //     .subscribe(data => {
    //       this.router.navigate(['/users'])
    //     })
    // }

}
}
