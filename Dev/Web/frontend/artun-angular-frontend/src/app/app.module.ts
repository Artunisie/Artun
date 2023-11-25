import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TechnicienMainComponent } from './pages/technicien-main/technicien-main.component';
import { DemandeComponent } from './pages/demande/demande.component';
import { OptionCliProfessComponent } from './components/option-cli-profess/option-cli-profess.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TechnicienHeaderComponent } from './components/technicien-header/technicien-header.component';
import { DemandeClientComponent } from './demande-client/demande-client.component';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { HistoriquetechnicienComponent } from './pages/historiquetechnicien/historiquetechnicien.component';
import { AcceuilclientComponent } from './pages/acceuilclient/acceuilclient.component';
import { ProfileclientComponent } from './pages/profileclient/profileclient.component';
import { HistoriqueclientComponent } from './pages/historiqueclient/historiqueclient.component';
import { PostJobComponent } from './pages/post-job/post-job.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
export function playerFactory(): any {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DemandeComponent,
    OptionCliProfessComponent,
    HeaderComponent,
    TechnicienMainComponent,
    RegisterLoginComponent,
    ProfileComponent,
    TechnicienHeaderComponent,
    DemandeClientComponent,
    ChatPopupComponent,
    HistoriquetechnicienComponent,
    AcceuilclientComponent,
    ProfileclientComponent,
    HistoriqueclientComponent,
    PostJobComponent,

  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    MatSliderModule,
    NgbRatingModule,
    MatDialogModule,
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
