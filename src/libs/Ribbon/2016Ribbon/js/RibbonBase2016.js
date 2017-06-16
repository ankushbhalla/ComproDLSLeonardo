'use strict';
namespace("SIMS.Components2016.Common");


SIMS.Components2016.Common.RibbonVisibilityModes = {
    "NORMAL": "NORMAL",
    "COLLAPSED": "COLLAPSED",
    "EMBEDDED":"EMBEDDED"
};

SIMS.Components2016.Common.RibbonBase = SIMS.Components.Common.RibbonBase.extendOverwrite({
    RibbonMode : SIMS.Components2016.Common.RibbonVisibilityModes.NORMAL,
	
    showHideDropdownEvent : false,
    MaintainKeyboardState : null,
    accessibilityStateEscHandlingFix: false,
	constructor: function () {
        this.base();
        this.MaintainKeyboardState = [];
        this._navigationAndAccessibilityState.AddHoverToParentDropdownItem = function() {
            if(this._controlStack[this._controlStack.length -1].hasClass("dropdown-item")){
                this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
            }
        };

        this._navigationKeyState.AddHoverToParentDropdownItem = function() {
            if(this._controlStack[this._controlStack.length -1].hasClass("dropdown-item")){
                this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
            }
        };

        this._accessibilityState.AddHoverToParentDropdownItem = function() {
            var parendropdownItem = this._controlStack[this._controlStack.length - 1];
            if(parendropdownItem.hasClass("dropdown-item")){
                var closestcontrol = $(parendropdownItem).closest(".office-control");
                closestcontrol.find('div.hovered, span.hovered').removeClass('hovered');
                this._manipulator.addNavigationHoverOnParentItemOnly(this._controlStack[this._controlStack.length - 1]);
            }
        };

        /*** Added to correct the accesskey ESC handling, Refer SO-108685 ***/
        this._accessibilityState.populateAccessiblePath = function(searchKey) {
            /*** The flag accessibilityStateEscHandlingFix must be set through attribute in corresponding application ribbon component, where fix is required ***/
            if(this._ribbonComp.accessibilityStateEscHandlingFix) {
                if(searchKey.length === 1) {
                    this._accessiblePath.push(this._currentAccessibleElements);       
                }
            }
            else{
                this._accessiblePath.push(this._currentAccessibleElements);       
            }   
        }

        this._navigationAndAccessibilityState.SetDefaultItemForNavAccessState = function($currentItem , $subItems) {
            var $returnItem = $currentItem;
            if ($subItems != undefined && $subItems.length > 0) {
                var hoveredItems = $currentItem.find(".dropdown-item.hovered:visible:not(.disabled)");
                if(hoveredItems && hoveredItems.length > 0){
                    $returnItem = hoveredItems.first();
                }
                else{
                    $returnItem = $subItems.first();
                }
            }
            return $returnItem;
        };

    },

    AdjustTellMeSerachBox : function () {
	    var $LastTabHeader = this.$thisCompElement.find('.tab-header:visible').last();
	    var $username = this.$thisCompElement.find('.userinfo .username');
        var $TellmeSearchBox = this.$thisCompElement.find('.tellMeSearchBox');
        var $Tellmetext = this.$thisCompElement.find('.tellMeSearchBox .tellMeBoxText');
        var $shareButtonDiv = this.$thisCompElement.find(".shareButtonLI");

	    if ($username.length > 0 && $LastTabHeader.length > 0 && ($username.offset().left - $LastTabHeader.offset().left - $LastTabHeader.outerWidth() < 225)) {
	        $TellmeSearchBox.css({ "width": $username.offset().left - $LastTabHeader.offset().left -  $LastTabHeader.outerWidth() - 10 });
	        $Tellmetext.css({ "width": 50 });
           } 
        else if ($shareButtonDiv.length > 0){
            this.AdjustTellMeSerachBoxIfShareBtnEnabled($LastTabHeader, $username, $TellmeSearchBox, $Tellmetext, $shareButtonDiv);
        }
    },

    AdjustTellMeSerachBoxIfShareBtnEnabled: function($LastTabHeader, $username, $TellmeSearchBox, $Tellmetext, $shareButtonDiv){
        if($username.length > 0 && $LastTabHeader.length > 0 && ((gSimsAreaWidth - $LastTabHeader.offset().left - $LastTabHeader.outerWidth() ) <  ($username.outerWidth()  + $TellmeSearchBox.outerWidth() + $shareButtonDiv.outerWidth() + 20 ))) {
            $TellmeSearchBox.css({
                "width": (gSimsAreaWidth -  $LastTabHeader.offset().left - $LastTabHeader.outerWidth()) - ($username.outerWidth()  + $shareButtonDiv.outerWidth() + 20)
            });
            $Tellmetext.css({
                "width": 50
            });
        }
},
	ShowApplicationContextMenu: function (appIconSelector) {
		/*****appIconSelector is the unique selector through which the application icon can be identified*****/
	    var $appIcon = this.$thisCompElement.find(appIconSelector);
	    $appIcon.showContextMenu($appIcon.data('contextMenuId'));
	    return true;
	},
    
    AttachDropdownToggleEvents: function($Comp){
    	var self = this;
        var $ribbonComp = $Comp.find(".ribbon:first");

        // This is the handler for dropdown handling which is called on recieving message for dropdown open.
        // On using addEventListener the callback has to be mentioned in a variable if the event also needs to be unbind.
        // Inline callback function used in addEventListener are not unbinded.
        this.DropdownKeyHandlerProxied = $.proxy(this.HandleKeyOnDropdownOpen, this); 


        $ribbonComp.noRepeatBind('RibbonDropdownOpened', function (e, eventInfo) {
            if(self._currentState === self._normalState){
                self.goIntoDropdownState($(e.target));    
                SIMS.Objects.DOMElements.SIMArea.get(0).addEventListener("keydown", self.DropdownKeyHandlerProxied, true);
            }
        });

        $ribbonComp.noRepeatBind('RibbonDropdownClosed', function (e, eventInfo) {
            SIMS.Objects.DOMElements.SIMArea.get(0).removeEventListener("keydown", self.DropdownKeyHandlerProxied, true);
        });
    },

    HandleKeyOnDropdownOpen: function (e) { 
        // added this check to not handle key if the current keyboard owner is context menu for SO-66386.
        if (SIMS.SharedData.KeyboardData.OWNER == SIMS.SharedData.KeyboardOwner.CONTEXT_MENU)
        { return; }

        this.HandleTabKey(e, { keyName: SIMS.Objects.Utils.GetFriendlyKeyName(e), keyCombination: SIMS.Objects.Utils.GetFriendlyShortCutString(e) });
        e.stopPropagation();
        e.preventDefault();
    },

    handleSpinnerControlEvent: function(compEventId, spinCtrlName, finalAttrName, controlEventArgs, clickstreamStr) {
        var isHandled = false;
        
        if (controlEventArgs.spinChangedBy == "enter") {
            this.LogComponentEvent(compEventId, clickstreamStr);
            isHandled = true;
        } else {
            if (this._compinfo.finalattrs && this._compinfo.finalattrs.attr) {
                var attr = getArray(this._compinfo.finalattrs.attr).findSingle("@name", finalAttrName);
                if (attr) {
                    if (this.getSpinVal(spinCtrlName).toString() === attr["@value"].toString()) {
                        this.LogComponentEvent(compEventId, clickstreamStr);
                    }
                   isHandled = true;
                }
            }
        }

        return isHandled;
    },

    UpdateRibbonVisibilityMode: function($Comp,attrValue){
          var $ribbon = $Comp.find(".ribbon");
                if (attrValue &&  SIMS.Components2016.Common.RibbonVisibilityModes.hasOwnProperty([attrValue.toUpperCase()])) {
                    this.RibbonMode = SIMS.Components2016.Common.RibbonVisibilityModes[attrValue.toUpperCase()];
                    if($ribbon.length > 0){
                        switch (this.RibbonMode) {
                            case SIMS.Components2016.Common.RibbonVisibilityModes.COLLAPSED:
                                $ribbon.addClass(this.RibbonMode);
                                var $selectedTabHeader = $ribbon.find(".tab-header-selected")
                                if($selectedTabHeader.length > 0){
                                    $selectedTabHeader.removeClass("tab-header-selected");        
                                }
                                var $selectedTabContainer = $ribbon.find(".ribbon-tab-container")
                                if($selectedTabContainer.length > 0){  
                                    $selectedTabContainer.hide();        
                                }
                                break;

                            case SIMS.Components2016.Common.RibbonVisibilityModes.NORMAL:
                                for(var key in SIMS.Components2016.Common.RibbonVisibilityModes){
                                    $ribbon.removeClass(SIMS.Components2016.Common.RibbonVisibilityModes[key]);     
                                }  
                                break;
                            case SIMS.Components2016.Common.RibbonVisibilityModes.EMBEDDED:
                                 $ribbon.addClass(this.RibbonMode);
                            break;

                            default:
                                break;
                        }
                    }
                }
    },

    trackDropdownShowHide: function(eventTypeAndDropdownId,showEvent,hideEvent){
        var self =  this;
        var $ribbonElement = this.$thisCompElement;
        var dropdownId = eventTypeAndDropdownId.id;
        
        if(eventTypeAndDropdownId.type == "hide"){

            $ribbonElement.unbind('RibbonDropdownClosed.trackDD').bind('RibbonDropdownClosed.trackDD',function(e){
                    var controlId = $(e.target).closest(".office-control").attr("id");
                    var controlInfo = $(e.target).closest(".office-control").data('clickstreamInfo');
                    if( dropdownId.indexOf(controlId) != -1){
                        self.LogComponentEvent(hideEvent,"Ribbon: "+controlInfo+" : Dropdown Closed.",true);
                    }
            });
            $ribbonElement.unbind('hideSubItems').bind('hideSubItems',function(e){
                    var parentItemId = $(e.target).attr("id");
                    var parentItemInfo = $(e.target).data('clickstreamInfo');
                    var controlInfo = $(e.target).closest(".office-control").data('clickstreamInfo');
                    if(dropdownId.indexOf(parentItemId) != -1){
                        self.LogComponentEvent(hideEvent,"Ribbon: "+controlInfo+" : "+parentItemInfo+" : Sub Dropdown Closed.",true);
                    }
            });
        }

        else if(eventTypeAndDropdownId.type == "show"){

            $ribbonElement.unbind('RibbonDropdownOpened.trackDD').bind('RibbonDropdownOpened.trackDD',function(e){
                    var controlId = $(e.target).closest(".office-control").attr("id");
                    var controlInfo = $(e.target).closest(".office-control").data('clickstreamInfo');
                    if(dropdownId.indexOf(controlId) != -1){
                        self.LogComponentEvent(showEvent,"Ribbon: "+controlInfo+" : Dropdown Opened.",true);
                    }
            });
            $ribbonElement.unbind('showSubItems').bind('showSubItems',function(e){
                    var parentItemId = $(e.target).attr("id");
                    var parentItemInfo = $(e.target).data('clickstreamInfo');
                    var controlInfo = $(e.target).closest(".office-control").data('clickstreamInfo');
                    if(dropdownId.indexOf(parentItemId) != -1){
                        self.LogComponentEvent(showEvent,"Ribbon: "+controlInfo+" : "+parentItemInfo+" : Sub Dropdown Opened.",true);
                    }
            });

        }

        this.showHideDropdownEvent = true;
    },

    ResetBetweenStates: function(){

        // For dropdown show/hide event
        if(this.showHideDropdownEvent == true){
            this.MaintainKeyboardState = [];
            var $ribbonElement = this.$thisCompElement;
            
            $ribbonElement.unbind('hideSubItems');
            $ribbonElement.unbind('RibbonDropdownClosed.trackDD');

            $ribbonElement.unbind('showSubItems');
            $ribbonElement.unbind('RibbonDropdownOpened.trackDD');

            this.showHideDropdownEvent = false;
        }
    },

    UpdateComponentState: function (compInfo, attrSet) {        
        this.ResetBetweenStates();
        this.base(compInfo, attrSet);
    },

    HideComponent: function(){
        // Done for SO-98186, hidecomponent is called when comp is removed from xml, so when comp is removed we have removed the finding done for kl006
        SIMS.Objects.DOMElements.SIMArea.get(0).removeEventListener("keydown", this.DropdownKeyHandlerProxied, true);
        this.base();
    },

    Dispose: function() {
        this.base();
        SIMS.Objects.DOMElements.SIMArea.get(0).removeEventListener("keydown", this.DropdownKeyHandlerProxied, true);
    }
    
});
