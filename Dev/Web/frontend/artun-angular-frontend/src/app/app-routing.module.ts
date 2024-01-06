import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterLoginComponent } from './pages/register-login/register-login.component';
import { TechnicienMainComponent } from './pages/technicien-main/technicien-main.component';
import { DemandeComponent } from './pages/demande/demande.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DemandeClientComponent } from './pages/demande-client/demande-client.component';
import { HistoriquetechnicienComponent } from './pages/historiquetechnicien/historiquetechnicien.component';
import { AcceuilclientComponent } from './pages/acceuilclient/acceuilclient.component';
import { HistoriqueclientComponent } from './pages/historiqueclient/historiqueclient.component';
import { ProfileclientComponent } from './pages/profileclient/profileclient.component';
import { PostJobComponent } from './pages/post-job/post-job.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { TousLesTechniciensComponent } from './pages/tous-les-techniciens/tous-les-techniciens.component';
import { AppAuthGuard } from './app.authguard';
const routes: Routes = [
  {path:'',component:HomePageComponent} ,
  {path:'login_register',component:RegisterLoginComponent} , // the mode is either login or register
  { path: 'professionel',canActivate: [AppAuthGuard],data: { roles: ['user'] }, component: TechnicienMainComponent },
  {path:'demande/:id',canActivate: [AppAuthGuard],data: { roles: ['user'] },component:DemandeComponent},
  {path:'profile',/*canActivate: [AppAuthGuard],data: { roles: ['user'] },*/component:ProfileComponent},
  {path:'demandeClient/:id',canActivate: [AppAuthGuard],data: { roles: ['user'] },component:DemandeClientComponent},
  {path:'historiquetechnicien',canActivate: [AppAuthGuard],data: { roles: ['user'] },component:HistoriquetechnicienComponent},
  {path:'acceuilclient',canActivate: [AppAuthGuard],data: { roles: ['user'] },component:AcceuilclientComponent},
  {path:'historiquecleint',canActivate: [AppAuthGuard],data: { roles: ['user'] },component: HistoriqueclientComponent},
  {path:'profileclient',canActivate: [AppAuthGuard],data: { roles: ['user'] },component:ProfileclientComponent},
  {path:'postJob',canActivate: [AppAuthGuard],data: { roles: ['user'] },component: PostJobComponent},
  {path:'mainPage' ,canActivate: [AppAuthGuard],data: { roles: ['user'] }, component:ConversationsComponent , children: [
  { path: 'messages/:id', component: MessagesComponent },
  {path:'touslestechniciens',component:TousLesTechniciensComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AppAuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
