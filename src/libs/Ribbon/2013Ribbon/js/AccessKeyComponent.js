namespace("SIMS.Components.Common.AccessKeyComponent");

SIMS.Components.Common.RibbonState = Base.extend({
    constructor: function (ribbonComp) {
        this._ribbonComp = ribbonComp;
    },
    HandleKey: function (key, keycomb) {
    },
    SET: function () {
    },
    UNSET: function () {
    },
    _keyStack: null,
    _ribbonComp: null

});

SIMS.Components.Common.NormalState = SIMS.Components.Common.RibbonState.extend({
    _f6: false,
    _controlStack: [],
    constructor: function () {
        this.base.apply(this, arguments);
        var self = this;
    },

    HandleKey: function (key, keycomb) {

        if (this._ribbonComp.focusCompIdForAccessKeys !== null && $(document.activeElement).closest(".compDiv#" + this._ribbonComp.focusCompIdForAccessKeys).length==0) {
            return false;
        }

        if (this._ribbonComp.handleKeyCondition(key)) {
            if (key === "ALT" || key === "F10") {

                // If CTRL is pressed then do not handle ALT or F10
                if (keycomb.indexOf("CTRL") > -1) {
                    return false;
                }

                this._ribbonComp.goIntoAccessibilityState();
                return true;
            }
            else if (key === "F6") {
            /*
                if (this._f6) {
                    this._ribbonComp.goIntoAccessibilityState();

                }
                else {
                    this._f6 = true;
                    return false;
                }
                */
                return false;
            }
            else if (["UP", "DOWN", "TAB", "SHIFT+TAB"].indexOf(key) !== -1) {
                var stackCandidates = ".dropdown-next-level-wrapper, .office-control";
                var $controls = null;

                if (this._ribbonComp.$thisCompElement.find(".dropdown-item:visible").parents(stackCandidates).length > 1) {
                    $controls = this._ribbonComp.$thisCompElement.find(".dropdown-item:visible").parents(stackCandidates).filter(function () {
                        return $(this).children(".gallery-inner-div").length == 0;
                    });
                }
                else {
                    $controls = this._ribbonComp.$thisCompElement.find(".dropdown-item:visible").last().parents(stackCandidates);
                }

                var stack = [];
                $controls.each(function () {
                    stack.unshift($(this));          //converting array to stack
                });

                this._ribbonComp.goIntoNavigationKeyState(stack);
                }
            }
    },
    SET: function () {
        this._f6 = false;
    },
    UNSET: function () {
        this.SET();
    }
});

SIMS.Components.Common.NavigationKeyState = SIMS.Components.Common.RibbonState.extend({
    _currentItem: null,
    _manipulator: null,
    _controlStack: [],

    AddHoverToParentDropdownItem : function() {
    },

    constructor: function (ribbonComp) {
        this.base.apply(this, arguments);
        this._manipulator = new SIMS.Manipulators.RibbonControlManipulatorFactory();

        this._keyHandlers = {
            ENTER: function () {
                var $currentItem = this._currentItem;
                var bLeaf = this._manipulator.handleAccessKey(this._currentItem);
                if (!bLeaf) {
                    //Abstract this/////////////////////////////////////////////////////////////////
                    var $dropDownItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");
                    ////////////////////////////////////////////////////////////////////////////////
                    this._controlStack.push(this._currentItem);
                    if ($dropDownItems.length > 0) {
                        this.setCurrentItem($dropDownItems.first());
                        this.AddHoverToParentDropdownItem();
                    }
                }
            },
            ALT: function () {
                this._ribbonComp.goIntoNormalState();
            },
            ESCAPE: function () {
                if (this._controlStack.length > 0) {
                    var item = this._controlStack.pop();
                    this._manipulator.handleAccessKey(item, "ESCAPE");
                    this.setCurrentItem(item);
                }
                else {
                    //Abstract this/////////////////////////////////////////////////////////////////
                    this._ribbonComp.goIntoNormalState();
                    ////////////////////////////////////////////////////////////////////////////////
                }
            },
            TAB: function () {
                var $tabItem = this._manipulator.getNextTabItem(this._currentItem);

                if ($tabItem)
                    this.setCurrentItem($tabItem);
            },
            NAVKEY: function (key) {
                var itemInfo = this._manipulator.getItemForStandardKey(this._currentItem, key);
               // SIMS-106124 Safe check added to check itemInfo is null or defined
				 if(itemInfo) {
                    var $requiredItem = itemInfo.item;
                    if ($requiredItem && $requiredItem.length > 0) {
                        this.setCurrentItem($requiredItem);
                        var handled = this._manipulator.handleStandardKey($requiredItem, key);
                        //alert("Yo Nigga! Control Found!!!");

                        return itemInfo.bounced && handled;
                    }
                }
            },
            RIGHT: function () {
                if (this._keyHandlers.NAVKEY.apply(this, arguments)) {
                    this._keyHandlers.ENTER.apply(this, arguments);
                }
            },
            LEFT: function () {
                if (this._keyHandlers.NAVKEY.apply(this, arguments)) {
                    this._manipulator.handleAccessKey(this._controlStack.pop(), "ESCAPE");
                }
            }
        };
        this._keyHandlers.SPACE = this._keyHandlers.ENTER;
        this._keyHandlers.DOWN = this._keyHandlers.NAVKEY;
        this._keyHandlers.UP = this._keyHandlers.NAVKEY;
    },
    HandleKey: function (key, keycomb) {

        console.log("keycomb navigation :  "+ keycomb);


        if(keycomb == "SHIFT+F10")
        {
            var retVal = this._manipulator.ShowContextMenu(this._currentItem);

            if(retVal)
            {
                var $item = this._currentItem;
                this._controlStack.push($item);
                return true;
            }
        }

        var handler = this._keyHandlers[key];
        if (handler) {
            handler.apply(this, arguments);
            return true;
        }
        else {
            //Accesskey handling
        }
    },
    SET: function (controlStack) {
        this.clearMemberVariables();

        if (controlStack != undefined && controlStack.length > 0) {
            this._controlStack = controlStack;
            
            var $currentItem = this._controlStack[this._controlStack.length - 1];
			
			if (controlStack[0].is(".tab-header")) {
                this._controlStack = controlStack.slice(1, controlStack.length);
            }


            var $subItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");


            if ($subItems != undefined && $subItems.length > 0) {
                $currentItem = $subItems.first();
            }

            var $nextItem = this._ribbonComp.getExceptionalNextNavigationItem($currentItem);
            if ($nextItem != undefined && $nextItem != null) {
                $currentItem = $nextItem;
            }

            this.setCurrentItem($currentItem);
        }
        else {
            var $seedingNavigationControl = this._ribbonComp.getSeedingNavigationControl();

            var $prevItem = this._ribbonComp.getPrevStateSelNavigationItem();

            if ($prevItem != null && $prevItem.length > 0) {
                this.setCurrentItem($prevItem);
                this._ribbonComp.removePrevStateSelNavigationItem();

            }
            else
                this.setCurrentItem($seedingNavigationControl);
            //this.setCurrentItem(this._ribbonComp.$thisCompElement.find(".tab-header-selected:first"));
        }
        //this._ribbonComp.$thisCompElement.find(".ribbon:first").addClass("navigation-key-state");
        this._ribbonComp.$thisCompElement.filter(".ribbon").add(this._ribbonComp.$thisCompElement.find(".ribbon:first")).addClass("navigation-key-state");
    },
    UNSET: function () {
        this.setCurrentItem(null);
        this.clearMemberVariables();
        //this._ribbonComp.$thisCompElement.find(".ribbon:first").removeClass("navigation-key-state");
        this._ribbonComp.$thisCompElement.filter(".ribbon").add(this._ribbonComp.$thisCompElement.find(".ribbon:first")).removeClass("navigation-key-state");
    },

    clearMemberVariables: function () {
        this._controlStack.length = 0;
        this._currentItem = null;
    },

    setCurrentItem: function ($item) {
        if (this._currentItem && this._currentItem.length > 0) {
            this._manipulator.removeNavigationHover(this._currentItem);
        }

        this._currentItem = $item;
        if ($item) {
            this._manipulator.addNavigationHover($item);
        }
    }
});


