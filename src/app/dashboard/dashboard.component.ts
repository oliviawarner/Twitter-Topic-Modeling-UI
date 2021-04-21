//import component
import { Component } from '@angular/core';
//router component
import { Router } from '@angular/router';
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
//download icon import
import {faDownload, faSearch} from '@fortawesome/free-solid-svg-icons';
//reports icon import
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';

//servie class needed to hit api endpoints
import {Report, ServicesAPI, TwitterUser} from '../services/api.service';
import { first } from 'rxjs/operators';

//component file connections
@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  //twitter icon def
  twitterIcon = faTwitter;
  //report icon def
  reportsIcon=faFileAlt;
  //download icon def
  csvIcon=faDownload;
  //search icon def
  searchIcon=faSearch;

  //valid user 
  ifValidUser: boolean;

  //twitter user
  public twitterUser: TwitterUser;
  //twitter username
  public twitterUsername: string;
  //report
  public report: Report;

  //router and api constructor
  constructor(private router: Router,private api: ServicesAPI) { }

  //test message for export csv button ~ added to future use of application
  exportCSV() : void {
    window.alert("Exporting Report to CSV...");
  }

  //calls the api endpoint that searches for the user and returns it if it exists and should give alert if it does not
  public searchTwitterUser(twitterUsername: string)
  {
    this.api.twitterUserSearch(twitterUsername)
    .pipe(first())
    .subscribe(TwitterUser => {

      //if the twitter user does not exist
      if(TwitterUser === null)
      {
        alert("Twitter User Does Not Exist!");
        return;

      }

      //grabs user if it exists
      TwitterUser = this.twitterUser;

    })

    //generates report based on searched twitter user
    this.generateReport(this.twitterUser);
  }

  //generate twitter user report
  public generateReport(twitterUser: TwitterUser)
  {
    this.api.generateReport(twitterUser);
  }

}

