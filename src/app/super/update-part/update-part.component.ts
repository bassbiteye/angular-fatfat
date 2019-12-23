import { SuperService } from './../../service/super.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-part',
  templateUrl: './update-part.component.html',
  styleUrls: ['./update-part.component.scss']
})
export class UpdatePartComponent implements OnInit {


  id = this.actRoute.snapshot.params['row'];
  updatePartData: any = {};

  constructor(
    public Super: SuperService,
    public actRoute: ActivatedRoute,
    public router: Router
    ) { }
  ngOnInit() {

    this.id =this.Super.selectedPart;
    this.updatePartData=this.id;
    console.log(this.id.id);
  }
  updateP() {
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
        this.Super.updateP(this.id.id, this.updatePartData)
            .subscribe(
              data => {
              this.router.navigate(['/super']);
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
