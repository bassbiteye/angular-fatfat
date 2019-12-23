import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {


  laDate: Date = new Date();
  nomEntreprise: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.nomEntreprise = this.route.snapshot.params.addparData;
    setTimeout(() => {
      window.print();
    }, 3000
    );

  }
}
