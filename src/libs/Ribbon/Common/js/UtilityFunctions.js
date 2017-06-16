'use strict';
namespace("SIMS.Common");

SIMS.Common.UtilityFunctions = function () {
    this.IsObjectDefined = function (objToCheck) {
        if (objToCheck != null) {
            return true;
        }
        else {
            return false;
        }       
    };

    this.GetFriendlyShortCutString = function (e) {
        var shortcutName = "";
        var keyCodesToHandleUp = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 173, 188, 189, 190, 219, 221, 61, 187, 192];
        var keyCodesToHandleDown = [9, 13, 27, 32, 33, 35, 36, 37, 38, 39, 40];
        
        if (e.winKey) {
            shortcutName += "WIN+";
        }
        if (e.altKey) {
            shortcutName += "ALT+";
        }
        if (e.shiftKey) {
            shortcutName += "SHIFT+";
        }
        if (e.ctrlKey) {
            shortcutName += "CTRL+";
        }
        if (e.metaKey) {
            shortcutName += "META+";
        }

        if (shortcutName === "ALT+SHIFT+CTRL+") {
            this.PossibleAccessKey = true;
        }


        var charCode = e.which || e.keyCode;


        if ((charCode <= 90 && charCode >= 65) || (charCode <= 57 && charCode >= 48)) {
            shortcutName += String.fromCharCode(charCode);
        }
        else if (charCode >= 112 && charCode <= 123 || $.inArray(charCode, keyCodesToHandleUp) > -1 || $.inArray(charCode, keyCodesToHandleDown) > -1) {
            shortcutName += SIMS.SharedData.KeyboardData.KEYCODESMAP[charCode];
        }
        else if (charCode === 18 || charCode === 17 || charCode === 16 || charCode === 91 || charCode === 93) {
            this.PossibleAccessKey = false;
            if (shortcutName.charAt(shortcutName.length - 1) === "+") {
                shortcutName = shortcutName.substring(0, shortcutName.length - 1);
            }
        }
        else {
            console.log("Key not handled keyCode:" + charCode);
        }

        return shortcutName;
    };

    this.IsAlphaNumericKey = function(input) {
        var isAlphaNumericKey = false;
        if(typeof(input) === "number"){
            if ((input <= 90 && input >= 65) || (input <= 57 && input >= 48)) {
                isAlphaNumericKey = true;
            }
        }
        else if(typeof(input) === "string" && input.length === 1){
            isAlphaNumericKey = this.IsAlphaNumericKey(input.charCodeAt(0));
        }

        return isAlphaNumericKey;
    };

    this.GetFriendlyKeyName = function (e) {
        var keyName = "";
        var isAcessKey = false;
        var keyCodesToHandleUp = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 173, 188, 189, 190, 219, 221, 61, 187, 192];
        var keyCodesToHandleDown = [9, 13, 27, 32, 33, 35, 36, 37, 38, 39, 40];
        var charCode = e.which || e.keyCode;

        if ((charCode <= 90 && charCode >= 65) || (charCode <= 57 && charCode >= 48)) {
            keyName = String.fromCharCode(charCode);
            isAcessKey = this.IsAlphaNumericKey(charCode);
        }
        else if ($.inArray(charCode, keyCodesToHandleUp) > -1 || $.inArray(charCode, keyCodesToHandleDown) > -1) {
            keyName = SIMS.SharedData.KeyboardData.KEYCODESMAP[charCode];
        }
        else if (charCode >= 112 && charCode <= 123) { //Workaround for ribbon

            if (e.shiftKey) {
                keyName += "SHIFT+";
            }

            if (e.ctrlKey) {
                keyName += "CTRL+";
            }

            keyName += SIMS.SharedData.KeyboardData.KEYCODESMAP[charCode];
        }
        else if (charCode === 18) {  //ALT - Workaround for ribbon           
            keyName = "ALT";
        }
        else if (charCode === 17) { //CTRL
            keyName = "CTRL";
        }
        else if (charCode === 16) {//SHIFT            
            keyName = "SHIFT"
        }
        else if (e.metaKey == true && (charCode === 91 || charCode === 93)) {//COMMAND
            keyName = "META"
        }

        var keyInfo = { "keyName": keyName, "isAcessKey": isAcessKey };
        return keyInfo;
    };
    
    //Takes as input - time duration in milli seconds
    //Returns - time duration in format of xx:yy (mm:ss) or xx:yy (hh:mm)
    this.GetFormattedTime = function (timeInSec) {
        
        var retValue = -1;

        if (typeof timeInSec !== "number") {
            return retValue;
        }

        try {
            var hour = Math.floor(timeInSec / 3600);
            var min = Math.floor(timeInSec / 60);
            var sec = Math.floor(timeInSec % 60);

            if (hour > 0) {
                min = min % 60;

                retValue = this._getTimeUnitWithLeadingZero(hour) + ":" + this._getTimeUnitWithLeadingZero(min) + " (hh:mm)";
            }
            else {
                retValue = this._getTimeUnitWithLeadingZero(min) + ":" + this._getTimeUnitWithLeadingZero(sec) + " (mm:ss)";
            }
        }
        catch (ex) {
            retValue = -1;
        }

        return retValue;
    };

    this._getTimeUnitWithLeadingZero = function (nVal) {

        var retValue = "";

        if (typeof nVal === "number") {
            retValue = nVal < 10 ? "0" + nVal : nVal.toString();
        }

        return retValue;
        
    };
    
}