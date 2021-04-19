import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { first,catchError,retry, tap, filter } from 'rxjs/operators';

//interfaces for reciving the objects from the api
//each of these is needed to so that when the data from the enpoint is gathered the obserable can be transferd to an object withing the component
export interface TwitterUser{
  screenName: string
  id: number
  externalId: number
}

export interface User {

  id: number
  userName: string
  password: string

}

export interface Report {

  id: number

  user: User

  malFlag: boolean

  reportName: String

  createdAt: Date

  twitterUser: TwitterUser

  topics: Topics[]

  reportTweets: Tweet[]

}

export interface ReportTweet
{
  id: number

  report: Report

  tweet: Tweet

  flag: boolean
}

export interface Tweet
{
  id: number
  externalID: number
  text: string
  twitterUser: TwitterUser
  createdAt: string
}

export interface Topics
{
  topic: string
  count: number
}






@Injectable({
  providedIn: 'root',
})

 export class ServicesAPI
 {

  //header for every http request made
  //will hold the user-id of the user currently logged into the system
  httpOpt: {
    headers: HttpHeaders
  }

  //constructor is blank but needed to create instances of this class
  constructor(private http: HttpClient) {}

  //this method makes a request to our api with the username and passowrd provided and will return true if it exists and false if it does not
  //tap is used here in conjuction with the sessionStorage to save the user-id when the loggin is succesful.
  public login(username: string, password: string)
  {
    return this.http.post<User>('http://localhost:5000/Users/login/', { username, password })
      .pipe(
        filter(user => !!user),
        tap(user => sessionStorage.setItem("user-id",user.id.toString()))
      );

  }


  //accesses API enpoing to verify the username that has been entered is either in the database or an actual twitterUser
  public twitterUserSearch(twitterUsername: string)
  {

    return this.http.get<TwitterUser>(`http://localhost:5000/TwitterUsers/${twitterUsername}`);

  }

  //one the twitter user is verified this will call the api to generate a report for that user with the data and time currently
  //for now the number of tweets is hard coded as we do not give the user the ablitly to detirmine the number
  public generateReport(twitterUser: TwitterUser)
  {
    return this.http.post<Report>('http://localhost:5000/Report/generateReport', {
      username: twitterUser.screenName,
      count: 200,
    });
  }

  //gathers all the reports that the user that is logged in has generated on any Twitter user they selected
  public getReportList()
  {

    return this.http.get<Report[]>("http://localhost:5000/Report/getReportList");

  }

  public getReport(reportId: string)
  {
    return this.http.get<Report>(`http://localhost:5000/Report/getReport/${reportId}`);
  }


 }
