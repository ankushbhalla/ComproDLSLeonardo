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
        qText: "Trial Balance: Learn",
        description: "Learn to prepare Trial Balance to verify that debits equal the credits",
        badges:['Accounting','Training'],
        view:"Side by Side View",
        index:1
      },
      {
        qText: "Income Statement: Learn",
        description: "Learn to prepare Income Statement to access the profitability of a company during a particular time interval",
        badges:['Accounting','Training'],
        view:"Side by Side View",
        index:2
      },
      {
        qText: "Create a Motion Profile",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Physics','Training'],
        view:"Side by Side View",
        index:3
      },
      {
        qText: "Trial Balance: Assess",
        description: "Assess student's knowledge and skill at the end of the course",
        badges:['Accounting','Assessment'],
        view:"Reading View",
        index:1
      },
      {
        qText: "Income Statement: Assess",
        description: "Assess student's knowledge and skill at the end of the course",
        badges:['Accounting','Assessment'],
        view:"Reading View",
        index:2
      },
      {
        qText: "Create a Motion Profile",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
        badges:['Physics','Assessment'],
        view:"Reading View",
        index:3
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
