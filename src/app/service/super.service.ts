import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Partenaire } from '../model/partenaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperService {
  private url = "http://localhost:81/api";

  selectedPart :any;
  constructor(private http: HttpClient) { }
  getListePar() {
    return this.http.get<Partenaire[]>(this.url + '/liste')
  }

  bloquer(id: number) {
    return this.http.post<any>(this.url + '/bloquer/' + id, '')
  }
  addPar(User,imageName : File) {

    const endpoint = 'http://localhost:81/api/addP';
    const formData: FormData = new FormData();
    formData.append('imageName', imageName,User.imageName);
    formData.append('username', User.username);
    formData.append('password', User.password);
    formData.append('prenom', User.prenom);
    formData.append('nom', User.nom);
    formData.append('telephone', User.telephone);
    formData.append('libelle', User.libelle);
    formData.append('raisonSocial', User.raisonSocial);
    formData.append('adresse', User.adresse);
    formData.append('ninea', User.ninea);
    formData.append('Description', User.Description);
    formData.append('fix', User.fix);
    formData.append('mail', User.mail);
    return this.postElement(formData,'/addP');

  }
  updateP(id,partenaire) : Observable<Partenaire> {
    return this.http.post<Partenaire>(this.url + '/updateP/' + id,
    JSON.stringify(partenaire));
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