SIMS.Components.Common.AccessibilityState = SIMS.Components.Common.RibbonState.extend({
    _currentAccessibleElements: null, //
    _controlStack: [],
    _accessiblePath: [],
    _manipulator: null,
    _keyStack: [],
    _itemToBePushed : null,

    constructor: function (ribbonComp) {
        this.base.apply(this, arguments);
        this._manipulator = new SIMS.Manipulators.RibbonControlManipulatorFactory();
    },

    AddHoverToParentDropdownItem: function() {
    },

    HandleKey: function (key, keycomb) {

        if (key === "ALT" || key === "F10" || key === "F6") {
            this._ribbonComp.goIntoNormalState();
        }
        else if (key === "ESCAPE") {
            if (this._keyStack.length > 0) {
                this._keyStack.pop();
            }
            if (this._accessiblePath.length > 0) {

                if (this._controlStack.length != 0) {
                    var bLeaf = this._manipulator.handleAccessKey(this._controlStack.pop(), key);
                }

                var prevElements = this._currentAccessibleElements;
                prevElements.removeClass("accessibility-active");
                this._currentAccessibleElements = this._accessiblePath.pop();
                this._currentAccessibleElements.addClass("accessibility-active");
            }
            else {
                this._ribbonComp.doCustomKeyHandling(key);
                this._ribbonComp.goIntoNormalState();
            }
        }
        else if (["UP", "DOWN", "LEFT", "RIGHT", "TAB", "SHIF+TAB","ENTER", "SPACE","SHIFT+F10"].indexOf(key) !== -1) {

            // And If there is combination with ALT + key then go into normal state
            if (keycomb === "ALT+" + key || keycomb === "ALT+CTRL+" + key || keycomb === "ALT+SHIFT+" + key || keycomb === "ALT+SHIFT+CTRL+" + key) {

                this._ribbonComp.goIntoNormalState();
                return false;
            }
            else { //else go to navigation state

                if (this._controlStack && (this._controlStack.length > 0) && (this._controlStack[this._controlStack.length - 1].is(".office-control") || this._controlStack[this._controlStack.length - 1].is(".dropdown-item")) && (this._ribbonComp.$thisCompElement.find(".ribbon-tabs-wrapper:first").length > 0)) //only in case ribbon
                {
                    if(this._itemToBePushed != null)
                    {
                        this._controlStack.push(this._itemToBePushed);
                        this._itemToBePushed = null;
                    }
                    this._ribbonComp.goIntoNavigationAndAccessibiltyState(this._controlStack.slice(0),this._accessiblePath.slice(0),this._currentAccessibleElements.slice(0));
                }
                else
                {
                    this._ribbonComp.goIntoNavigationKeyState(this._controlStack.slice(0));
                }
                return this._ribbonComp.triggerCurrentStateHandleKey(key,keycomb);
                //return this._ribbonComp._currentState.HandleKey(key);

            }


        }

        else if (this._currentAccessibleElements != null && this._currentAccessibleElements.length > 0) {
            var searchKey = this.getSearchKeyForAccessibilityState(key);
            
            var self = this;
            var searchResults = this._currentAccessibleElements.filter(function () {
              /**** Start -- Support for Hidden ShortCut Keys ***/
				  return $(this).data('accessShortcut').startsWith(searchKey) || self.HasHiddenShortCutWithSearchKey($(this),searchKey,false);
			 /**** End -- Support for Hidden ShortCut Keys ***/
            });

            if (searchResults.length > 0) {

                //Handling for same shortcut added multiple times
                var exactSearch = searchResults.filter(function () {
                 /**** Start -- Support for Hidden ShortCut Keys ***/
                    return $(this).data('accessShortcut') === searchKey || self.HasHiddenShortCutWithSearchKey($(this),searchKey,true);
			 	/**** End -- Support for Hidden ShortCut Keys ***/
                });

                if (exactSearch.length === searchResults.length) {

                    // Specific case for drop down items  where single letter key occurrance is multiple
                    if((exactSearch.length > 1) && this._controlStack && (this._controlStack.length > 0) && exactSearch.first().is(".dropdown-item") && exactSearch.first().is(".office-hover-default"))
                    {
                        this._itemToBePushed = this.handleRepeatedAccessKey(exactSearch);
                        return true;
                    }
                    else
                    {
                        searchResults = searchResults.first();
                        this.removeSelectionIfAny(searchResults);
                    }
                }

                var $accessibleElements = null;


                this._currentAccessibleElements.removeClass('accessibility-active');
                this.populateAccessiblePath(searchKey);

                if (searchResults.length == 1 && exactSearch.length == 1) {
                    this._keyStack.length = 0;
                    var bLeaf = this._manipulator.handleAccessKey(searchResults, key);

                    if (bLeaf === true) {
                        while (this._controlStack.length != 0) {
                            this._manipulator.handleAccessKey(this._controlStack.pop(), "ESCAPE");
                        }
                        this._ribbonComp.goIntoNormalState();
                    }
                    else {
                        this._controlStack.push(searchResults);

                        //File Menu
                        //if (this._ribbonComp.constructor !== SIMS.Components.Common.Ribbon) {
                        if (this._ribbonComp.$thisCompElement.hasClass("backstage")) {

                            $accessibleElements = this._ribbonComp.$thisCompElement.find(".accessible:visible");

                            //Removing previous elements
                            $accessibleElements = $accessibleElements.not(this._accessiblePath[0]);

                            if (this._accessiblePath.length > 0) {

                                $accessibleElements = $accessibleElements.filter(function () {

                                    return ($(this).parents(".accessible:visible").length === 0);
                                });
                            }

                            var $children = searchResults.find(".accessible:visible");

                            if ($children.length > 0) {
                                for (var i = 1; i < this._accessiblePath.length; i++) {
                                    $accessibleElements = $accessibleElements.not(this._accessiblePath[i]);
                                }
                                $accessibleElements = $accessibleElements.add($children);
                            }
                        }

                        //Ribbon
                        else {

                            //added to show first sub item selected..
                            var $dropDownItems = searchResults.find(".dropdown-item:visible:not(.disabled)");

                            if($dropDownItems.length>0)
                            {
                                this._manipulator.removeNavigationHover(searchResults);
                                this.AddHoverToParentDropdownItem();
                                this._manipulator.addNavigationHover($dropDownItems.first());
                            }

                            $accessibleElements = this._ribbonComp.$thisCompElement.find(".accessible:visible:not(.gallery-items-contracted .dropdown-item)");

                            //Removing previous elements
                            for (var i = 0; i < this._accessiblePath.length; i++) {
                                $accessibleElements = $accessibleElements.not(this._accessiblePath[i]);
                            }

                            //If selected control is in titlebar filter out the visible tab controls as well
                            if(exactSearch.hasClass("titlebar-control") || exactSearch.parents(".office-control:first").hasClass("titlebar-control"))
                            {
                               //filter out the controls of visible tab
                               $accessibleElements = $accessibleElements.filter(function()
                               {
                                 return ($(this).hasClass("titlebar-control") ||$(this).parents(".office-control:first").hasClass("titlebar-control")) ;
                               });

                            }
                        }

                    }
                }
                else {
                    $accessibleElements = searchResults;
                    this._keyStack.push(key);
                }
                if ($accessibleElements != null) {
                    $accessibleElements.addClass("accessibility-active");
                }

                this._currentAccessibleElements = $accessibleElements;
            }
            else { // Searching didn't find any key

                // And If there is combination with ALT + key then go into normal state
                if (keycomb === "ALT+" + key || keycomb === "ALT+CTRL+" + key || keycomb === "ALT+SHIFT+" + key || keycomb === "ALT+SHIFT+CTRL+" + key) {

                    this._ribbonComp.goIntoNormalState();
                    return false;
                }
                else { //else do nothing

                }

            }


        }

        else {
            this._ribbonComp.getSeedAccessibles().addClass("accessibility-active");
        }
        return true;
    },

    getSearchKeyForAccessibilityState: function(key){
        var searchKey = key;
        if (this._keyStack.length > 0) {
            while (this._keyStack.length != 0) {
                searchKey = this._keyStack.pop() + searchKey;
            }
        }
        return searchKey;
    },

    /*** Code refractor (SO-108685). _accessiblePath array is being populated inside a function, to be overridden in 2016 counterpart ***/
    populateAccessiblePath: function(searchKey) {
        this._accessiblePath.push(this._currentAccessibleElements);
    },

    /**** Start -- Support for Hidden ShortCut Keys ***/

        /** Params :-
         * $accessibleElement - element for which hidden shortcuts need  to be searched
         * searchKey - key to be searched in hidden shortcuts
         * exactMatch - true :- search access key with exact match to search key
         *              false :- search access key starting with  search key
         ***/
    HasHiddenShortCutWithSearchKey : function($accessibleElement ,searchKey, exactMatch)
    {
        var hiddenShortCutData = $accessibleElement.data('accessHiddenShortcuts');
        var isHiddenShortCut = false;
        if(hiddenShortCutData)
        {
            var hiddenSearchResults = hiddenShortCutData.filter(function(value) {
                return exactMatch ? value === searchKey : value.startsWith(searchKey) ;
            });
            isHiddenShortCut = hiddenSearchResults.length>0 ? true : false;
        }
        return isHiddenShortCut
    },

    SET: function () {
        this.resetMembers();
        var $ribbonComp = this._ribbonComp.$thisCompElement;
        $ribbonComp.filter(".ribbon").add($ribbonComp.find(".ribbon")).addClass("accesible-state");
        this._currentAccessibleElements = this._ribbonComp.getSeedAccessibles();
        this._currentAccessibleElements.addClass("accessibility-active");
    },
    UNSET: function () {
        this.resetMembers();
        var $ribbonComp = this._ribbonComp.$thisCompElement;
        $ribbonComp.filter(".ribbon").add($ribbonComp.find(".ribbon")).removeClass("accesible-state");
        this._ribbonComp.$thisCompElement.find(".accessible").removeClass('accessibility-active');
    },

    resetMembers: function () {
        this._controlStack.length = 0;
        this._accessiblePath.length = 0;
        this._keyStack.length = 0;
        this._itemToBePushed = null;
        if (this._currentAccessibleElements != null) {
            this._currentAccessibleElements.removeClass("accessibility-active");
        }
    },


    handleRepeatedAccessKey : function (searchResults)
    {
        var array_Length = searchResults.length;
        var parent = searchResults.first().parent();
        var i;

        var itemToBePushed = null;

        for (i = 0; i < array_Length; i++) {
            if ($(searchResults[i]).hasClass('hovered')) {
                $(searchResults[i]).removeClass('hovered')

                if (i + 1 < array_Length) {
                    $(parent).find('div.hovered, span.hovered').removeClass('hovered');

                    //$(searchResults[i + 1]).addClass('hovered');
                    this._manipulator.addNavigationHover($(searchResults[i + 1]));            //This change was done for SIMS-66327

                    itemToBePushed = $(searchResults[i + 1]);
                    //this._controlStack.push($(searchResults[i + 1]));
                    //this.removeDuplicateElementFromControlStack();
                    return itemToBePushed;
                }
            }

        }

        if (i == array_Length) {
            $(parent).find('div.hovered, span.hovered').removeClass('hovered');

            //$(searchResults[0]).addClass('hovered');
            this._manipulator.addNavigationHover($(searchResults[0]));           //This change was done for SIMS-66327

            itemToBePushed = $(searchResults[0]);
            return itemToBePushed
            //this._controlStack.push($(searchResults[0]));
            //this.removeDuplicateElementFromControlStack();
        }
    },



    removeDuplicateElementFromControlStack : function()
    {
        var currentLevelEle = this._currentAccessibleElements.slice(0);
        var lastPushedItem = this._controlStack[this._controlStack.length -1];

        /*var tempControlStack = this._controlStack.filter(function(){
           return $.inArray($(this),$(currentLevelEle)) == -1;
        })*/

        var tempControlStack = [];

        for(var i = 0; i< this._controlStack.length; i++)
        {
            if(jQuery.inArray(this._controlStack[i].get(0),currentLevelEle)== -1)
            {
              tempControlStack.push(this._controlStack[i]);
            }
        }

        //lastPushedItem.attr("stopSearch","true");
        tempControlStack.push(lastPushedItem);

        this._controlStack.length = 0;
        this._controlStack = tempControlStack.slice(0);



    },

    removeSelectionIfAny : function(currentSel)
    {
        var parent = currentSel.parent();
        $(parent).find('div.hovered, span.hovered').removeClass('hovered');
    }


});


