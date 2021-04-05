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

  public twitterUser: TwitterUser;

  //router constructor
  constructor(private router: Router,private api: ServicesAPI) { }


  public searchTwiterUser(twitterUsername: string)
  {
    this.api.twitterUserSearch(twitterUsername)
    .pipe(first())
    .subscribe(TwitterUser => {
      TwitterUser = this.twitterUser;

    })
  }

}

