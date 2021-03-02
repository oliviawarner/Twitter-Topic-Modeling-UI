import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

        //router constructor
        constructor(private router: Router) { }
        
        //example variables for login credentials
        userid: string;
        password: string;

        goHome() : void {
            if(this.userid == 'admin' && this.password == '123'){
                this.router.navigate(["dashboard"]);
            }
            else {
                alert("invalid credentials");
            }
           
        }
         
}