import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';
import { TeamComponent } from './team/team.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    FeaturesComponent,
    TeamComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'team',
        component: TeamComponent
      },
      {
        path: 'features',
        component: FeaturesComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}