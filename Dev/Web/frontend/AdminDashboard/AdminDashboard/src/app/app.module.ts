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
import { CategoriesComponent } from './categories/categories.component';
import { HistoryComponent } from './history/history.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init-keycloak'; // Import the initialization function
import { CategoryProfileComponent } from './category-profile/category-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnalyticsComponent,
    UsersComponent,
    ServicesComponent,
    RigthSectionComponent,
    UserProfileComponent,
    RemindersComponent,
    CategoriesComponent,
    HistoryComponent,
    ReportsComponent,
    SettingsComponent,
    DashboardComponent,
    CategoryProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule, // Add KeycloakAngularModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly keycloakService: KeycloakService) {
    initializeKeycloak(keycloakService);
  }
}
