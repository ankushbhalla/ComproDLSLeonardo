var Leonardo = Leonardo || {}; Leonardo["styles"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./leonardo.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./leonardo.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.DLSLeonardo {\n  /*!\r\nCopyright (c) Handsoncode sp. z o.o. <hello@handsoncode.net>\r\n\r\nThis Handsontable Pro is a commercial software distributed by Handsoncode Sp. z o.o. with\r\nits registered seat in Gdynia, Aleja Zwyciestwa 96/98 (81-451 Gdynia) Poland, entered into the Entrepreneurs\r\nRegister of the National Court Register under number 0000538651, hereinafter referred to as \"HANDSONCODE\".\r\n\r\nBy installing, copying, or otherwise using this software, you agree to be bound by the terms\r\nof its EULA (End-User License Agreement). This software is copyrighted and protected by copyright laws\r\nand international treaties.\r\n\r\nYOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT USE OF THE SOFTWARE IS AT YOUR OWN RISK AND THAT THE SOFTWARE\r\nIS PROVIDED \"AS IS\" WITHOUT ANY WARRANTIES OR CONDITIONS WHATSOEVER. HANDSONCODE EXPRESSLY DISCLAIMS ANY WARRANTY,\r\nEXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FORA PARTICULAR PURPOSE, OR NONINFRINGMENT. HANDSONCODE DOES NOT WARRANT THAT THE SOFTWARE AND ITS FUNCTIONALITY,\r\nRELIABILITY AND PERFORMANCE WILL MEET YOUR REQUIREMENTS OR THAT THE OPERATION OF THE SOFTWARE WILL BE\r\nUNINTERRUPTED OR ERROR FREE.\r\n\r\nYOU SHALL OBTAIN A COMMERCIAL LICENSE FOR THIS SOFTWARE AT HANDSONTABLE.COM.\r\n\r\n*/\n  /* selection */\n  /* plugins */\n  /* row + column resizer*/\n  /* border line */\n  /* fill handle */\n  /*\r\nTextRenderer readOnly cell\r\n*/\n  /*\r\nTextRenderer horizontal alignment\r\n*/\n  /*\r\nTextRenderer vertical alignment\r\n*/\n  /*\r\nTextRenderer placeholder value\r\n*/\n  /*\r\nAutocompleteRenderer down arrow\r\n*/\n  /*\r\nCheckboxRenderer\r\n*/\n  /**\r\n * Handsontable in Handsontable\r\n */\n  /**\r\n* Autocomplete Editor\r\n*/\n  /**\r\n * Handsontable listbox theme\r\n */\n  /*\r\nCell borders\r\n*/\n  /*WalkontableDebugOverlay*/\n  /*\r\n\r\n Handsontable Mobile Text Editor stylesheet\r\n\r\n */\n  /* Initial left/top coordinates - overwritten when actual position is set */\n  /*!\r\n * Handsontable ContextMenu\r\n */\n  /*!\r\n * Pikaday\r\n * Copyright © 2014 David Bushell | BSD & MIT license | http://dbushell.com/\r\n */\n  /*\r\nclear child float (pika-lendar), using the famous micro clearfix hack\r\nhttp://nicolasgallagher.com/micro-clearfix-hack/\r\n*/\n  /* styling for abbr */\n  /*\r\n * Handsontable HiddenColumns\r\n */\n  /*!\r\n * Handsontable DropdownMenu\r\n */\n  /*!\r\n * Handsontable Filters\r\n */\n  /* Conditions menu */\n  /* Menu label */\n  /* Component action bar */\n  /* Component filter by conditional */\n  /* Component filter by value */\n  /* UI elements */\n  /* Input */\n  /* Button */\n  /* Select */\n  /* SelectMultiple */\n  /*!\r\n * Handsontable HiddenRows\r\n */ }\n  .DLSLeonardo .handsontable {\n    position: relative; }\n  .DLSLeonardo .handsontable .hide {\n    display: none; }\n  .DLSLeonardo .handsontable .relative {\n    position: relative; }\n  .DLSLeonardo .handsontable.htAutoSize {\n    visibility: hidden;\n    left: -99000px;\n    position: absolute;\n    top: -99000px; }\n  .DLSLeonardo .handsontable .wtHider {\n    width: 0; }\n  .DLSLeonardo .handsontable .wtSpreader {\n    position: relative;\n    width: 0;\n    /*must be 0, otherwise blank space appears in scroll demo after scrolling max to the right */\n    height: auto; }\n  .DLSLeonardo .handsontable table,\n  .DLSLeonardo .handsontable tbody,\n  .DLSLeonardo .handsontable thead,\n  .DLSLeonardo .handsontable td,\n  .DLSLeonardo .handsontable th,\n  .DLSLeonardo .handsontable input,\n  .DLSLeonardo .handsontable textarea,\n  .DLSLeonardo .handsontable div {\n    box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n    -moz-box-sizing: content-box; }\n  .DLSLeonardo .handsontable input,\n  .DLSLeonardo .handsontable textarea {\n    min-height: initial; }\n  .DLSLeonardo .handsontable table.htCore {\n    border-collapse: separate;\n    /*it must be separate, otherwise there are offset miscalculations in WebKit: http://stackoverflow.com/questions/2655987/border-collapse-differences-in-ff-and-webkit*/\n    /*this actually only changes appearance of user selection - does not make text unselectable\r\n  -webkit-user-select: none;\r\n  -khtml-user-select: none;\r\n  -moz-user-select: none;\r\n  -o-user-select: none;\r\n  -ms-user-select: none;\r\n  /*user-select: none; /*no browser supports unprefixed version*/\n    border-spacing: 0;\n    margin: 0;\n    border-width: 0;\n    table-layout: fixed;\n    width: 0;\n    outline-width: 0;\n    /* reset bootstrap table style. for more info see: https://github.com/handsontable/handsontable/issues/224 */\n    max-width: none;\n    max-height: none; }\n  .DLSLeonardo .handsontable col {\n    width: 50px; }\n  .DLSLeonardo .handsontable col.rowHeader {\n    width: 50px; }\n  .DLSLeonardo .handsontable th,\n  .DLSLeonardo .handsontable td {\n    border-top-width: 0;\n    border-left-width: 0;\n    border-right: 1px solid #CCC;\n    border-bottom: 1px solid #CCC;\n    height: 22px;\n    empty-cells: show;\n    line-height: 21px;\n    padding: 0 4px 0 4px;\n    /* top, bottom padding different than 0 is handled poorly by FF with HTML5 doctype */\n    background-color: #FFF;\n    vertical-align: top;\n    overflow: hidden;\n    outline-width: 0;\n    white-space: pre-line;\n    /* preserve new line character in cell */\n    background-clip: padding-box; }\n  .DLSLeonardo .handsontable td.htInvalid {\n    background-color: #ff4c42 !important;\n    /*gives priority over td.area selection background*/ }\n  .DLSLeonardo .handsontable td.htNoWrap {\n    white-space: nowrap; }\n  .DLSLeonardo .handsontable th:last-child {\n    /*Foundation framework fix*/\n    border-right: 1px solid #CCC;\n    border-bottom: 1px solid #CCC; }\n  .DLSLeonardo .handsontable tr:first-child th.htNoFrame,\n  .DLSLeonardo .handsontable th:first-child.htNoFrame,\n  .DLSLeonardo .handsontable th.htNoFrame {\n    border-left-width: 0;\n    background-color: white;\n    border-color: #FFF; }\n  .DLSLeonardo .handsontable th:first-child,\n  .DLSLeonardo .handsontable th:nth-child(2),\n  .DLSLeonardo .handsontable td:first-of-type,\n  .DLSLeonardo .handsontable .htNoFrame + th,\n  .DLSLeonardo .handsontable .htNoFrame + td {\n    border-left: 1px solid #CCC; }\n  .DLSLeonardo .handsontable.htRowHeaders thead tr th:nth-child(2) {\n    border-left: 1px solid #CCC; }\n  .DLSLeonardo .handsontable tr:first-child th,\n  .DLSLeonardo .handsontable tr:first-child td {\n    border-top: 1px solid #CCC; }\n  .DLSLeonardo .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th,\n  .DLSLeonardo .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable:not(.ht_clone_top) thead tr th:first-child {\n    border-right-width: 0; }\n  .DLSLeonardo .ht_master:not(.innerBorderTop) thead tr:last-child th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) ~ .handsontable thead tr:last-child th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) thead tr.lastChild th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) ~ .handsontable thead tr.lastChild th {\n    border-bottom-width: 0; }\n  .DLSLeonardo .handsontable th {\n    background-color: #f3f3f3;\n    color: #222;\n    text-align: center;\n    font-weight: normal;\n    white-space: nowrap; }\n  .DLSLeonardo .handsontable thead th {\n    padding: 0; }\n  .DLSLeonardo .handsontable th.active {\n    background-color: #CCC; }\n  .DLSLeonardo .handsontable thead th .relative {\n    padding: 2px 4px; }\n  .DLSLeonardo .handsontable tbody th.ht__highlight,\n  .DLSLeonardo .handsontable thead th.ht__highlight {\n    background-color: #dcdcdc; }\n  .DLSLeonardo .handsontable.ht__selection--columns thead th.ht__highlight,\n  .DLSLeonardo .handsontable.ht__selection--rows tbody th.ht__highlight {\n    background-color: #8eb0e7;\n    color: #000; }\n  .DLSLeonardo .handsontable .manualColumnResizer {\n    position: fixed;\n    top: 0;\n    cursor: col-resize;\n    z-index: 110;\n    width: 5px;\n    height: 25px; }\n  .DLSLeonardo .handsontable .manualRowResizer {\n    position: fixed;\n    left: 0;\n    cursor: row-resize;\n    z-index: 110;\n    height: 5px;\n    width: 50px; }\n  .DLSLeonardo .handsontable .manualColumnResizer:hover,\n  .DLSLeonardo .handsontable .manualColumnResizer.active,\n  .DLSLeonardo .handsontable .manualRowResizer:hover,\n  .DLSLeonardo .handsontable .manualRowResizer.active {\n    background-color: #AAB; }\n  .DLSLeonardo .handsontable .manualColumnResizerGuide {\n    position: fixed;\n    right: 0;\n    top: 0;\n    background-color: #AAB;\n    display: none;\n    width: 0;\n    border-right: 1px dashed #777;\n    margin-left: 5px; }\n  .DLSLeonardo .handsontable .manualRowResizerGuide {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    background-color: #AAB;\n    display: none;\n    height: 0;\n    border-bottom: 1px dashed #777;\n    margin-top: 5px; }\n  .DLSLeonardo .handsontable .manualColumnResizerGuide.active,\n  .DLSLeonardo .handsontable .manualRowResizerGuide.active {\n    display: block;\n    z-index: 199; }\n  .DLSLeonardo .handsontable .columnSorting {\n    position: relative; }\n  .DLSLeonardo .handsontable .columnSorting:hover {\n    text-decoration: underline;\n    cursor: pointer; }\n  .DLSLeonardo .handsontable .columnSorting.ascending::after {\n    content: '\\25B2';\n    color: #5f5f5f;\n    position: absolute;\n    right: -15px; }\n  .DLSLeonardo .handsontable .columnSorting.descending::after {\n    content: '\\25BC';\n    color: #5f5f5f;\n    position: absolute;\n    right: -15px; }\n  .DLSLeonardo .handsontable .wtBorder {\n    position: absolute;\n    font-size: 0; }\n  .DLSLeonardo .handsontable .wtBorder.hidden {\n    display: none !important; }\n  .DLSLeonardo .handsontable td.area {\n    background: -moz-linear-gradient(top, rgba(181, 209, 255, 0.34) 0%, rgba(181, 209, 255, 0.34) 100%);\n    /* FF3.6+ */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(181, 209, 255, 0.34)), color-stop(100%, rgba(181, 209, 255, 0.34)));\n    /* Chrome,Safari4+ */\n    background: -webkit-linear-gradient(top, rgba(181, 209, 255, 0.34) 0%, rgba(181, 209, 255, 0.34) 100%);\n    /* Chrome10+,Safari5.1+ */\n    background: -o-linear-gradient(top, rgba(181, 209, 255, 0.34) 0%, rgba(181, 209, 255, 0.34) 100%);\n    /* Opera 11.10+ */\n    background: -ms-linear-gradient(top, rgba(181, 209, 255, 0.34) 0%, rgba(181, 209, 255, 0.34) 100%);\n    /* IE10+ */\n    background: linear-gradient(to bottom, rgba(181, 209, 255, 0.34) 0%, rgba(181, 209, 255, 0.34) 100%);\n    /* W3C */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#57b5d1ff', endColorstr='#57b5d1ff',GradientType=0 );\n    /* IE6-9 */\n    background-color: #fff; }\n  .DLSLeonardo .handsontable .wtBorder.corner {\n    font-size: 0;\n    cursor: crosshair; }\n  .DLSLeonardo .handsontable .htBorder.htFillBorder {\n    background: red;\n    width: 1px;\n    height: 1px; }\n  .DLSLeonardo .handsontableInput {\n    border: none;\n    outline-width: 0;\n    margin: 0;\n    padding: 1px 5px 0 5px;\n    font-family: inherit;\n    line-height: 21px;\n    font-size: inherit;\n    box-shadow: 0 0 0 2px #5292F7 inset;\n    resize: none;\n    /*below are needed to overwrite stuff added by jQuery UI Bootstrap theme*/\n    display: inline-block;\n    color: #000;\n    border-radius: 0;\n    background-color: #FFF;\n    /*overwrite styles potentionally made by a framework*/ }\n  .DLSLeonardo .handsontableInputHolder {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 100; }\n  .DLSLeonardo .htSelectEditor {\n    -webkit-appearance: menulist-button !important;\n    position: absolute;\n    width: auto; }\n  .DLSLeonardo .handsontable .htDimmed {\n    color: #777; }\n  .DLSLeonardo .handsontable .htSubmenu {\n    position: relative; }\n  .DLSLeonardo .handsontable .htSubmenu :after {\n    content: '\\25B6';\n    color: #777;\n    position: absolute;\n    right: 5px; }\n  .DLSLeonardo .handsontable .htLeft {\n    text-align: left; }\n  .DLSLeonardo .handsontable .htCenter {\n    text-align: center; }\n  .DLSLeonardo .handsontable .htRight {\n    text-align: right; }\n  .DLSLeonardo .handsontable .htJustify {\n    text-align: justify; }\n  .DLSLeonardo .handsontable .htTop {\n    vertical-align: top; }\n  .DLSLeonardo .handsontable .htMiddle {\n    vertical-align: middle; }\n  .DLSLeonardo .handsontable .htBottom {\n    vertical-align: bottom; }\n  .DLSLeonardo .handsontable .htPlaceholder {\n    color: #999; }\n  .DLSLeonardo .handsontable .htAutocompleteArrow {\n    float: right;\n    font-size: 10px;\n    color: #EEE;\n    cursor: default;\n    width: 16px;\n    text-align: center; }\n  .DLSLeonardo .handsontable td .htAutocompleteArrow:hover {\n    color: #777; }\n  .DLSLeonardo .handsontable td.area .htAutocompleteArrow {\n    color: #d3d3d3; }\n  .DLSLeonardo .handsontable .htCheckboxRendererInput {\n    display: inline-block;\n    vertical-align: middle; }\n  .DLSLeonardo .handsontable .htCheckboxRendererInput.noValue {\n    opacity: 0.5; }\n  .DLSLeonardo .handsontable .htCheckboxRendererLabel {\n    cursor: pointer;\n    display: inline-block;\n    width: 100%; }\n\n@-webkit-keyframes opacity-hide {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    /*display: none;*/ } }\n\n@keyframes opacity-hide {\n  from {\n    /*display: block;*/\n    opacity: 1; }\n  to {\n    opacity: 0;\n    /*display: none;*/ } }\n\n@-webkit-keyframes opacity-show {\n  from {\n    opacity: 0;\n    /*display: none;*/ }\n  to {\n    opacity: 1;\n    /*display: block;*/ } }\n\n@keyframes opacity-show {\n  from {\n    opacity: 0;\n    /*display: none;*/ }\n  to {\n    opacity: 1;\n    /*display: block;*/ } }\n  .DLSLeonardo .handsontable .handsontable.ht_clone_top .wtHider {\n    padding: 0 0 5px 0; }\n  .DLSLeonardo .handsontable .autocompleteEditor.handsontable {\n    padding-right: 17px; }\n  .DLSLeonardo .handsontable .autocompleteEditor.handsontable.htMacScroll {\n    padding-right: 15px; }\n  .DLSLeonardo .handsontable.listbox {\n    margin: 0; }\n  .DLSLeonardo .handsontable.listbox .ht_master table {\n    border: 1px solid #ccc;\n    border-collapse: separate;\n    background: white; }\n  .DLSLeonardo .handsontable.listbox th,\n  .DLSLeonardo .handsontable.listbox tr:first-child th,\n  .DLSLeonardo .handsontable.listbox tr:last-child th,\n  .DLSLeonardo .handsontable.listbox tr:first-child td,\n  .DLSLeonardo .handsontable.listbox td {\n    border-color: transparent; }\n  .DLSLeonardo .handsontable.listbox th,\n  .DLSLeonardo .handsontable.listbox td {\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n  .DLSLeonardo .handsontable.listbox td.htDimmed {\n    cursor: default;\n    color: inherit;\n    font-style: inherit; }\n  .DLSLeonardo .handsontable.listbox .wtBorder {\n    visibility: hidden; }\n  .DLSLeonardo .handsontable.listbox tr td.current,\n  .DLSLeonardo .handsontable.listbox tr:hover td {\n    background: #eee; }\n  .DLSLeonardo .ht_clone_top {\n    z-index: 101; }\n  .DLSLeonardo .ht_clone_left {\n    z-index: 102; }\n  .DLSLeonardo .ht_clone_top_left_corner,\n  .DLSLeonardo .ht_clone_bottom_left_corner {\n    z-index: 103; }\n  .DLSLeonardo .ht_clone_debug {\n    z-index: 103; }\n  .DLSLeonardo .handsontable td.htSearchResult {\n    background: #fcedd9;\n    color: #583707; }\n  .DLSLeonardo .htBordered {\n    /*box-sizing: border-box !important;*/\n    border-width: 1px; }\n  .DLSLeonardo .htBordered.htTopBorderSolid {\n    border-top-style: solid;\n    border-top-color: #000; }\n  .DLSLeonardo .htBordered.htRightBorderSolid {\n    border-right-style: solid;\n    border-right-color: #000; }\n  .DLSLeonardo .htBordered.htBottomBorderSolid {\n    border-bottom-style: solid;\n    border-bottom-color: #000; }\n  .DLSLeonardo .htBordered.htLeftBorderSolid {\n    border-left-style: solid;\n    border-left-color: #000; }\n  .DLSLeonardo .handsontable tbody tr th:nth-last-child(2) {\n    border-right: 1px solid #CCC; }\n  .DLSLeonardo .handsontable thead tr:nth-last-child(2) th.htGroupIndicatorContainer {\n    border-bottom: 1px solid #CCC;\n    padding-bottom: 5px; }\n  .DLSLeonardo .ht_clone_top_left_corner thead tr th:nth-last-child(2) {\n    border-right: 1px solid #CCC; }\n  .DLSLeonardo .htCollapseButton {\n    width: 10px;\n    height: 10px;\n    line-height: 10px;\n    text-align: center;\n    border-radius: 5px;\n    border: 1px solid #f3f3f3;\n    -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n    cursor: pointer;\n    margin-bottom: 3px;\n    position: relative; }\n  .DLSLeonardo .htCollapseButton:after {\n    content: \"\";\n    height: 300%;\n    width: 1px;\n    display: block;\n    background: #ccc;\n    margin-left: 4px;\n    position: absolute;\n    /*top: -300%;*/\n    bottom: 10px; }\n  .DLSLeonardo thead .htCollapseButton {\n    right: 5px;\n    position: absolute;\n    top: 5px;\n    background: #fff; }\n  .DLSLeonardo thead .htCollapseButton:after {\n    height: 1px;\n    width: 700%;\n    right: 10px;\n    top: 4px; }\n  .DLSLeonardo .handsontable tr th .htExpandButton {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    line-height: 10px;\n    text-align: center;\n    border-radius: 5px;\n    border: 1px solid #f3f3f3;\n    -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n    cursor: pointer;\n    top: 0;\n    display: none; }\n  .DLSLeonardo .handsontable thead tr th .htExpandButton {\n    /*left: 5px;*/\n    top: 5px; }\n  .DLSLeonardo .handsontable tr th .htExpandButton.clickable {\n    display: block; }\n  .DLSLeonardo .collapsibleIndicator {\n    position: absolute;\n    top: 50%;\n    transform: translate(0%, -50%);\n    right: 5px;\n    border: 1px solid #A6A6A6;\n    line-height: 10px;\n    color: #222;\n    border-radius: 10px;\n    font-size: 10px;\n    width: 10px;\n    height: 10px;\n    cursor: pointer;\n    -webkit-box-shadow: 0 0 0 6px #eeeeee;\n    -moz-box-shadow: 0 0 0 6px #eeeeee;\n    box-shadow: 0 0 0 6px #eeeeee;\n    background: #eee; }\n  .DLSLeonardo .handsontable col.hidden {\n    width: 0 !important; }\n  .DLSLeonardo .handsontable table tr th.lightRightBorder {\n    border-right: 1px solid #E6E6E6; }\n  .DLSLeonardo .handsontable tr.hidden,\n  .DLSLeonardo .handsontable tr.hidden td,\n  .DLSLeonardo .handsontable tr.hidden th {\n    display: none; }\n  .DLSLeonardo .ht_master,\n  .DLSLeonardo .ht_clone_left,\n  .DLSLeonardo .ht_clone_top,\n  .DLSLeonardo .ht_clone_bottom {\n    overflow: hidden; }\n  .DLSLeonardo .ht_master .wtHolder {\n    overflow: auto; }\n  .DLSLeonardo .ht_clone_left .wtHolder {\n    overflow-x: hidden;\n    overflow-y: auto; }\n  .DLSLeonardo .ht_clone_top .wtHolder,\n  .DLSLeonardo .ht_clone_bottom .wtHolder {\n    overflow-x: auto;\n    overflow-y: hidden; }\n  .DLSLeonardo .wtDebugHidden {\n    display: none; }\n  .DLSLeonardo .wtDebugVisible {\n    display: block;\n    -webkit-animation-duration: 0.5s;\n    -webkit-animation-name: wtFadeInFromNone;\n    animation-duration: 0.5s;\n    animation-name: wtFadeInFromNone; }\n\n@keyframes wtFadeInFromNone {\n  0% {\n    display: none;\n    opacity: 0; }\n  1% {\n    display: block;\n    opacity: 0; }\n  100% {\n    display: block;\n    opacity: 1; } }\n\n@-webkit-keyframes wtFadeInFromNone {\n  0% {\n    display: none;\n    opacity: 0; }\n  1% {\n    display: block;\n    opacity: 0; }\n  100% {\n    display: block;\n    opacity: 1; } }\n  .DLSLeonardo .handsontable.mobile,\n  .DLSLeonardo .handsontable.mobile .wtHolder {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-overflow-scrolling: touch; }\n  .DLSLeonardo .htMobileEditorContainer {\n    display: none;\n    position: absolute;\n    top: 0;\n    width: 70%;\n    height: 54pt;\n    background: #f8f8f8;\n    border-radius: 20px;\n    border: 1px solid #ebebeb;\n    z-index: 999;\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -webkit-text-size-adjust: none; }\n  .DLSLeonardo .topLeftSelectionHandle:not(.ht_master .topLeftSelectionHandle),\n  .DLSLeonardo .topLeftSelectionHandle-HitArea:not(.ht_master .topLeftSelectionHandle-HitArea) {\n    z-index: 9999; }\n  .DLSLeonardo .topLeftSelectionHandle,\n  .DLSLeonardo .topLeftSelectionHandle-HitArea,\n  .DLSLeonardo .bottomRightSelectionHandle,\n  .DLSLeonardo .bottomRightSelectionHandle-HitArea {\n    left: -10000px;\n    top: -10000px; }\n  .DLSLeonardo .htMobileEditorContainer.active {\n    display: block; }\n  .DLSLeonardo .htMobileEditorContainer .inputs {\n    position: absolute;\n    right: 210pt;\n    bottom: 10pt;\n    top: 10pt;\n    left: 14px;\n    height: 34pt; }\n  .DLSLeonardo .htMobileEditorContainer .inputs textarea {\n    font-size: 13pt;\n    border: 1px solid #a1a1a1;\n    -webkit-appearance: none;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none;\n    position: absolute;\n    left: 14px;\n    right: 14px;\n    top: 0;\n    bottom: 0;\n    padding: 7pt; }\n  .DLSLeonardo .htMobileEditorContainer .cellPointer {\n    position: absolute;\n    top: -13pt;\n    height: 0;\n    width: 0;\n    left: 30px;\n    border-left: 13pt solid transparent;\n    border-right: 13pt solid transparent;\n    border-bottom: 13pt solid #ebebeb; }\n  .DLSLeonardo .htMobileEditorContainer .cellPointer.hidden {\n    display: none; }\n  .DLSLeonardo .htMobileEditorContainer .cellPointer:before {\n    content: '';\n    display: block;\n    position: absolute;\n    top: 2px;\n    height: 0;\n    width: 0;\n    left: -13pt;\n    border-left: 13pt solid transparent;\n    border-right: 13pt solid transparent;\n    border-bottom: 13pt solid #f8f8f8; }\n  .DLSLeonardo .htMobileEditorContainer .moveHandle {\n    position: absolute;\n    top: 10pt;\n    left: 5px;\n    width: 30px;\n    bottom: 0px;\n    cursor: move;\n    z-index: 9999; }\n  .DLSLeonardo .htMobileEditorContainer .moveHandle:after {\n    content: \"..\\A..\\A..\\A..\";\n    white-space: pre;\n    line-height: 10px;\n    font-size: 20pt;\n    display: inline-block;\n    margin-top: -8px;\n    color: #ebebeb; }\n  .DLSLeonardo .htMobileEditorContainer .positionControls {\n    width: 205pt;\n    position: absolute;\n    right: 5pt;\n    top: 0;\n    bottom: 0; }\n  .DLSLeonardo .htMobileEditorContainer .positionControls > div {\n    width: 50pt;\n    height: 100%;\n    float: left; }\n  .DLSLeonardo .htMobileEditorContainer .positionControls > div:after {\n    content: \" \";\n    display: block;\n    width: 15pt;\n    height: 15pt;\n    text-align: center;\n    line-height: 50pt; }\n  .DLSLeonardo .htMobileEditorContainer .leftButton:after,\n  .DLSLeonardo .htMobileEditorContainer .rightButton:after,\n  .DLSLeonardo .htMobileEditorContainer .upButton:after,\n  .DLSLeonardo .htMobileEditorContainer .downButton:after {\n    transform-origin: 5pt 5pt;\n    -webkit-transform-origin: 5pt 5pt;\n    margin: 21pt 0 0 21pt; }\n  .DLSLeonardo .htMobileEditorContainer .leftButton:after {\n    border-top: 2px solid #288ffe;\n    border-left: 2px solid #288ffe;\n    -webkit-transform: rotate(-45deg);\n    /*margin-top: 17pt;*/\n    /*margin-left: 20pt;*/ }\n  .DLSLeonardo .htMobileEditorContainer .leftButton:active:after {\n    border-color: #cfcfcf; }\n  .DLSLeonardo .htMobileEditorContainer .rightButton:after {\n    border-top: 2px solid #288ffe;\n    border-left: 2px solid #288ffe;\n    -webkit-transform: rotate(135deg);\n    /*margin-top: 17pt;*/\n    /*margin-left: 10pt;*/ }\n  .DLSLeonardo .htMobileEditorContainer .rightButton:active:after {\n    border-color: #cfcfcf; }\n  .DLSLeonardo .htMobileEditorContainer .upButton:after {\n    /*border-top: 2px solid #cfcfcf;*/\n    border-top: 2px solid #288ffe;\n    border-left: 2px solid #288ffe;\n    -webkit-transform: rotate(45deg);\n    /*margin-top: 22pt;*/\n    /*margin-left: 15pt;*/ }\n  .DLSLeonardo .htMobileEditorContainer .upButton:active:after {\n    border-color: #cfcfcf; }\n  .DLSLeonardo .htMobileEditorContainer .downButton:after {\n    border-top: 2px solid #288ffe;\n    border-left: 2px solid #288ffe;\n    -webkit-transform: rotate(225deg);\n    /*margin-top: 15pt;*/\n    /*margin-left: 15pt;*/ }\n  .DLSLeonardo .htMobileEditorContainer .downButton:active:after {\n    border-color: #cfcfcf; }\n  .DLSLeonardo .handsontable.hide-tween {\n    -webkit-animation: opacity-hide 0.3s;\n    animation: opacity-hide 0.3s;\n    animation-fill-mode: forwards;\n    -webkit-animation-fill-mode: forwards; }\n  .DLSLeonardo .handsontable.show-tween {\n    -webkit-animation: opacity-show 0.3s;\n    animation: opacity-show 0.3s;\n    animation-fill-mode: forwards;\n    -webkit-animation-fill-mode: forwards; }\n  .DLSLeonardo .htCommentCell {\n    position: relative; }\n  .DLSLeonardo .htCommentCell:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-left: 6px solid transparent;\n    border-top: 6px solid black; }\n  .DLSLeonardo .htComments {\n    display: none;\n    z-index: 1059;\n    position: absolute; }\n  .DLSLeonardo .htCommentTextArea {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    border: none;\n    border-left: 3px solid #ccc;\n    background-color: #fff;\n    width: 215px;\n    height: 90px;\n    font-size: 12px;\n    padding: 5px;\n    outline: 0px !important;\n    -webkit-appearance: none; }\n  .DLSLeonardo .htCommentTextArea:focus {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px, inset 0 0 0 1px #5292f7;\n    border-left: 3px solid #5292f7; }\n  .DLSLeonardo .htContextMenu {\n    display: none;\n    position: absolute;\n    z-index: 1060;\n    /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */ }\n  .DLSLeonardo .htContextMenu .ht_clone_top,\n  .DLSLeonardo .htContextMenu .ht_clone_left,\n  .DLSLeonardo .htContextMenu .ht_clone_corner,\n  .DLSLeonardo .htContextMenu .ht_clone_debug {\n    display: none; }\n  .DLSLeonardo .htContextMenu table.htCore {\n    border: 1px solid #ccc;\n    border-bottom-width: 2px;\n    border-right-width: 2px; }\n  .DLSLeonardo .htContextMenu .wtBorder {\n    visibility: hidden; }\n  .DLSLeonardo .htContextMenu table tbody tr td {\n    background: white;\n    border-width: 0;\n    padding: 4px 6px 0 6px;\n    cursor: pointer;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n  .DLSLeonardo .htContextMenu table tbody tr td:first-child {\n    border: 0; }\n  .DLSLeonardo .htContextMenu table tbody tr td.htDimmed {\n    font-style: normal;\n    color: #323232; }\n  .DLSLeonardo .htContextMenu table tbody tr td.current,\n  .DLSLeonardo .htContextMenu table tbody tr td.zeroclipboard-is-hover {\n    background: #f3f3f3; }\n  .DLSLeonardo .htContextMenu table tbody tr td.htSeparator {\n    border-top: 1px solid #bbb;\n    height: 0;\n    padding: 0;\n    cursor: default; }\n  .DLSLeonardo .htContextMenu table tbody tr td.htDisabled {\n    color: #999;\n    cursor: default; }\n  .DLSLeonardo .htContextMenu table tbody tr td.htDisabled:hover {\n    background: #fff;\n    color: #999;\n    cursor: default; }\n  .DLSLeonardo .htContextMenu table tbody tr.htHidden {\n    display: none; }\n  .DLSLeonardo .htContextMenu table tbody tr td .htItemWrapper {\n    margin-left: 10px;\n    margin-right: 6px; }\n  .DLSLeonardo .htContextMenu table tbody tr td div span.selected {\n    margin-top: -2px;\n    position: absolute;\n    left: 4px; }\n  .DLSLeonardo .htContextMenu .ht_master .wtHolder {\n    overflow: hidden; }\n  .DLSLeonardo .htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_top_left_corner th:nth-child(2),\n  .DLSLeonardo .htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_left td:first-of-type {\n    border-left: 0 none; }\n  .DLSLeonardo .handsontable .wtHider {\n    position: relative; }\n  .DLSLeonardo .handsontable.ht__manualColumnMove.after-selection--columns thead th.ht__highlight {\n    cursor: move;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n    cursor: grab; }\n  .DLSLeonardo .handsontable.ht__manualColumnMove.on-moving--columns,\n  .DLSLeonardo .handsontable.ht__manualColumnMove.on-moving--columns thead th.ht__highlight {\n    cursor: move;\n    cursor: -moz-grabbing;\n    cursor: -webkit-grabbing;\n    cursor: grabbing; }\n  .DLSLeonardo .handsontable.ht__manualColumnMove.on-moving--columns .manualColumnResizer {\n    display: none; }\n  .DLSLeonardo .handsontable .ht__manualColumnMove--guideline,\n  .DLSLeonardo .handsontable .ht__manualColumnMove--backlight {\n    position: absolute;\n    height: 100%;\n    display: none; }\n  .DLSLeonardo .handsontable .ht__manualColumnMove--guideline {\n    background: #757575;\n    width: 2px;\n    top: 0;\n    margin-left: -1px;\n    z-index: 105; }\n  .DLSLeonardo .handsontable .ht__manualColumnMove--backlight {\n    background: #343434;\n    background: rgba(52, 52, 52, 0.25);\n    display: none;\n    z-index: 105;\n    pointer-events: none; }\n  .DLSLeonardo .handsontable.on-moving--columns.show-ui .ht__manualColumnMove--guideline,\n  .DLSLeonardo .handsontable.on-moving--columns .ht__manualColumnMove--backlight {\n    display: block; }\n  .DLSLeonardo .handsontable .wtHider {\n    position: relative; }\n  .DLSLeonardo .handsontable.ht__manualRowMove.after-selection--rows tbody th.ht__highlight {\n    cursor: move;\n    cursor: -moz-grab;\n    cursor: -webkit-grab;\n    cursor: grab; }\n  .DLSLeonardo .handsontable.ht__manualRowMove.on-moving--rows,\n  .DLSLeonardo .handsontable.ht__manualRowMove.on-moving--rows tbody th.ht__highlight {\n    cursor: move;\n    cursor: -moz-grabbing;\n    cursor: -webkit-grabbing;\n    cursor: grabbing; }\n  .DLSLeonardo .handsontable.ht__manualRowMove.on-moving--rows .manualRowResizer {\n    display: none; }\n  .DLSLeonardo .handsontable .ht__manualRowMove--guideline,\n  .DLSLeonardo .handsontable .ht__manualRowMove--backlight {\n    position: absolute;\n    width: 100%;\n    display: none; }\n  .DLSLeonardo .handsontable .ht__manualRowMove--guideline {\n    background: #757575;\n    height: 2px;\n    left: 0;\n    margin-top: -1px;\n    z-index: 105; }\n  .DLSLeonardo .handsontable .ht__manualRowMove--backlight {\n    background: #343434;\n    background: rgba(52, 52, 52, 0.25);\n    display: none;\n    z-index: 105;\n    pointer-events: none; }\n  .DLSLeonardo .handsontable.on-moving--rows.show-ui .ht__manualRowMove--guideline,\n  .DLSLeonardo .handsontable.on-moving--rows .ht__manualRowMove--backlight {\n    display: block; }\n  .DLSLeonardo .pika-single {\n    z-index: 9999;\n    display: block;\n    position: relative;\n    color: #333;\n    background: #fff;\n    border: 1px solid #ccc;\n    border-bottom-color: #bbb;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n  .DLSLeonardo .pika-single:before,\n  .DLSLeonardo .pika-single:after {\n    content: \" \";\n    display: table; }\n  .DLSLeonardo .pika-single:after {\n    clear: both; }\n  .DLSLeonardo .pika-single {\n    *zoom: 1; }\n  .DLSLeonardo .pika-single.is-hidden {\n    display: none; }\n  .DLSLeonardo .pika-single.is-bound {\n    position: absolute;\n    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5); }\n  .DLSLeonardo .pika-lendar {\n    float: left;\n    width: 240px;\n    margin: 8px; }\n  .DLSLeonardo .pika-title {\n    position: relative;\n    text-align: center; }\n  .DLSLeonardo .pika-label {\n    display: inline-block;\n    *display: inline;\n    position: relative;\n    z-index: 9999;\n    overflow: hidden;\n    margin: 0;\n    padding: 5px 3px;\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n    background-color: #fff; }\n  .DLSLeonardo .pika-title select {\n    cursor: pointer;\n    position: absolute;\n    z-index: 9998;\n    margin: 0;\n    left: 0;\n    top: 5px;\n    filter: alpha(opacity=0);\n    opacity: 0; }\n  .DLSLeonardo .pika-prev,\n  .DLSLeonardo .pika-next {\n    display: block;\n    cursor: pointer;\n    position: relative;\n    outline: none;\n    border: 0;\n    padding: 0;\n    width: 20px;\n    height: 30px;\n    /* hide text using text-indent trick, using width value (it's enough) */\n    text-indent: 20px;\n    white-space: nowrap;\n    overflow: hidden;\n    background-color: transparent;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 75% 75%;\n    opacity: .5;\n    *position: absolute;\n    *top: 0; }\n  .DLSLeonardo .pika-prev:hover,\n  .DLSLeonardo .pika-next:hover {\n    opacity: 1; }\n  .DLSLeonardo .pika-prev,\n  .DLSLeonardo .is-rtl .pika-next {\n    float: left;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==\");\n    *left: 0; }\n  .DLSLeonardo .pika-next,\n  .DLSLeonardo .is-rtl .pika-prev {\n    float: right;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=\");\n    *right: 0; }\n  .DLSLeonardo .pika-prev.is-disabled,\n  .DLSLeonardo .pika-next.is-disabled {\n    cursor: default;\n    opacity: .2; }\n  .DLSLeonardo .pika-select {\n    display: inline-block;\n    *display: inline; }\n  .DLSLeonardo .pika-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0; }\n  .DLSLeonardo .pika-table th,\n  .DLSLeonardo .pika-table td {\n    width: 14.285714285714286%;\n    padding: 0; }\n  .DLSLeonardo .pika-table th {\n    color: #999;\n    font-size: 12px;\n    line-height: 25px;\n    font-weight: bold;\n    text-align: center; }\n  .DLSLeonardo .pika-button {\n    cursor: pointer;\n    display: block;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    outline: none;\n    border: 0;\n    margin: 0;\n    width: 100%;\n    padding: 5px;\n    color: #666;\n    font-size: 12px;\n    line-height: 15px;\n    text-align: right;\n    background: #f5f5f5; }\n  .DLSLeonardo .pika-week {\n    font-size: 11px;\n    color: #999; }\n  .DLSLeonardo .is-today .pika-button {\n    color: #33aaff;\n    font-weight: bold; }\n  .DLSLeonardo .is-selected .pika-button {\n    color: #fff;\n    font-weight: bold;\n    background: #33aaff;\n    box-shadow: inset 0 1px 3px #178fe5;\n    border-radius: 3px; }\n  .DLSLeonardo .is-inrange .pika-button {\n    background: #D5E9F7; }\n  .DLSLeonardo .is-startrange .pika-button {\n    color: #fff;\n    background: #6CB31D;\n    box-shadow: none;\n    border-radius: 3px; }\n  .DLSLeonardo .is-endrange .pika-button {\n    color: #fff;\n    background: #33aaff;\n    box-shadow: none;\n    border-radius: 3px; }\n  .DLSLeonardo .is-disabled .pika-button,\n  .DLSLeonardo .is-outside-current-month .pika-button {\n    pointer-events: none;\n    cursor: default;\n    color: #999;\n    opacity: .3; }\n  .DLSLeonardo .pika-button:hover {\n    color: #fff;\n    background: #ff8000;\n    box-shadow: none;\n    border-radius: 3px; }\n  .DLSLeonardo .pika-table abbr {\n    border-bottom: none;\n    cursor: help; }\n  .DLSLeonardo .handsontable thead th.hiddenHeader:not(:first-of-type) {\n    display: none; }\n  .DLSLeonardo .handsontable th.beforeHiddenColumn {\n    position: relative; }\n  .DLSLeonardo .handsontable th.beforeHiddenColumn::after,\n  .DLSLeonardo .handsontable th.afterHiddenColumn::before {\n    color: #bbb;\n    position: absolute;\n    top: 50%;\n    font-size: 5pt;\n    transform: translateY(-50%); }\n  .DLSLeonardo .handsontable th.afterHiddenColumn {\n    position: relative; }\n  .DLSLeonardo .handsontable th.beforeHiddenColumn::after {\n    right: 1px;\n    content: '\\25C0'; }\n  .DLSLeonardo .handsontable th.afterHiddenColumn::before {\n    left: 1px;\n    content: '\\25B6'; }\n  .DLSLeonardo .handsontable td.firstVisibleColumn,\n  .DLSLeonardo .handsontable th.firstVisibleColumn {\n    border-left: 1px solid #CCC; }\n  .DLSLeonardo .handsontable .changeType {\n    background: #eee;\n    border-radius: 2px;\n    border: 1px solid #bbb;\n    color: #bbb;\n    font-size: 9px;\n    line-height: 9px;\n    padding: 2px;\n    margin: 3px 1px 0 5px;\n    float: right; }\n  .DLSLeonardo .handsontable .changeType:before {\n    content: '\\25BC   '; }\n  .DLSLeonardo .handsontable .changeType:hover {\n    border: 1px solid #777;\n    color: #777;\n    cursor: pointer; }\n  .DLSLeonardo .htDropdownMenu {\n    display: none;\n    position: absolute;\n    z-index: 1060;\n    /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */ }\n  .DLSLeonardo .htDropdownMenu .ht_clone_top,\n  .DLSLeonardo .htDropdownMenu .ht_clone_left,\n  .DLSLeonardo .htDropdownMenu .ht_clone_corner,\n  .DLSLeonardo .htDropdownMenu .ht_clone_debug {\n    display: none; }\n  .DLSLeonardo .htDropdownMenu table.htCore {\n    border: 1px solid #bbb;\n    border-bottom-width: 2px;\n    border-right-width: 2px; }\n  .DLSLeonardo .htDropdownMenu .wtBorder {\n    visibility: hidden; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td {\n    background: white;\n    border-width: 0;\n    padding: 4px 6px 0 6px;\n    cursor: pointer;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td:first-child {\n    border: 0; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td.htDimmed {\n    font-style: normal;\n    color: #323232; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td.current,\n  .DLSLeonardo .htDropdownMenu table tbody tr td.zeroclipboard-is-hover {\n    background: #e9e9e9; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td.htSeparator {\n    border-top: 1px solid #bbb;\n    height: 0;\n    padding: 0;\n    cursor: default; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td.htDisabled {\n    color: #999; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td.htDisabled:hover {\n    background: #fff;\n    color: #999;\n    cursor: default; }\n  .DLSLeonardo .htDropdownMenu table tbody tr.htHidden {\n    display: none; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td .htItemWrapper {\n    margin-left: 10px;\n    margin-right: 6px; }\n  .DLSLeonardo .htDropdownMenu table tbody tr td div span.selected {\n    margin-top: -2px;\n    position: absolute;\n    left: 4px; }\n  .DLSLeonardo .htDropdownMenu .ht_master .wtHolder {\n    overflow: hidden; }\n  .DLSLeonardo .htFiltersConditionsMenu {\n    display: none;\n    position: absolute;\n    z-index: 1070; }\n  .DLSLeonardo .htFiltersConditionsMenu .ht_clone_top,\n  .DLSLeonardo .htFiltersConditionsMenu .ht_clone_left,\n  .DLSLeonardo .htFiltersConditionsMenu .ht_clone_corner,\n  .DLSLeonardo .htFiltersConditionsMenu .ht_clone_debug {\n    display: none; }\n  .DLSLeonardo .htFiltersConditionsMenu table.htCore {\n    border: 1px solid #bbb;\n    border-bottom-width: 2px;\n    border-right-width: 2px; }\n  .DLSLeonardo .htFiltersConditionsMenu .wtBorder {\n    visibility: hidden; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td {\n    background: white;\n    border-width: 0;\n    padding: 4px 6px 0 6px;\n    cursor: pointer;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td:first-child {\n    border: 0; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.htDimmed {\n    font-style: normal;\n    color: #323232; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.current,\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.zeroclipboard-is-hover {\n    background: #e9e9e9; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.htSeparator {\n    border-top: 1px solid #bbb;\n    height: 0;\n    padding: 0; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.htDisabled {\n    color: #999; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td.htDisabled:hover {\n    background: #fff;\n    color: #999;\n    cursor: default; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td .htItemWrapper {\n    margin-left: 10px;\n    margin-right: 6px; }\n  .DLSLeonardo .htFiltersConditionsMenu table tbody tr td div span.selected {\n    margin-top: -2px;\n    position: absolute;\n    left: 4px; }\n  .DLSLeonardo .htFiltersConditionsMenu .ht_master .wtHolder {\n    overflow: hidden; }\n  .DLSLeonardo .handsontable .htMenuFiltering {\n    border-bottom: 1px dotted #ccc;\n    height: 135px;\n    overflow: hidden; }\n  .DLSLeonardo .handsontable .ht_master table td.htCustomMenuRenderer {\n    background-color: #fff;\n    cursor: auto; }\n  .DLSLeonardo .handsontable .htFiltersMenuLabel {\n    font-size: 12px; }\n  .DLSLeonardo .handsontable .htFiltersMenuActionBar {\n    text-align: center; }\n  .DLSLeonardo .handsontable .htFiltersMenuCondition {\n    border-bottom: 1px dotted #ccc !important; }\n  .DLSLeonardo .handsontable .htFiltersMenuCondition .htUIInput {\n    padding: 0 0 5px 0; }\n  .DLSLeonardo .handsontable .htFiltersMenuCondition .htUIInput input {\n    width: 159px;\n    padding: 4px;\n    margin-left: -4px; }\n  .DLSLeonardo .handsontable .htFiltersMenuValue {\n    border-bottom: 1px dotted #ccc !important; }\n  .DLSLeonardo .handsontable .htFiltersMenuValue .htUIMultipleSelectSearch {\n    padding: 0; }\n  .DLSLeonardo .handsontable .htFiltersMenuValue .htUIMultipleSelectSearch input {\n    width: 159px;\n    padding: 4px;\n    margin-left: -4px; }\n  .DLSLeonardo .htUIMultipleSelect .ht_master .wtHolder {\n    overflow-y: scroll; }\n  .DLSLeonardo .handsontable .htFiltersActive .changeType {\n    border: 1px solid #509272;\n    color: #18804e;\n    background-color: #d2e0d9; }\n  .DLSLeonardo .handsontable .htUIClearAll, .DLSLeonardo .handsontable .htUISelectAll {\n    display: inline-block;\n    margin: 0 5px; }\n  .DLSLeonardo .handsontable .htUIClearAll a, .DLSLeonardo .handsontable .htUISelectAll a {\n    color: #3283D8;\n    font-size: 12px; }\n  .DLSLeonardo .handsontable .htUISelectionControls {\n    text-align: right; }\n  .DLSLeonardo .handsontable .htCheckboxRendererInput {\n    margin: 0 5px 0 0;\n    vertical-align: middle;\n    height: 1em; }\n  .DLSLeonardo .handsontable .htUIInput {\n    padding: 3px 0 7px 0;\n    position: relative;\n    text-align: center; }\n  .DLSLeonardo .handsontable .htUIInput input {\n    border-radius: 2px;\n    border: 1px solid #d2d1d1; }\n  .DLSLeonardo .handsontable .htUIInput input:focus {\n    outline: 0; }\n  .DLSLeonardo .handsontable .htUIInputIcon {\n    position: absolute; }\n  .DLSLeonardo .handsontable .htUIInput.htUIButton {\n    cursor: pointer;\n    display: inline-block;\n    padding: 3px 4px 7px 4px;\n    width: 60px; }\n  .DLSLeonardo .handsontable .htUIInput.htUIButton input {\n    background-color: #eee;\n    color: #000;\n    cursor: pointer;\n    font-family: arial, sans-serif;\n    font-size: 11px;\n    font-weight: bold;\n    height: 19px;\n    width: 42px; }\n  .DLSLeonardo .handsontable .htUIInput.htUIButton input:hover {\n    border-color: #b9b9b9; }\n  .DLSLeonardo .handsontable .htUIInput.htUIButtonOK input {\n    background-color: #0f9d58;\n    border-color: #18804e;\n    color: #fff; }\n  .DLSLeonardo .handsontable .htUIInput.htUIButtonOK input:hover {\n    border-color: #1a6f46; }\n  .DLSLeonardo .handsontable .htUISelect {\n    cursor: pointer;\n    margin-bottom: 7px;\n    padding: 0 2px 0 0;\n    position: relative;\n    width: 169px; }\n  .DLSLeonardo .handsontable .htUISelectCaption {\n    background-color: #e8e8e8;\n    border-radius: 2px;\n    border: 1px solid #d2d1d1;\n    font-family: arial, sans-serif;\n    font-size: 11px;\n    font-weight: bold;\n    padding: 3px 0 3px 10px; }\n  .DLSLeonardo .handsontable .htUISelectCaption:hover {\n    background-color: #e8e8e8;\n    border: 1px solid #b9b9b9; }\n  .DLSLeonardo .handsontable .htUISelectDropdown:after {\n    content: '\\25B2';\n    font-size: 7px;\n    position: absolute;\n    right: 10px;\n    top: 0; }\n  .DLSLeonardo .handsontable .htUISelectDropdown:before {\n    content: '\\25BC';\n    font-size: 7px;\n    position: absolute;\n    right: 10px;\n    top: 8px; }\n  .DLSLeonardo .handsontable .htUIMultipleSelect .handsontable .htCore {\n    border: none; }\n  .DLSLeonardo .handsontable .htUIMultipleSelect .handsontable .htCore td:hover {\n    background-color: #F5F5F5; }\n  .DLSLeonardo .handsontable .htUIMultipleSelectSearch input {\n    border-radius: 2px;\n    border: 1px solid #d2d1d1;\n    padding: 3px;\n    width: 161px; }\n  .DLSLeonardo .handsontable.ganttChart tr:first-child th div.relative {\n    padding-right: 21px; }\n  .DLSLeonardo .handsontable.ganttChart .colHeader {\n    display: block; }\n  .DLSLeonardo .handsontable.ganttChart td.rangeBar {\n    background: #48b703;\n    border-right-width: 0;\n    position: relative;\n    -webkit-box-shadow: inset 0 3px 0 #ffffff;\n    -moz-box-shadow: inset 0 3px 0 #ffffff;\n    box-shadow: inset 0 3px 0 #ffffff; }\n  .DLSLeonardo .handsontable.ganttChart td.rangeBar.last {\n    border-right-width: 1px; }\n  .DLSLeonardo .handsontable.ganttChart td.rangeBar.area {\n    background: #7EC481; }\n  .DLSLeonardo .handsontable.ganttChart td.rangeBar.partial {\n    background: #8edf5a; }\n  .DLSLeonardo .handsontable.ganttChart td.rangeBar.area.partial {\n    background: #A1D8AD; }\n  .DLSLeonardo .handsontable th.beforeHiddenRow::before,\n  .DLSLeonardo .handsontable th.afterHiddenRow::after {\n    color: #bbb;\n    font-size: 6pt;\n    line-height: 6pt;\n    position: absolute;\n    left: 2px; }\n  .DLSLeonardo .handsontable th.beforeHiddenRow,\n  .DLSLeonardo .handsontable th.afterHiddenRow {\n    position: relative; }\n  .DLSLeonardo .handsontable th.beforeHiddenRow::before {\n    content: '\\25B2';\n    bottom: 2px; }\n  .DLSLeonardo .handsontable th.afterHiddenRow::after {\n    content: '\\25BC';\n    top: 2px; }\n  .DLSLeonardo .handsontable.ht__selection--rows tbody th.beforeHiddenRow.ht__highlight:before,\n  .DLSLeonardo .handsontable.ht__selection--rows tbody th.afterHiddenRow.ht__highlight:after {\n    color: #eee; }\n  .DLSLeonardo .handsontable td.afterHiddenRow.firstVisibleRow,\n  .DLSLeonardo .handsontable th.afterHiddenRow.firstVisibleRow {\n    border-top: 1px solid #CCC; }\n  .DLSLeonardo .handsontable th.ht_nestingLevels {\n    text-align: left;\n    padding-left: 7px; }\n  .DLSLeonardo .handsontable th div.ht_nestingLevels {\n    display: inline-block;\n    position: absolute;\n    left: 11px; }\n  .DLSLeonardo .handsontable.innerBorderLeft th div.ht_nestingLevels,\n  .DLSLeonardo .handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingLevels {\n    right: 10px; }\n  .DLSLeonardo .handsontable th span.ht_nestingLevel {\n    display: inline-block; }\n  .DLSLeonardo .handsontable th span.ht_nestingLevel_empty {\n    display: inline-block;\n    width: 10px;\n    height: 1px;\n    float: left; }\n  .DLSLeonardo .handsontable th span.ht_nestingLevel::after {\n    content: \"\\2510\";\n    font-size: 9px;\n    display: inline-block;\n    position: relative;\n    bottom: 3px; }\n  .DLSLeonardo .handsontable th div.ht_nestingButton {\n    display: inline-block;\n    position: absolute;\n    right: -2px;\n    cursor: pointer; }\n  .DLSLeonardo .handsontable th div.ht_nestingButton.ht_nestingExpand::after {\n    content: \"+\"; }\n  .DLSLeonardo .handsontable th div.ht_nestingButton.ht_nestingCollapse::after {\n    content: \"-\"; }\n  .DLSLeonardo .handsontable.innerBorderLeft th div.ht_nestingButton,\n  .DLSLeonardo .handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingButton {\n    right: 0; }\n  .DLSLeonardo .handsontable .cosmatt-theme-green.table-column-header tbody tr:first-child td,\n  .DLSLeonardo .handsontable .cosmatt-theme-green.table-row-header tbody tr td:nth-of-type(1) {\n    background-color: #f1f8e9 !important;\n    font-size: 16px;\n    font-weight: 600;\n    text-align: center;\n    border-color: #88c88f; }\n  .DLSLeonardo .handsontable .cosmatt-theme-green.htCore tbody {\n    outline-color: #88c88f;\n    outline-style: solid;\n    outline-width: 1px; }\n  .DLSLeonardo .sheetTabContainer {\n    width: 100%;\n    position: relative;\n    background-color: #f6f6f6;\n    color: #444;\n    height: 25px;\n    margin-top: -4px;\n    font-family: \"Segoe UI\", Tahoma, Thonburi, Arial, Verdana, sans-serif;\n    font-size: 10pt;\n    border-top: 1px solid #ababab; }\n  .DLSLeonardo .contentarea {\n    height: 100%;\n    position: relative;\n    left: 25px; }\n  .DLSLeonardo .tablist {\n    display: block;\n    height: 100%;\n    list-style: none;\n    margin: 0px;\n    padding: 0px; }\n  .DLSLeonardo .sheetTabContainer .tablist .sheet-tab {\n    float: left;\n    cursor: default;\n    background-color: #f6f6f6;\n    border-right: 1px solid #ababab;\n    height: 100%; }\n  .DLSLeonardo .sheetTabContainer .tablist:first-child {\n    border-left: 1px solid #ababab; }\n  .DLSLeonardo .sheetTabContainer .tablist .tab-active {\n    border-bottom: 2px solid #217346;\n    color: #217346;\n    position: relative;\n    top: -1px;\n    background-color: white; }\n  .DLSLeonardo .sheetTabContainer .tablist .sheet-tab .tab-content-container {\n    margin: 0 2px 0 2px;\n    padding-right: 17px;\n    padding-left: 17px;\n    white-space: pre;\n    font-size: 10pt;\n    display: inline-block;\n    text-align: center;\n    margin-bottom: 0; }\n  .DLSLeonardo .tab-active .tab-content-container {\n    font-weight: bold; }\n\n/*Leonardo container css properties*/\n.DLSLeonardo {\n  font-size: 11pt;\n  color: #000;\n  width: 100%;\n  height: 100%;\n  display: inline-block; }\n  .DLSLeonardo #nameBox {\n    width: 100px;\n    height: 25px; }\n  .DLSLeonardo .handsontable table.LeonardoTable.htCore {\n    border-collapse: collapse; }\n  .DLSLeonardo .formulaBarContainer {\n    display: inline-block;\n    width: calc(100% - 100px);\n    height: 25px; }\n    .DLSLeonardo .formulaBarContainer #formulaBar {\n      width: calc(100% - 25px);\n      height: inherit; }\n    .DLSLeonardo .formulaBarContainer #fx {\n      width: 25px;\n      padding: 0; }\n  .DLSLeonardo #buttonGroup {\n    margin: 5px 0;\n    height: 25px; }\n    .DLSLeonardo #buttonGroup #exportConfigBtn {\n      margin-right: 5px; }\n  .DLSLeonardo #hintBtn, .DLSLeonardo #checkMyAnswer {\n    float: right;\n    margin-left: 5px; }\n  .DLSLeonardo #hintBtn, .DLSLeonardo #checkMyAnswer, .DLSLeonardo #fx {\n    cursor: pointer; }\n  .DLSLeonardo #grid {\n    cursor: cell;\n    height: calc(100% - 25px);\n    width: 100%;\n    overflow: hidden; }\n  .DLSLeonardo .handsontableInput {\n    box-shadow: 0 0 0 2px #217346 inset; }\n  .DLSLeonardo .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th,\n  .DLSLeonardo .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable:not(.ht_clone_top) thead tr th:first-child {\n    border-right-width: 1px; }\n  .DLSLeonardo .ht_master:not(.innerBorderTop) thead tr:last-child th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) ~ .handsontable thead tr:last-child th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) thead tr.lastChild th,\n  .DLSLeonardo .ht_master:not(.innerBorderTop) ~ .handsontable thead tr.lastChild th {\n    border-bottom-width: 1px; }\n  .DLSLeonardo .handsontable table.htCore tr th:not(.ht__highlight) {\n    background-color: #fff; }\n  .DLSLeonardo .handsontable tbody th.ht__highlight {\n    border-right: 1px solid #217346; }\n  .DLSLeonardo .handsontable thead th.ht__highlight {\n    border-bottom: 1px solid #217346; }\n  .DLSLeonardo .handsontable.ht__selection--columns thead th.ht__highlight,\n  .DLSLeonardo .handsontable.ht__selection--rows tbody th.ht__highlight {\n    background-color: #d3f0e0;\n    color: #217346; }\n  .DLSLeonardo .handsontable table.htCore tr .customDim {\n    color: #000; }\n  .DLSLeonardo .htCommentCell:after {\n    border-left-width: 7px;\n    border-top-width: 7px;\n    border-top-color: #217346; }\n\n/*Leonardo container css properties*/\n/*Properties copied from Handsontable.full.css for the elements outside the grid area*/\n.htComments {\n  display: none;\n  z-index: 1059;\n  position: absolute; }\n\n.htCommentTextArea {\n  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: none;\n  border-left: 3px solid #ccc;\n  background-color: #fff;\n  width: 215px;\n  height: 90px;\n  font-size: 12px;\n  padding: 5px;\n  outline: 0px !important;\n  -webkit-appearance: none; }\n\n.htCommentTextArea:focus {\n  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px, inset 0 0 0 1px #5292f7;\n  border-left: 3px solid #5292f7; }\n\n/*!\r\n * Handsontable ContextMenu\r\n */\n.htContextMenu {\n  display: none;\n  position: absolute;\n  z-index: 1060;\n  /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */ }\n\n.htContextMenu .ht_clone_top,\n.htContextMenu .ht_clone_left,\n.htContextMenu .ht_clone_corner,\n.htContextMenu .ht_clone_debug {\n  display: none; }\n\n.htContextMenu table.htCore {\n  border: 1px solid #ccc;\n  border-bottom-width: 2px;\n  border-right-width: 2px; }\n\n.htContextMenu .wtBorder {\n  visibility: hidden; }\n\n.htContextMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n\n.htContextMenu table tbody tr td:first-child {\n  border: 0; }\n\n.htContextMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232; }\n\n.htContextMenu table tbody tr td.current,\n.htContextMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #f3f3f3; }\n\n.htContextMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #bbb;\n  height: 0;\n  padding: 0;\n  cursor: default; }\n\n.htContextMenu table tbody tr td.htDisabled {\n  color: #999;\n  cursor: default; }\n\n.htContextMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default; }\n\n.htContextMenu table tbody tr.htHidden {\n  display: none; }\n\n.htContextMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 6px; }\n\n.htContextMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px; }\n\n.htContextMenu .ht_master .wtHolder {\n  overflow: hidden; }\n\n/*Properties copied from Handsontable.full.css for the elements outside the grid area*/\n/*Overriden properties for elements outside leo container*/\n.leoCommentTextArea.htComments .htCommentTextArea {\n  background-color: #fefbd6; }\n\n/*Overriden properties for elements outside leo container*/\n", ""]);

// exports


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ })

/******/ });
//# sourceMappingURL=styles.bundle.js.map