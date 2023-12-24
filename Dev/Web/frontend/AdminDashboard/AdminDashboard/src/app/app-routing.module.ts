import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryProfileComponent } from './category-profile/category-profile.component';

const routes: Routes = [
  { path:'users', component: UsersComponent },
  { path:'services', component: ServicesComponent },
  {path:"Analytics",component:AnalyticsComponent},
  {path:"Categories",component:CategoriesComponent},
  {path:"Services",component:ServicesComponent},
  {path:"Reports",component:ReportsComponent},
  {path:"Settings",component:SettingsComponent},
  {path:"Login",component:LoginComponent},
  {path:"History",component:HistoryComponent},
  {path:"dashboard",component:DashboardComponent},
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'category-profile/:id', component: CategoryProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
