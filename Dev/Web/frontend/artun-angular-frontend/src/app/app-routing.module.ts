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
const routes: Routes = [
  {path:'',component:HomePageComponent} ,
  {path:'login_register',component:RegisterLoginComponent} , // the mode is either login or register
  { path: 'professionel', component: TechnicienMainComponent },
  {path:'demande/:id',component:DemandeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'demandeClient/:id',component:DemandeClientComponent},
  {path:'historiquetechnicien',component:HistoriquetechnicienComponent},
  {path:'acceuilclient',component:AcceuilclientComponent},
  {path:'historiquecleint',component: HistoriqueclientComponent},
  {path:'profileclient',component:ProfileclientComponent},
  {path:'postJob',component: PostJobComponent},
  {path:'mainPage' , component:ConversationsComponent , children: [
    { path: 'messages/:id', component: MessagesComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
