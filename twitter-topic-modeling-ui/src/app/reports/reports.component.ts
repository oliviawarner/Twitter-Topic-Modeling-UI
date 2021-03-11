import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})

export class ReportsComponent {   
  //router constructor
  constructor(private router: Router) { }
}