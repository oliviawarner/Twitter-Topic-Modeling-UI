//import component
import { Component } from '@angular/core';
//router component
import { Router } from '@angular/router';
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
//bar chart icon import
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
//reports icon import
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';

//servie class needed to hit api endpoints
import {ServicesAPI, TwitterUser} from '../services/api.service';
import { first } from 'rxjs/operators';







@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  //dashboard icon def
  twitterIcon = faTwitter;
  barchartIcon=faChartBar;
  reportsIcon=faFileAlt;

  ifValidUser: boolean;

  public twitterUser: TwitterUser;
  public twitterUsername: string;

  //router constructor
  constructor(private router: Router,private api: ServicesAPI) { }

  //calls the api endpoint that searches for the user and returns it if it exists and should give alert if it does not
  public searchTwitterUser(twitterUsername: string)
  {
    this.api.twitterUserSearch(twitterUsername)
    .pipe(first())
    .subscribe(TwitterUser => {

      if(TwitterUser === null)
      {
        alert("Twitter User does not exist");
      }

      TwitterUser = this.twitterUser;

    })


  }

  //generate Report
  public generateReport()
  {
    
  }

}

