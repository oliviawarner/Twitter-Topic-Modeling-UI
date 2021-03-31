//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';
//user icon import
import { faUser } from '@fortawesome/free-solid-svg-icons';;

@Component ({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})

export class TeamComponent {
    //router constructor
    constructor(private router: Router) { }

    //user icon
    userIcon = faUser;
}