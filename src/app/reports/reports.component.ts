import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Icons: https://www.npmjs.com/package/@fortawesome/angular-fontawesome
//left arrow import
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Observable } from 'rxjs';
import {ServicesAPI, Report} from '../services/api.service';

@Component ({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit{
  //back to dashboard icon
  backIcon = faArrowLeft;

  public reportList:Observable<Report[]>;

  public userId: String;

  //router constructor
  constructor(private router: Router, private api: ServicesAPI) { }

  //these items are done on intial load of the page
  //the report list needs to be loaded so the data is there for each report to be displayed
  ngOnInit(): void {

  this.reportList = this.api.getReportList()

  }


}