SIMS.Components.Common.NavigationAndAccessibleState = SIMS.Components.Common.RibbonState.extend({
    _currentItem: null,
    _manipulator: null,
    _controlStack: [],
    _accessiblePath: [],
    _currentAccessibleElements : null,
    _keyStack: [],
    _itemToBePushed : null,

    constructor: function (ribbonComp) {
        this.base.apply(this, arguments);
        this._manipulator = new SIMS.Manipulators.RibbonControlManipulatorFactory();

        this._keyHandlers = {
            ENTER: function () {

                if(this._currentItem.find(".dropdown-next-level-wrapper").length > 0)
                {



                    if(this._itemToBePushed != null)
                    {
                        this._controlStack.push(this._itemToBePushed);
                        this.setCurrentItem(this._itemToBePushed);
                        this._itemToBePushed = null;
                    }
                    else
                    {
                        this._controlStack.push(this._currentItem);
                    }

                    this.removeDuplicateElementFromControlStack();

                    var shortcutKey = this._currentItem.data('accessShortcut')? this._currentItem.data('accessShortcut'):null;

                    var shortcutItem =  this._currentItem;

                    this.showNextLevel(shortcutKey);
                    //this._ribbonComp.triggerCurrentStateHandleKey(shortcutKey);

                    var itemInfo = this._manipulator.getItemForStandardKey(shortcutItem, "RIGHT");
                    var $requiredItem = itemInfo.item;
                    if ($requiredItem && $requiredItem.length > 0) {
                        this.setCurrentItem($requiredItem);
                        this.AddHoverToParentDropdownItem();
                    }

                    var $dropDownItems = this._currentItem.find(".dropdown-item:visible:not(.disabled)");
                    if ($dropDownItems.length > 0) {
                        this.setCurrentItem($dropDownItems.first());
                        this.AddHoverToParentDropdownItem();
                    }

                }
                else
                {

                    var $currentItem = this._currentItem;
                    var bLeaf = this._manipulator.handleAccessKey(this._currentItem);
                    if (!bLeaf) {
                        //Abstract this/////////////////////////////////////////////////////////////////
                        var $dropDownItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");
                        ////////////////////////////////////////////////////////////////////////////////
                        this._controlStack.push(this._currentItem);
                        if ($dropDownItems.length > 0) {
                            this.setCurrentItem($dropDownItems.first());
                        }
                    }

                }


            },
            ALT: function () {
                this._ribbonComp.goIntoNormalState();
            },

            TAB: function () {
                var $tabItem = this._manipulator.getNextTabItem(this._currentItem);

                if ($tabItem)
                    this.setCurrentItem($tabItem);
            },
            NAVKEY: function (key) {
                var itemInfo = this._manipulator.getItemForStandardKey(this._currentItem, key);
                var $requiredItem = itemInfo.item;
                if ($requiredItem && $requiredItem.length > 0) {
                    this.setCurrentItem($requiredItem);
                    var handled = this._manipulator.handleStandardKey($requiredItem, key);
                    //alert("Yo Nigga! Control Found!!!");

                    return itemInfo.bounced && handled;
                }
            },
            RIGHT: function () {

                if(this._currentItem.is(".office-control"))
                {
                    //this._controlStack.pop();
                    this._controlStack.push(this._currentItem);
                    this._ribbonComp.goIntoNavigationKeyState(this._controlStack.slice(0));
                    return this._ribbonComp.triggerCurrentStateHandleKey('RIGHT');
                }



                else if(this._currentItem.find(".dropdown-next-level-wrapper").length > 0)
                {

                    if(this._itemToBePushed != null)
                    {
                        this._controlStack.push(this._itemToBePushed);
                        this.setCurrentItem(this._itemToBePushed);
                        this._itemToBePushed = null;
                    }
                    else
                    {
                        this._controlStack.push(this._currentItem);
                    }
                    this.removeDuplicateElementFromControlStack();

                    var shortcutKey = this._currentItem.data('accessShortcut');

                    var shortcutItem =  this._currentItem;

                    this.showNextLevel(shortcutKey);
                    //this._ribbonComp.triggerCurrentStateHandleKey(shortcutKey);

                    var itemInfo = this._manipulator.getItemForStandardKey(shortcutItem, "RIGHT");
                    var $requiredItem = itemInfo.item;
                    if ($requiredItem && $requiredItem.length > 0) {
                        this.setCurrentItem($requiredItem);
                        this.AddHoverToParentDropdownItem();
                    }


                    var $dropDownItems = this._currentItem.find(".dropdown-item:visible:not(.disabled)");
                    if ($dropDownItems.length > 0) {
                        this.setCurrentItem($dropDownItems.first());
                        this.AddHoverToParentDropdownItem();
                    }

                   // return this._ribbonComp.triggerCurrentStateHandleKey(shortcutKey);
                }
                else if (this._keyHandlers.NAVKEY.apply(this, arguments)) {
                    this._keyHandlers.ENTER.apply(this, arguments);
                }
            },
            LEFT: function () {

                if(this._currentItem.is(".office-control"))
                {

                    this._controlStack.push(this._currentItem);
                     this._ribbonComp.goIntoNavigationKeyState(this._controlStack.slice(0)) ;
                     return this._ribbonComp.triggerCurrentStateHandleKey('LEFT');
                }

                else if (this._keyHandlers.NAVKEY.apply(this, arguments)) {
                    this._manipulator.handleAccessKey(this._controlStack.pop(), "ESCAPE");
                }
            }
        };
        this._keyHandlers.SPACE = this._keyHandlers.ENTER;
        this._keyHandlers.DOWN = this._keyHandlers.NAVKEY;
        this._keyHandlers.UP = this._keyHandlers.NAVKEY;
    },

    AddHoverToParentDropdownItem: function() {
    },

    HandleKey: function (key,keycomb) {

        console.log("keycomb :  "+ keycomb);

         //spl handling for context menu keyboard shortcut
        if(keycomb == "SHIFT+F10")
        {
            var retVal = this._manipulator.ShowContextMenu(this._currentItem);

            if(retVal)
            {
                var $item = this._currentItem;
                this._controlStack.push($item);
                this._ribbonComp.goIntoNavigationKeyState(this._controlStack.slice(0));
                return true;
            }
        }



        var handler = this._keyHandlers[key];
        // console.log("key pressed :" + key);
        if (handler) {
            handler.apply(this, arguments);
            return true;
        }
        else {
            //Accesskey handling

            if (key === "ESCAPE") {

                console.log("here in escape!!!");





                if (this._keyStack.length > 0) {
                    this._keyStack.pop();
                }

                //if after esc we need to go to tab headers then go to else part
                if (this._accessiblePath.length > 1) {

                    if (this._controlStack.length != 0) {
                        var item = this._controlStack.pop();
                        this._manipulator.handleAccessKey(item, key);
                        this.setCurrentItem(item);
                    }

                    var prevElements = this._currentAccessibleElements;
                    prevElements.removeClass("accessibility-active");
                    this._currentAccessibleElements = this._accessiblePath.pop();
                    this._currentAccessibleElements.addClass("accessibility-active");
                    //this._ribbonComp.goIntoAccessibilityState();
                }
                else {
                    this._ribbonComp.doCustomKeyHandling(key);
                    this._ribbonComp.goIntoAccessibilityState();
                }




            }

            else if (this._currentAccessibleElements != null && this._currentAccessibleElements.length > 0) {


                var searchKey = key;
                if (this._keyStack.length > 0) {
                    while (this._keyStack.length != 0) {
                        searchKey = this._keyStack.pop() + searchKey;
                    }
                }
                var searchResults = this._currentAccessibleElements.filter(function () {
                    return $(this).data('accessShortcut').startsWith(searchKey);
                });

                if (searchResults.length > 0) {

                    //Handling for same shortcut added multiple times
                    var exactSearch = searchResults.filter(function () {
                        return $(this).data('accessShortcut') === searchKey;
                    });

                    if (exactSearch.length === searchResults.length) {


                        if((exactSearch.length > 1) && this._controlStack && (this._controlStack.length > 0) && exactSearch.first().is(".dropdown-item") && exactSearch.first().is(".office-hover-default"))
                        {

                            this._itemToBePushed = this.handleRepeatedAccessKey(exactSearch);
                            return true;
                            //console.log(" item got " + searchResults.first().attr("class"));
                        }
                        else
                        {
                            searchResults = searchResults.first();
                            this.removeSelectionIfAny(searchResults);
                        }


                    }

                    var $accessibleElements = null;

                    this._currentAccessibleElements.removeClass('accessibility-active');
                    this._accessiblePath.push(this._currentAccessibleElements);

                    if (searchResults.length == 1 && exactSearch.length == 1) {
                        this._keyStack.length = 0;
                        // This is not functioning correct. Need some more handling
                        this.setCurrentItem(searchResults);
                        var bLeaf = this._manipulator.handleAccessKey(searchResults, key);


                        if (bLeaf === true) {
                            while (this._controlStack.length != 0) {
                                this._manipulator.handleAccessKey(this._controlStack.pop(), "ESCAPE");
                            }
                            this._ribbonComp.goIntoNormalState();
                        }
                        else {
                            this._controlStack.push(searchResults);

                            //Ribbon

                            $accessibleElements = this._ribbonComp.$thisCompElement.find(".accessible:visible");

                            //Removing previous elements
                            for (var i = 0; i < this._accessiblePath.length; i++) {
                                $accessibleElements = $accessibleElements.not(this._accessiblePath[i]);
                            }


                        }
                    }
                    else {
                        $accessibleElements = searchResults;
                        this._keyStack.push(key);
                    }
                    if ($accessibleElements != null) {
                        $accessibleElements.addClass("accessibility-active");
                    }

                    this._currentAccessibleElements = $accessibleElements;
                }

                else { // Searching didn't find any key

                    // And If there is combination with ALT + key then go into normal state
                    if (keycomb === "ALT+" + key || keycomb === "ALT+CTRL+" + key || keycomb === "ALT+SHIFT+" + key || keycomb === "ALT+SHIFT+CTRL+" + key) {

                        this._ribbonComp.goIntoNormalState();
                        return false;
                    }
                    else { //else do nothing

                    }

                }

            }



         return true;

        }
    },
    SET: function (controlStack,accessiblePath,currentAccessibilePath) {
        this.clearMemberVariables();

        this._accessiblePath = accessiblePath;
        this._currentAccessibleElements = currentAccessibilePath;

        //to show dropdown items with visible Access Keys
        this._currentAccessibleElements.addClass('accessibility-active');


        if (controlStack != undefined && controlStack.length > 0) {
            this._controlStack = controlStack;
           /* if (controlStack[0].is(".tab-header")) {
                this._controlStack = controlStack.slice(1, controlStack.length);
            }*/

            var $currentItem = this._controlStack[this._controlStack.length - 1];

            var $subItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");

            $currentItem = this.SetDefaultItemForNavAccessState($currentItem , $subItems);

            var $nextItem = this._ribbonComp.getExceptionalNextNavigationItem($currentItem);
            if ($nextItem != undefined && $nextItem != null) {
                $currentItem = $nextItem;
            }

            this.setCurrentItem($currentItem);
        }
        else {
            var $seedingNavigationControl = this._ribbonComp.getSeedingNavigationControl();

            var $prevItem = this._ribbonComp.getPrevStateSelNavigationItem();

            if ($prevItem != null && $prevItem.length > 0) {
                this.setCurrentItem($prevItem);
                this._ribbonComp.removePrevStateSelNavigationItem();

            }
            else
                this.setCurrentItem($seedingNavigationControl);
            //this.setCurrentItem(this._ribbonComp.$thisCompElement.find(".tab-header-selected:first"));
        }
        //this._ribbonComp.$thisCompElement.find(".ribbon:first").addClass("navigation-key-state");
        this._ribbonComp.$thisCompElement.filter(".ribbon").add(this._ribbonComp.$thisCompElement.find(".ribbon:first")).addClass("navigation-key-state");
    },
    UNSET: function () {
        this.setCurrentItem(null);
        this.clearMemberVariables();
        this.resetMembers();
        //this._ribbonComp.$thisCompElement.find(".ribbon:first").removeClass("navigation-key-state");
        this._ribbonComp.$thisCompElement.filter(".ribbon").add(this._ribbonComp.$thisCompElement.find(".ribbon:first")).removeClass("navigation-key-state");
        var $ribbonComp = this._ribbonComp.$thisCompElement;
        $ribbonComp.filter(".ribbon").add($ribbonComp.find(".ribbon")).removeClass("accesible-state");
        this._ribbonComp.$thisCompElement.find(".accessible").removeClass('accessibility-active');
    },

    resetMembers: function () {
        this._controlStack.length = 0;
        this._accessiblePath.length = 0;
        this._keyStack.length = 0;
        if (this._currentAccessibleElements != null) {
            this._currentAccessibleElements.removeClass("accessibility-active");
        }

    },

    SetDefaultItemForNavAccessState: function($currentItem , $subItems) {
        var $returnItem = $currentItem;
        if ($subItems != undefined && $subItems.length > 0) {
            $returnItem = $subItems.first();
        }
        return $returnItem;
    },

    clearMemberVariables: function () {
        this._controlStack.length = 0;
        this._currentItem = null;
        this._itemToBePushed = null;
    },

    setCurrentItem: function ($item) {
        if (this._currentItem && this._currentItem.length > 0) {
            this._manipulator.removeNavigationHover(this._currentItem);
        }

        this._currentItem = $item;
        if ($item) {
            this._manipulator.addNavigationHover($item);
        }
    },




    handleRepeatedAccessKey : function (searchResults)
    {
        var array_Length = searchResults.length;
        var parent = searchResults.first().parent();
        var i;
        var itemTobePushed = null;

        for (i = 0; i < array_Length; i++) {
            if ($(searchResults[i]).hasClass('hovered')) {
                $(searchResults[i]).removeClass('hovered');

                if (i + 1 < array_Length) {
                    $(parent).find('div.hovered, span.hovered').removeClass('hovered');

                    //$(searchResults[i + 1]).addClass('hovered');
                    this._manipulator.addNavigationHover($(searchResults[i + 1]));             //This change was done for SIMS-66327

                    itemTobePushed  = $(searchResults[i + 1]);
                    //this._controlStack.push($(searchResults[i + 1]));
                    //this.removeDuplicateElementFromControlStack();
                    return itemTobePushed;
                }
            }

        }

        if (i == array_Length) {
            $(parent).find('div.hovered, span.hovered').removeClass('hovered');

            //$(searchResults[0]).addClass('hovered');
            this._manipulator.addNavigationHover($(searchResults[0]));              //This change was done for SIMS-66327

            itemTobePushed =  $(searchResults[0]);
            return itemTobePushed;
            //this._controlStack.push($(searchResults[0]));
            //this.removeDuplicateElementFromControlStack();
        }



    },



    removeDuplicateElementFromControlStack : function()
    {
        var currentLevelEle = this._currentAccessibleElements.slice(0);
        var lastPushedItem = this._controlStack[this._controlStack.length -1];

        /*var tempControlStack = this._controlStack.filter(function(){
         return $.inArray($(this),$(currentLevelEle)) == -1;
         })*/

        var tempControlStack = [];

        for(var i = 0; i< this._controlStack.length; i++)
        {
            if(jQuery.inArray(this._controlStack[i].get(0),currentLevelEle)== -1)
            {
                tempControlStack.push(this._controlStack[i]);
            }
        }

        tempControlStack.push(lastPushedItem);

        this._controlStack.length = 0;
        this._controlStack = tempControlStack.slice(0);



    },

    showNextLevel : function(key){

        var $accessibleElements = null;

        this._currentAccessibleElements.removeClass('accessibility-active');
        this._accessiblePath.push(this._currentAccessibleElements);




        //this.setCurrentItem(this._controlStack[this._controlStack.length -1]);
        var bLeaf = this._manipulator.handleAccessKey(this._currentItem, key);


        if (bLeaf === true) {
            while (this._controlStack.length != 0) {
                this._manipulator.handleAccessKey(this._controlStack.pop(), "ESCAPE");
            }
            this._ribbonComp.goIntoNormalState();
        }
        else {


            $accessibleElements = this._ribbonComp.$thisCompElement.find(".accessible:visible:not(.gallery-items-contracted .dropdown-item)");

            //Removing previous elements
            for (var i = 0; i < this._accessiblePath.length; i++) {
                $accessibleElements = $accessibleElements.not(this._accessiblePath[i]);
            }


        }


        if ($accessibleElements != null) {
            $accessibleElements.addClass("accessibility-active");
        }

        this._currentAccessibleElements = $accessibleElements;

    },

    removeSelectionIfAny : function(currentSel)
    {
        var parent = currentSel.parent();
        $(parent).find('div.hovered, span.hovered').removeClass('hovered');
    }



});


