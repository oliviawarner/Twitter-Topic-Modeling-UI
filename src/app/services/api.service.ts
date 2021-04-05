import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { first,catchError,retry } from 'rxjs/operators';

//interfaces for reciving the objects from the api
export interface TwitterUser{
  screenName: string
  id: number
  externalId: number
}



@Injectable({
  providedIn: 'root',
})

 export class ServicesAPI
 {

  //constructor is blank but needed to create instances of this class
  constructor(private http: HttpClient) { }

  //this method makes a request to our api with the username and passowrd provided and will return true if it exists and false if it does not
  public login(username: string, password: string)
  {
    return this.http.post<boolean>('http://localhost:5000/Users/login/', { username, password });

  }

  public twitterUserSearch(twitterUsername: string)
  {
    let params = new HttpParams().set("twitterUsername",twitterUsername);
    return this.http.get<TwitterUser>('http://localhost:5000/TwitterUsers/', {params});
  }

  public generateReport()
  {

  }

  public getReport()
  {

  }


 }
