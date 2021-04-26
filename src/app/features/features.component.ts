//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';

//Icons: https://www.npmjs.com/package/@fortawesome/angular-fontawesome
//csv icon import
import {faFileCsv} from '@fortawesome/free-solid-svg-icons';
//users icon import
import {faSearch} from '@fortawesome/free-solid-svg-icons';
//tweet icon import
import {faCommentDots} from '@fortawesome/free-solid-svg-icons';
//topic icon import
import {faPoll} from '@fortawesome/free-solid-svg-icons';


//component file connections
@Component ({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.css'],
})

export class FeaturesComponent {
    //router constructor
    constructor(private router: Router) { }

    csvIcon = faFileCsv;
    searchIcon = faSearch;
    tweetIcon = faCommentDots;
    topicIcon = faPoll;

}