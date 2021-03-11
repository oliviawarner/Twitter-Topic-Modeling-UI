//import component
import { Component } from '@angular/core';
//router component
import { Router } from '@angular/router';
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {   
  //twitter icon
  twitterIcon = faTwitter;
  //router constructor
  constructor(private router: Router) { }
}