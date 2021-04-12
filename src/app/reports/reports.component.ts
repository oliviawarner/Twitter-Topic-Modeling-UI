import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ngOnInit(): void {

  this.reportList = this.api.getReportList()

  }

}
