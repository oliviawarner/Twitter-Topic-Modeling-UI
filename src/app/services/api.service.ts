import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { first,catchError,retry, tap, filter } from 'rxjs/operators';

//interfaces for reciving the objects from the api
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

  reportTweets: ReportTweet[]

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


  httpOpt: {
    headers: HttpHeaders
  }

  //constructor is blank but needed to create instances of this class
  constructor(private http: HttpClient) {}

  //this method makes a request to our api with the username and passowrd provided and will return true if it exists and false if it does not
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
    //still needs the api endpoint
    return this.http.get<Report[]>("http://localhost:5000/Report/getReportList");

  }


 }
