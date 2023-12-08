import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { RigthSectionComponent } from './rigth-section/rigth-section.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RemindersComponent } from './reminders/reminders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnalyticsComponent,
    UsersComponent,
    ServicesComponent,
    RigthSectionComponent,
    UserProfileComponent,
    RemindersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
