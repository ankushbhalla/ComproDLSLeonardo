'use strict';
namespace("SIMS.Controls");

//Class Declaration
SIMS.Controls.ColorGrid = SIMS.Controls.BaseControl.extend({

    cacheControl: {
        cache: {
            mainBodyCache: {},
            secondLineCache: {}
        },

        cacheHit: false,
        cachableMainBody: false,
        secondLineCacheHit: false
    },
    /*
    Sample JSON :
    Possible Options for
    colorGridType = backgroundColor, patternColor
    For colorGridType - backgroundColor
    controlParams =
    {
    "type":"ColorGrid",
    "colorGridType" : "backgroundColor",
    "application":"word",
    "theme":"OfficeExcel",
    "index" : "1"
    }
    OR
    For colorGridType - patternColor

    Groups names, start and end positions to be specified.
    The biggest group i.e. mainBody by default contains a singleLine and the containers for various color shades

    controlParams =
    {
    "type":"ColorGrid",
    "colorGridType" : "patternColor",
    "application":"word",
    "theme":"Office",
    "patternType":"simplePattern",
    "index" : "0"
    }

    */
    //Creates the Actual Control
    createControl: function (controlID, controlParams, callbackFuncOwner, callbackFunc) {
        var self = this;

        if (controlParams.theme == null || controlParams.theme == "" || controlParams.theme == undefined) {
            controlParams.theme = 'Office';
        }
        
        var $control = $('<div class="sims-ColorGrid" />');

        if (this.cacheControl.cache.mainBodyCache[controlParams.theme]) {
            $control.data('controlid', controlID);
            $control.data('controlType', 'ColorGrid');
            $control.data('callbackFuncOwner', callbackFuncOwner);
            $control.data('callbackFunc', callbackFunc);            
            self.makeControl($control, controlParams);
	    
        }
        else {
            $control.data('controlid', controlID);
            $control.data('controlType', 'ColorGrid');

            self.makeControl($control, controlParams);

            $control.find(".grid-container").remove();

            $control.data('callbackFuncOwner', callbackFuncOwner);
            $control.data('callbackFunc', callbackFunc);
            self.makeControl($control, controlParams);
        }     

        if (controlParams.focalizeOnAccessKey != null && (controlParams.focalizeOnAccessKey === true || controlParams.focalizeOnAccessKey === "true" )) {
            $control.data("focalizeOnAccessKey", true);  // param added to call focalize from HandleAccessKey() // SO-43268
        }
        else {
            $control.data("focalizeOnAccessKey", false);
        }
        

        return $control;
    },

    makeControl: function ($control, controlParams) {
        var self = this;
        //Make Grid Container
        var $gridContainer = UIUtils.getUnselectableGenericElement("ul", "", "grid-container");
        $control.append($gridContainer);
        self.updateControl($control, controlParams);
        return $control;
    },

    makeControlWithRecentColor: function ($control, controlParams) {
        var self = this;
        controlParams.application = $control.data('application');
        controlParams.patternType = $control.data('patternType');
        controlParams.theme = $control.data('theme');
        controlParams.top = $control.data('top');
        controlParams.left = $control.data('left');

        //Find grid-container and remove
        $control.find(".grid-container").remove();

        self.makeControl($control, controlParams);
        self.attachEventHandlers($control, $control.data('controlid'), controlParams, $control.data('callbackFuncOwner'), $control.data('callbackFunc'));
        return $control;
    },

    makeControlOnThemeChange: function ($control, controlParams) {
        var self = this;
        controlParams.application = $control.data('application');
        controlParams.patternType = $control.data('patternType');
        controlParams.top = $control.data('top');
        controlParams.left = $control.data('left');

        //Find grid-container and remove
        $control.find(".grid-container").remove();

        self.makeControl($control, controlParams);
        self.attachEventHandlers($control, $control.data('controlid'), controlParams, $control.data('callbackFuncOwner'), $control.data('callbackFunc'));
        return $control;
    },

    attachEventHandlers: function ($control, controlID, controlParams, callbackFuncOwner, callbackFunc) {
        //return;
        //Local variable required for your controls will be declared here
        var $control = $control;
        var myCallbackData = { controlId: controlID };
        var myCallBackFunc = callbackFunc;
        var myCallbackFuncOwner = callbackFuncOwner;
        var self = this;

        var NumberOfElementsInRecentColor = 0;

        var isRecentClr = false;
        if (controlParams.recentColors !== null && controlParams.recentColors !== "" && controlParams.recentColors !== undefined) {
            NumberOfElementsInRecentColor = controlParams.recentColors.length;
            isRecentClr = true;
        }

        // unbinding the events before binding them again.
        $control.off("click", ".color");
        $control.find(".item, .eyeDropper").unbind('click');
        $control.unbind('keydown');

        if (controlParams.allowEnterandSpaceBar == false || controlParams.allowEnterandSpaceBar == "false") {
            controlParams.allowEnterandSpaceBar = false;
        }
        else {
            controlParams.allowEnterandSpaceBar = true;
        }
        $control.on("click", ".color", function () {
            var selectedColor = $(this).attr('clr');
            var index = $(this).attr('i');

            self.selectColor($control, selectedColor, index);

            if ($control.data('colorGridType') === 'patternColor') {
                myCallbackData.text = $(this).attr('text');
            }
            myCallbackData.selectedColor = selectedColor;
            myCallbackData.index = index;
            myCallbackData.eventID = 1;
            if (myCallBackFunc !== null) {
                //myCallBackFunc.apply(myCallbackFuncOwner, [myCallbackData]);
                self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
            }
        });

        $control.find(".item, .eyeDropper").click(function (e) {
            //Added code for handling of Multiple Standards theme
            var patternType = $control.data("patternType");
            if (patternType === "ThemeAndMultipleStandardAndMoreColors")
                myCallbackData.index = 131;
            else
                if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                    if ($(this).hasClass("transparentItem")) {
                        myCallbackData.index = 132;
                        myCallbackData.message = "Transparent Clicked";
                        console.log("** 132 Transparent clicked");
                    }
                    else {

                        myCallbackData.index = 131;
                        myCallbackData.message = "More Colors Clicked";
                        console.log("** 131 More Colors clicked");
                    }
                }
                else
                    myCallbackData.index = $(this).attr('i');
            if (patternType !== "ThemeMultipleStandardTransparentAndMoreColors")
                myCallbackData.message = "More Colors Clicked";
            myCallbackData.selectedColor = null;
            myCallbackData.text = null;
            myCallbackData.eventID = 2;
            if (myCallBackFunc !== null) {
                self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
            }
        });




        var colorGridType = $control.data('colorGridType');
        var currIndex = 1;
        var nextIndex = 2;
        var $focusEle = null;
        var $selectedEle = null;

        if (colorGridType === "backgroundColor") {

            $control.find(".grid-container").hover(function () {

                $control.find(".grid-container").css("background-color", "transparent");
            });

            $control.keydown(function (event) {

                $focusEle = $(document.activeElement);
                currIndex = parseInt($focusEle.attr('i'));

                if (!(currIndex >= 0 && currIndex <= 70)) {
                    currIndex = 0;
                }

                switch (event.which) {
                    case 13:  //ENTER
                    case 32:  //space
                        self.selectColor($control, null, currIndex);
                        $selectedEle = $control.find('.i-' + currIndex);
                        myCallbackData.selectedColor = $selectedEle.attr('clr');
                        myCallbackData.index = $selectedEle.attr('i');
                        //myCallbackData.text = $selectedEle.attr('text');
                        myCallbackData.eventID = 3;  // for enter or spacebar key press
                        if (myCallBackFunc !== null) {
                            self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 9: //Tab
                        $control.find(".i-" + currIndex).removeClass('clr-focus');
                        break;

                    case 37: //Left Key
                        if (currIndex > 0) {
                            nextIndex = currIndex - 1;
                        }
                        else if (currIndex == 0) {
                            nextIndex = 70;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 39: //Right Key
                        if (currIndex < 70) {
                            nextIndex = currIndex + 1;
                        }
                        else if (currIndex == 70) {
                            nextIndex = 0;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 38: //Up Key
                        if ((currIndex > 0 && currIndex <= 10) || (currIndex > 60 && currIndex <= 70)) {
                            nextIndex = currIndex - 1;
                        }
                        else if ((currIndex > 20 && currIndex <= 60) || currIndex == 11) {
                            nextIndex = currIndex - 10;
                        }
                        else if (currIndex > 11 && currIndex <= 20) {
                            nextIndex = currIndex + 39;
                        }
                        else if (currIndex == 0) {
                            nextIndex = 61;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 40:  //Down Key
                        if ((currIndex >= 0 && currIndex < 10) || (currIndex > 60 && currIndex < 70)) {
                            nextIndex = currIndex + 1;
                        }
                        else if ((currIndex > 10 && currIndex <= 50) || currIndex == 60 || currIndex == 10) {
                            nextIndex = currIndex + 10;
                        }
                        else if (currIndex >= 51 && currIndex < 60) {
                            nextIndex = currIndex - 39;
                        }
                        else if (currIndex == 70) {
                            nextIndex = 0;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    default:
                        break;
                }
            });
        }

        else if (colorGridType === "patternColor") {
            //Added code for handling of Multiple Standards theme
            $control.keydown(function (event) {

                var patternType = $control.data("patternType");
                $focusEle = $(document.activeElement);
                currIndex = parseInt($focusEle.attr('i'));

                if ($focusEle.hasClass('sims-ColorGrid')) {
                    var groups = $control.data('groups');
                    if (groups[groups.length - 1].type == 'mainBody') {
                        if (patternType == "ThemeAndMultipleStandard")
                            currIndex = 130;
                        else
                            currIndex = 70;
                        if (isRecentClr) {
                            currIndex += NumberOfElementsInRecentColor;
                        }
                    }
                    else {

                        currIndex = groups[groups.length - 1].index;
                    }
                }

                else
                    if (patternType === "ThemeAndMultipleStandardAndMoreColors") {
                        if (!(currIndex >= 0 && currIndex <= 131)) {
                            currIndex = 1;
                        }
                    }
                    else if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                        if (!(currIndex >= 0 && currIndex <= 132)) {
                            currIndex = 1;
                        }
                    }
                    else if (patternType == "ThemeAndMultipleStandard") {
                        if (!(currIndex >= 0 && currIndex <= 130)) {
                            currIndex = 1;
                        }
                    }
                    else if (patternType === "ColorsAndMoreColorAndEyeDropper") {
                        if (!((currIndex >= 0 && currIndex <= 71) || currIndex === 100 || currIndex === 101)) {
                            currIndex = 1;
                        }
                    }
                    else {
                        var finalIndex = 71;
                        if (isRecentClr) {
                            finalIndex += NumberOfElementsInRecentColor;
                        }
                        if (!((currIndex >= 0 && currIndex <= finalIndex) || currIndex === 100)) {
                            currIndex = 1;
                        }
                    }

                switch (event.which) {
                    case 13:  //ENTER
                    case 32:  //space

                        if (currIndex == 131 && (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeMultipleStandardTransparentAndMoreColors")) {
                            myCallbackData.index = 131;
                            myCallbackData.message = "More Colors Clicked";
                            myCallbackData.selectedColor = null;
                            myCallbackData.text = null;
                        }
                        else if (currIndex == 132 && patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                            myCallbackData.index = 132;
                            myCallbackData.message = "Transparent Clicked";
                            myCallbackData.selectedColor = null;
                            myCallbackData.text = null;
                        }
                        else {
                            if (currIndex == 100 && patternType !== "ThemeAndMultipleStandardAndMoreColors" && patternType !== "ThemeMultipleStandardTransparentAndMoreColors") {

                                myCallbackData.index = 100;
                                myCallbackData.message = "More Colors Clicked";
                                myCallbackData.selectedColor = null;
                                myCallbackData.text = null;
                            }
                            else {
                                self.selectColor($control, null, currIndex);
                                $selectedEle = $control.find('.i-' + currIndex);
                                myCallbackData.selectedColor = $selectedEle.attr('clr');
                                myCallbackData.index = $selectedEle.attr('i');
                                myCallbackData.text = $selectedEle.attr('text');
                                myCallbackData.eventID = 3; // for enter or spacebar key press
                            }
                        }

                        if (myCallBackFunc !== null) {
                            $focusEle.blur();
                            self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
                        }
                        if (controlParams.allowEnterandSpaceBar !== false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        break;

                    case 9: //Tab
                        if (event.shiftKey) {
                            var lastIndex = 70;
                            if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeMultipleStandardTransparentAndMoreColors" || patternType === "ThemeAndMultipleStandard")
                                lastIndex = 130;
                            if (isRecentClr) {
                                lastIndex += NumberOfElementsInRecentColor;
                            }
                            if (currIndex >= 2 && currIndex <= lastIndex) {
                                nextIndex = currIndex - 1;
                            }
                            else {
                                nextIndex = self.findNextIndex($control, currIndex, 'SHIFT+TAB', isRecentClr);
                            }

                        }
                        else {
                            var lastIndex = 69;
                            if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeMultipleStandardTransparentAndMoreColors" || patternType === "ThemeAndMultipleStandard")
                                lastIndex = 129;
                            if (isRecentClr) {
                                lastIndex += NumberOfElementsInRecentColor;
                            }
                            if (currIndex >= 1 && currIndex <= lastIndex) {
                                nextIndex = currIndex + 1;
                            }
                            else {
                                if($control.data('preventCircularTabAndDown')) {
                                    nextIndex = null;
                                }
                                else {
                                   nextIndex = self.findNextIndex($control, currIndex, 'TAB', isRecentClr);
                                }  
                            }
                        }


                        if (nextIndex != null) {
                            self.focusChange($control, currIndex, nextIndex)
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        else {
                            if($control.data('preventCircularTabAndDown')) {
                                $control.closest('.SIMSGenericContextUsed').focus();
                            }
                            else {
                               $focusEle.blur();
                            }
                            $control.find('.i-' + currIndex).removeClass('clr-focus');
                            $($control).parent().data("goToNext", true);
                        }

                        break;

                    case 37: //Left Key
                        var moveIndex = 100;
                        var lastIndex = 71;
                        var moveIndexNew = NaN;
                        if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeAndMultipleStandard") {
                            moveIndex = 131;
                            lastIndex = 0;
                        }
                        else if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                            moveIndex = 131;
                            lastIndex = 0;
                            moveIndexNew = 132;
                        }
                        if (isRecentClr) {
                            lastIndex += NumberOfElementsInRecentColor;
                        }
                        if (currIndex === moveIndex || currIndex === 0 || currIndex === lastIndex || currIndex === moveIndexNew) {
                            nextIndex = currIndex;
                        }
                        else if ((currIndex >= 71 && currIndex <= nextIndex) && (isRecentClr)) {
                            if (currIndex % (currIndex % NumberOfElementsInRecentColor) === 1) {
                                nextIndex = currIndex + NumberOfElementsInRecentColor - 1;
                            }
                            else {
                                nextIndex = currIndex - 1;
                            }

                        }
                        else if (currIndex % 10 === 1) {
                            nextIndex = currIndex + 9;
                        }
                        else {
                            nextIndex = currIndex - 1;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 39: //Right Key
                        var moveIndex = 100;
                        var lastIndex = 71;
                        var moveIndexNew = NaN;
                        if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeAndMultipleStandard") {
                            moveIndex = 131;
                            lastIndex = 0;
                        }
                        else if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                            moveIndex = 131;
                            lastIndex = 0;
                            moveIndexNew = 132;
                        }
                        if (isRecentClr) {
                            lastIndex += NumberOfElementsInRecentColor;
                        }
                        if (currIndex === moveIndex || currIndex === 0 || currIndex === lastIndex || currIndex === moveIndexNew) {
                            nextIndex = currIndex;
                        }
                        else if ((currIndex >= 71 && currIndex <= nextIndex) && (isRecentClr)) {
                            if (currIndex % (currIndex % NumberOfElementsInRecentColor) !== 0) {
                                nextIndex = currIndex + 1;
                            }
                            else {
                                nextIndex = currIndex - NumberOfElementsInRecentColor + 1;
                            }
                        }
                        else if (currIndex % 10 !== 0) {
                            nextIndex = currIndex + 1;
                        }
                        else if (currIndex / 10 > 0 && currIndex !== moveIndex) {
                            nextIndex = currIndex - 9;
                        }
                        self.focusChange($control, currIndex, nextIndex);
                        event.preventDefault();
                        event.stopPropagation();
                        break;

                    case 38: //Up Key
                        var moveIndex = 100;
                        var lastColorIndex = 71;
                        var lastIndex = 71;
                        var moveIndexNew = NaN;
                        if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeAndMultipleStandard") {
                            moveIndex = 131;
                            lastColorIndex = 131;
                            lastIndex = 0;
                        }
                        else if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                            moveIndex = 131;
                            lastColorIndex = 132;
                            lastIndex = 0;
                            moveIndexNew = 132;
                        }
                        if (patternType === "ColorsAndMoreColorAndEyeDropper") {
                            moveIndexNew = 101;
                        }
                        if (isRecentClr) {
                            lastColorIndex += NumberOfElementsInRecentColor;
                        }
                        if (currIndex > 10 && currIndex < lastColorIndex) {
                            nextIndex = currIndex - 10;
                        }
                        else if ((currIndex >= 1 && currIndex <= 10) || currIndex === 0 || currIndex === lastIndex || currIndex === moveIndex || currIndex == moveIndexNew) {
                            nextIndex = self.findNextIndex($control, currIndex, 'UP', isRecentClr);
                        }
                        if (nextIndex != null) {
                            self.focusChange($control, currIndex, nextIndex);
                            event.preventDefault();
                            event.stopPropagation();

                        }
                        else {
                            $focusEle.blur();
                            $control.find('.i-' + currIndex).removeClass('clr-focus');
                            $($control).parent().data("goToNext", true);
                        }
                        break;

                    case 40:  //Down Key

                        var moveIndex = 100;
                        var lastColorIndex = 71;
                        var lastIndex = 60;
                        var lastRowStartIndex = 61;
                        var lastRowEndIndex = 70;
                        var moveIndexNew = NaN;
                        if (patternType === "ThemeAndMultipleStandardAndMoreColors" || patternType === "ThemeAndMultipleStandard") {
                            moveIndex = 131;
                            lastColorIndex = 131;
                            lastIndex = 120;
                            lastRowStartIndex = 121;
                            lastRowEndIndex = 130;
                        }
                        if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {
                            moveIndex = 131;
                            lastColorIndex = 132;
                            lastIndex = 120;
                            lastRowStartIndex = 121;
                            lastRowEndIndex = 130;
                            moveIndexNew = 132;
                        }
                        if (patternType === "ColorsAndMoreColorAndEyeDropper") {
                            moveIndexNew = 101;
                        }

                        if (isRecentClr) {
                            lastRowEndIndex += NumberOfElementsInRecentColor;
                            lastColorIndex += NumberOfElementsInRecentColor;
                            lastIndex = 60 + NumberOfElementsInRecentColor;
                        }

                        if (currIndex >= 1 && currIndex <= lastIndex) {
                            nextIndex = currIndex + 10;
                        }
                        else if ((currIndex >= lastRowStartIndex && currIndex <= lastRowEndIndex) || currIndex === moveIndex || currIndex === 0 || currIndex == lastColorIndex || currIndex === moveIndexNew) {
                            if($control.data('preventCircularTabAndDown')) {
                                nextIndex = null;
                            }
                            else {
                                nextIndex = self.findNextIndex($control, currIndex, 'DOWN', isRecentClr);
                            }
                            
                        }
                        console.log("next index is DOWN::" + nextIndex);
                        if (nextIndex != null) {
                            self.focusChange($control, currIndex, nextIndex);
                            event.preventDefault();
                            event.stopPropagation();

                        }
                        else {
                            if($control.data('preventCircularTabAndDown')) {
                                $control.closest('.SIMSGenericContextUsed').focus();
                            }
                            else {
                               $focusEle.blur();
                            }
                            $control.find('.i-' + currIndex).removeClass('clr-focus');
                            $($control).parent().data("goToNext", true);
                        }

                        break;

                    case 77:  //M Key for More Options   
                        if (patternType !== "ThemeAndMultipleStandardAndMoreColors" && patternType !== "ThemeMultipleStandardTransparentAndMoreColors")
                            myCallbackData.index = 100;
                        else
                            myCallbackData.index = 131;
                        myCallbackData.selectedColor = null;
                        myCallbackData.message = "More Colors Clicked";
                        myCallbackData.selectedColor = null;
                        myCallbackData.text = null;
                        myCallbackData.eventID = 2;

                        if (myCallBackFunc !== null) {
                            $focusEle.blur();
                            self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    case 84:  //T Key for transparent
                        if (patternType === "ThemeMultipleStandardTransparentAndMoreColors") {

                            myCallbackData.index = 132;
                            myCallbackData.selectedColor = null;
                            myCallbackData.message = "Transparent Clicked";
                            myCallbackData.selectedColor = null;
                            myCallbackData.text = null;
                            myCallbackData.eventID = 2;

                            if (myCallBackFunc !== null) {
                                $focusEle.blur();
                                self.fireEvent(myCallbackFuncOwner, myCallBackFunc, [controlID, $control, myCallbackData]);
                            }
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        break;

                    default:
                        break;
                }
            });
        }
    },

    focusChange: function ($control, currIndex, nextIndex) {
        var selectedString = '.i-' + nextIndex;
        $control.find(':not(' + selectedString + ')').removeClass('clr-focus');
        $control.find('.i-' + nextIndex).addClass('clr-focus').focus();
    },

    findNextIndex: function ($control, currIndex, keyPressed, isRecentClr) {
        var groups = $control.data('groups');
        var groupsLength = groups.length;
        var type = 'mainBody';
        var patternType = $control.data("patternType");
        var nextIndex = currIndex;

        //to check if its required to navigate to next item in ribbon
        if ($($control).parent().siblings().length == 0 || ($($control).parent().is(".ribbon .dropdown-item") == false)) {
            switch (currIndex) {
                case 0:
                    type = 'single0';
                    break;
                case 71:
                    if (patternType !== "ThemeAndMultipleStandardAndMoreColors" && patternType !== "ThemeMultipleStandardTransparentAndMoreColors" && patternType !== "ThemeAndMultipleStandard") {
                        if (!isRecentClr) {
                            type = 'single71';
                        }
                    }
                    break;
                case 100:
                    type = 'item';
                    break;

                case 101:
                    type = 'eyeDropper';
                    break;

                case 131:
                    type = 'multipleStandardItem';
                    break;
                case 132:
                    type = 'transparentItem';
                    break;

                default:
                    type = 'mainBody';
                    break;
            }

            var i = 0;
            var currGroup = 0;
            var nextGroup = 0;
            for (i = 0; i < groupsLength; i++) {
                if (groups[i]['type'] == type) {
                    currGroup = i;
                }
            }
            var move = 'PREV';
            if (keyPressed == 'UP' || keyPressed == 'SHIFT+TAB') {
                move = 'PREV';
            }
            else if (keyPressed == 'DOWN' || keyPressed == 'TAB') {
                move = 'NEXT';
            }

            //To determine the next active group
            if (move == 'PREV') {
                if (currGroup > 0) {
                    nextGroup = currGroup - 1;
                }
                else {
                    nextGroup = groupsLength - 1;
                }
            }
            else if (move == 'NEXT') {
                if (currGroup < (groupsLength - 1)) {
                    nextGroup = currGroup + 1;
                }
                else {
                    nextGroup = 0;
                }
            }

            //To determine the next active Index
            var currType = groups[nextGroup].type;

            if (currType == 'mainBody') {
                switch (keyPressed) {
                    case 'UP':
                        if (patternType !== "ThemeAndMultipleStandardAndMoreColors" && patternType !== "ThemeMultipleStandardTransparentAndMoreColors" && patternType !== "ThemeAndMultipleStandard") {
                            nextIndex = 66;

                            if (isRecentClr) {
                                for (i = 0; i < groupsLength; i++) {
                                    if (groups[i]['type'] == 'mainBody') {
                                        if (70 != groups[i].end) {
                                            nextIndex = groups[i].end;
                                        }
                                    }
                                }
                            }
                        }
                        else
                            nextIndex = 126;
                        break;
                    case 'DOWN':
                        nextIndex = 6;
                        break;
                    case 'TAB':
                        nextIndex = 1;
                        break;
                    case 'SHIFT+TAB':
                        if (patternType !== "ThemeAndMultipleStandardAndMoreColors" && patternType !== "ThemeMultipleStandardTransparentAndMoreColors" && patternType !== "ThemeAndMultipleStandard") {
                            nextIndex = 70;
                            if (isRecentClr) {
                                for (i = 0; i < groupsLength; i++) {
                                    if (groups[i]['type'] == 'mainBody') {
                                        if (70 != groups[i].end) {
                                            nextIndex = groups[i].end;
                                        }
                                    }
                                }
                            }
                        }
                        else
                            nextIndex = 130;
                        break;
                    default:
                        break;
                }
            }

            else {
                nextIndex = groups[nextGroup].index;
            }
            return nextIndex;
        }

        else {
            return null;

        }



    },

    //Interface Method
    //Sets the Data
    setData: function ($control, controlParams) {
        var self = this;
        if (controlParams.index !== null && controlParams.index !== "" && controlParams.index !== undefined) {
            if ($control.find('i-' + controlParams.index) !== null) {
                self.selectColor($control, null, controlParams.index);
            }
        }

        else if (controlParams.selectedColor !== null && controlParams.selectedColor !== "" && controlParams.selectedColor !== undefined) {
            if ($control.find('.c-' + controlParams.selectedColor) !== null) {
                self.selectColor($control, controlParams.selectedColor, null);
            }
        }
        if (controlParams.application !== null && controlParams.application !== "" && controlParams.application !== undefined) {
            $control.data({ 'application': controlParams.application });
            $control.find('.grid-container').addClass(controlParams.application);
        }
        else {
            $control.data({ 'application': 'word' });
            $control.find('.grid-container').addClass('word');
        }
        if (controlParams.patternType !== null && controlParams.patternType !== "" && controlParams.patternType !== undefined) {
            $control.data({ 'patternType': controlParams.patternType });
            self.makeControlOnThemeChange($control, controlParams);

        }

        if (controlParams.theme !== null && controlParams.theme !== "" && controlParams.theme !== undefined) {
            var newTheme = controlParams.theme;
            var existingTheme = $control.data('theme');
            if (newTheme !== existingTheme) {

                if (controlParams.colorGridType == "backgroundColor") {
                    var newControlParams = { 'theme': newTheme, 'colorGridType': 'backgroundColor' };
                    self.makeControlOnThemeChange($control, controlParams);
                }
                else {
                    var newControlParams = { 'theme': newTheme, 'colorGridType': 'patternColor' };
                    self.makeControlOnThemeChange($control, controlParams);
                }
            }
        }

        if (controlParams.dropDownTop !== null && controlParams.dropDownTop !== "" && controlParams.dropDownTop !== undefined) {
            var top = controlParams.dropDownTop + 'px';
            $control.data("top", top);
            $control.css("top", top);
        }
        else {
            //We are not doing anything..
        }

        //<<<<<<<<<<<<<<For Recent Colors>>>>>>>>>>//
        if (controlParams.recentColors !== null && controlParams.recentColors !== "" && controlParams.recentColors !== undefined) {
            self.makeControlWithRecentColor($control, controlParams);
            //<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>//
        }
        //Set Control left
        if (controlParams.dropDownLeft !== null && controlParams.dropDownLeft !== "" && controlParams.dropDownLeft !== undefined) {
            var left = controlParams.dropDownLeft + 'px';
            $control.data("left", left);
            $control.css("left", left);
        }
        else {
            //We are not doing anything..
        }
    },

    updateControl: function ($control, controlParams) {

        var $mainBodyHeader = null;
        var $colorLine1 = null;
        var $colorGroupContainer = null;
        var $standardColorHeader = null;
        var $colorGroup2 = null;

        var self = this;
        var i = 0;

        var $gridContainer = $control.find('.grid-container');


        if (controlParams.colorGridType !== null && controlParams.colorGridType !== "" && controlParams.colorGridType !== undefined) {
            $control.data({ 'colorGridType': controlParams.colorGridType });
            $control.find('.grid-container').addClass(controlParams.colorGridType);
        }
        else {
            $control.data({ 'colorGridType': 'patternColor' });
            $control.find('.grid-container').addClass('patternColor');
        }
        var colorGridType = $control.data('colorGridType');

        //Set Control Top
        if (controlParams.dropDownTop !== null && controlParams.dropDownTop !== "" && controlParams.dropDownTop !== undefined) {
            var top = controlParams.dropDownTop + 'px';
            $control.data("top", top);
            $control.css("top", top);
        }
        else {
            //We are not doing anything..
        }

        //Set Control left
        if (controlParams.dropDownLeft !== null && controlParams.dropDownLeft !== "" && controlParams.dropDownLeft !== undefined) {
            var left = controlParams.dropDownLeft + 'px';
            $control.data("left", left);
            $control.css("left", left);
        }
        else {
            //We are not doing anything..
        }


        if (controlParams.application !== null && controlParams.application !== "" && controlParams.application !== undefined) {
            $control.data({ 'application': controlParams.application });
            $control.find('.grid-container').addClass(controlParams.application);
        }
        else {
            $control.data({ 'application': 'word' });
            $control.find('.grid-container').addClass('word');
        }

        if (controlParams.focalizefirstcolor && controlParams.focalizefirstcolor == "true") {
            $control.data({ 'focalizefirstcolor': controlParams.focalizefirstcolor });
        }
        else {
            $control.data({ 'focalizefirstcolor': undefined });
        }

        if (controlParams.theme !== null && controlParams.theme !== "" && controlParams.theme !== undefined) {
            $control.data({ 'theme': controlParams.theme });
        }
        else {
            $control.data({ 'theme': 'Office' });
        }

        if (controlParams.preventCircularTabAndDown && controlParams.preventCircularTabAndDown == "true") {
            $control.data({ 'preventCircularTabAndDown': true });
        }
        else {
            $control.data({ 'preventCircularTabAndDown': false });
        }

        var theme = $control.data('theme');

        if (colorGridType === 'patternColor') {
            if (controlParams.patternType !== null && controlParams.patternType !== "" && controlParams.patternType !== undefined) {
                $control.data({ 'patternType': controlParams.patternType });
            }
            else {
                $control.data({ 'patternType': 'simplePattern' });
            }
        }
        var patternType = $control.data('patternType');

        // To Get colors from ColorGridInputList.js

        var colorsLength = ColorGridInputList.length;
        var colors = null;
        for (i = 0; i < colorsLength; i = i + 1) {
            if (ColorGridInputList[i].colorGridType === colorGridType && ColorGridInputList[i].theme === theme) {
                colors = ColorGridInputList[i].colors;
            }
        }

        //Generation Code for the Grid
        if (colors !== null && colors !== undefined) {
            var length = colors.length;
            var $colorEle = null;
            //Start and End Indices for patternColor Type
            var start = 0;
            var end = 70;


            //Color Generations for backgroundColor Type
            if (colorGridType === 'backgroundColor') {
                for (i = 0; i < length; i++) {
                    //To Add Separators
                    if (i === 11 || i === 61) {
                        var $separator = UIUtils.getUnselectableDiv("", "separator");
                        $gridContainer.append($separator);
                    }
                    //Call to construct color
                    $gridContainer.append(self.AddColor(colors[i]));

                    //Margin adjustments for positioning
                    if (i % 10 === 1) {
                        $control.find('.grid-container').find('.i-' + i).addClass('margin-left-2');
                    }
                }
            }

            else if (colorGridType === 'patternColor') {
                var groups = null;

                switch (patternType) {
                    case 'simplePattern':
                        var endVal = 70;
                        if (controlParams.recentColors !== null && controlParams.recentColors !== "" && controlParams.recentColors !== undefined) {
                            endVal += controlParams.recentColors.length;
                        }
                        groups = [{ "type": "single0", "index": 0 },
                                  { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": endVal },
                                  { "type": "item", "text": "More Colors...", "index": 100 }
                                 ];
                        break;
                    case 'onlyColors':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70}];
                        start = 1;
                        break;
                    case 'AutomaticAndColors':
                        groups = [{ "type": "single0", "index": 0 },
                                    { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70}];
                        break;
                    case 'ColorsAndMoreColors':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "item", "text": "More Colors...", "index": 100}];
                        start = 1;
                        break;
                    case 'ColorsAndNoFill':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single71", "index": 71}];
                        start = 1;
                        end = 71;
                        break;
                    case 'AutomaticAndColorsAndNoFill':
                        groups = [{ "type": "single0", "index": 0 },
                                    { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single71", "index": 71}];
                        end = 71;
                        break;
                    case 'ColorsAndNoOutline':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                { "type": "single71", "index": 71}];
                        start = 1;
                        end = 71;
                        break;
                    case 'AutomaticAndColorsAndNoOutline':
                        groups = [{ "type": "single0", "index": 0 },
                                 { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                { "type": "single71", "index": 71}];
                        end = 71;
                        break;
                    case 'ColorsAndAutomatic':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single0", "index": 0}];
                        break;
                    case 'ColorsAndAutomaticAndMoreColors':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single0", "index": 0 },
                                    { "type": "item", "text": "More Colors...", "index": 100}];
                        break;
                    case 'ColorsAndNoColor':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single71", "index": 71}];
                        start = 1;
                        end = 71;
                        break;
                    case 'ColorsAndNoColorAndMoreColors':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single71", "index": 71 },
                                    { "type": "item", "text": "More Colors...", "index": 100}];
                        start = 1;
                        end = 71;
                        break;
                    case 'ColorsAndNoFillAndMoreColors':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                    { "type": "single71", "index": 71 },
                                    { "type": "item", "text": "More Colors...", "index": 100}];
                        start = 1;
                        end = 71;
                        break;
                    case 'ColorsAndMoreColorAndEyeDropper':
                        groups = [{ "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                   { "type": "item", "text": "More Colors...", "index": 100 },
                                    { "type": "eyeDropper", "text": "Eyedropper", "index": 101}];
                        start = 1;
                        end = 71;
                        break;
                    case 'ThemeAndMultipleStandardAndMoreColors':

                        groups = [{ "type": "single0", "index": 0 },
                            { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 130 },
                            { "type": "multipleStandardItem", "text": "More Colors...", "index": 131 }

                        ];
                        start = 0;
                        end = 130;
                        break;
                    case 'MultipleStandardAndMoreColors':
                        groups = [{ "type": "single0", "index": 0 },
                                  { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 70 },
                                  { "type": "item", "text": "More Colors...", "index": 100 }
                                 ];
                        start = 0;
                        end = 71;
                        break;
                    case 'ThemeMultipleStandardTransparentAndMoreColors':

                        groups = [{ "type": "single0", "index": 0 },
                            { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 130 },
                            { "type": "transparentItem", "text": "Transparent", "index": 132 },
                            { "type": "multipleStandardItem", "text": "More Colors...", "index": 131 }


                        ];
                        start = 0;
                        end = 130;
                        break;
                    case 'ThemeAndMultipleStandard':

                        groups = [{ "type": "single0", "index": 0 },
                            { "type": "mainBody", "text": "Theme Colors", "start": 1, "end": 130 }


                        ];
                        start = 0;
                        end = 130;
                        break;
                }
                $control.data('groups', groups);

                var groupLength = groups.length;

                var j = 0, k = 0;

                for (j = 0; j < groups.length; j++) {
                    //first list item //optional
                    if (groups[j].type === "single0") {
                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "single single0"));
                    }

                    //last list item //optional
                    if (groups[j].type === "single71") {
                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "single single71"));
                    }

                    if (groups[j].type === "mainBody") {

                        if (patternType != "MultipleStandardAndMoreColors") {

                            if (this.cacheControl.cache.mainBodyCache[$control.data('theme')]) {
                                for (var nds = 0; nds < this.cacheControl.cache.mainBodyCache[$control.data('theme')].length; nds++) {
                                    $gridContainer.append(this.cacheControl.cache.mainBodyCache[$control.data('theme')][nds].clone());
                                }

                                if (this.cacheControl.cache.secondLineCache[$control.data('theme')][patternType]) {
                                    $gridContainer.append(this.cacheControl.cache.secondLineCache[$control.data('theme')][patternType].clone());
                                    this.cacheControl.secondLineCacheHit = true;
                                }
                                else {
                                    $colorGroup2 = UIUtils.getUnselectableGenericElement("div", "", "singleLine line2");
                                    $gridContainer.append($colorGroup2);

                                    if (start <= 61 && end >= 70) {
                                        for (var i = 61; i <= 70; i++) {
                                            $colorEle = self.AddColorNTooltip(patternType, colors[i]);
                                            $gridContainer.find('.line2').append($colorEle);
                                        }
                                    }

                                    if (patternType == "ThemeAndMultipleStandardAndMoreColors" || patternType == "ThemeMultipleStandardTransparentAndMoreColors" || patternType == "ThemeAndMultipleStandard") {
                                        for (var i = 71; i <= end; i++) {
                                            $colorEle = self.AddColorNTooltip(patternType, colors[i]);
                                            $gridContainer.find('.line2').append($colorEle);
                                        }
                                    }

                                    this.cacheControl.secondLineCacheHit = false;
                                }

                                this.cacheControl.cacheHit = true;
                                this.cacheControl.cachableMainBody = false; //dont cache body... already cached.
                            }
                            else {

                                //refs.
                                $mainBodyHeader = UIUtils.getUnselectableGenericElement("div", "", "header").text('Theme Colors');
                                $colorLine1 = UIUtils.getUnselectableGenericElement("div", "", "singleLine line1");
                                $colorGroupContainer = UIUtils.getUnselectableGenericElement("div", "", "colorContainer");
                                $standardColorHeader = UIUtils.getUnselectableGenericElement("div", "", "header").text('Standard Colors');
                                $colorGroup2 = UIUtils.getUnselectableGenericElement("div", "", "singleLine line2");


                                for (k = 1; k <= 10; k++) {
                                    var classNames = "container container-" + k;
                                    $colorGroupContainer.append(UIUtils.getUnselectableGenericElement("div", "", classNames));
                                }

                                $gridContainer.append($mainBodyHeader)
                                            .append($colorLine1)
                                            .append($colorGroupContainer)
                                            .append($standardColorHeader)
                                            .append($colorGroup2);

                                this.cacheControl.secondLineCacheHit = false;
                                this.cacheControl.cacheHit = false;
                                this.cacheControl.cachableMainBody = true; //cache body
                            }

                        }
                        else {
                            //refs.
                            // for  MultipleStandardAndMoreColors
                            $mainBodyHeader = UIUtils.getUnselectableGenericElement("div", "", "header").text('Standard Colors');
                            $colorLine1 = UIUtils.getUnselectableGenericElement("div", "", "singleLine line1");
                            $colorGroupContainer = UIUtils.getUnselectableGenericElement("div", "", "colorContainer");
                            $colorGroup2 = UIUtils.getUnselectableGenericElement("div", "", "singleLine line2");

                            for (k = 1; k <= 10; k++) {
                                var classNames = "container container-" + k;
                                $colorGroupContainer.append(UIUtils.getUnselectableGenericElement("div", "", classNames));
                            }

                            $gridContainer.append($mainBodyHeader)
                                        .append($colorLine1)
                                        .append($colorGroupContainer)
                                        .append($colorGroup2);

                            this.cacheControl.secondLineCacheHit = false;
                            this.cacheControl.cacheHit = false;
                            this.cacheControl.cachableMainBody = false; //dont cache body


                        }

                        //<<<<<<<<<<<<<<<Creating Recent Colors>>>>>>>>>>>>>>>>>>>>>>//
                        if (controlParams.recentColors !== null && controlParams.recentColors !== "" && controlParams.recentColors !== undefined) {
                            $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "header").text('Recent Colors'));

                            var $recentClrDiv = UIUtils.getUnselectableGenericElement("div", "", "singleLine recentClrDiv");
                            $gridContainer.append($recentClrDiv);

                            var RecentColor = controlParams.recentColors;
                            for (i = 0; i < RecentColor.length; i++) {
                                var $MoreCol = self.AddColorNTooltip(patternType, RecentColor[i], true);
                                $recentClrDiv.append($MoreCol);
                            }
                        }
                        //<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

                    }

                    //list item type
                    if (groups[j].type === "item") {

                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "item i-100").attr("tabindex", "0").attr('i', '100').text(groups[j].text));

                    }

                    //list item type
                    if (groups[j].type === "eyeDropper") {
                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "eyeDropper i-101").attr("tabindex", "0").attr('i', '101').text(groups[j].text));
                    }



                    if (groups[j].type === "multipleStandardItem") {
                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "item i-131").attr("tabindex", "0").attr('i', '131').text(groups[j].text));
                    }

                    if (groups[j].type === "transparentItem") {
                        $gridContainer.append(UIUtils.getUnselectableGenericElement("div", "", "item i-132 transparentItem").attr("tabindex", "0").attr('i', '132').text(groups[j].text));

                    }

                }

                if (this.cacheControl.cacheHit) {

                    if (0 >= start && 0 <= end) {
                        $colorEle = self.AddColorNTooltip(patternType, colors[0]);
                        $gridContainer.find(".single0").append($colorEle);
                    }

                    if (71 >= start && 71 <= end) {
                        $colorEle = self.AddColorNTooltip(patternType, colors[71]);
                        $gridContainer.find(".single71").append($colorEle);
                    }

                }
                else {
                    for (i = start; i <= end; i++) {
                        //Call to construct Color
                        $colorEle = self.AddColorNTooltip(patternType, colors[i]);

                        if (i === 0 || i === 71) {
                            var targetClass = '.single' + i;
                            $gridContainer.find(targetClass).append($colorEle);
                        }

                        if (i >= 1 && i <= 10) {
                            $gridContainer.find('.line1').append($colorEle);
                        }

                        if (i >= 61 && i <= 70) {
                            $gridContainer.find('.line2').append($colorEle);
                        }


                        if (patternType == "ThemeAndMultipleStandardAndMoreColors" || patternType == "ThemeMultipleStandardTransparentAndMoreColors" || patternType == "ThemeAndMultipleStandard") {
                            if (i >= 71) {
                                $gridContainer.find('.line2').append($colorEle);
                            }
                        }

                        if (i >= 11 && i <= 60) {
                            j = i % 10;
                            if (j === 0) {
                                $gridContainer.find('.container-10').append($colorEle);
                            }
                            else {
                                $gridContainer.find('.container-' + j).append($colorEle);
                            }

                            //For positioning
                            if (i >= 11 && i <= 20) {
                                $control.find('.grid-container').find('.i-' + i).addClass('top-row');
                            }
                            else if (i >= 51 && i <= 60) {
                                $control.find('.grid-container').find('.i-' + i).addClass('bottom-row');
                            }
                            else {
                                $control.find('.grid-container').find('.i-' + i).addClass('middle-rows');
                            }
                        }

                    }
                }

            }
            
            //CACHE MAIN BODY WITHOUT COLORGROUP2
            //cache code...
            if (this.cacheControl.cachableMainBody) {

                var arr = this.cacheControl.cache.mainBodyCache[$control.data('theme')] = [];
                if ($mainBodyHeader != null) {
                    arr.push($mainBodyHeader.clone());
                }
                if ($colorLine1 != null) {
                    arr.push($colorLine1.clone());
                }
                if ($colorGroupContainer != null) {
                    arr.push($colorGroupContainer.clone());
                }
                if ($standardColorHeader != null) {
                    arr.push($standardColorHeader.clone());
                }
            }

            //CACHE COLORGROUP2
            //cache code...
            if (!this.cacheControl.secondLineCacheHit) {
                if (!this.cacheControl.cache.secondLineCache[$control.data('theme')]) {
                    this.cacheControl.cache.secondLineCache[$control.data('theme')] = {};
                }

                if ($colorGroup2) {
                    this.cacheControl.cache.secondLineCache[$control.data('theme')][patternType] = $colorGroup2.clone();
                }
                
            }

            if (controlParams.index !== null && controlParams.index !== "" && controlParams.index !== undefined) {
                if ($control.find('.i-' + controlParams.index) !== null) {
                    self.selectColor($control, null, controlParams.index);
                }

            }
            else if (controlParams.selectedColor !== null && controlParams.selectedColor !== "" && controlParams.selectedColor !== undefined) {
                if ($control.find('.c-' + controlParams.selectedColor) !== null) {
                    self.selectColor($control, controlParams.selectedColor, null);
                }
            }
            else {
                self.selectColor($control, null, 1);
            }

        }
    },

    //Returns controlParams
    getData: function ($control) {
        var controlParams = {};

        //Only selectedColor is returned
        var $selectedColor = $control.find(".clr-selected");
        controlParams.index = $selectedColor.attr('i');
        controlParams.selectedColor = $selectedColor.attr('clr');

        if ($control.data('colorGridType') === 'patternColor') {
            controlParams.text = $selectedColor.attr('text');
        }
        return controlParams;
    },

    AddColor: function (color) {
        var clr = color.clr;
        var i = color.i;

        //Adding Color
        var $color = UIUtils.getUnselectableGenericElement("li", "", "color");
        $color.addClass("c-" + clr);
        $color.addClass("i-" + i);
        $color
            .attr('clr', clr)
            .attr('i', i);

        var $kid = UIUtils.getUnselectableGenericElement("div", "", "kid");

        if (clr === "NoColor") {
            $kid.text("No Color");
        }
        else {
            $kid.css({ "background-color": "#" + clr });
        }

        $color.append($kid);
        $color.attr("tabindex", "0");
        return $color;
    },

    //For ColorDropDown, Color + Tooltips - to be Updated for Tooltips
    AddColorNTooltip: function (patternType, color, isRecentClr) {
        var self = this;

        var $color = UIUtils.getUnselectableGenericElement("div", "", "color");

        var tt = color.tt;
        var i = color.i;
        var clr = color.clr;
        if (patternType == "ThemeAndMultipleStandardAndMoreColors" || patternType == "ThemeMultipleStandardTransparentAndMoreColors" || patternType == "ThemeAndMultipleStandard") {
            var $wrapper = UIUtils.getUnselectableGenericElement("div", "", "wrapper");
            var $colorPart = UIUtils.getUnselectableGenericElement("div", "", "color-part");
            var $textDiv = UIUtils.getUnselectableGenericElement("div", "", "text-part");
            if (i === "0" || i === 0) {
                $color.addClass('automatic');
                $textDiv.text('Automatic');
                tt = 'Automatic';
                $wrapper.append($colorPart);
                $color.append($wrapper);
                $color.append($textDiv);
            }
            if (i > 0 && i < 131) {
                $color.css({ "background-color": "#" + clr });
                var $kid = UIUtils.getUnselectableGenericElement("div", "", "kid");
                $color.append($kid);
            }
        }
        else {

            if (i > 0 && i < 71) {
                $color.css({ "background-color": "#" + clr });
                var $kid = UIUtils.getUnselectableGenericElement("div", "", "kid");
                $color.append($kid);
            }
            //<<<<<<<<<<<<For Recent Colors>>>>>>>>>>>>>>>>>//
            else if (isRecentClr && (i >= 71 && i <= 80)) {

                $color.css({ "background-color": "#" + clr });
                var $kid = UIUtils.getUnselectableGenericElement("div", "", "kid");
                $color.append($kid);
            }
            //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>//
            else {

                var $wrapper = UIUtils.getUnselectableGenericElement("div", "", "wrapper");
                var $colorPart = UIUtils.getUnselectableGenericElement("div", "", "color-part");
                var $textDiv = UIUtils.getUnselectableGenericElement("div", "", "text-part");

                if (i === "0" || i === 0) {
                    $color.addClass('automatic');
                    $textDiv.text('Automatic');
                    tt = 'Automatic';
                }
                else if (i === "71" || i === 71) {
                    if (patternType === "ColorsAndNoFill" || patternType === "AutomaticAndColorsAndNoFill" || patternType === "ColorsAndNoFillAndMoreColors") {
                        $color.addClass('no-fill');
                        tt = 'No Fill';
                        $textDiv.text('NoFill');
                    }
                    else if (patternType === "ColorsAndNoOutline" || patternType === "AutomaticAndColorsAndNoOutline") {
                        $color.addClass('no-outline');
                        tt = 'No Outline';
                        $textDiv.text('No Outline');
                        clr = "NoOutline";
                    }
                    else if (patternType === "ColorsAndNoColor" || patternType === "ColorsAndNoColorAndMoreColors") {
                        $color.addClass('no-color');
                        tt = 'No Color';
                        $textDiv.text('No Color');
                        clr = "NoColor";
                    }
                }

                $wrapper.append($colorPart);
                $color.append($wrapper);
                $color.append($textDiv);
            }
        }
        $color.attr('title', tt);
        $color.addClass("c-" + clr);
        $color.addClass("i-" + i);
        $color
            .attr('clr', clr)
            .attr('i', i)
            .attr('text', tt);

        $color.attr("tabindex", "0");
        return $color;

    },

    selectColor: function ($control, selectedColor, index) {
        var selectedString = null;

        if (index !== undefined && index !== null && index !== "") {
            selectedString = '.i-' + index;
        }
        else if (selectedColor !== undefined && selectedColor !== null && selectedColor !== "") {
            selectedString = '.c-' + selectedColor;
        }
        else {
            selectedString = '.i-1';
        }
        $control.find(':not(' + selectedString + ')').removeClass('clr-focus');
        $control.find(':not(' + selectedString + ')').removeClass('clr-selected');
        $control.find(selectedString).addClass('clr-selected');

    },

    handleAccessKey: function ($control, data) {

        if ($control.data("focalizeOnAccessKey")) {
            this.focalize($control, true);
        }
        else {
            $control.focus();    
        }        
    },

    focalize: function ($control, isFocus) {
        if (isFocus == true) {
            if ($control.data('focalizefirstcolor') == "true") {
                $control.find(".color").first().addClass('clr-focus').focus();
            }
            else {
                $control.focus();
                this.base($control, isFocus);
            }
        }
    }
});