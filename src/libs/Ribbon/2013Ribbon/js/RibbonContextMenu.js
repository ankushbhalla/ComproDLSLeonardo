'use strict';
namespace("SIMS.Components.Common.Ribbon");

SIMS.Components.Common.RibbonCMData = Base.extend({
    idArr: null,
    menusAlreadyAdded: null,

    constructor: function () {
        this.idArr = [];
        this.menusAlreadyAdded = [];
    },

    Add: function (id) {
        if (this.idArr.indexOf(id) == -1) {
            this.idArr.push(id);
        }
    },

    AddRange: function (idArr) {
        for (var i = 0; i < idArr.length; i++) {
            this.Add(idArr[i]);
        }
    },

    Clear: function () {
        this.idArr = [];
    }

});


SIMS.Components.Common.RibbonContextMenu = Base.extend({

    $ribbon: null,
    appName: "excel",   //default value
    menuJsonData: null,
    CMdata: null,

    //define menu json file path application wise here
   //Leonardo Start
    JSONFilePath: {
        excel: "Ribbon/json/contextmenu/excel-menu.json"
    },
    //Leonardo End


    constructor: function (RibbonWrapper, appName) {

        //fill default menu ids here which are always required
        this.CMdata = new SIMS.Components.Common.RibbonCMData();
        this.CMdata.AddRange(["control", "ribbon", "titlebar"]);
        this.$ribbon = RibbonWrapper;
        this.appName = appName;

    },

    TargetTypes: {
        Item: "Item",
        Control: "Control",
        TitleBar: "TitleBar",
        Default: "Default"  //includes title bar and empty area
    },

    //return type - { $target: $target, type: type }
    GetTargetAndType: function ($attachedTarget, $originalTarget) {
        var type = this.TargetTypes.Default,
            $target;

        //note - $originalTarget is not defined in case of SHIFT+F10
        if ($originalTarget) { // for right click case

            //Item
            var $dropDownItem = $originalTarget.parentsUntil(".ribbon").andSelf().filter(".dropdown-item").last();
            if ($dropDownItem.length > 0) {
                type = this.TargetTypes.Item;
                $target = $dropDownItem;
            }

            //items - in case SHIFT+F10 case sends defined $originalTarget; currently not happenning
            if (!$target) {
                var $items = $originalTarget.parentsUntil(".ribbon").andSelf().filter(".dropdown-items-wrapper");
                if ($items.length > 0) {
                    var $hovItem = $items.find(".dropdown-item.hovered:first");
                    if ($hovItem.length > 0) {
                        type = this.TargetTypes.Item;
                        $target = $hovItem;
                    }
                }
            }

            //Control
            if (!$target) {
                var $control = $originalTarget.parentsUntil(".ribbon").andSelf().filter(".office-control");
                if ($control.length > 0) {
                    type = this.TargetTypes.Control;
                    $target = $control;
                }
            }

            //Title bar control
            if (!$target) {
                var $titleBar = $originalTarget.parentsUntil(".ribbon").andSelf().filter(".title-bar");
                if ($titleBar.length > 0) {
                    type = this.TargetTypes.TitleBar;
                    $target = $titleBar;
                }
            }
        }
        else { //SHIFT+F10 case            

            //item wrapper
            if ($attachedTarget.hasClass("dropdown-items-wrapper")) {  // handling in case of shift-f10 if items node has menu id                
                var $hovItem = $attachedTarget.find(".dropdown-item.hovered:first");
                if ($hovItem.length > 0) {
                    type = this.TargetTypes.Item;
                    $target = $hovItem;
                }
            }
            else if ($attachedTarget.hasClass("dropdown-item")) {   //item
                type = this.TargetTypes.Item;
                $target = $attachedTarget;
            }
            else if ($attachedTarget.hasClass("office-control")) {   //control
                type = this.TargetTypes.Control;
                $target = $attachedTarget;
            }
        }

        if (!$target) {
            $target = $originalTarget || $attachedTarget;
        }

        return {
            $target: $target,
            type: type
        };
    },

    //return type - { eventId: eventId, selectedindex: selectedindex} //selectedindex can be undefined
    GetEventIdAndSelectedIndex: {
        Item: function ($target, responseEvent) {
            var eventId = 9999,
                selectedindex;

            if ($target.data('cmEventId')) {    // This handling is for the case where items have CMevent
                selectedindex = responseEvent.id;
                eventId = $target.data('cmEventId');
            }
            else if (responseEvent.menuId == "ribbon" || responseEvent.menuId == "control") {   // This handling is for the items in tilebar that fire the same events as that of fired from control CMs.
                if (responseEvent.id) {
                    eventId = responseEvent.id;
                }
            }

            return {
                eventId: eventId,
                selectedindex: selectedindex
            };
        },

        Control: function ($target, responseEvent) {
            var eventId = responseEvent.id; //9999

            if ($target.data('cmEventId')) {    // This handling is for the CMs on controls that have event id in menu JSON as "fireCMevent" ( this means that in this case the CMevent on control will be fired).
                eventId = $target.data('cmEventId');
            }

            return { eventId: eventId };
        },

        TitleBar: function ($target, responseEvent) {
            return { eventId: responseEvent.id };
        },

        Default: function ($target, responseEvent) {
            return { eventId: responseEvent.id };
        }
    },

    //return { menuId: menuId, ignoreCMCall: false}
    GetMenuIdAndIgnoreFlag: {
        Item: function ($target) {
            var menuId, ignoreCMCall = false;
            var defaultCMDisplacement = 10;

            if ($target.data('contextMenuId')) {
                menuId = $target.data('contextMenuId');
            }

            if (!menuId) {
                var $items = $target.closest(".dropdown-items-wrapper");

                if ($items.length > 0 && $items.data('contextMenuId')) {
                    menuId = $items.data('contextMenuId');
                }
            }

            if (!menuId) {
                ignoreCMCall = true;
            }

            return { menuId: menuId, ignoreCMCall: ignoreCMCall, defaultCMDisplacement: defaultCMDisplacement };
        },

        Control: function ($target) {
            var menuId = "control";

            if ($target.data('contextMenuId')) {
                menuId = $target.data('contextMenuId');
            }

            return { menuId: menuId };
        },

        TitleBar: function ($target) {
            return { menuId: "titlebar" };
        },

        Default: function ($target) {
            return { menuId: "ribbon" };
        }
    },

    GetMenuPosDim: {
        Item: function ($targetEle, defaultCMDisplacement) {
            return {
                x: $targetEle.offset().left, 
                y: $targetEle.offset().top,
                targetW: ($targetEle.width() != 0 ? $targetEle.width() : defaultCMDisplacement), 
                targetH: ($targetEle.height() != 0 ? $targetEle.height() : defaultCMDisplacement)
            };
            
        },

        Control: function ($targetEle, defaultCMDisplacement) {
            return {
                x: $targetEle.offset().left, 
                y: $targetEle.offset().top, 
                targetW: $targetEle.outerWidth(), 
                targetH: $targetEle.outerHeight()
            };
        },

        TitleBar: function ($targetEle, defaultCMDisplacement) {
            return {
                x: $targetEle.offset().left, 
                y: $targetEle.offset().top, 
                targetW: $targetEle.outerWidth(), 
                targetH: $targetEle.outerHeight()
            };
        },

        Default: function ($targetEle, defaultCMDisplacement) {
            return {
                x: $targetEle.offset().left, 
                y: $targetEle.offset().top, 
                targetW: $targetEle.outerWidth(), 
                targetH: $targetEle.outerHeight()
            };
        }
    },

    ContextMenuCallback: function (args) {

        var $attachedTarget = args[0];
        var responseEvent = args[1];
        var $originaltarget = args[2] ? $(args[2]) : null;

        switch (responseEvent.type) {

            case callBackType.CALLBACK_ON_SELECTION:

                var eventtobefired = 9999, selectedindex = null, contextmenudesc = responseEvent.desc;

                var targetInfo = this.GetTargetAndType($attachedTarget, $originaltarget);
                var eventInfo = this.GetEventIdAndSelectedIndex[targetInfo.type](targetInfo.$target, responseEvent)

                if (!isNaN(eventInfo.eventId)) {
                    eventtobefired = eventInfo.eventId;
                }

                if (!isNaN(eventInfo.selectedindex)) {
                    selectedindex = eventInfo.selectedindex;
                }

                this.fireContextMenuEvent(eventtobefired, contextmenudesc, targetInfo.$target, selectedindex);

                break;

            case callBackType.CUSTOMIZATION_REQUEST:

                var menuIdtobeDisplayed = "ribbon";
                var ignoreContextMenuCall = false;

                var targetInfo = this.GetTargetAndType($attachedTarget, $originaltarget);
                var menuInfo = this.GetMenuIdAndIgnoreFlag[targetInfo.type](targetInfo.$target);

                menuIdtobeDisplayed = menuInfo.menuId || "ribbon";
                ignoreContextMenuCall = menuInfo.ignoreCMCall === true ? true : false;
                var defaultCMDisplacement = menuInfo.defaultCMDisplacement || 0;

                var customizationResponse = {
                    posDim: this.GetMenuPosDim[targetInfo.type](targetInfo.$target, defaultCMDisplacement),
                    menuId: menuIdtobeDisplayed,
                    ignoreCall: ignoreContextMenuCall
                };

                return customizationResponse;
               

            default:
                break;
        }
    },


    UpdateMenuBindings: function () {
        if (!this.menuJsonData) {
            this.loadJsonFile(this.postLoadJSON);
        }
        else {
            this.postLoadJSON();
        }
    },

    postLoadJSON: function () {
        var MenusTobeAdded = this.CMdata.idArr;
        var arrLength = MenusTobeAdded.length;
        var theme = contextMenuTheme[this.appName.toString().toUpperCase()] || contextMenuTheme["EXCEL"];
        var curMenuId;

        for (var i = 0; i < arrLength; i++) {
            curMenuId = MenusTobeAdded[i];

            if (this.CMdata.menusAlreadyAdded.indexOf(curMenuId) === -1) {
                var currentMenuJson = this.menuJsonData[curMenuId];

                if (currentMenuJson) {
                    this.$ribbon.addContextMenu(curMenuId, currentMenuJson[0], this.ContextMenuCallback, this,
                        theme, menuTypes.genericContextMenu, contextMenuLocation.LEFT_BOTTOM);

                    this.CMdata.menusAlreadyAdded.push(curMenuId);
                }
            }
        }

        this.CMdata.Clear();
    },


    loadJsonFile: function (postSuccessFn) {
        var self = this,
            jsonPath = this.JSONFilePath[this.appName];

        $.ajax({
            url: jsonPath,
            async: true,
            dataType: 'json',
            success: function (data) {
                self.menuJsonData = data;
                postSuccessFn.apply(self);
            }
        });
    },


    fireContextMenuEvent: function (cmEventId, desc, $target, index) {
        var $gallery = $target.parents(".ctrl-gallery:first");
        if ($gallery.length > 0) {
            $gallery.trigger("itemSelected");
        }
        else {
            ControlGenerators.ComboBox.prototype.DropdownCloser.call();
        }

        //to close sub item dropdown items
        //$(".dropdown-next-level-wrapper, .combobox-dropdown").hide();
        this.$ribbon.find(".dropdown-next-level-wrapper, .combobox-dropdown").hide();

        if (index) {// index is present for the CM on items except the items on titlebar and is not present for the controls and empty areas in that case differnet events are fired from different context menu items.
            this.$ribbon.trigger('selectedIndexChanged', ["Context menu item " + desc + " clicked", cmEventId, null, { "cmIndex": index}]);
        }
        else {
            this.$ribbon.trigger('selectedIndexChanged', ["Context menu item " + desc + " clicked", cmEventId]);
        }

    }
});
