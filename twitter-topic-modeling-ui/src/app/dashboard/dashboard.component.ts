import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {   
  //router constructor
  constructor(private router: Router) { }
        
}