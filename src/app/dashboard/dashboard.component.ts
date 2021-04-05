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

  //router constructor
  constructor(private router: Router) { }
}