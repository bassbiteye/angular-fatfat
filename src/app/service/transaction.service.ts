import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Partenaire } from '../model/partenaire';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = "http://localhost:81/api";

  constructor(private http: HttpClient) { }
  envois(data:any){
    return this.postElement(data,'/envoi');
  }
  /* envoi(envoi) {
    return this.http.post<any>(this.url+'/envoi', envoi)
    //return this.http.post<any>(this._addPar, partenaire,this.headers)
  } */
  retrait(retrait) {
    return this.http.post<any>(this.url+'/retrait', retrait)
  }
  findCompte(findCompte) {
    return this.http.post<any>(this.url+'/findCompte', findCompte)
  }
  verifier(code) {
    return this.http.post<any>(this.url+'/verif', code)
  }
  frais(frais) {
    return this.http.post<any>(this.url+'/frais', frais)
  }
  depot(compte) {
    return this.http.post<any>(this.url+'/depot', compte)
  }
  findPartenaire(partenaire) {
    return this.http.post<Partenaire[]>(this.url+'/findPar', partenaire)
  }
  addC(compte) {
    return this.http.post<any>(this.url+'/addCompte', compte)
  }
  detailEnvoi(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailEnvoi', formData)
  }
  detailEnvoiP(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailEnvoiP', formData)
  }
  detailRetrait(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailRetrait', formData)
  }
  detailRetraitP(_detail) {
    const formData: FormData = new FormData();
    formData.append('dateFrom', _detail.dateFrom);
    formData.append('dateTo', _detail.dateTo);

    return this.http.post<any>(this.url+'/detailRetraitP', formData)
  }

  postElement(data:any,url:string){//return une promise
    return new Promise<any>(
      (resolve,reject)=>{
      this.http
        .post<any>(this.url+url,data).subscribe(
          rep=>{
          resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            console.log(error.error.Erreur)
            reject(error);
          }
        );
      })
  }
}
