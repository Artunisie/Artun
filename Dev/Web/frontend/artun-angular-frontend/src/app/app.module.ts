import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TousLesTechniciensComponent } from './pages/tous-les-techniciens/tous-les-techniciens.component';
import { TechnicienMainComponent } from './pages/technicien-main/technicien-main.component';
import { DemandeComponent } from './pages/demande/demande.component';
import { OptionCliProfessComponent } from './components/option-cli-profess/option-cli-profess.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NgbRatingModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TechnicienHeaderComponent } from './components/technicien-header/technicien-header.component';
import { DemandeClientComponent } from './pages/demande-client/demande-client.component';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { HistoriquetechnicienComponent } from './pages/historiquetechnicien/historiquetechnicien.component';
import { AcceuilclientComponent } from './pages/acceuilclient/acceuilclient.component';
import { ProfileclientComponent } from './pages/profileclient/profileclient.component';
import { HistoriqueclientComponent } from './pages/historiqueclient/historiqueclient.component';
import { PostJobComponent } from './pages/post-job/post-job.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ConversationsComponent } from './conversations/conversations.component';
import { ChatSideBarComponent } from './components/chat-sideBar/chat-sideBar.component';
import { MessagesComponent } from './messages/messages.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppAuthGuard } from './app.authguard';
import { initializeKeycloak } from './init/keycloak-init.factory';


import { VideoclientComponentComponent } from './components/videoclient-component/videoclient-component.component';
import { VideotechnyComponentComponent } from './components/videotechny-component/videotechny-component.component';
const keycloakService = new KeycloakService();
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
    ConversationsComponent,
    ChatSideBarComponent,
    MessagesComponent,
    TousLesTechniciensComponent,
    VideoclientComponentComponent,
    VideotechnyComponentComponent,
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    NgbRatingModule,
    MatDialogModule,
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    KeycloakAngularModule,
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
