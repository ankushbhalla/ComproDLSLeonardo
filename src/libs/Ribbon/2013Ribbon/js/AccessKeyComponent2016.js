'use strict';
namespace("SIMS.Components.Common");

SIMS.Components.Common.AccessibilityState.prototype.getSearchKeyForAccessibilityState =  function(key) {
    var searchKey = "";
    for (var i = 0; i < this._keyStack.length; i++) {
        searchKey = searchKey + this._keyStack[i];
    }
    searchKey = searchKey + key;
    return searchKey;
};

SIMS.Components.Common.DropdownState = SIMS.Components.Common.RibbonState.extend({
    _controlStack: null,
    _dropdownstack: null,
    _currentdropdown: null,
    _currentItem: null,
    _manipulator: null,

    constructor: function (ribbonComp) {
        this.base.apply(this, arguments);
        this._manipulator = new SIMS.Manipulators.RibbonControlManipulatorFactory();
        this._controlStack = [];
        this._dropdownstack = [];
    },

    HandleKey: function (keyInfo, keycomb) {
        // if keyinfo is object or not,        
        var key = null;
        var isKeyHandled = false;
        var isAccessKey = false;
        if(typeof(keyInfo) === "object"){
            key = keyInfo.keyName;
            isAccessKey = keyInfo.isAcessKey;
        }
        else if(typeof(keyInfo) === "string"){
            key = keyInfo;
            isAccessKey = SIMS.Objects.Utils.IsAlphaNumericKey(keyInfo);
        }

        if (this._ribbonComp.handleKeyCondition(key)) {
            if (key === "ALT") {
                if(this._currentdropdown && this._currentdropdown.length > 0){
            		var $ClosetControl = this._currentdropdown.closest(".office-control");
	                if($ClosetControl.length > 0){
	                    this._manipulator.handleAccessKey($ClosetControl, "ESCAPE");
	                    this._ribbonComp.goIntoNormalState();
                        isKeyHandled = true;
	                }
            	}
            }
            else if(key === "F10"){
                if(this._currentdropdown && this._currentdropdown.length > 0){
                    var $ClosetControl = this._currentdropdown.closest(".office-control");
                    if($ClosetControl.length > 0){
                        this._manipulator.handleAccessKey($ClosetControl, "ESCAPE");
                        this._ribbonComp.goIntoNormalState();
                        this._ribbonComp.goIntoAccessibilityState();
                        isKeyHandled = true;
                    }
                }   
            }
            else if (key === "ESCAPE"){
                if (this._controlStack.length > 0) {
                    var item = this._controlStack.pop();
                    this._manipulator.handleAccessKey(item, "ESCAPE");
                    this.setCurrentItem(item);
                    this._currentdropdown = this._dropdownstack.pop();
                    isKeyHandled = true;
                }
                else {
                    if(this._currentdropdown && this._currentdropdown.length > 0){
                        var $ClosetControl = this._currentdropdown.closest(".office-control");
                        if($ClosetControl.length > 0){
                            this._manipulator.handleAccessKey($ClosetControl, "ESCAPE");
                            this._ribbonComp.goIntoNormalState();
                            isKeyHandled = true;
                        }
                    }
                }
            }
            else if(key === "ENTER" || key === "SPACE"){
                if(this._currentItem){
                    var $currentItem = this._currentItem;
                    var bLeaf = this._manipulator.handleAccessKey(this._currentItem);
                    if (!bLeaf) {
                        //Abstract this/////////////////////////////////////////////////////////////////
                        var $dropDownItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");
                        ////////////////////////////////////////////////////////////////////////////////
                        if ($dropDownItems.length > 0) {
                        	this._controlStack.push(this._currentItem);
                        	this._dropdownstack.push(this._currentdropdown);
                        	this._currentdropdown = $currentItem.find(".dropdown-next-level-wrapper").first();
                            this.setCurrentItem($dropDownItems.first());
                            this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
                        }
                    }
                    isKeyHandled = true;
                }
            }
            else if(key === "TAB"){
                if(keycomb === "TAB"){
                    if(this._currentItem){
                        var $tabItem = this._manipulator.getNextTabItem(this._currentItem);
                        if ($tabItem){
                            this.setCurrentItem($tabItem);
                            isKeyHandled = true;
                        }
                    }
                    else if(!this._currentItem && this._controlStack.length === 0){
                        var $tabItem = this._currentdropdown.find(".dropdown-item:visible:not(.disabled)").first();

                        if ($tabItem){
                            this.setCurrentItem($tabItem);
                            isKeyHandled = true;
                        }
                    }
                }
                else if(keycomb === "SHIFT+TAB"){
                    if(this._currentItem){
                        var $tabItem = this._manipulator.getPreviousTabItem(this._currentItem);

                        if ($tabItem){
                            this.setCurrentItem($tabItem);
                            isKeyHandled = true;
                        }
                    }
                    else if(!this._currentItem && this._controlStack.length === 0){
                        var $tabItem = this._currentdropdown.find(".dropdown-item:visible:not(.disabled)").last();

                        if ($tabItem){
                            this.setCurrentItem($tabItem);
                            isKeyHandled = true;
                        }
                    }
                }
            }
            else if(key === "UP" || key === "DOWN"){
                if(this._currentItem){
                    var itemInfo = this._manipulator.getItemForStandardKey(this._currentItem, key);
                    // SIMS-106124 Safe check added to check itemInfo is null or defined
                     if(itemInfo) {
                        var $requiredItem = itemInfo.item;
                        if ($requiredItem && $requiredItem.length > 0) {
                            this.setCurrentItem($requiredItem);
                            isKeyHandled = true;
                        }
                    }
                }
                else if(!this._currentItem && this._controlStack.length === 0){
                    if(key === "DOWN"){
                        var $downitem = this._currentdropdown.find(".dropdown-item:visible:not(.disabled)").first();
                        if ($downitem){
                            this.setCurrentItem($downitem);
                            isKeyHandled = true;
                        }
                    }
                    else if (key === "UP") {
                        var $upitem = this._currentdropdown.find(".dropdown-item:visible:not(.disabled)").last();
                        if ($upitem){
                            this.setCurrentItem($upitem);
                            isKeyHandled = true;
                        }
                    }
                }
            }
            else if(key === "RIGHT"){
                if(this._currentItem){
                var itemInfo = this._manipulator.getItemForStandardKey(this._currentItem, key);
                // SIMS-106124 Safe check added to check itemInfo is null or defined
                    if(itemInfo) {
                        var $currentItem = this._currentItem;
                        var $requiredItem = itemInfo.item;
                        if ($requiredItem && $requiredItem.length > 0) {
                            this.setCurrentItem($requiredItem);
                            var handled = this._manipulator.handleStandardKey(this._currentItem, key);
                            if(itemInfo.bounced && handled){
                                var $dropDownItems = $currentItem.find(".dropdown-item:visible:not(.disabled)");
                                if ($dropDownItems.length > 0) {
                                    this._dropdownstack.push(this._currentdropdown);
                                    this._currentdropdown = $currentItem.find(".dropdown-next-level-wrapper").first();
                                    this._controlStack.push(this._currentItem);
                                    this.setCurrentItem($dropDownItems.first());
                                    this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
                                }
                            }
                            isKeyHandled = true;
                        }
                    }
                }
            }
            else if(key === "LEFT") {
                if(this._currentItem) {
                var itemInfo = this._manipulator.getItemForStandardKey(this._currentItem, key);
                // SIMS-106124 Safe check added to check itemInfo is null or defined
                    if(itemInfo) {
                        var $currentItem = this._currentItem;
                        var $requiredItem = itemInfo.item;
                        if ($requiredItem && $requiredItem.length > 0) {
                            this.setCurrentItem($requiredItem);
                            if(itemInfo.bounced && this._controlStack.length > 0){
                                this._currentdropdown = this._dropdownstack.pop();
                                this.setCurrentItem(this._controlStack.pop());
                                this._manipulator.handleAccessKey(this._currentItem, "ESCAPE");        
                            }
                            isKeyHandled = true;
                        }
                    }
                }
            }
            else if(isAccessKey)
            {
                var $Dropdown = this._currentdropdown; // Fix for SO-85432
                if($Dropdown.find(".dropdown-next-level-wrapper:visible").length > 0){
                    $Dropdown = $Dropdown.find(".dropdown-next-level-wrapper:visible").last();
                }
                var $items = $Dropdown.find(".dropdown-item:visible:not(.disabled)");
                var searchResults = $items.filter(function () {
                /**** Start -- Support for Hidden ShortCut Keys ***/
                    return $(this).data('accessShortcut') === key
                /**** End -- Support for Hidden ShortCut Keys ***/
                });
                if(searchResults.length > 1){
                    searchResults = searchResults.toArray();
                    var itemtobeselected = null;
                    var currentitemindex = -1;
                    if(this._currentItem){
                        var currentitemindex = searchResults.indexOf(this._currentItem[0]);
                    }

                    if(currentitemindex > -1 && currentitemindex < searchResults.length -1){
                        itemtobeselected = searchResults[currentitemindex + 1];    
                    }
                    else{
                        itemtobeselected = searchResults[0];
                    }
                    this.setCurrentItem($(itemtobeselected));
                    isKeyHandled = true;
                }
                else if(searchResults.length === 1){
                    this._manipulator.handleAccessKey(searchResults, key);
                    var $SubdropDownItems = searchResults.find(".dropdown-item:visible:not(.disabled)");
                    if($SubdropDownItems.length > 0) {
                        this._controlStack.push(searchResults);
                        this._dropdownstack.push(this._currentdropdown);
                        this._currentdropdown = searchResults.find(".dropdown-next-level-wrapper").first();
                        this.setCurrentItem($SubdropDownItems.first());
                        this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
                    }
                    isKeyHandled = true;
                }
            }
        }

        return isKeyHandled;  
    },

    setCurrentItem: function($item) {
        if (this._currentItem && this._currentItem.length > 0) {
            this._manipulator.removeNavigationHover(this._currentItem);
        }

        this._currentItem = $item;
        if ($item) {
            this._manipulator.addNavigationHover($item);
        }
    },

    SET: function ($dropdown) {
        if($dropdown){
            this._currentdropdown = $dropdown;
            //this._dropdownstack.push($dropdown);
        }
    },

    UNSET: function() {
        this._currentdropdown = null;
        this._currentItem = null;
        this._controlStack = [];
    }
});

namespace("SIMS.Components2016.Common");
SIMS.Components2016.Common.AccessKeyComponent = SIMS.Components.Common.AccessKeyComponent.extendOverwrite({
    constructor: function () {
        this.base();
        this._dropdownState = new SIMS.Components.Common.DropdownState(this);
    },

    goIntoDropdownState: function ($dropdown) {
        this._currentState.UNSET();
        this._currentState = this._dropdownState;
        this._currentState.SET($dropdown);
    }
});


namespace("SIMS.Components2016.Common");

SIMS.Components2016.Common.AccessKeyComponent = SIMS.Components.Common.AccessKeyComponent.extendOverwrite({
    HandleAccelaraterKey: function (e, desc) {
        // to stop key propagation on Ribbon when context menu is opened of tab headers
        if ((SIMS.SharedData.KeyboardData.OWNER === this.getUniqueComponentIdentity() || SIMS.SharedData.KeyboardData.OWNER === "") && (SIMS.SharedData.KeyboardData.CONTEXT_MENU_VISIBLE != true)) {
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
            else if (desc.keyCombination === "ALT+SPACE") {
                if (this.HandleApplicationContextMenu()) {
                    return true;
                }
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

    HandleApplicationContextMenu: function (e, desc) {
        return false;
    }
});