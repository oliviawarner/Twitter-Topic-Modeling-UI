//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


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
