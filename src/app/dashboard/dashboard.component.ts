//import component
import { Component, OnDestroy, OnInit } from '@angular/core';
//router component
import { Router, ActivatedRoute } from '@angular/router';

//Icons: https://www.npmjs.com/package/@fortawesome/angular-fontawesome
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

//link to chart.js package
//https://github.com/chartjs
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';

//link to ng2-charts package
//https://github.com/valor-software/ng2-charts
import { Label, Color } from 'ng2-charts';

//https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
//Link above is for code example of line and bar chat

//component file connections
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
  //valid user
  ifValidUser: boolean;
  public isLoading: boolean = false;

  //data froms needed to accept API responses
  //twitter user
  public twitterUser: TwitterUser;
  //twitter username
  public twitterUsername: string;
  //report
  public report: Report;

  //createing data for line and bar chart

  //bar graph data fields
  //tutorial for using the ng2-charts https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
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
  ////tutorial for using the ng2-charts https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
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

  //subject is needed to be able to call next fuction in the onDestroy
  public destroyed: Subject<any> = new Subject();

  //router constructor
  constructor(private router: Router,private api: ServicesAPI, private activeRoute: ActivatedRoute) { }

  //inside of the onInit is the check to see if the route that navigate is from is coming from the login or the reportList screen
  //if from the report screen the report and graphs are populated with the data from the report specified by the reportID
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

  //onDestoruy is used to unsubscribe to the obseravbles when the subscribe is over
  ngOnDestroy(): void {
    this.destroyed.next();
  }

  //used to export a CVS
  //TODO: NOT IMPLEMETED
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


      //once the reponse is verified the twitter user is assigned and the generate report method is called
      this.twitterUser = TwitterUser;
      this.generateReport(this.twitterUser);

    },
    error => {

      //this will execute if there is an error returned by the api response
      this.isLoading = false;
      alert("Twitter User Does Not Exist!");
    })


  }

  //generate Report
  //calls the api service passing the twitter user so that the report generation can start
  //isloading will allow a loading incon to be displayed while the procces takes place
    //generates report based on searched twitter user
  //generate twitter user report
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

        //this will execute if there is an error returned by the api response
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


  //method is used to populate the data and labels for the bar graphs
  //tutorial used for this https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
  public generateBarChart(report: Report)
  {

    //since there are so many topics we limit the line graphs to the 5 that are most used
    //this firsFive variable will hold this
    const firstFive = report.topics
    .slice(0,5)
    .sort((a,b) => a.topic.toLowerCase().localeCompare(b.topic.toLowerCase()));

    //setting the barChartLabels to the firsFive topics
    this.barChartLabels  = firstFive
      .map(x => x.topic);

    //setting the barchart data to the count for each of the topics in FirstFive and adding a label for the top
    this.barChartData = [
      {data: firstFive.map(x => x.count), label: 'Number of Uses'},
      ];
  }


  //method for populating the data and labels for the line graphs
  //this meathod breaks the created at datas for the tweets on the report down so that we can see the tweet activity per year per month
  public generateLineChart(report: Report)
  {

    //mapping the years to a variable so that they can hold a list of tweets
    const yearData = new Map<Number,Tweet[]>();
    report.reportTweets.forEach((tweet) =>
    {

      //the date has to be transformed from a string into a date and then the method getfullyear gets the year as ####
      const createdAt = new Date(tweet.createdAt);
      const year = createdAt.getFullYear();


      //this method concatinates a new tweet onto an existing year key or creates a new one and then concatinates the tweet on
      const tweets = (yearData.get(year) || []).concat(tweet);
      yearData.set(year,tweets);
    })

    //we needed to create a chardataset to hold the data for each month
    //the months variable is to index the months accordingly
    const linechartData: ChartDataSets[] = [];
    const months = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    yearData.forEach((tweets,year) =>
    {

      //series data in this case isto be able to get the total number of tweets in a month and then add it to linechart data
     const seriesData = months.map(month => {
        const count = tweets.filter(tweet => new Date(tweet.createdAt).getMonth() == month).length
        return count;
      })


      //adding the series data(month count) with the year key as the label
      linechartData.push({
        data: seriesData,
        label: year.toString()
      });

    });

    //setting the linchart data to the data that we now have mapped for each year
    this.lineChartData = linechartData;

  }
}



