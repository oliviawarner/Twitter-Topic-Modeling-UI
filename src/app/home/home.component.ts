//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';

//Icons: https://www.npmjs.com/package/@fortawesome/angular-fontawesome
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

//component file connections
@Component ({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  //twitter icon
  twitterIcon = faTwitter;

  //router constructor
  constructor(private router: Router) { }
}
