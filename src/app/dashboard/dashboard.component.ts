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

  ifValidUser: boolean;

  public twitterUser: TwitterUser;
  public twitterUsername: string;
  public report: Report;

  //router constructor
  constructor(private router: Router,private api: ServicesAPI) { }

  exportCSV() : void {
    window.alert("Exporting Report to CSV...");
  }

  //calls the api endpoint that searches for the user and returns it if it exists and should give alert if it does not
  public searchTwitterUser(twitterUsername: string)
  {
    this.api.twitterUserSearch(twitterUsername)
    .pipe(first())
    .subscribe(TwitterUser => {

      if(TwitterUser === null)
      {
        alert("Twitter User does not exist");
        return;
        alert("Twitter User Does Not Exist!");
      }

      TwitterUser = this.twitterUser;

    })

    this.generateReport(this.twitterUser);
  }

  //generate Report
  public generateReport(twitterUser: TwitterUser)
  {
    this.api.generateReport(twitterUser);
  }

}

