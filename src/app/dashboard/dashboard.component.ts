import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  questions: Array<Object>;
  constructor() {
    this.questions = [
      {
        qText: "Prepare a Trial Balance",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum ",
        badges:['Accounting','Training'],
        view:"Side by Side View"
      },
      {
        qText: "Prepare an Income Statement",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum ",
        badges:['Accounting','Training'],
        view:"Side by Side View"
      },
      {
        qText: "Create a Motion Profile Table",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Physics','Training'],
        view:"Side by Side View"
      },
      {
        qText: "Prepare a Trial Balance",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Accounting','Assessment'],
        view:"Reading View"
      },
      {
        qText: "Prepare an Income Statement",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Accounting','Assessment'],
        view:"Reading View"
      },
      {
        qText: "Create a Motion Profile Table",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Physics','Assessment'],
        view:"Reading View"
      }];
  }
  ngOnInit() {
  }
  getQuesIndex(Qindex){
    let relativeLength = (this.questions.length)/2;
    if(Qindex>relativeLength){
      return (Qindex-relativeLength);
    }
    else{
      return Qindex;
    }
  }

}
