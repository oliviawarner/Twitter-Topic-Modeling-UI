//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';


@Component ({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent {
    //router constructor
  constructor(private router: Router) { }
}