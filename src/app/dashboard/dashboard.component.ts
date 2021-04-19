//import component
import { Component, OnDestroy, OnInit } from '@angular/core';
//router component
import { Router, ActivatedRoute } from '@angular/router';
//twitter icon import
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
//download icon import
import {faDownload, faSearch} from '@fortawesome/free-solid-svg-icons';
//reports icon import
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';

//servie class needed to hit api endpoints
import {Report, ServicesAPI, Tweet, TwitterUser} from '../services/api.service';
import { filter, first, map, min, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Label, Color } from 'ng2-charts';

//https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
//Link above is for code example of line and bar chat


@Component ({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnDestroy, OnInit {
  //twitter icon def
  twitterIcon = faTwitter;
  //report icon def
  reportsIcon=faFileAlt;
  //download icon def
  csvIcon=faDownload;
  //search icon def
  searchIcon=faSearch;

  //booleans for validUser and for the loading icon when report is being generated
  ifValidUser: boolean;
  public isLoading: boolean = false;

  //data froms needed to accept API responses
  public twitterUser: TwitterUser;
  public twitterUsername: string;
  public report: Report;

  //createing data for line and bar chart

  //bar graph data fields
  barChartOptions: ChartOptions = { responsive: true, scales: { yAxes: [{ticks:
    {
      suggestedMin: 0
    }
  }] } };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [];
  barChartLegend = true;

  //line graphs data fields
  lineChartOptions: ChartOptions = { responsive: true}
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'white'
    }
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartLabels: Label[] =['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];;
  lineChartData: ChartDataSets[] = [];


  public destroyed: Subject<any> = new Subject();

  //router constructor
  constructor(private router: Router,private api: ServicesAPI, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap
    .pipe(
      takeUntil(this.destroyed),
      filter(params => params.get("reportId") !== null)
    )
    .subscribe(params => {
      console.log(params.get("reportId"))

      this.isLoading = true;

      this.api.getReport(params.get("reportId"))
        .pipe(takeUntil(this.destroyed))
        .subscribe(genReport => {

          this.generateBarChart(genReport);
          this.generateLineChart(genReport);

          this.report = genReport;



          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          alert("Error loading report!");
        });
    });

  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  exportCSV() : void {
    window.alert("Exporting Report to CSV...");
  }

  //calls the api endpoint that searches for the user and returns it if it exists and should give alert if it does not
  //this method will also catch any errors throw by the request and let the user know that the user does not exist
  //the final step is calling the generate report method so that the report can be egenrated for the validated twitter user
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
  //calls the api service passing the twitter user so that the report generation can start
  //isloading will allow a loading incon to be displayed while the procces takes place
  public generateReport(twitterUser: TwitterUser)
  {
    this.api.generateReport(twitterUser)
      .pipe(takeUntil(this.destroyed))
      .subscribe(genReport => {

        this.generateBarChart(genReport);
        this.generateLineChart(genReport);

        this.report = genReport;



        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        alert("Error loading report!");
      });
  }

//this method is called on error and any other time the report and twitter user data needs to be reset
  public resetReport()
  {
    this.twitterUser = null;
    this.report = null;
  }

  public generateBarChart(report: Report)
  {
    const firstFive = report.topics
    .slice(0,5)
    .sort((a,b) => a.topic.toLowerCase().localeCompare(b.topic.toLowerCase()));

  this.barChartLabels  = firstFive
  .map(x => x.topic);

  this.barChartData = [
    {data: firstFive.map(x => x.count), label: 'Number of Uses'},
  ];
  }



  public generateLineChart(report: Report)
  {
    const yearData = new Map<Number,Tweet[]>();
    report.reportTweets.forEach((tweet) =>
    {

      const createdAt = new Date(tweet.createdAt);
      const year = createdAt.getFullYear();

      const tweets = (yearData.get(year) || []).concat(tweet);

      yearData.set(year,tweets);
    })


    const linechartData: ChartDataSets[] = [];
    const months = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    yearData.forEach((tweets,year) =>
    {

     const seriesData = months.map(month => {
        const count = tweets.filter(tweet => new Date(tweet.createdAt).getMonth() == month).length
        return count;
      })

      linechartData.push({
        data: seriesData,
        label: year.toString()
      });

    });
    this.lineChartData = linechartData;

  }
}



