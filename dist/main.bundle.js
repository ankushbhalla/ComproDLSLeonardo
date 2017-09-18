webpackJsonp([1],{

/***/ 240:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 240;

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DataService = (function () {
    function DataService() {
        this.config = {
            "1": {
                question: {
                    template: "<br><div class=\"questionHeadings\">Requirement</div>\n            <div>The accounts of Colby Group are provided with their normal balances as of August 31, 2017.</div>\n            <br/>\n            <div>Prepare Colby Group trial balance as of August 31, 2017. Enter the assets and liabilities in the order of liquidity.</div>\n            <br/>\n            <div>Remember that each line of the heading is very important and should be in a specific order.</div>\n            <br>\n            <div class=\"questionHeadings\">Account Balances</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 440px; min-width: 347px; min-height: 440px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance"], ["Terry Colby, Capital", "89650"], ["Terry Colby, Drawing", "56000"], ["Accounts Payable", "26000"], ["Prepaid Insurance", "1900"], ["Fees Earned", "454450"], ["Wages Expense", "270000"], ["Rent Expense", "51800"], ["Advertising Expense", "25200"], ["Misc. Expense", "5100"], ["Equipment", "196000"], ["Cash", "17300"], ["Accounts Receivable", "37000"], ["Supplies", "7400"], ["Notes Payable", "97600"]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 150 }, "1": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "8": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "9": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "10": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "11": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "12": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "13": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } }, "14": { "cells": { "1": { "numberFormat": 1, "alignment": 1 } } } }, "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "leonardoThemeGreen", "tableContainsColumnHeaders": true }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: { "data": [["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "setUniformCustomProperties": { "border": "1px solid black" }, "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 40, "readOnly": false }, "hints": [{ "from": { "row": 0, "col": 0 }, "to": { "row": 2, "col": 0 }, "expectedvalues": [["Colby Group"], ["Trial Balance"], ["August 31, 2017"]], "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }], "styles": { "fontWeight": true } }, { "from": { "row": 5, "col": 0 }, "to": { "row": 9, "col": 2 }, "expectedvalues": [["Cash", 17300, ""], ["Accounts Receivable", 37000, ""], ["Supplies", 7400, ""], ["Prepaid Insurance", 1900, ""], ["Equipment", 196000, ""]] }, { "from": { "row": 10, "col": 0 }, "to": { "row": 14, "col": 2 }, "expectedvalues": [["Accounts Payable", "", 26000], ["Notes Payable", "", 97600], ["Terry Colby, Capital", "", 89650], ["Terry Colby, Drawing", 56000, ""], ["Fees Earned", "", 454450]] }, { "from": { "row": 15, "col": 0 }, "to": { "row": 18, "col": 2 }, "expectedvalues": [["Wages Expense", 270000, ""], ["Rent Expense", 51800, ""], ["Advertising Expense", 25200, ""], ["Misc. Expense", 5100, ""]] }], "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": true }, "mergedranges": [{ "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "readOnly": false }, "1": { "colorfill": 0, "border": 1, "readOnly": false }, "2": { "colorfill": 0, "border": 1, "readOnly": false } } }, "1": { "cells": { "0": { "colorfill": 0, "border": 1, "readOnly": false }, "1": { "colorfill": 0, "border": 1, "readOnly": false }, "2": { "colorfill": 0, "border": 1, "readOnly": false } } }, "2": { "cells": { "0": { "colorfill": 0, "border": 1, "readOnly": false }, "1": { "colorfill": 0, "border": 1, "readOnly": false }, "2": { "colorfill": 0, "border": 1, "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } } }, "sheetNames": ["Solution"] },
                    correctData: {
                        correctData: [
                            ["Colby Group", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2017", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 17300, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 37000, "", "", "", "", "", "", "", "", "", "", ""], ["Supplies", 7400, "", "", "", "", "", "", "", "", "", "", ""], ["Prepaid Insurance", 1900, "", "", "", "", "", "", "", "", "", "", ""], ["Equipment", 196000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 26000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 97600, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Capital", "", 89650, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Drawing", 56000, "", "", "", "", "", "", "", "", "", "", ""], ["Fees Earned", "", 454450, "", "", "", "", "", "", "", "", "", ""], ["Wages Expense", 270000, "", "", "", "", "", "", "", "", "", "", ""], ["Rent Expense", 51800, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 25200, "", "", "", "", "", "", "", "", "", "", ""], ["Misc. Expense", 5100, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 667700, 667700, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]
                        ],
                        validationJson: [
                            { "cellRange": { "from": { "row": 0, "col": 0 }, "to": { "row": 0, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 0, "col": 0 } }, { "cellRange": { "from": { "row": 1, "col": 0 }, "to": { "row": 1, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 1, "col": 0 } }, { "cellRange": { "from": { "row": 2, "col": 0 }, "to": { "row": 2, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 2, "col": 0 } }, { "cellRange": { "from": { "row": 5, "col": 0 }, "to": { "row": 5, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 5, "col": 0 } }, { "cellRange": { "from": { "row": 6, "col": 0 }, "to": { "row": 6, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 6, "col": 0 } }, { "cellRange": { "from": { "row": 7, "col": 0 }, "to": { "row": 7, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 7, "col": 0 } }, { "cellRange": { "from": { "row": 8, "col": 0 }, "to": { "row": 8, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 8, "col": 0 } }, { "cellRange": { "from": { "row": 9, "col": 0 }, "to": { "row": 9, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 9, "col": 0 } }, { "cellRange": { "from": { "row": 10, "col": 0 }, "to": { "row": 10, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 10, "col": 0 } }, { "cellRange": { "from": { "row": 11, "col": 0 }, "to": { "row": 11, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 11, "col": 0 } }, { "cellRange": { "from": { "row": 12, "col": 0 }, "to": { "row": 12, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 12, "col": 0 } }, { "cellRange": { "from": { "row": 13, "col": 0 }, "to": { "row": 13, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 13, "col": 0 } }, { "cellRange": { "from": { "row": 14, "col": 0 }, "to": { "row": 14, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 14, "col": 0 } }, { "cellRange": { "from": { "row": 15, "col": 0 }, "to": { "row": 15, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 15, "col": 0 } }, { "cellRange": { "from": { "row": 16, "col": 0 }, "to": { "row": 16, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 16, "col": 0 } }, { "cellRange": { "from": { "row": 17, "col": 0 }, "to": { "row": 17, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 17, "col": 0 } }, { "cellRange": { "from": { "row": 18, "col": 0 }, "to": { "row": 18, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 18, "col": 0 } }, { "cellRange": { "from": { "row": 19, "col": 0 }, "to": { "row": 19, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this row are incorrect.", "row": 19, "col": 0 } }
                        ]
                    }
                }
            },
            "2": {
                question: {
                    template: "<h1 class=\"questionHeadings\">Instructions</h1>\n            <div>The accounts of Colby Group are provided with their normal balances as of August 31, 2017.</div>\n            <br/>\n            <div class=\"questionHeadings\">Account Balances</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 280px; width: 820px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>\n            <br/>\n            <div class=\"questionHeadings\">Requirement</div>\n            <div>Prepare Colby Group trial balance as of August 31, 2017. Enter the assets and liabilities in the order of liquidity.<br> Remember that each line of the heading is very important and should be in a specific order.</div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance", "", "Accounts", "Balance"], ["Terry Colby, Capital", "89650", "", "Advertising Expense", "25200"], ["Terry Colby, Drawing", "56000", "", "Misc. Expense", "5100"], ["Accounts Payable", "26000", "", "Equipment", "196000"], ["Prepaid Insurance", "1900", "", "Cash", "17300"], ["Fees Earned", "454450", "", "Accounts Receivable", "37000"], ["Wages Expense", "270000", "", "Supplies", "7400"], ["Rent Expense", "51800", "", "Notes Payable", "97600"]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "right", "vertical": "Middle", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 200 }, "1": { "width": 150 }, "2": { "width": 20 }, "3": { "width": 200 }, "4": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } } }, "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "leonardoThemeGreen", "tableContainsColumnHeaders": true }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: { "data": [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "setUniformCustomProperties": { "border": "1px solid black" }, "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 30, "readOnly": false }, "hints": [{ "from": { "row": 0, "col": 0 }, "to": { "row": 2, "col": 0 }, "expectedvalues": [["Colby Group"], ["Trial Balance"], ["August 31, 2017"]], "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }], "styles": { "fontWeight": true } }, { "from": { "row": 5, "col": 0 }, "to": { "row": 9, "col": 2 }, "expectedvalues": [["Cash", 17300, ""], ["Accounts Receivable", 37000, ""], ["Supplies", 7400, ""], ["Prepaid Insurance", 1900, ""], ["Equipment", 196000, ""]] }, { "from": { "row": 10, "col": 0 }, "to": { "row": 14, "col": 2 }, "expectedvalues": [["Accounts Payable", "", 26000], ["Notes Payable", "", 97600], ["Terry Colby, Capital", "", 89650], ["Terry Colby, Drawing", 56000, ""], ["Fees Earned", "", 454450]] }, { "from": { "row": 15, "col": 0 }, "to": { "row": 18, "col": 2 }, "expectedvalues": [["Wages Expense", 270000, ""], ["Rent Expense", 51800, ""], ["Advertising Expense", 25200, ""], ["Misc. Expense", 5100, ""]] }], "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": true }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } } }, "sheetNames": ["Solution"], "columns": { "3": { "width": 145 }, "4": { "width": 145 }, "5": { "width": 145 }, "6": { "width": 145 }, "7": { "width": 145 } } },
                    correctData: {
                        correctData: [
                            ["Colby Group", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2017", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 17300, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 37000, "", "", "", "", "", "", "", "", "", "", ""], ["Supplies", 7400, "", "", "", "", "", "", "", "", "", "", ""], ["Prepaid Insurance", 1900, "", "", "", "", "", "", "", "", "", "", ""], ["Equipment", 196000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 26000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 97600, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Capital", "", 89650, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Drawing", 56000, "", "", "", "", "", "", "", "", "", "", ""], ["Fees Earned", "", 454450, "", "", "", "", "", "", "", "", "", ""], ["Wages Expense", 270000, "", "", "", "", "", "", "", "", "", "", ""], ["Rent Expense", 51800, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 25200, "", "", "", "", "", "", "", "", "", "", ""], ["Misc. Expense", 5100, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 667700, 667700, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]
                        ],
                        validationJson: [
                            { "cellRange": { "from": { "row": 0, "col": 0 }, "to": { "row": 0, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 0, "col": 0 } }, { "cellRange": { "from": { "row": 1, "col": 0 }, "to": { "row": 1, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 1, "col": 0 } }, { "cellRange": { "from": { "row": 2, "col": 0 }, "to": { "row": 2, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 2, "col": 0 } }, { "cellRange": { "from": { "row": 5, "col": 0 }, "to": { "row": 5, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 5, "col": 0 } }, { "cellRange": { "from": { "row": 6, "col": 0 }, "to": { "row": 6, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 6, "col": 0 } }, { "cellRange": { "from": { "row": 7, "col": 0 }, "to": { "row": 7, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 7, "col": 0 } }, { "cellRange": { "from": { "row": 8, "col": 0 }, "to": { "row": 8, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 8, "col": 0 } }, { "cellRange": { "from": { "row": 9, "col": 0 }, "to": { "row": 9, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 9, "col": 0 } }, { "cellRange": { "from": { "row": 10, "col": 0 }, "to": { "row": 10, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 10, "col": 0 } }, { "cellRange": { "from": { "row": 11, "col": 0 }, "to": { "row": 11, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 11, "col": 0 } }, { "cellRange": { "from": { "row": 12, "col": 0 }, "to": { "row": 12, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 12, "col": 0 } }, { "cellRange": { "from": { "row": 13, "col": 0 }, "to": { "row": 13, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 13, "col": 0 } }, { "cellRange": { "from": { "row": 14, "col": 0 }, "to": { "row": 14, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 14, "col": 0 } }, { "cellRange": { "from": { "row": 15, "col": 0 }, "to": { "row": 15, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 15, "col": 0 } }, { "cellRange": { "from": { "row": 16, "col": 0 }, "to": { "row": 16, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 16, "col": 0 } }, { "cellRange": { "from": { "row": 17, "col": 0 }, "to": { "row": 17, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 17, "col": 0 } }, { "cellRange": { "from": { "row": 18, "col": 0 }, "to": { "row": 18, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 18, "col": 0 } }, { "cellRange": { "from": { "row": 19, "col": 0 }, "to": { "row": 19, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this row are incorrect.", "row": 19, "col": 0 } }
                        ]
                    },
                    gridUIParams: {
                        height: 865,
                        width: 1205
                    }
                }
            },
            "3": {
                question: {
                    template: "<h1 class=\"questionHeadings\">Instructions</h1>\n            <div>The accounts of Colby Group are provided with their normal balances as of August 31, 2017.</div>\n            <br/>\n            <div class=\"questionHeadings\">Account Balances</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 280px; width: 820px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>\n            <br/>\n            <div class=\"questionHeadings\">Requirement</div>\n            <div>Prepare Colby Group trial balance as of August 31, 2017. Enter the assets and liabilities in the order of liquidity. <br>Remember that each line of the heading is very important and should be in a specific order.</div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance", "", "Accounts", "Balance"], ["Terry Colby, Capital", "89650", "", "Advertising Expense", "25200"], ["Terry Colby, Drawing", "56000", "", "Misc. Expense", "5100"], ["Accounts Payable", "26000", "", "Equipment", "196000"], ["Prepaid Insurance", "1900", "", "Cash", "17300"], ["Fees Earned", "454450", "", "Accounts Receivable", "37000"], ["Wages Expense", "270000", "", "Supplies", "7400"], ["Rent Expense", "51800", "", "Notes Payable", "97600"]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "right", "vertical": "Middle", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 200 }, "1": { "width": 150 }, "2": { "width": 20 }, "3": { "width": 200 }, "4": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } } }, "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "leonardoThemeGreen", "tableContainsColumnHeaders": true }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: { "data": [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "setUniformCustomProperties": { "border": "1px solid black" }, "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 30, "readOnly": false }, "hints": [{ "from": { "row": 0, "col": 0 }, "to": { "row": 2, "col": 0 }, "expectedvalues": [["Colby Group"], ["Trial Balance"], ["August 31, 2017"]], "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }], "styles": { "fontWeight": true } }, { "from": { "row": 5, "col": 0 }, "to": { "row": 9, "col": 2 }, "expectedvalues": [["Cash", 17300, ""], ["Accounts Receivable", 37000, ""], ["Supplies", 7400, ""], ["Prepaid Insurance", 1900, ""], ["Equipment", 196000, ""]] }, { "from": { "row": 10, "col": 0 }, "to": { "row": 14, "col": 2 }, "expectedvalues": [["Accounts Payable", "", 26000], ["Notes Payable", "", 97600], ["Terry Colby, Capital", "", 89650], ["Terry Colby, Drawing", 56000, ""], ["Fees Earned", "", 454450]] }, { "from": { "row": 15, "col": 0 }, "to": { "row": 18, "col": 2 }, "expectedvalues": [["Wages Expense", 270000, ""], ["Rent Expense", 51800, ""], ["Advertising Expense", 25200, ""], ["Misc. Expense", 5100, ""]] }], "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": false }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } } }, "sheetNames": ["Solution"], "columns": { "3": { "width": 145 }, "4": { "width": 145 }, "5": { "width": 145 }, "6": { "width": 145 }, "7": { "width": 145 } } },
                    correctData: {
                        correctData: [
                            ["Colby Group", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2017", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 17300, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 37000, "", "", "", "", "", "", "", "", "", "", ""], ["Supplies", 7400, "", "", "", "", "", "", "", "", "", "", ""], ["Prepaid Insurance", 1900, "", "", "", "", "", "", "", "", "", "", ""], ["Equipment", 196000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 26000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 97600, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Capital", "", 89650, "", "", "", "", "", "", "", "", "", ""], ["Terry Colby, Drawing", 56000, "", "", "", "", "", "", "", "", "", "", ""], ["Fees Earned", "", 454450, "", "", "", "", "", "", "", "", "", ""], ["Wages Expense", 270000, "", "", "", "", "", "", "", "", "", "", ""], ["Rent Expense", 51800, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 25200, "", "", "", "", "", "", "", "", "", "", ""], ["Misc. Expense", 5100, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 667700, 667700, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]
                        ],
                        validationJson: [
                            { "cellRange": { "from": { "row": 0, "col": 0 }, "to": { "row": 0, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 0, "col": 0 } }, { "cellRange": { "from": { "row": 1, "col": 0 }, "to": { "row": 1, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 1, "col": 0 } }, { "cellRange": { "from": { "row": 2, "col": 0 }, "to": { "row": 2, "col": 0 } }, "rule": "all", "errorDetails": { "comment": "Entry for this Header is incorrect.", "row": 2, "col": 0 } }, { "cellRange": { "from": { "row": 5, "col": 0 }, "to": { "row": 5, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 5, "col": 0 } }, { "cellRange": { "from": { "row": 6, "col": 0 }, "to": { "row": 6, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 6, "col": 0 } }, { "cellRange": { "from": { "row": 7, "col": 0 }, "to": { "row": 7, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 7, "col": 0 } }, { "cellRange": { "from": { "row": 8, "col": 0 }, "to": { "row": 8, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 8, "col": 0 } }, { "cellRange": { "from": { "row": 9, "col": 0 }, "to": { "row": 9, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 9, "col": 0 } }, { "cellRange": { "from": { "row": 10, "col": 0 }, "to": { "row": 10, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 10, "col": 0 } }, { "cellRange": { "from": { "row": 11, "col": 0 }, "to": { "row": 11, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 11, "col": 0 } }, { "cellRange": { "from": { "row": 12, "col": 0 }, "to": { "row": 12, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 12, "col": 0 } }, { "cellRange": { "from": { "row": 13, "col": 0 }, "to": { "row": 13, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 13, "col": 0 } }, { "cellRange": { "from": { "row": 14, "col": 0 }, "to": { "row": 14, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 14, "col": 0 } }, { "cellRange": { "from": { "row": 15, "col": 0 }, "to": { "row": 15, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 15, "col": 0 } }, { "cellRange": { "from": { "row": 16, "col": 0 }, "to": { "row": 16, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 16, "col": 0 } }, { "cellRange": { "from": { "row": 17, "col": 0 }, "to": { "row": 17, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 17, "col": 0 } }, { "cellRange": { "from": { "row": 18, "col": 0 }, "to": { "row": 18, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 18, "col": 0 } }, { "cellRange": { "from": { "row": 19, "col": 0 }, "to": { "row": 19, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this row are incorrect.", "row": 19, "col": 0 } }
                        ]
                    },
                    gridUIParams: {
                        height: 745,
                        width: 1205
                    }
                }
            },
            "4": {
                question: {
                    template: "<h1 class=\"questionHeadings\">Instructions:</h1>\n            <div>The accounts of Atkins Moving Company are provided with their normal balances as of August 31, 2015.</div>\n            <br/>\n            <div class=\"questionHeadings\">Account Balances:</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 565px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>\n            <br/>\n            <div class=\"questionHeadings\">Requirement</div>\n            <div>Prepare Atkins trial balance as of August 31, 2015. (Enter the assets and liabilities in the order of liquidity.)</div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance"], ["Atkins, Capital", "72000"], ["Insurance Expense", "600"], ["Accounts Payable", "4000"], ["Service Revenue", "80000"], ["Building", "48000"], ["Advertising Expense", "400"], ["Salaries Expense", "7000"], ["Cash", "4000"], ["Trucks", "132000"], ["Fuel Expense", "3000"], ["Atkins, Withdrawals", "5400"], ["Utilities Expense", "500"], ["Accounts Receivable", "8800"], ["Notes Payable", "54000"], ["Office Supplies", "300"]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 150 }, "1": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1 } } }, "1": { "cells": { "1": { "numberFormat": 1 } } }, "2": { "cells": { "1": { "numberFormat": 1 } } }, "3": { "cells": { "1": { "numberFormat": 1 } } }, "4": { "cells": { "1": { "numberFormat": 1 } } }, "5": { "cells": { "1": { "numberFormat": 1 } } }, "6": { "cells": { "1": { "numberFormat": 1 } } }, "7": { "cells": { "1": { "numberFormat": 1 } } }, "8": { "cells": { "1": { "numberFormat": 1 } } }, "9": { "cells": { "1": { "numberFormat": 1 } } }, "10": { "cells": { "1": { "numberFormat": 1 } } }, "11": { "cells": { "1": { "numberFormat": 1 } } }, "12": { "cells": { "1": { "numberFormat": 1 } } }, "13": { "cells": { "1": { "numberFormat": 1 } } }, "14": { "cells": { "1": { "numberFormat": 1 } } } }, "hints": [{ "from": { "row": 3, "col": 1 }, "to": { "row": 3, "col": 1 }, "expectedvalues": [["20"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }, { "from": { "row": 4, "col": 0 }, "to": { "row": 5, "col": 1 }, "expectedvalues": [["20", "20"], ["20", "0"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }], "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "cosmattThemeGreen", "tableContainsColumnHeaders": true }, "currentState": { "cell": { "row": "", "col": "" } }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: {
                        "data": [["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 30, "readOnly": true }, "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": true }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "20": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "21": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } }, "22": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } }, "23": { "cells": { "0": { "colorfill": 1, "border": 0 }, "1": { "colorfill": 1, "border": 0 }, "2": { "colorfill": 1, "border": 0 } } } }
                    },
                    correctData: [
                        ["Atkins Moving Company", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 4000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 8800, "", "", "", "", "", "", "", "", "", "", ""], ["Office Supplies", 300, "", "", "", "", "", "", "", "", "", "", ""], ["Trucks", 132000, "", "", "", "", "", "", "", "", "", "", ""], ["Building", 48000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 4000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 54000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Capital", "", 72000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Withdrawals", 5400, "", "", "", "", "", "", "", "", "", "", ""], ["Service Revenue", "", 80000, "", "", "", "", "", "", "", "", "", ""], ["Salaries Expense", 7000, "", "", "", "", "", "", "", "", "", "", ""], ["Fuel Expense", 3000, "", "", "", "", "", "", "", "", "", "", ""], ["Insurance Expense", 600, "", "", "", "", "", "", "", "", "", "", ""], ["Utility Expense", 500, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 400, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 210000, 210000, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]]
                }
            },
            "5": {
                question: {
                    template: "<h1 class=\"questionHeadings\">Instructions:</h1>\n            <div>The accounts of Atkins Moving Company are provided with their normal balances as of August 31, 2015.</div>\n            <br/>\n            <div class=\"questionHeadings\">Account Balances:</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 280px; width: 820px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>\n            <br/>\n            <div class=\"questionHeadings\">Requirement</div>\n            <div>Prepare Atkins trial balance as of August 31, 2015. (Enter the assets and liabilities in the order of liquidity.) <br>Remember that each line of the heading is very important and should be in a specific order. Avoid committing spelling mistakes while typing the account heads.</div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance", "", "Accounts", "Balance"], ["Atkins, Capital", "72000", "", "Trucks", "132000"], ["Insurance Expense", "600", "", "Fuel Expense", "3000"], ["Accounts Payable", "4000", "", "Atkins, Withdrawals", "5400"], ["Service Revenue", "80000", "", "Utilities Expense", "500"], ["Building", "48000", "", "Accounts Receivable", "8800"], ["Advertising Expense", "400", "", "Notes Payable", "54000"], ["Salaries Expense", "7000", "", "Office Supplies", "300"], ["Cash", "4000", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "right", "vertical": "Middle", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 200 }, "1": { "width": 150 }, "2": { "width": 20 }, "3": { "width": 200 }, "4": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "8": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } } }, "hints": [{ "from": { "row": 3, "col": 1 }, "to": { "row": 3, "col": 1 }, "expectedvalues": [["20"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }, { "from": { "row": 4, "col": 0 }, "to": { "row": 5, "col": 1 }, "expectedvalues": [["20", "20"], ["20", "0"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }], "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "leonardoThemeGreen", "tableContainsColumnHeaders": true }, "currentState": { "cell": { "row": "", "col": "" } }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: { "data": [["Atkins Moving Company", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "setUniformCustomProperties": { "border": "1px solid black" }, "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 30, "readOnly": false }, "hints": [{ "from": { "row": 0, "col": 0 }, "to": { "row": 2, "col": 0 }, "expectedvalues": [["Atkins Moving Company"], ["Trial Balance"], ["August 31, 2015"]] }, { "from": { "row": 5, "col": 0 }, "to": { "row": 9, "col": 2 }, "expectedvalues": [["Cash", 4000, ""], ["Accounts Receivable", 8800, ""], ["Office Supplies", 300, ""], ["Trucks", 132000, ""], ["Building", 48000, ""]] }, { "from": { "row": 10, "col": 0 }, "to": { "row": 14, "col": 2 }, "expectedvalues": [["Accounts Payable", "", 4000], ["Notes Payable", "", 54000], ["Atkins, Capital", "", 72000], ["Atkins, Withdrawals", 5400, ""], ["Service Revenue", "", 80000]] }, { "from": { "row": 15, "col": 0 }, "to": { "row": 19, "col": 2 }, "expectedvalues": [["Salaries Expense", 7000, ""], ["Fuel Expense", 3000, ""], ["Insurance Expense", 600, ""], ["Utility Expense", 500, ""], ["Advertising Expense", 400, ""]] }], "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": false }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "20": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } } }, "sheetNames": ["Solution"], "columns": { "3": { "width": 145 }, "4": { "width": 145 }, "5": { "width": 145 }, "6": { "width": 145 }, "7": { "width": 145 } } },
                    correctData: {
                        correctData: [
                            ["Atkins Moving Company", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 4000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 8800, "", "", "", "", "", "", "", "", "", "", ""], ["Office Supplies", 300, "", "", "", "", "", "", "", "", "", "", ""], ["Trucks", 132000, "", "", "", "", "", "", "", "", "", "", ""], ["Building", 48000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 4000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 54000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Capital", "", 72000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Withdrawals", 5400, "", "", "", "", "", "", "", "", "", "", ""], ["Service Revenue", "", 80000, "", "", "", "", "", "", "", "", "", ""], ["Salaries Expense", 7000, "", "", "", "", "", "", "", "", "", "", ""], ["Fuel Expense", 3000, "", "", "", "", "", "", "", "", "", "", ""], ["Insurance Expense", 600, "", "", "", "", "", "", "", "", "", "", ""], ["Utility Expense", 500, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 400, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 210000, 210000, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]
                        ],
                        validationJson: [
                            { "cellRange": { "from": { "row": 5, "col": 0 }, "to": { "row": 5, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 5, "col": 0 } }, { "cellRange": { "from": { "row": 6, "col": 0 }, "to": { "row": 6, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 6, "col": 0 } }, { "cellRange": { "from": { "row": 7, "col": 0 }, "to": { "row": 7, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 7, "col": 0 } }, { "cellRange": { "from": { "row": 8, "col": 0 }, "to": { "row": 8, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 8, "col": 0 } }, { "cellRange": { "from": { "row": 9, "col": 0 }, "to": { "row": 9, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 9, "col": 0 } }, { "cellRange": { "from": { "row": 10, "col": 0 }, "to": { "row": 10, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 10, "col": 0 } }, { "cellRange": { "from": { "row": 11, "col": 0 }, "to": { "row": 11, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 11, "col": 0 } }, { "cellRange": { "from": { "row": 12, "col": 0 }, "to": { "row": 12, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 12, "col": 0 } }, { "cellRange": { "from": { "row": 13, "col": 0 }, "to": { "row": 13, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 13, "col": 0 } }, { "cellRange": { "from": { "row": 14, "col": 0 }, "to": { "row": 14, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 14, "col": 0 } }, { "cellRange": { "from": { "row": 15, "col": 0 }, "to": { "row": 15, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 15, "col": 0 } }, { "cellRange": { "from": { "row": 16, "col": 0 }, "to": { "row": 16, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 16, "col": 0 } }, { "cellRange": { "from": { "row": 17, "col": 0 }, "to": { "row": 17, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 17, "col": 0 } }, { "cellRange": { "from": { "row": 18, "col": 0 }, "to": { "row": 18, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 18, "col": 0 } }, { "cellRange": { "from": { "row": 19, "col": 0 }, "to": { "row": 19, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 19, "col": 0 } }, { "cellRange": { "from": { "row": 20, "col": 0 }, "to": { "row": 20, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this row are incorrect.", "row": 20, "col": 0 } }
                        ]
                    },
                    gridUIParams: {
                        height: 745,
                        width: 1205
                    }
                }
            },
            "6": {
                question: {
                    template: "<h1 class=\"questionHeadings\">Instructions:</h1>\n            <div>The accounts of Atkins Moving Company are provided with their normal balances as of August 31, 2015.</div>\n            <br/>\n            <div class=\"questionHeadings\">Account Balances:</div>\n            <div> The accounts are listed in no particular order.</div>\n            <div style=\"height: 280px; width: 820px;\" leoDataId=\"leoHost1\" class=\"leoHost\">\n            </div>\n            <br/>\n            <div class=\"questionHeadings\">Requirement</div>\n            <div>Prepare Atkins trial balance as of August 31, 2015. (Enter the assets and liabilities in the order of liquidity.) <br>Remember that each line of the heading is very important and should be in a specific order. Avoid committing spelling mistakes while typing the account heads.</div>",
                    leoData: {
                        "leoHost1": {
                            config: {
                                "data": [["Accounts", "Balance", "", "Accounts", "Balance"], ["Atkins, Capital", "72000", "", "Trucks", "132000"], ["Insurance Expense", "600", "", "Fuel Expense", "3000"], ["Accounts Payable", "4000", "", "Atkins, Withdrawals", "5400"], ["Service Revenue", "80000", "", "Utilities Expense", "500"], ["Building", "48000", "", "Accounts Receivable", "8800"], ["Advertising Expense", "400", "", "Notes Payable", "54000"], ["Salaries Expense", "7000", "", "Office Supplies", "300"], ["Cash", "4000", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "right", "vertical": "Middle", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }] }, "columns": { "0": { "width": 200 }, "1": { "width": 150 }, "2": { "width": 20 }, "3": { "width": 200 }, "4": { "width": 150 } }, "rows": { "0": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "1": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "2": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "3": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "4": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "5": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "6": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "7": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } }, "8": { "cells": { "1": { "numberFormat": 1, "alignment": 2 }, "4": { "numberFormat": 1, "alignment": 2 } } } }, "hints": [{ "from": { "row": 3, "col": 1 }, "to": { "row": 3, "col": 1 }, "expectedvalues": [["20"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }, { "from": { "row": 4, "col": 0 }, "to": { "row": 5, "col": 1 }, "expectedvalues": [["20", "20"], ["20", "0"]], "comment": "T.M.D = (0.09 * Vm/2) + (0.075 * Vm) + (0.085 * Vm/2)\nT.M.D = 0.1625 * Vm\nSince T.M.D = 3.25 rev\nVm = 20 rev/sec" }], "options": { "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "left", "vertical": "middle" }, "maxRows": 20, "readOnly": true }, "modeconfig": { "mode": "Assessment", "role": "student", "showHintsBtn": false, "hideTopBar": true, "showCheckAnswerBtn": false, "theme": "leonardoThemeGreen", "tableContainsColumnHeaders": true }, "currentState": { "cell": { "row": "", "col": "" } }, "sheetNames": ["Data"]
                            }
                        }
                    }
                },
                solution: {
                    config: { "data": [["Atkins Moving Company", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]], "styles": { "numberFormats": [{ "id": 0, "cat": "General" }, { "id": 1, "cat": "Accounting", "decimal": 2, "symbol": "$" }, { "id": 2, "cat": "Percentage", "decimal": 2 }], "colorfills": [{ "id": 0, "color": "lightgray" }, { "id": 1, "color": "white" }], "alignments": [{ "id": 0, "horizontal": "General", "vertical": "Bottom", "wraptext": true }, { "id": 1, "horizontal": "right", "vertical": "Bottom", "wraptext": true }, { "id": 2, "horizontal": "left", "vertical": "Bottom", "wraptext": true }], "borders": [{ "id": 0, "border": { "left": { "width": "0", "color": "#000000" }, "right": { "width": "0", "color": "#000000" }, "top": { "width": "0", "color": "#000000" }, "bottom": { "width": "0", "color": "#000000" } } }, { "id": 1, "border": { "left": { "width": "1", "color": "#000000" }, "right": { "width": "1", "color": "#000000" }, "top": { "width": "1", "color": "#000000" }, "bottom": { "width": "1", "color": "#000000" } } }] }, "options": { "setUniformCustomProperties": { "border": "1px solid black" }, "defaultRowHeight": 23, "rowheaders": true, "colheaders": true, "defaultAlign": { "horizontal": "center", "vertical": "bottom" }, "maxRows": 30, "readOnly": false }, "hints": [{ "from": { "row": 0, "col": 0 }, "to": { "row": 2, "col": 0 }, "expectedvalues": [["Atkins Moving Company"], ["Trial Balance"], ["August 31, 2015"]] }, { "from": { "row": 5, "col": 0 }, "to": { "row": 9, "col": 2 }, "expectedvalues": [["Cash", 4000, ""], ["Accounts Receivable", 8800, ""], ["Office Supplies", 300, ""], ["Trucks", 132000, ""], ["Building", 48000, ""]] }, { "from": { "row": 10, "col": 0 }, "to": { "row": 14, "col": 2 }, "expectedvalues": [["Accounts Payable", "", 4000], ["Notes Payable", "", 54000], ["Atkins, Capital", "", 72000], ["Atkins, Withdrawals", 5400, ""], ["Service Revenue", "", 80000]] }, { "from": { "row": 15, "col": 0 }, "to": { "row": 19, "col": 2 }, "expectedvalues": [["Salaries Expense", 7000, ""], ["Fuel Expense", 3000, ""], ["Insurance Expense", 600, ""], ["Utility Expense", 500, ""], ["Advertising Expense", 400, ""]] }], "modeconfig": { "mode": "Assessment", "hostAppRootPath": "", "role": "student", "showHintsBtn": false, "hideTopBar": false, "showCheckAnswerBtn": false, "showRibbon": false }, "mergedranges": [{ "row": 0, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 1, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 2, "col": 0, "rowspan": 1, "colspan": 3 }, { "row": 3, "col": 1, "rowspan": 1, "colspan": 2 }], "rows": { "0": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold", "readOnly": false } } }, "1": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "2": { "cells": { "0": { "border": 1, "colorfill": 0, "fontWeight": "bold", "readOnly": false } } }, "3": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "4": { "cells": { "0": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "1": { "colorfill": 0, "border": 1, "fontWeight": "bold" }, "2": { "colorfill": 0, "border": 1, "fontWeight": "bold" } } }, "5": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "6": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "7": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "8": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "9": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "10": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "11": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "12": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "13": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "14": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "15": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "16": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "17": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "18": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "19": { "cells": { "0": { "colorfill": 1, "border": 1, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } }, "20": { "cells": { "0": { "colorfill": 1, "border": 1, "alignment": 2, "readOnly": false }, "1": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false }, "2": { "colorfill": 1, "border": 1, "numberFormat": 1, "readOnly": false } } } }, "sheetNames": ["Solution"], "columns": { "3": { "width": 145 }, "4": { "width": 145 }, "5": { "width": 145 }, "6": { "width": 145 }, "7": { "width": 145 } } },
                    correctData: {
                        correctData: [
                            ["Atkins Moving Company", "", "", "", "", "", "", "", "", "", "", "", ""], ["Trial Balance", "", "", "", "", "", "", "", "", "", "", "", ""], ["August 31, 2015", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "Balance", "", "", "", "", "", "", "", "", "", "", ""], ["Account Title", "Debit", "Credit", "", "", "", "", "", "", "", "", "", ""], ["Cash", 4000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Receivable", 8800, "", "", "", "", "", "", "", "", "", "", ""], ["Office Supplies", 300, "", "", "", "", "", "", "", "", "", "", ""], ["Trucks", 132000, "", "", "", "", "", "", "", "", "", "", ""], ["Building", 48000, "", "", "", "", "", "", "", "", "", "", ""], ["Accounts Payable", "", 4000, "", "", "", "", "", "", "", "", "", ""], ["Notes Payable", "", 54000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Capital", "", 72000, "", "", "", "", "", "", "", "", "", ""], ["Atkins, Withdrawals", 5400, "", "", "", "", "", "", "", "", "", "", ""], ["Service Revenue", "", 80000, "", "", "", "", "", "", "", "", "", ""], ["Salaries Expense", 7000, "", "", "", "", "", "", "", "", "", "", ""], ["Fuel Expense", 3000, "", "", "", "", "", "", "", "", "", "", ""], ["Insurance Expense", 600, "", "", "", "", "", "", "", "", "", "", ""], ["Utility Expense", 500, "", "", "", "", "", "", "", "", "", "", ""], ["Advertising Expense", 400, "", "", "", "", "", "", "", "", "", "", ""], ["Total", 210000, 210000, "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", ""]
                        ],
                        validationJson: [
                            { "cellRange": { "from": { "row": 5, "col": 0 }, "to": { "row": 5, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 5, "col": 0 } }, { "cellRange": { "from": { "row": 6, "col": 0 }, "to": { "row": 6, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 6, "col": 0 } }, { "cellRange": { "from": { "row": 7, "col": 0 }, "to": { "row": 7, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 7, "col": 0 } }, { "cellRange": { "from": { "row": 8, "col": 0 }, "to": { "row": 8, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 8, "col": 0 } }, { "cellRange": { "from": { "row": 9, "col": 0 }, "to": { "row": 9, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 9, "col": 0 } }, { "cellRange": { "from": { "row": 10, "col": 0 }, "to": { "row": 10, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 10, "col": 0 } }, { "cellRange": { "from": { "row": 11, "col": 0 }, "to": { "row": 11, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 11, "col": 0 } }, { "cellRange": { "from": { "row": 12, "col": 0 }, "to": { "row": 12, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 12, "col": 0 } }, { "cellRange": { "from": { "row": 13, "col": 0 }, "to": { "row": 13, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 13, "col": 0 } }, { "cellRange": { "from": { "row": 14, "col": 0 }, "to": { "row": 14, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 14, "col": 0 } }, { "cellRange": { "from": { "row": 15, "col": 0 }, "to": { "row": 15, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 15, "col": 0 } }, { "cellRange": { "from": { "row": 16, "col": 0 }, "to": { "row": 16, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 16, "col": 0 } }, { "cellRange": { "from": { "row": 17, "col": 0 }, "to": { "row": 17, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 17, "col": 0 } }, { "cellRange": { "from": { "row": 18, "col": 0 }, "to": { "row": 18, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 18, "col": 0 } }, { "cellRange": { "from": { "row": 19, "col": 0 }, "to": { "row": 19, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this account are incorrect.", "row": 19, "col": 0 } }, { "cellRange": { "from": { "row": 20, "col": 0 }, "to": { "row": 20, "col": 2 } }, "rule": "all", "errorDetails": { "comment": "Entries for this row are incorrect.", "row": 20, "col": 0 } }
                        ]
                    },
                    gridUIParams: {
                        height: 745,
                        width: 1205
                    }
                }
            }
        };
    }
    DataService.prototype.getQuestionConfig = function (id) {
        return this.config[id];
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/data.service.js.map

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(335);


/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(498);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_28" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=E:/ComproDLSLeonardo/src/main.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leonardo_leonardo_module__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_module__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(493);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var appRoutes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'question',
        children: __WEBPACK_IMPORTED_MODULE_5__leonardo_leonardo_module__["b" /* leoRoutes */]
    },
    {
        path: 'dashboard',
        children: __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_module__["b" /* dashboardRoutes */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["R" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__leonardo_leonardo_module__["a" /* LeonardoModule */],
                __WEBPACK_IMPORTED_MODULE_6__dashboard_dashboard_module__["a" /* DashboardModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__data_service__["a" /* DataService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/app.module.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return leoRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeonardoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__leonardo_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navigator_navigator_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__question_box_question_box_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__workspace_workspace_component__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__verticalSplitter_ng2_split_pane__ = __webpack_require__(480);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var leoRoutes = [
    {
        path: ':id/:mode',
        component: __WEBPACK_IMPORTED_MODULE_3__leonardo_component__["a" /* LeonardoComponent */]
    }
];
var LeonardoModule = (function () {
    function LeonardoModule() {
    }
    LeonardoModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_7__verticalSplitter_ng2_split_pane__["a" /* SplitPaneModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__leonardo_component__["a" /* LeonardoComponent */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__leonardo_component__["a" /* LeonardoComponent */],
                __WEBPACK_IMPORTED_MODULE_4__navigator_navigator_component__["a" /* NavigatorComponent */],
                __WEBPACK_IMPORTED_MODULE_5__question_box_question_box_component__["a" /* QuestionBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_6__workspace_workspace_component__["a" /* WorkspaceComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LeonardoModule);
    return LeonardoModule;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/leonardo.module.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeonardoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LeonardoComponent = (function () {
    function LeonardoComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.mode = params['mode'];
            var questionConfig = _this.dataService.getQuestionConfig(_this.id);
            _this.questionData = questionConfig["question"];
            _this.solutionData = questionConfig["solution"];
        });
        this.navigatorData = {
            hint: {
                isLastHint: false
            },
            showCheckAnswer: this.checkmode(this.mode),
            showHintButton: this.checkmode(this.mode),
            showSubmitButton: true
        };
    }
    LeonardoComponent.prototype.ngOnInit = function () {
    };
    LeonardoComponent.prototype.handleCompEvents = function ($event) {
        var eventMap = {
            "CHECK_MY_ANSWER_CLICKED": this.checkAnswer.bind(this),
            "HINT_CLICKED": this.displayHint.bind(this)
        };
        eventMap[$event.eventId]();
    };
    LeonardoComponent.prototype.checkAnswer = function () {
        this.workspace.checkAnswer();
    };
    LeonardoComponent.prototype.displayHint = function () {
        this.workspace.displayHint();
    };
    LeonardoComponent.prototype.handleGridEvent = function ($event) {
        this.navigatorData.hint.isLastHint = $event.hint.isLastHint;
    };
    LeonardoComponent.prototype.checkmode = function (mode) {
        if (mode == "Assessment") {
            return false;
        }
        else {
            return true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('contentWrapper'), 
        __metadata('design:type', Object)
    ], LeonardoComponent.prototype, "contentWrapper", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('workspace'), 
        __metadata('design:type', Object)
    ], LeonardoComponent.prototype, "workspace", void 0);
    LeonardoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-leonardo',
            template: __webpack_require__(469),
            styles: [__webpack_require__(470)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], LeonardoComponent);
    return LeonardoComponent;
    var _a, _b;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/leonardo.component.js.map

/***/ }),

/***/ 469:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"mode=='Training'\" #contentWrapper class=\"contentWrapper\">\r\n  <vertical-split-pane class=\"verticalSeparator\" primary-component-initialratio=\"0.30\" separator-thickness=\"21\" [primary-component-minsize]=\"0\"\r\n    [secondary-component-minsize]=\"829\">\r\n    <div class=\"split-pane-content-primary\">\r\n      <app-question-box class=\"questionWrapper\" [questionData]='questionData'></app-question-box>\r\n    </div>\r\n    <div class=\"split-pane-content-secondary\">\r\n      <app-workspace #workspace class=\"workspaceWrapper\" [solutionData]='solutionData' (gridEvent) = \"handleGridEvent($event)\"></app-workspace>\r\n    </div>\r\n  </vertical-split-pane>\r\n</div>\r\n<div *ngIf=\"mode=='Assessment'\" #contentWrapper class=\"contentWrapper verticalView\">\r\n      <app-question-box class=\"questionWrapper\" [questionData]='questionData'></app-question-box>\r\n      <app-workspace #workspace class=\"workspaceWrapper col-md-12\" [solutionData]='solutionData' (gridEvent) = \"handleGridEvent($event)\"></app-workspace>\r\n</div>\r\n<app-navigator (navEvent)=\"handleCompEvents($event)\" class=\"navigatorWrapper\" [navigatorData] = \"navigatorData\"></app-navigator>\r\n"

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".contentWrapper > * {\n  display: inline-block; }\n\n.contentWrapper {\n  height: calc(100% - 108px);\n  width: 100%;\n  background-color: #ececec; }\n\n.navigatorWrapper {\n  height: 155px;\n  bottom: 0;\n  font-size: 1.1em;\n  line-height: 1.6; }\n\n.workspaceWrapper {\n  height: 100%; }\n\n.split-pane-content-primary {\n  height: 100%;\n  width: 100%;\n  overflow: auto; }\n\n.split-pane-content-secondary {\n  height: 100%;\n  width: 100%; }\n\n.questionWrapper {\n  height: 100%;\n  width: 100%;\n  overflow: auto; }\n\n.contentWrapper.verticalView {\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #fff; }\n  .contentWrapper.verticalView .questionWrapper {\n    height: auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavigatorComponent = (function () {
    function NavigatorComponent(router) {
        this.router = router;
        this.navEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
    }
    NavigatorComponent.prototype.ngOnInit = function () {
        console.log(this.navigatorData);
    };
    NavigatorComponent.prototype.checkMyAnswer = function () {
        this.navEvent.emit({ eventId: "CHECK_MY_ANSWER_CLICKED" });
    };
    NavigatorComponent.prototype.displayHint = function () {
        this.navEvent.emit({ eventId: "HINT_CLICKED" });
    };
    NavigatorComponent.prototype.handleSubmitClick = function () {
        Leonardo.scripts.destroyGrids();
        this.router.navigate(['/dashboard']);
    };
    NavigatorComponent.prototype.checkvisiblity = function (mode) {
        if (mode == true) {
            return "visible";
        }
        else {
            return "hidden";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]) === 'function' && _a) || Object)
    ], NavigatorComponent.prototype, "navEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(), 
        __metadata('design:type', Object)
    ], NavigatorComponent.prototype, "navigatorData", void 0);
    NavigatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-navigator',
            template: __webpack_require__(472),
            styles: [__webpack_require__(473)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], NavigatorComponent);
    return NavigatorComponent;
    var _a, _b;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/navigator.component.js.map

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\r\n  <div class=\"panel-body\" style=\"display: none;\">\r\n    <p>Prepare the trial balance. Remember that each lineof the heading is very important and should be in a specific order.</p>\r\n    <p><i>Avoid committing spelling mistakes while typing the account heads.</i></p>\r\n  </div>\r\n  <div class=\"panel-footer\">\r\n    <button class=\"btn btn-primary\" [style.visibility]=\"checkvisiblity(navigatorData.showHintButton)\" (click)=\"displayHint()\" [disabled] = \"navigatorData.hint.isLastHint\">Hint</button>\r\n    <button class=\"btn btn-primary\" [style.visibility] = \"checkvisiblity(navigatorData.showCheckAnswer)\" (click)=\"checkMyAnswer()\">Check My Work</button>\r\n    <button class=\"btn btn-primary pull-right\" [style.visibility] = \"checkvisiblity(navigatorData.showSubmitButton)\" (click) = \"handleSubmitClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".panel.panel-default {\n  margin-bottom: 0px;\n  border: 0; }\n  .panel.panel-default .panel-footer {\n    border: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuestionBoxComponent = (function () {
    function QuestionBoxComponent() {
    }
    QuestionBoxComponent.prototype.ngOnInit = function () {
        this.questionHost.nativeElement.innerHTML = this.questionData["template"];
        var leoInstances = this.questionHost.nativeElement.querySelectorAll(".leoHost");
        for (var index = 0; index < leoInstances.length; index++) {
            var data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
            Leonardo.scripts.add(leoInstances[index], data.config, data.correctData);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(), 
        __metadata('design:type', Object)
    ], QuestionBoxComponent.prototype, "questionData", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('questionHost'), 
        __metadata('design:type', Object)
    ], QuestionBoxComponent.prototype, "questionHost", void 0);
    QuestionBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-question-box',
            template: __webpack_require__(475),
            styles: [__webpack_require__(476)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* ViewEncapsulation */].None
        }), 
        __metadata('design:paramtypes', [])
    ], QuestionBoxComponent);
    return QuestionBoxComponent;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/question-box.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, exports) {

module.exports = "<div #questionHost class=\"col-md-12 questionHost\">\r\n</div>"

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".questionHost > div {\n  font-size: 1.1em;\n  line-height: 1.6; }\n\n.questionHost .questionHeadings {\n  font-weight: 600;\n  color: #008fce;\n  font-size: 1.5em; }\n\n.questionHost .leoHost {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkspaceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WorkspaceComponent = (function () {
    function WorkspaceComponent() {
        this.gridEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
    }
    WorkspaceComponent.prototype.ngOnInit = function () {
        if (this.solutionData.gridUIParams) {
            if (this.solutionData.gridUIParams.height) {
                this.leoHost.nativeElement.style.height = this.solutionData.gridUIParams.height + "px";
            }
            if (this.solutionData.gridUIParams.width) {
                this.leoHost.nativeElement.style.width = this.solutionData.gridUIParams.width + "px";
            }
        }
        Leonardo.scripts.add(this.leoHost.nativeElement, this.solutionData.config, this.solutionData.correctData);
    };
    WorkspaceComponent.prototype.checkAnswer = function () {
        Leonardo.scripts.checkAnswer(this.leoHost.nativeElement);
    };
    WorkspaceComponent.prototype.displayHint = function () {
        var hint = Leonardo.scripts.displayHint(this.leoHost.nativeElement);
        if (hint.isLastHint) {
            this.gridEvent.emit({ type: "hint", hint: hint });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(), 
        __metadata('design:type', Object)
    ], WorkspaceComponent.prototype, "solutionData", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('leoHost'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], WorkspaceComponent.prototype, "leoHost", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Output */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]) === 'function' && _b) || Object)
    ], WorkspaceComponent.prototype, "gridEvent", void 0);
    WorkspaceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-workspace',
            template: __webpack_require__(478),
            styles: [__webpack_require__(479)]
        }), 
        __metadata('design:paramtypes', [])
    ], WorkspaceComponent);
    return WorkspaceComponent;
    var _a, _b;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/workspace.component.js.map

/***/ }),

/***/ 478:
/***/ (function(module, exports) {

module.exports = "<div #leoHost class=\"leoHost\">\r\n</div>"

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".leoHost {\n  width: 100%;\n  height: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitPaneModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vertical_split_pane_separator_component__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vertical_split_pane_component__ = __webpack_require__(483);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SplitPaneModule = (function () {
    function SplitPaneModule() {
    }
    SplitPaneModule.forRoot = function () {
        return {
            ngModule: SplitPaneModule,
            providers: []
        };
    };
    SplitPaneModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__vertical_split_pane_component__["a" /* VerticalSplitPaneComponent */],
                __WEBPACK_IMPORTED_MODULE_2__vertical_split_pane_separator_component__["a" /* VerticalSplitSeparatorComponent */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_3__vertical_split_pane_component__["a" /* VerticalSplitPaneComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], SplitPaneModule);
    return SplitPaneModule;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/ng2-split-pane.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerticalSplitSeparatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__split_pane_separator_component__ = __webpack_require__(482);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VerticalSplitSeparatorComponent = (function (_super) {
    __extends(VerticalSplitSeparatorComponent, _super);
    function VerticalSplitSeparatorComponent() {
        _super.apply(this, arguments);
    }
    VerticalSplitSeparatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'vertical-split-separator',
            styles: ["\n    :host {\n      width: 21px;\n      cursor: url(../assets/cursor.cur), ew-resize;\n      position: relative;\n      background-color: #f7f7f7;\n      border-left: 1px solid lightgrey;\n      z-index:2;\n    }\n\n    .handle {\n      width: 100%;\n      height: 100%;\n      padding-left: 3px;\n      background-color: rgba(0,0,0,0);\n      position: absolute;\n    }\n  "],
            template: "\n    <div class=\"handle\"><img src=\"../assets/splitter.png\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], VerticalSplitSeparatorComponent);
    return VerticalSplitSeparatorComponent;
}(__WEBPACK_IMPORTED_MODULE_1__split_pane_separator_component__["a" /* SplitSeparatorComponent */]));
//# sourceMappingURL=E:/ComproDLSLeonardo/src/vertical-split-pane-separator.component.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitSeparatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SplitSeparatorComponent = (function () {
    function SplitSeparatorComponent() {
        this.notifyWillChangeSize = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
    }
    SplitSeparatorComponent.prototype.ngOnInit = function () {
    };
    SplitSeparatorComponent.prototype.onMousedown = function (event) {
        this.notifyWillChangeSize.emit(true);
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]) === 'function' && _a) || Object)
    ], SplitSeparatorComponent.prototype, "notifyWillChangeSize", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* HostListener */])('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SplitSeparatorComponent.prototype, "onMousedown", null);
    SplitSeparatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({}), 
        __metadata('design:paramtypes', [])
    ], SplitSeparatorComponent);
    return SplitSeparatorComponent;
    var _a;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/split-pane-separator.component.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerticalSplitPaneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__split_pane_component__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__position_service__ = __webpack_require__(485);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VerticalSplitPaneComponent = (function (_super) {
    __extends(VerticalSplitPaneComponent, _super);
    function VerticalSplitPaneComponent() {
        _super.apply(this, arguments);
    }
    VerticalSplitPaneComponent.prototype.getTotalSize = function () {
        return this.outerContainer.nativeElement.offsetWidth;
    };
    VerticalSplitPaneComponent.prototype.getPrimarySize = function () {
        return this.primaryComponent.nativeElement.offsetWidth;
    };
    VerticalSplitPaneComponent.prototype.getSecondarySize = function () {
        return this.secondaryComponent.nativeElement.offsetWidth;
    };
    VerticalSplitPaneComponent.prototype.dividerPosition = function (size) {
        var ext = 3;
        var sizePct = (size / this.getTotalSize()) * 100;
        this.primaryComponent.nativeElement.style.width = sizePct + "%";
        this.secondaryComponent.nativeElement.style.width = "calc(" + (100 - sizePct) + "% - 21px)";
    };
    VerticalSplitPaneComponent.prototype.onMousemove = function (event) {
        if (this.isResizing) {
            var coords = __WEBPACK_IMPORTED_MODULE_2__position_service__["a" /* PositionService */].offset(this.primaryComponent);
            this.applySizeChange(event.pageX - coords.left);
        }
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('outer'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], VerticalSplitPaneComponent.prototype, "outerContainer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* HostListener */])('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], VerticalSplitPaneComponent.prototype, "onMousemove", null);
    VerticalSplitPaneComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'vertical-split-pane',
            styles: ["\n    :host{\n      height: 100%;\n      width: 100%;\n    }\n    .v-outer {\n      height: calc(100% - 1px);\n      width: 100%;\n      padding-top: 1px;\n      display: flex;\n      border-left: 1px solid #ddd;\n      border-right: 1px solid #ddd;\n      background-color: #fff;\n    }\n\n    .left-component {\n      width: calc(50%);\n      height:100%;      \n    }\n\n    .right-component {\n      width: calc(50%);\n      overflow: hidden;\n      height:100%;\n    }\n  "],
            template: "\n  <div #outer class=\"v-outer\">\n    <div #primaryComponent class=\"left-component\">\n      <ng-content select=\".split-pane-content-primary\"></ng-content>\n    </div>\n    <vertical-split-separator #separator (notifyWillChangeSize)=\"notifyWillChangeSize($event)\"></vertical-split-separator>\n    <div #secondaryComponent class=\"right-component\">\n      <ng-content select=\".split-pane-content-secondary\"></ng-content>\n    </div>\n  </div>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], VerticalSplitPaneComponent);
    return VerticalSplitPaneComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_1__split_pane_component__["a" /* SplitPaneComponent */]));
//# sourceMappingURL=E:/ComproDLSLeonardo/src/vertical-split-pane.component.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitPaneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SplitPaneComponent = (function () {
    function SplitPaneComponent() {
        this.initialRatio = 0.5;
        this.primaryMinSize = 0;
        this.secondaryMinSize = 0;
        this.localStorageKey = null;
        this.notifySizeDidChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
        this.dividerSize = 8.0;
        this.isResizing = false;
    }
    SplitPaneComponent.prototype.ngAfterViewInit = function () {
        var ratio = this.initialRatio;
        if (this.localStorageKey != null) {
            var ratioStr = localStorage.getItem(this.localStorageKey);
            if (ratioStr != null) {
                ratio = JSON.parse(ratioStr);
            }
        }
        var size = ratio * this.getTotalSize();
        this.applySizeChange(size);
    };
    SplitPaneComponent.prototype.getAvailableSize = function () {
        return this.getTotalSize() - this.dividerSize;
    };
    SplitPaneComponent.prototype.applySizeChange = function (size) {
        if (size != 0) {
            var primarySize = this.checkValidBounds(size, this.primaryMinSize, this.getAvailableSize() - this.secondaryMinSize);
            // console.debug("current: " + this.getPrimarySize()
            //           + " want to be: " + size
            //           + " min: " + this.primaryMinSize
            //           + " max: " + (this.getTotalSize() - this.secondaryMinSize)
            //           + " constrained to: " + primarySize
            //         );
            this.dividerPosition(primarySize);
            this.notifySizeDidChange.emit({ 'primary': this.getPrimarySize(), 'secondary': this.getSecondarySize() });
        }
    };
    SplitPaneComponent.prototype.notifyWillChangeSize = function (resizing) {
        this.isResizing = resizing;
    };
    SplitPaneComponent.prototype.checkValidBounds = function (newSize, minSize, maxSize) {
        return newSize >= minSize
            ? (newSize <= maxSize)
                ? newSize
                : maxSize
            : minSize;
    };
    SplitPaneComponent.prototype.stopResizing = function () {
        this.isResizing = false;
        this.primaryComponent.nativeElement.style.cursor = "auto";
        this.secondaryComponent.nativeElement.style.cursor = "auto";
        if (this.localStorageKey != null) {
            var ratio = this.getPrimarySize() / (this.getTotalSize());
            localStorage.setItem(this.localStorageKey, JSON.stringify(ratio));
        }
    };
    SplitPaneComponent.prototype.onMouseup = function (event) {
        this.stopResizing();
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('primaryComponent'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], SplitPaneComponent.prototype, "primaryComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('secondaryComponent'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _b) || Object)
    ], SplitPaneComponent.prototype, "secondaryComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])('primary-component-initialratio'), 
        __metadata('design:type', Number)
    ], SplitPaneComponent.prototype, "initialRatio", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])('primary-component-minsize'), 
        __metadata('design:type', Number)
    ], SplitPaneComponent.prototype, "primaryMinSize", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])('secondary-component-minsize'), 
        __metadata('design:type', Number)
    ], SplitPaneComponent.prototype, "secondaryMinSize", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])('local-storage-key'), 
        __metadata('design:type', String)
    ], SplitPaneComponent.prototype, "localStorageKey", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Output */])('on-change'), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]) === 'function' && _c) || Object)
    ], SplitPaneComponent.prototype, "notifySizeDidChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* HostListener */])('mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SplitPaneComponent.prototype, "onMouseup", null);
    SplitPaneComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'split-pane',
            host: { 'style': 'height: 40px; position:relative; top:2px; left:20px;' }
        }), 
        __metadata('design:paramtypes', [])
    ], SplitPaneComponent);
    return SplitPaneComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/split-pane.component.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PositionService; });
var PositionService = (function () {
    function PositionService() {
    }
    /**
     * Provides read-only equivalent of jQuery's position function:
     * http://api.jquery.com/position/
     */
    PositionService.position = function (element) {
        var nativeEl = element.nativeElement;
        var elBCR = this.offset(nativeEl);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== this.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    /**
     * Provides read-only equivalent of jQuery's offset function:
     * http://api.jquery.com/offset/
     */
    PositionService.offset = function (element) {
        var nativeEl = element.nativeElement;
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
            left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
        };
    };
    /**
     * Provides coordinates for the targetEl in relation to hostEl
     */
    PositionService.positionElements = function (host, target, positionStr, appendToBody) {
        var hostEl = host.nativeElement;
        var targetEl = target.nativeElement;
        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = appendToBody ?
            this.offset(hostEl) :
            this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        var shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        var targetElPos;
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    Object.defineProperty(PositionService, "window", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PositionService, "document", {
        get: function () {
            return window.document;
        },
        enumerable: true,
        configurable: true
    });
    PositionService.getStyle = function (nativeEl, cssProp) {
        // IE
        if (nativeEl.currentStyle) {
            return nativeEl.currentStyle[cssProp];
        }
        if (this.window.getComputedStyle) {
            return this.window.getComputedStyle(nativeEl)[cssProp];
        }
        // finally try and get inline style
        return nativeEl.style[cssProp];
    };
    /**
     * Checks if a given element is statically positioned
     * @param nativeEl - raw DOM element
     */
    PositionService.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param nativeEl
     */
    PositionService.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || this.document;
        while (offsetParent && offsetParent !== this.document &&
            this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || this.document;
    };
    ;
    return PositionService;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/position.service.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dashboardRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_item_dashboard_item_component__ = __webpack_require__(490);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var dashboardRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */],
        pathMatch: 'full'
    }
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_4__dashboard_item_dashboard_item_component__["a" /* DashboardItemComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/dashboard.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
        this.questions = [
            {
                qText: "Prepare a Trial Balance",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum ",
                badges: ['Accounting', 'Training'],
                view: "Side by Side View"
            },
            {
                qText: "Prepare an Income Statement",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum ",
                badges: ['Accounting', 'Training'],
                view: "Side by Side View"
            },
            {
                qText: "Create a Motion Profile Table",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
                badges: ['Physics', 'Training'],
                view: "Side by Side View"
            },
            {
                qText: "Prepare a Trial Balance",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
                badges: ['Accounting', 'Assessment'],
                view: "Reading View"
            },
            {
                qText: "Prepare an Income Statement",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
                badges: ['Accounting', 'Assessment'],
                view: "Reading View"
            },
            {
                qText: "Create a Motion Profile Table",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis purus mi, quis blandit odio fermentum eu",
                badges: ['Physics', 'Assessment'],
                view: "Reading View"
            }];
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.getQuesIndex = function (Qindex) {
        var relativeLength = (this.questions.length) / 2;
        if (Qindex > relativeLength) {
            return (Qindex - relativeLength);
        }
        else {
            return Qindex;
        }
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__(488),
            styles: [__webpack_require__(489)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/dashboard.component.js.map

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

module.exports = "<div class=\"dashboard-items-container\">\r\n  <div class=\"container contentDiv\">\r\n    <div class=\"row item-container\">\r\n      <app-dashboard-item *ngFor=\"let ques of questions; let qIndex = index;\" [questionIndex]=\"getQuesIndex(qIndex+1)\" [quesMeta]=\"ques\" class=\"col-lg-4 col-md-4 col-sm-4\"></app-dashboard-item>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".header {\n  height: 63px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n  background-color: #ececec;\n  border-bottom: 3px solid #CB2929; }\n  .header .headingWrapper {\n    width: 100%; }\n\n.dashboard-items-container {\n  background-color: #eee;\n  padding-top: 160px;\n  height: calc(100% - 54px); }\n\n.contentDiv {\n  min-width: 80%;\n  max-width: 1280px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardItemComponent = (function () {
    function DashboardItemComponent() {
    }
    DashboardItemComponent.prototype.ngOnInit = function () {
    };
    DashboardItemComponent.prototype.createClassName = function (badgeName) {
        return badgeName.split(" ").join("");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(), 
        __metadata('design:type', Object)
    ], DashboardItemComponent.prototype, "questionIndex", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Input */])(), 
        __metadata('design:type', Object)
    ], DashboardItemComponent.prototype, "quesMeta", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewChild */])('title'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], DashboardItemComponent.prototype, "titleBox", void 0);
    DashboardItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-dashboard-item',
            template: __webpack_require__(491),
            styles: [__webpack_require__(492)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardItemComponent);
    return DashboardItemComponent;
    var _a;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/dashboard-item.component.js.map

/***/ }),

/***/ 491:
/***/ (function(module, exports) {

module.exports = "<section class=\"widget\">\r\n  <div class =\"dashboard-item-widget\">\r\n  <div class=\"widget-body clearfix\">\r\n    <div>\r\n      <div>\r\n        <div #title class=\"dashboard-item-title\">{{quesMeta.qText}}</div>\r\n\r\n      </div>\r\n      <div class=\"description-container\">{{quesMeta.description}}\r\n      </div>\r\n      <div class=\"badge-container\">\r\n          <span class=\"badge leobadge {{createClassName(badge)}}\" *ngFor = \"let badge of quesMeta.badges\">{{badge}}</span>\r\n          <span class=\"viewtypeContainer\">{{\"| \"+ quesMeta.view}}</span>\r\n      </div>\r\n    </div>    \r\n  </div>\r\n  </div>\r\n  <div class=\"button-container\">\r\n    <button [routerLink]=\"['/question',questionIndex,quesMeta.badges[1]]\" class=\"btn btn-leonardo\" type=\"submit\">Launch</button>\r\n    <!-- routerlink path to be chnaged to ../../question when moved to previous release  -->\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, ".widget {\n  position: relative;\n  margin-bottom: 30px;\n  background: #fff;\n  border: 0px solid #217346;\n  border-top-width: 8px;\n  border-radius: 0.5rem;\n  height: 260px;\n  -webkit-box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2); }\n\n.dashboard-item-widget {\n  padding: 30px 30px 40px 30px;\n  height: 200px; }\n  .dashboard-item-widget .dashboard-item-title {\n    -ms-flex-item-align: center;\n        align-self: center;\n    max-height: 58px;\n    line-height: 1.2;\n    width: 100%;\n    font-size: 24px;\n    font-family: \"open-sans\";\n    color: #464646; }\n  .dashboard-item-widget .description-container {\n    font-size: 16px;\n    font-family: \"open-sans\";\n    color: #575757;\n    padding-top: 11px;\n    display: -webkit-box;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n    overflow: hidden; }\n\n.button-container {\n  background-color: #F0F0F0;\n  text-align: center;\n  padding: 10px 0 10px 0; }\n  .button-container .btn-leonardo {\n    background-color: transparent;\n    color: #01579B;\n    border: 1px solid #01579B; }\n  .button-container .btn-leonardo:hover {\n    background-color: #01579B;\n    color: #F0F0F0;\n    border: 1px solid #01579B; }\n  .button-container .btn-leonardo:hover {\n    background-color: #01579B;\n    color: #F0F0F0;\n    border: 1px solid #01579B; }\n\n.leobadge {\n  border-radius: 3px;\n  margin: 2px;\n  font-size: 13px;\n  font-weight: normal;\n  color: #fff;\n  font-family: open-sans;\n  padding: 7px 11px; }\n\n.badge-container {\n  padding-top: 15px; }\n\n.Physics {\n  background: #006064; }\n\n.Training {\n  background: #906D96; }\n\n.Accounting {\n  background: #8D6E63; }\n\n.Assessment {\n  background: #FF8E6C; }\n\n.viewtypeContainer {\n  font-family: open-sans;\n  font-size: 16px;\n  color: #343434;\n  padding-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.isBackVisible = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = document.getElementsByTagName("body")[0];
        var self = this;
        this.router.events.subscribe(function (urlParams) {
            if (urlParams.url === "/dashboard" || (urlParams.url === "/" && urlParams["urlAfterRedirects"] === "/dashboard")) {
                _this.isBackVisible = false;
            }
            else {
                _this.isBackVisible = true;
            }
        });
    };
    AppComponent.prototype.backBtnClick = function () {
        Leonardo.scripts.destroyGrids();
        this.router.navigate(['/dashboard']);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(494),
            styles: [__webpack_require__(495)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=E:/ComproDLSLeonardo/src/app.component.js.map

/***/ }),

/***/ 494:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid header\">\r\n  <div class=\"headingWrapper\">\r\n      <div class=\"logo\"></div>\r\n      <div class=\"verticalLine\"></div>\r\n      <div class=\"productName\">Leonardo</div>\r\n      <button *ngIf=\"isBackVisible\" (click)=\"backBtnClick()\" class=\"backbtn btn btn-default pull-right\">Back</button>\r\n  </div>\r\n</div>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"open-sans\";\n  src: url(" + __webpack_require__(496) + ") format(\"woff\"); }\n\n.header {\n  width: 100%;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 54px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n  background-color: black; }\n  .header .headingWrapper {\n    width: 100%;\n    height: 34px; }\n  .header .verticalLine {\n    border-left: 1px solid grey;\n    display: inline-block;\n    height: 60%;\n    width: 5px; }\n  .header .productName {\n    font-size: 28px;\n    font-weight: Bold;\n    font-family: \"open-sans\";\n    color: #ffffff;\n    display: inline-block;\n    width: calc(100% - 206px); }\n  .header .logo {\n    display: inline-block;\n    height: 100%;\n    width: 132px;\n    background: url(" + __webpack_require__(497) + ") no-repeat;\n    position: relative;\n    top: 6px; }\n  .header .backbtn {\n    background-color: #E8E8E8;\n    position: relative;\n    margin-top: 10px;\n    padding: 4px 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "OpenSans-Regular.woff";

/***/ }),

/***/ 497:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAiCAYAAACZb20EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJBQjdCOTlDNTVBQTExRTc5QTc2QTEwOEU1NkE2Qjk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJBQjdCOTlENTVBQTExRTc5QTc2QTEwOEU1NkE2Qjk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkFCN0I5OUE1NUFBMTFFNzlBNzZBMTA4RTU2QTZCOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkFCN0I5OUI1NUFBMTFFNzlBNzZBMTA4RTU2QTZCOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6W3m1FAAADyElEQVR42uxbjZGqMBCGm2sA7UBL0BKgBC1BS8ASsAQsQUqQEuR1YCrQo4S7xNnMZXK7IYmC+sw3k1ExJMt++5MlEJ/P5yjgdTEej9Hjl8vlwD9S+PmPt2/ed86PJ/z712dQ3X9rEBknOedfW94Ybwf462oMH0FF7wNuCDP+MRHGEIh/HzTg7YJ8Foh/H9RAehI8/jaI/PltaF/QZ2F5bm4551E9TyzieFtZnNtCmG9Cju8XwrMK3vbKwsoXKRhSAV6r/1eCASQd4zBJfFjVD4MrObytPc6dWRpOCkaWKSv7rRbqJarg8ffFjreYt6mmaIEV4q02KJGQLcYfSe9VybcM+yHU9wQRUreEV7p6+wwxLgYGUPnOEYgfFhMP4rtKNNdz/hCfEKvNghB4AblH7XtEVqcpMuYK+p20Y1LwUjm+B9kk9DlPMMdBk9k0fw7jyt8TCx3MHkB8ZOnRwvs30HY2g3wqAh0IwXIgJVMsLNeUq4cmYRRzw7yFRqbMZSlS/iygb2ZQ5gGRWRxfGuanxqF0kMN41cApA9PxAuSo+QIu9hn4Q1H6pKM02SsWV1iEqLxjvIiIIpSVu+bHheM5pYVHlgbZ+0AD3qxj76GPP8RPkEHWiIfJfivEKmMIM7qXmCx5Slj0hvBUU6hdExEm7Zg/hpYQOhhpik+Q6+8TrSHCHCxv+pDEYwqtkXKEWmXWipC6V1MetAXlM2I13DiGwx1xTmIou1iHUdVwTW0PedoFG8JBrimLl297X+L7DF1DK8nFk17lmlqIgJTMC9h77534ZyXzFiRPLl8DqYzy/NTV87vq+Fhr21CKP/Sm0JxIwdLz83sRH/B8KSozOGBusVETiH9hbAjyrauOrt25HMk1AY/BDEpOBiXeJvp9osa27LUmvkAsLWBYso/asUqp7YXX732ID6F++AXardVGot1r8MKHR03LnkyZ9yjF2iclHrtlO+uQm91CfEqEDIbk+dRQ3zcDES9uYJQ3ENoQOpgghmV7Tdgiq/IwyAq5Xrn2wvY2alviK+RiSiS3MBhU3/YTysEeFtwO6EkpoWjmQHyN6OCkEd9G5m3PVfS7lauTsuuQp4jw7Wvslq3sq+d3pj1u1Znjlx1CqbcNa4tFnk2fe9a2jCBz5zDO2sJQlpFfqqsiv+ftVN0zC+PNXHK89IwpYl1yg3+qRYUtTLJDCF+6CHAn4ueaLJWHDJQOZDUzclxMMTgvi+jnAlxyvZStQXS+Fu/F8WZtlPELvjSpvgyoEvaWoF6aDOVcQCA+IBAfiA8qeE/8CDAAiwU+dQRBNokAAAAASUVORK5CYII="

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: true
};
//# sourceMappingURL=E:/ComproDLSLeonardo/src/environment.js.map

/***/ })

},[334]);
//# sourceMappingURL=main.bundle.js.map