SIMS.Components.Common.AccessKeyComponent = SIMS.Components.BaseComponent.extend({
    _currentState: null,
    _accessibilityState: null,
    _normalState: null,
    _navigationKeyState: null,
    //PUBLIC
    //Compinfo: null,
    ribbonShortcutsMap: null,
    myName: "",

    constructor: function () {
        this.ribbonShortcutsMap = new jsDictionary();

        this._accessibilityState = new SIMS.Components.Common.AccessibilityState(this);
        this._normalState = new SIMS.Components.Common.NormalState(this);
        this._navigationKeyState = new SIMS.Components.Common.NavigationKeyState(this);
        this._navigationAndAccessibilityState = new SIMS.Components.Common.NavigationAndAccessibleState(this);
        this._currentState = this._normalState;

        this.ribbonShortcutsMap.AddItem('SHIFT+CTRL+8', { actionId: 146, desc: "SHIFT+CTRL+8 Pressed" });
    },

    handleKeyCondition: function () {
        return true;
    },

    isAccessible: function () {
        return this._currentState === this._accessibilityState;
    },

    HandleAccelaraterKey: function (e, desc) {
       
                                                                                                                                    // to stop key propagation on Ribbon when context menu is opened of tab headers
        if ((SIMS.SharedData.KeyboardData.OWNER === this.getUniqueComponentIdentity() || SIMS.SharedData.KeyboardData.OWNER === "") && (SIMS.SharedData.KeyboardData.CONTEXT_MENU_VISIBLE!=true)) {
            if (this.ribbonShortcutsMap.ContainsKey(desc.keyName)) {
                var item = this.ribbonShortcutsMap.GetItem(desc.keyName);
                this.LogComponentEvent(item.actionId, item.desc);
                return true;
            }

            // Capture ALT + F4 
            if (desc.keyCombination === "ALT+F4") {
                if (this.triggerCloseEvent())
                    return true;
            }
            else if (desc.keyCombination === "TIDLE") {
                if (SIMS.SharedData.RibbonOptimization.enableRibbonLazyLoad == true) {
                    SIMS.SharedData.RibbonOptimization.enableRibbonLazyLoad = false;
                }
                else {
                    SIMS.SharedData.RibbonOptimization.enableRibbonLazyLoad = true;
                }
                return true;
            }

            return this._currentState.HandleKey(desc.keyName, desc.keyCombination);
        }
        else {
            return false;
        }
    },

    HandleStandardKey: function (e, desc) {
        return this.HandleAccelaraterKey(e, desc);
    },

    HandleTabKey: function (e, desc) {                                                                                              // to stop key propagation on Ribbon when context menu is opened of tab headers
        if ((SIMS.SharedData.KeyboardData.OWNER === this.getUniqueComponentIdentity() || SIMS.SharedData.KeyboardData.OWNER === "")&& (SIMS.SharedData.KeyboardData.CONTEXT_MENU_VISIBLE!=true)) {
            //            if (this._currentState !== this._navigationKeyState) {
            //                this.goIntoNavigationKeyState( this._currentState._controlStack.slice(0));
            //            }

            return this._currentState.HandleKey(desc.keyName, desc.keyCombination);
        }
    },

    //BUGGY
    switchStates: function () {
        if (this._currentState === this._normalState) {
            this.goIntoAccessibilityState();
        }
        else {
            this.goIntoNormalState();
        }
    },

    goIntoAccessibilityState: function (bIsF6Pressed) {

        this._currentState.UNSET();
        this._currentState = this._accessibilityState;
        //this.$thisCompElement.filter(".ribbon").add(this.$thisCompElement.find(".ribbon")).addClass("accesible-state");
        this._currentState.SET();
        //console.log("goIntoAccessibilityState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
        SIMS.SharedData.KeyboardData.OWNER = this.getUniqueComponentIdentity();
        if (SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE == false) {
            SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE = true;
            this.SendMessageToComponents(SIMS.SharedData.UniqueMessages.RIBBON_ACCESSIBLE, "RIBBON_ACCESSIBLE", { Focused: true, F6Pressed: bIsF6Pressed, appGroup: this._compinfo["appGroup"] });
            console.log(this._compinfo.compName + " goIntoAccessibilityState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
        }
    },
    goIntoNormalState: function (bIsF6Pressed) {
        this._currentState.UNSET();
        this._currentState = this._normalState;
        //this.$thisCompElement.filter(".ribbon").add(this.$thisCompElement.find(".ribbon")).removeClass("accesible-state");
        this._currentState.SET();
        //console.log("goIntoNormalState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
        if (SIMS.SharedData.KeyboardData.OWNER != "FILEMENU" && this.getUniqueComponentIdentity() == SIMS.SharedData.KeyboardData.OWNER) {
            SIMS.SharedData.KeyboardData.OWNER = "";
        }
        if (SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE == true) {
            this.SendMessageToComponents(SIMS.SharedData.UniqueMessages.RIBBON_ACCESSIBLE, "RIBBON_ACCESSIBLE", { Focused: false, F6Pressed: bIsF6Pressed, appGroup: this._compinfo["appGroup"] });
            SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE = false;
        }
        console.log(this._compinfo.compName + " goIntoNormalState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
    },

    goIntoNavigationKeyState: function (controlStack) {
        this._currentState.UNSET();
        this._currentState = this._navigationKeyState;
        //this.$thisCompElement.filter(".ribbon").add(this.$thisCompElement.find(".ribbon")).addClass("accesible-state");
        this._currentState.SET(controlStack);
        //console.log("goIntoAccessibilityState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
        SIMS.SharedData.KeyboardData.OWNER = this.getUniqueComponentIdentity();
        SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE = true;
        console.log(this._compinfo.compName + " goIntoNavigationKeyState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
    },

    goIntoNavigationAndAccessibiltyState: function (controlStack, accessiblepath, currentaccessiblepath) {
        this._currentState.UNSET();
        this._currentState = this._navigationAndAccessibilityState;
        //this.$thisCompElement.filter(".ribbon").add(this.$thisCompElement.find(".ribbon")).addClass("accesible-state");
        this._currentState.SET(controlStack, accessiblepath, currentaccessiblepath);
        //console.log("goIntoAccessibilityState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
        SIMS.SharedData.KeyboardData.OWNER = this.getUniqueComponentIdentity();
        SIMS.SharedData.KeyboardData.SHORTCUT_KEY_VISIBLE = true;
        console.log(this._compinfo.compName + " goIntoNavigationAndAccessibilityKeyState - SIMS.SharedData.KeyboardData.OWNER: " + SIMS.SharedData.KeyboardData.OWNER);
    },

    getSeedAccessibles: function () {

    },

    getUniqueComponentIdentity: function () {
    },

    triggerCurrentStateHandleKey: function (key,keycomb) {

        //if (key === "ENTER" || key === "SPACE" || key === "UP" || key === "DOWN" || key === "RIGHT" || key === "LEFT") {

        return this._currentState.HandleKey(key,keycomb);

        //}

        return true;

    },

    doCustomKeyHandling: function (key) {

    },

    getPrevStateSelNavigationItem: function () {

        return null;

    },

    getExceptionalNextNavigationItem: function () {

        return null;

    },

    removePrevStateSelNavigationItem: function () {

    },

    triggerCloseEvent: function () {
        return false;
    }

});
