//material
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

//material end
import { DatePipe } from '@angular/common';
import { AffecterComponent } from './user/affecter/affecter.component';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { MatTableModule } from '@angular/material/table';
import {Routes,RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { SuperComponent } from './super/listePar/super.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { SuperService } from './service/super.service';
import { AddparComponent } from './super/addpar/addpar.component';
import {TokenInterceptorService} from './service/token-interceptor.service';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { RegisterComponent } from './user/register/register.component';
import { ListeUserComponent } from './user/liste-user/liste-user.component';
import { EnvoiComponent } from './transactions/envoi/envoi.component';
import { RetraitComponent } from './transactions/retrait/retrait.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { DepotComponent } from './transactions/depot/depot.component';
import { CompteComponent } from './transactions/compte/compte.component';
import { SytemComponent } from './user/sytem/sytem.component';
import { DetailsComponent } from './transactions/details/details.component';
import { DetailPartenareComponent } from './transactions/detail-partenare/detail-partenare.component';
import { HistoriqueComponent } from './transactions/historique/historique.component';
import { MenuComponent } from './menu/menu.component';
import { ContratComponent } from './super/contrat/contrat.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { ConteinerComponent } from './menu/conteiner/conteiner.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdatePartComponent } from './super/update-part/update-part.component';
const MaterialComponents=[
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule,
  MatTreeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRippleModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperComponent,
    NotfoundComponent,
    AddparComponent,
    ForbiddenComponent,
    RegisterComponent,
    ListeUserComponent,
    EnvoiComponent,
    RetraitComponent,
    DepotComponent,
    CompteComponent,
    SytemComponent,
    DetailsComponent,
    DetailPartenareComponent,
    HistoriqueComponent,
    MenuComponent,
    ContratComponent,
    AffecterComponent,
    SidebarComponent,
    NavbarComponent,
    ConteinerComponent,
    ProfileComponent,
    UpdatePartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MaterialComponents
  ],
exports:[MaterialComponents],
  providers: [
    AuthService,
    SuperService,
    AuthGuard,
    DatePipe,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
