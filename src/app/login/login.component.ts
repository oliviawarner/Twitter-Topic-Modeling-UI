//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';
import {HttpParams} from '@angular/common/http'

//servie class needed to hit api endpoints
import {ServicesAPI} from '../services/api.service';
import { fromEventPattern } from 'rxjs';
import { first } from 'rxjs/operators';

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

        //tester variables for login credentials
        public userId: string;
        public password: string;


        //router constructor
        constructor(private router: Router, private api: ServicesAPI) {

         }


        //if user id and password match - user directed to dashboard component
        //dummy userid and password before adding credentials into login for database
        goHome() : void {
            this.login();
        }

        //this method is called by goHome to reguesst a loging attempt it then calls the api servie to make a request to the api
        //seperated because the goHome fuction was already hooked up to the html was just easier to do it this way for now
        login() {

          this.api.login(this.userId,this.password)
            .pipe(first())
            .subscribe(user => {
              if(user === null)
              {
              window.alert('Invalid User! Please Enter Correct Username and Password...');
              return;
              }

              this.router.navigate(["dashboard"]);
            })
        }
}
