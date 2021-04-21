//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';

//user icon import
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

//component file connections
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

    //linkedin icon
    linkedinIcon = faLinkedin;
    
    //github icon
    githubIcon=faGithub;

    //olivia warner linkedin navigation
    owarnerLinkedIn() : void {
        window.location.href = "https://www.linkedin.com/in/olivia--warner/"
    }

    //olivia warner github navigation
    owarnerGithub() : void {
        window.location.href = "https://github.com/oliviawarner"
    }

    //emily grabb linkedin navigation
    egrabbLinkedIn() : void {
        window.location.href = "https://www.linkedin.com/in/emilygrabb/"
    }

    //emily grabb github navigation
    egrabbGithub() : void {
        window.location.href = "https://github.com/emilygrabb"
    }

    //xavier julius github navigation
    xjuliusGithub() : void {
        window.location.href = "https://github.com/xjj1002"
    }
}

