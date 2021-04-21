//component import
import { Component } from '@angular/core';
//router import (nav)
import { Router } from '@angular/router';

//component file connections
@Component ({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.css']
})

export class FeaturesComponent {
    //router constructor
    constructor(private router: Router) { }
}