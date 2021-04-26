//component import
import { Component } from '@angular/core';

//router import (nav)
import { Router } from '@angular/router';
//http import
import {HttpParams} from '@angular/common/http'

//service class needed to hit api endpoints
import {ServicesAPI} from '../services/api.service';

//event pattern import
import { fromEventPattern } from 'rxjs';

//first operation import
import { first } from 'rxjs/operators';

//component file connections 
@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

        //variables for login credentials
        public userId: string;
        public password: string;

        //routerand api  constructor
        constructor(private router: Router, private api: ServicesAPI) {
        }
        
        //if user id and password match - user directed to dashboard component
        goHome() : void {
            this.login();
        }

        //this method is called by goHome to reguest a loging attempt it then calls the api servie to make a request to the api
        //seperated because the goHome fuction was already hooked up to the html was just easier to do it this way for now
        login() {

          this.api.login(this.userId,this.password)
            .pipe(first())
            .subscribe(user => {
              this.router.navigate(["dashboard"]);
            },
            error => {
              alert(" InValid username or password!");
            })
        }
}
