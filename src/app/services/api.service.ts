import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { first,catchError,retry, tap } from 'rxjs/operators';

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



@Injectable({
  providedIn: 'root',
})

 export class ServicesAPI
 {


  httpOpt: {
    headers: HttpHeaders
  }

  //constructor is blank but needed to create instances of this class
  constructor(private http: HttpClient) {

    this.httpOpt =  {

      headers: new HttpHeaders({

        "user-id": null
      })
    };
   }

  //this method makes a request to our api with the username and passowrd provided and will return true if it exists and false if it does not
  public login(username: string, password: string)
  {
    return this.http.post<User>('http://localhost:5000/Users/login/', { username, password })
      .pipe(
        tap(user => {
          if(user === null) return;

          this.httpOpt.headers.set("user-id",user.id.toString());
        })
      );

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
