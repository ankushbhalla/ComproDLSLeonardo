import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var Leonardo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBackVisible: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(){
    let body = document.getElementsByTagName("body")[0];
    let self = this;
    window.onresize = function (event) {
      body.style.height = window.innerHeight + "px";
      body.style.width = window.innerWidth + "px";
    }
    body.style.height = window.innerHeight + "px";
    body.style.width = window.innerWidth + "px";
    
    this.router.events.subscribe((urlParams)=>{
      if(urlParams.url==="/dashboard" || urlParams.url==="/"){
        this.isBackVisible = false;
      }
      else{
        this.isBackVisible = true;
      }
    })
  }

  backBtnClick(){
    Leonardo.scripts.destroyGrids();
    this.router.navigate(['/dashboard']);
  }
}
