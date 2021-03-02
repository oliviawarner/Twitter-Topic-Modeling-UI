import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {

        //router constructor
        constructor(private router: Router) { }
        
        username: string;
        password: string;

        ngOnInit() {
        }

        goHome() : void {
            this.router.navigate(["home-component"]);
        }
         
}