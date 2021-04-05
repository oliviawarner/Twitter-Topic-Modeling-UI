//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

        //router constructor
        constructor(private router: Router) { }

        //tester variables for login credentials
        userId: string;
        password: string;

        //if user id and password match - user directed to dashboard component
        //dummy userid and password before adding credentials into login for database
        goHome() : void {
            if(this.userId == 'admin' && this.password == 'password'){
                this.router.navigate(["dashboard"]);
            }
            else {
                alert("invalid credentials");
            }
        }
}
