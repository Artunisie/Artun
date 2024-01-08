import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoryProfileComponent } from './category-profile/category-profile.component';

const routes: Routes = [
  
  { path:'users', component: UsersComponent ,canActivate: [AuthGuard] },
  { path:'services', component: ServicesComponent ,canActivate: [AuthGuard]},
  {path:"Analytics",component:AnalyticsComponent,canActivate: [AuthGuard]},
  {path:"Categories",component:CategoriesComponent,canActivate: [AuthGuard]},
  {path:"Services",component:ServicesComponent,canActivate: [AuthGuard]},
  {path:"Reports",component:ReportsComponent,canActivate: [AuthGuard]},
  {path:"Settings",component:SettingsComponent,canActivate: [AuthGuard]},
  {path:"History",component:HistoryComponent,canActivate: [AuthGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate: [AuthGuard]},
  { path: 'user-profile/:id', component: UserProfileComponent ,canActivate: [AuthGuard]},
  { path: 'category-profile/:id', component: CategoryProfileComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
