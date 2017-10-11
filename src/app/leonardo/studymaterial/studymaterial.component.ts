import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudymaterialComponent implements OnInit, AfterViewInit {
  @Input() modalVisible: boolean;
  listItems: object;
  activePage:number;
  studyUrl:string;
  constructor(private platformlocation:PlatformLocation) {
    let currentUrl = (this.platformlocation as any).location.href;
    let requestUrl = currentUrl.split("/").slice(0,3).join("/");
    this.studyUrl = requestUrl+'/assets/studyMaterial.pdf';
    this.activePage = 1;
    this.listItems = [
      {
        heading: "A. Accounts",
        topics: [{
          heading: "A.1. Asset Accounts",
          page: 1
        },
        {
          heading: "A.2. Liability Accounts",
          page: 2
        },
        {
          heading: "A.3. Shareholders Accounts",
          page: 3
        },
        {
          heading: "A.4. T-Accounts",
          page: 4
        },
        {
          heading: "A.5. Chart of Accounts",
          page: 6
        }
        ]
      },
      {
        heading: "B. The Trial Balance",
        topics: [{
          heading: "B.1. Trial Balance",
          page: 7
        }
        ]
      },
      {
        heading: "C. Using Formula Accounting Records",
        topics: [{
          heading: "C.1. Recording Transactions in the General Journal",
          page: 10
        },
        {
          heading: "C.2. Posting Transactions to the General Ledger",
          page: 13
        }
        ]
      }
    ]
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    let rootNodes = document.querySelectorAll("label.tree-toggler");
    for(let i=0;i<rootNodes.length;i++){
      rootNodes[i].addEventListener("click",function(){
        if(this.classList.contains("listHead-selected")){
          this.children[0].classList.remove("glyphicon-menu-up");
          this.children[0].classList.add("glyphicon-menu-down");
          this.classList.remove("listHead-selected")
        }
        else{
          this.classList.add("listHead-selected");
          this.children[0].classList.remove("glyphicon-menu-down");
          this.children[0].classList.add("glyphicon-menu-up");
        }        
        let childNodes = this.parentElement.children;
        for(let j=1;j<childNodes.length;j++){
          if(childNodes[j].style.display == "none" || childNodes[j].style.display == ""){
            childNodes[j].style.display = "block"
          }
          else{
            childNodes[j].style.display = "none"
          }
        }
       })
    }
  //   $('label.tree-toggler').click(function () {
  //     $(this).parent().children('ul.tree').toggle(300);
  // });
  }

  onError(error) {
    console.log(error);
    // for pdf viewer
  }
  callBackFn(check) {
  // for pdf viewer    
  }
  changeActivePage(pageIndex){
    this.activePage = pageIndex;
  }
  changePage(direction){
    if(direction == "next"){
      this.changeActivePage(this.activePage+1);
    }
    else if(direction == "previous"){
      this.changeActivePage(this.activePage-1);
    }
  }

}
