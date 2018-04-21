import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeonardoCoreService } from './leonardo-core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})      
export class AppComponent implements OnInit {
  isBackVisible: boolean = false;
  constructor(private router: Router, private leonardoCoreService: LeonardoCoreService) { }

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    let self = this;

    this.router.events.subscribe((urlParams) => {
      if (urlParams.url === "/dashboard" || (urlParams.url === "/" && urlParams["urlAfterRedirects"] === "/dashboard")){
        this.isBackVisible = false;
      }
      else {
        this.isBackVisible = true;
      }
    })
  }

  backBtnClick() {
    //Leonardo.scripts.destroyGrids();
    //this.leonardoCoreService.removeWidgets();
    this.router.navigate(['/dashboard']);
  }
}
