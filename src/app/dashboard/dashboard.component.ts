//import component
import { Component, OnDestroy } from '@angular/core';
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
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnDestroy {
  //twitter icon def
  twitterIcon = faTwitter;
  //report icon def
  reportsIcon=faFileAlt;
  //download icon def
  csvIcon=faDownload;
  //search icon def
  searchIcon=faSearch;

  ifValidUser: boolean;
  public isLoading: boolean = false;

  public twitterUser: TwitterUser;
  public twitterUsername: string;
  public report: Report;


  public destroyed: Subject<any> = new Subject();

  //router constructor
  constructor(private router: Router,private api: ServicesAPI) { }
  ngOnDestroy(): void {
    this.destroyed.next();
  }

  exportCSV() : void {
    window.alert("Exporting Report to CSV...");
  }

  //calls the api endpoint that searches for the user and returns it if it exists and should give alert if it does not
  public searchTwitterUser(twitterUsername: string)
  {
    this.isLoading = true;
    this.resetReport();
    this.api.twitterUserSearch(twitterUsername)
    .pipe(takeUntil(this.destroyed))
    .subscribe(TwitterUser => {

      this.twitterUser = TwitterUser;
      this.generateReport(this.twitterUser);

    },
    error => {
      this.isLoading = false;
      alert("Twitter User Does Not Exist!");
    })


  }

  //generate Report
  public generateReport(twitterUser: TwitterUser)
  {
    this.api.generateReport(twitterUser)
      .pipe(takeUntil(this.destroyed))
      .subscribe(genReport => {


        this.report = genReport;

        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        alert("Error loading report!");
      });
  }


  public resetReport()
  {
    this.twitterUser = null;
    this.report = null;
  }
}



