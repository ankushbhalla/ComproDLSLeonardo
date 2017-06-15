import { Component, ViewChild, ElementRef } from '@angular/core';
declare var window;
declare var document;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('contentWrapper') contentWrapper: ElementRef;
  questionData: any;
  solutionData: any;
  checkAnswerClicked: boolean;

  constructor() {
    this.questionData = configData[0]["question"];
    this.solutionData = configData[0]["solution"];
    this.checkAnswerClicked = false;
  }

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    let self = this;
    window.onresize = function (event) {
      body.style.height = window.innerHeight + "px";
      body.style.width = window.innerWidth + "px";
    }
    body.style.height = window.innerHeight + "px";
    body.style.width = window.innerWidth + "px";
  }

  handleCompEvents($event) {
    let eventMap = {
      "CHECK_MY_ANSWER_CLICKED": this.checkAnswer.bind(this)
    };
    eventMap[$event.eventId]();
  }

  checkAnswer() {
    this.checkAnswerClicked = true;
  }
}

const configData = [
  {
    question: {
      template: `<h1 class="questionHeadings">Instructions:</h1>
      <div>The accounts of Atkins Moving Company are provided with their normal balances as of August 31, 2015.</div>
      <br/>
      <div class="questionHeadings">Account Balances:</div>
      <div> The accounts are listed in no particular order.</div>
      <div leoDataId="leoHost1" class="leoHost">
      </div>
      <br/>
      <div class="questionHeadings">Requirement</div>
      <div>Prepare Atkins trial balance as of August 31, 2015. (Enter the assets and liabilities in the order of liquidity.)</div>`,

      leoData: {
        "leoHost1": {
          config: {
            "data": [["Atkins, Capital", "72000"], ["Insurance Expense", "600"], ["Accounts Payable", "4000"], ["Service Revenue", "80000"], ["Building", "48000"], ["Advertising Expense", "400"], ["Salaries Expense", "7000"], ["Cash", "4000"], ["Trucks", "132000"], ["Fuel Expense", "3000"], ["Atkins, Withdrawals", "5400"], ["Utilities Expense", "500"], ["Accounts Receivable", "8800"], ["Notes Payable", "54000"], ["Office Supplies", "300"]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 150 }, "1": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "8": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "9": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "10": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "11": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "12": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "13": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "14": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } } }, "hints": [{ "from": { "row": 3, "col": 1 }, "to": { "row": 3, "col": 1 }, "expectedvalues": [["20"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }, { "from": { "row": 4, "col": 0 }, "to": { "row": 5, "col": 1 }, "expectedvalues": [["20", "20"], ["20", "0"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }], "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 16, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false }, "currentState": { "cell": { "row": "", "col": "" } }
          },
          correctData: [
            ["Build a profile to move a wheel, 3.25 revolutions in 0.25 seconds followed by a dwell of 0.05 seconds. Make acceleration time 90 ms, the cruise time 75ms and the deceleration time as 85ms.", "", "", "", ""], ["Initial Velocity(u)", "Final Velocity(v)", "Acceleration(a)", "Segment Duration(t)", "Distance Travelled(s)"], ["rev/sec", "rev/sec", "rev/sec2", "sec", "rev"], ["0", "20", "222.2222222", "0.09", "0.9"], ["20", "20", "0", "0.075", "1.5"], ["20", "0", "-235.2941176", "0.085", "0.85"], ["0", "0", "0", "0.05", "0"]
          ]
        }
      }
    },

    solution: {
      config: {
        "data": [["Build a profile to move a wheel", "Build a profile to move a wheel", "Build a profile to move a wheel", "Build a profile to move a wheel", "Build a profile to move a wheel"], ["Initial Velocity(u)", "Final Velocity(v)", "Acceleration(a)", "Segment Duration(t)", "Distance Travelled(s)"], ["rev/sec", "rev/sec", "rev/sec2", "sec", "rev"], ["0", "", "", "0.09", ""], ["", "", "", "0.075", ""], ["", "", "", "0.085", ""], ["0", "0", "", "0.05", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 150 }, "1": { "width": 150 }, "2": { "width": 150 }, "3": { "width": 150 }, "4": { "width": 150 } }, "rows": { "0": { "height": 3, "cells": { "0": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1 } } }, "3": { "height": 3, "cells": { "1": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "2": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "4": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false } } }, "4": { "height": 3, "cells": { "0": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "1": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "2": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "4": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false } } }, "5": { "height": 3, "cells": { "0": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "1": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "2": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "4": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false } } }, "6": { "height": 3, "cells": { "2": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false }, "4": { "numberFormat": 0, "alignment": 0, "colorfill": 1, "border": 1, "readOnly": false } } } }, "hints": [{ "from": { "row": 3, "col": 1 }, "to": { "row": 3, "col": 1 }, "expectedvalues": [["20"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }, { "from": { "row": 4, "col": 0 }, "to": { "row": 5, "col": 1 }, "expectedvalues": [["20", "20"], ["20", "0"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }], "feedbacks": [], "options": { "rowheaders": false, "colheaders": false, "formulas": true, "manualcolumnresize": true, "defaultAlign": { "horizontal": "center", "vertical": "middle" }, "maxRows": 7, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "cosmattThemeGreen", "tableContainsColumnHeaders": true }, "currentState": { "cell": { "row": "", "col": "" } }
      },
      correctData: [
        ["Build a profile to move a wheel, 3.25 revolutions in 0.25 seconds followed by a dwell of 0.05 seconds. Make acceleration time 90 ms, the cruise time 75ms and the deceleration time as 85ms.", "", "", "", ""], ["Initial Velocity(u)", "Final Velocity(v)", "Acceleration(a)", "Segment Duration(t)", "Distance Travelled(s)"], ["rev/sec", "rev/sec", "rev/sec2", "sec", "rev"], ["0", "20", "222.2222222", "0.09", "0.9"], ["20", "20", "0", "0.075", "1.5"], ["20", "0", "-235.2941176", "0.085", "0.85"], ["0", "0", "0", "0.05", "0"]
      ]
    }
  }
];
