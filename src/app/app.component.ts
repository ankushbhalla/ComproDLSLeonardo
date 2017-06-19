import { Component, ViewChild, ElementRef } from '@angular/core';
declare var window;
declare var document;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('contentWrapper') contentWrapper;
  @ViewChild('workspace') workspace;
  questionData: any;
  solutionData: any;

  constructor() {
    this.questionData = configData[0]["question"];
    this.solutionData = configData[0]["solution"];
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
      "CHECK_MY_ANSWER_CLICKED": this.checkAnswer.bind(this),
      "HINT_CLICKED": this.displayHint.bind(this)
    };
    eventMap[$event.eventId]();
  }

  checkAnswer() {
    this.workspace.checkAnswer();
  }

  displayHint(){
    this.workspace.displayHint();
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
          config: {"data":[["Accounts","Balance"],["Atkins, Capital","72000"],["Insurance Expense","600"],["Accounts Payable","4000"],["Service Revenue","80000"],["Building","48000"],["Advertising Expense","400"],["Salaries Expense","7000"],["Cash","4000"],["Trucks","132000"],["Fuel Expense","3000"],["Atkins, Withdrawals","5400"],["Utilities Expense","500"],["Accounts Receivable","8800"],["Notes Payable","54000"],["Office Supplies","300"]],"styles":{"numberFormats":[{"id":0,"cat":"General"},{"id":1,"cat":"Accounting","decimal":2,"symbol":"$"},{"id":2,"cat":"Percentage","decimal":2}],"alignments":[{"id":0,"horizontal":"General","vertical":"Bottom","wraptext":true},{"id":1,"horizontal":"right","vertical":"Bottom","wraptext":true}],"borders":[{"id":0,"border":{"left":{"width":"1","color":"#000000"},"right":{"width":"0","color":"#000000"},"top":{"width":"1","color":"#000000"},"bottom":{"width":"1","color":"#000000"}}},{"id":1,"border":{"left":{"width":"0","color":"#000000"},"right":{"width":"0","color":"#000000"},"top":{"width":"0","color":"#000000"},"bottom":{"width":"0","color":"#000000"}}}]},"columns":{"0":{"width":150},"1":{"width":150}},"rows":{"0":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"1":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"2":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"3":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"4":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"5":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"6":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"7":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"8":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"9":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"10":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"11":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"12":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"13":{"cells":{"1":{"numberFormat":1,"alignment":1}}},"14":{"cells":{"1":{"numberFormat":1,"alignment":1}}}},"hints":[{"from":{"row":3,"col":1},"to":{"row":3,"col":1},"expectedvalues":[["20"]],"comment":"T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec"},{"from":{"row":4,"col":0},"to":{"row":5,"col":1},"expectedvalues":[["20","20"],["20","0"]],"comment":"T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec"}],"options":{"defaultRowHeight":23,"rowheaders":true,"colheaders":true,"defaultAlign":{"horizontal":"left","vertical":"middle"},"maxRows":16,"readOnly":true},"modeconfig":{"mode":"Assessment","role":"student","showHintsBtn":false,"hideTopBar":true,"showCheckAnswerBtn":false,"theme":"cosmattThemeGreen","tableContainsColumnHeaders":true},"currentState":{"cell":{"row":"","col":""}}}
        }
      }
    },

    solution: {
      config: {
        "data": [["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 25, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": true }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "20": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "21": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } }, "22": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } }, "23": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } } }
      },
      correctData: [
        ["Atkins Moving Company", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 4000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 8800, "", "", "", "", "", "", "", "", "", "", ""], ["Office Supplies", 300, "", "", "", "", "", "", "", "", "", "", ""], ["Trucks", 132000, "", "", "", "", "", "", "", "", "", "", ""], ["Building", 48000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 4000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 54000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Capital", "", 72000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Withdrawals", 5400, "", "", "", "", "", "", "", "", "", "", ""], ["Service Revenue", "", 80000, "", "", "", "", "", "", "", "", "", ""], ["Salaries Expense", 7000, "", "", "", "", "", "", "", "", "", "", ""], ["Fuel Expense", 3000, "", "", "", "", "", "", "", "", "", "", ""], ["Insurance Expense", 600, "", "", "", "", "", "", "", "", "", "", ""], ["Utility Expense", 500, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 400, "", "", "", "", "", "", "", "", "", "", ""], ["", 210000, 210000, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]]
    }
  }
];
