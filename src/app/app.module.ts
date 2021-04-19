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
import { ServicesAPI } from './services/api.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//angular material and authentication intercepter imports
import { MatCardModule } from '@angular/material/card';
import { AuthIntercepter } from './services/auth.intercepter';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';

//import for ng2chats
//https://github.com/valor-software/ng2-charts
import { ChartsModule } from 'ng2-charts';

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
    MatCardModule,
    MatButtonModule,
    ScrollingModule,
    ChartsModule,
    HttpClientModule,
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
        path: 'dashboard/:reportId',
        component: DashboardComponent
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
  //providers are needed to use the api service and the intercepter for applying the user-id to the http requests is done here
  providers: [ServicesAPI,{provide: HTTP_INTERCEPTORS,useClass: AuthIntercepter,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
