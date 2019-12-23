import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SuperComponent } from './super/listePar/super.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { AddparComponent } from './super/addpar/addpar.component';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { RegisterComponent } from './user/register/register.component';
import { ListeUserComponent } from './user/liste-user/liste-user.component';
import {SytemComponent} from './user/sytem/sytem.component';
import { EnvoiComponent } from './transactions/envoi/envoi.component';
import { RetraitComponent } from './transactions/retrait/retrait.component';
import { DetailsComponent } from './transactions/details/details.component';
import { UpdatePartComponent } from './super/update-part/update-part.component';
import { DepotComponent } from './transactions/depot/depot.component';
import { CompteComponent } from './transactions/compte/compte.component';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { DetailPartenareComponent } from './transactions/detail-partenare/detail-partenare.component';
import { HistoriqueComponent } from './transactions/historique/historique.component';
import { MenuComponent } from './menu/menu.component';
import { ContratComponent } from './super/contrat/contrat.component';
import { AffecterComponent } from './user/affecter/affecter.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { ConteinerComponent } from './menu/conteiner/conteiner.component';
import { ProfileComponent } from './user/profile/profile.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'super', component: SuperComponent, canActivate: [AuthGuard]},
  {path: 'accueil', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'addPar', component: AddparComponent, canActivate: [AuthGuard]},
  {path: 'addCompte', component: CompteComponent, canActivate: [AuthGuard]},
  {path: 'users', component: ListeUserComponent, canActivate: [AuthGuard]},
  {path: 'usersys', component: SytemComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotfoundComponent , canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
  {path: 'envoi', component: EnvoiComponent , canActivate: [AuthGuard]},
  {path: 'retrait', component: RetraitComponent , canActivate: [AuthGuard]},
  {path: 'detail', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'detailP', component: DetailPartenareComponent, canActivate: [AuthGuard]},
  {path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard]},
  {path: 'depot', component: DepotComponent , canActivate: [AuthGuard]},
  {path: 'contrat', component: ContratComponent , canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  {path: 'affecter/:id', component: AffecterComponent, canActivate: [AuthGuard]},
  {path: 'updatepart', component: UpdatePartComponent, canActivate: [AuthGuard]},
  {path: 'forbidden', component: ForbiddenComponent},
  // {path:'footer',component:FooterComponent,canActivate:[AuthGuard]},
  // {path:'sidebar',component:SidebarComponent,canActivate:[AuthGuard]},
  // {path:'navbar',component:NavbarComponent,canActivate:[AuthGuard]},
   {path: 'conteiner', component: ConteinerComponent, canActivate: [AuthGuard]},
  {path : '**', redirectTo: '/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
