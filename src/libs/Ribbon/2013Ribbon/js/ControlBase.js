namespace("ControlGenerators");
ControlGenerators.ControlBase = function () {
    this.$controlXml = null;
    this.type = null;
    this.desc = null;
    this.$control = null;
    this.$wrapper = null;
    this.getControl = function () {
        this.makeControl();

        var $control = this.$control;
        var $controlXml = this.$controlXml;

        $control.data('controlType', this.type);

        //Adding custom classname
        var className = $controlXml.attr("classname");
        if (className != null && !Polyfills.isEmpty(className)) {
            $control.addClass(className);
        }

        var ident = $controlXml.attr("identifier");
        if (ident != null && !Polyfills.isEmpty(ident)) {
            $control.addClass(ident);
        }

        //add ids - required for practice mode
        if($controlXml.attr("id") && $control.attr("id")==null)   //avoid overriding already assigned ids
        {
          $control.attr("id",$controlXml.attr("id"));
        }

        this.AttachTooltip();

        //Attaching Keyboard Shortcuts
        this.AttachKeyboardShortcutHolders();

        //Attaching Event Id
        this.AttachEventId();

        //Attaching ICMessage Id
        this.AttachData($controlXml,$control,'ICMessageId');

        //Disabled Handling
        this.CheckDisabled();

        //Hidden Handling
        this.CheckHidden();

        var JSONcmmenuId = $controlXml.attr("menuId");
//Leonardo Start
        // if (JSONcmmenuId) {
        //     //Attaching New Contextmenu
        //     this.AddJSONContextMenu(JSONcmmenuId);
        // }
        // else {
        //     //Attaching Old Contextmenu
        //     this.AddContextMenu();
        // }
        //Leonardo End

        //this.AttachCustomData();

        //AttachStandardKeyFunctionality
        //this.AttachStandardKeyFunctionality();

        return $control;
    };
    this.AddFunctionality = function () { };
    this.AddMoreFunctionality = function () { };
    this.tooltipTargets = [{ target: '$control', tooltipSelector: 'default'}];
};

//ControlGenerators.ControlBase.prototype.AttachStandardKeyFunctionality = function () {
//    var $control = this.$control;

//    var standardKeyHandler = function (e) {
//        var $this = $(this);

//        var $reqControl = ControlGetters.GetControlFunctionMap[e.keyCode].call($this, ".office-control");
//        $reqControl.focus();
//    };

//    $control.keydown(standardKeyHandler);

//};

ControlGenerators.ControlBase.prototype.AddContextMenu = function () {
    var xContextMenu = this.$controlXml.children("contextmenu").children("items").first();

    if (xContextMenu.length > 0) {
        var $contextMenu = ControlGenerators.ItemsGenerator.prototype.GetItems(xContextMenu);

        $contextMenu.addClass("contextMenu combobox-dropdown");
        $contextMenu.attr("tabindex", "-1");

        //$contextMenu.attr('id', "ribbon-cm-" + this.$controlXml.attr('text').removeSpaces());

        this.$control.append($contextMenu);

        this.bindContextMenu($contextMenu);
    }
    else {
        var $defaultContextMenu = this.getDefaultContextMenu();
        if ($defaultContextMenu != null) this.bindContextMenu($defaultContextMenu);
    }
};

ControlGenerators.ControlBase.prototype.AddJSONContextMenu = function (JSONcmmenuId) {

    this.$control.data("contextMenuId", JSONcmmenuId);
    this.$controlXml.trigger("AddJSONCM", { MenuId: JSONcmmenuId });

    if (this.$controlXml.attr("cmEventId") && this.$control.attr("cmEventId") == null)   //avoid overriding already assigned ids
    {
        this.$control.data("cmEventId", this.$controlXml.attr("cmEventId"));
    }
};
ControlGenerators.ControlBase.prototype.getDefaultContextMenu = function () {

};

ControlGenerators.ControlBase.prototype.bindContextMenu = function ($contextMenu) {
    //this.$control.contextMenu();
    if ($contextMenu == undefined) return;

    this.$control.contextMenu({
        $menu: $contextMenu,
        //captureClickFor: captureClick,
        //doNotHideOnClickOf: '.shyToolBarInside',
        //shyToolBar: '.shyToolBarInside',
        inSpeed: 25,
        outSpeed: 50
    });
};

ControlGenerators.ControlBase.prototype.AttachCustomData = function () {
    var $xCustomData = this.$controlXml.children("customdata");
    if ($xCustomData.length > 0) {
        var objData = JSON.parse($xCustomData.text());
        this.$control.data("customdata", objData);
    }
};

ControlGenerators.ControlBase.prototype.CheckDisabled = function () {
    if (this.$controlXml.attr("disabled") === "true") {
        this.$control.addClass('disabled');
    }
};

ControlGenerators.ControlBase.prototype.CheckHidden = function () {
    if (this.$controlXml.attr("hidden") === "true") {
        this.$control.addClass('hidden');
    }
};

ControlGenerators.ControlBase.prototype.AttachEventId = function () {
    var eventId = this.$controlXml.attr('eventId');
    if (eventId != null && !Polyfills.isEmpty(eventId)) {
        this.$control.data('eventId', eventId);
    }
};

ControlGenerators.ControlBase.prototype.AttachData = function ($controlXml,$control,dataName) {
    var dataId = $controlXml.attr(dataName);
    if (dataId != null && !Polyfills.isEmpty(dataId)) {
        $control.data(dataName, dataId);
    }
};




ControlGenerators.ControlBase.prototype.AttachKeyboardShortcutHolders = function () {
    var shortCut = this.$controlXml.attr("ak");
    if (shortCut != null && shortCut.length > 0) {
        this.$control.addShortCut(shortCut);
    }
};

ControlGenerators.ControlBase.prototype.GenerateClickstreamInfo  = function($controlXml) {
        //setting click stream data
        var clickstream = "", 
            tabName = SIMS.Components.Common.RibbonCurrentTabName;

        if (tabName) {
            clickstream  = tabName;
            if (tabName !== "Titlebar") {
                clickstream += " tab ";
            }
        }

        if(SIMS.Components.Common.RibbonCurrentSectionName){
            if(clickstream)  {
                clickstream += " : ";    
            }
            clickstream += SIMS.Components.Common.RibbonCurrentSectionName + " group ";
        }

        var controlDesc = this.desc || $controlXml.attr("noTextClickInfo") || "";
                
        if (controlDesc) {
            if(clickstream)  {
                clickstream += " : ";    
            }
            clickstream += controlDesc;
        }
        return clickstream;
       
};

ControlGenerators.ControlBase.prototype.SetControlXml = function (controlXml) {
    var $controlXml = this.$controlXml = controlXml;
    this.type = $controlXml.attr('type');
    this.desc = $controlXml.attr('text');
    this.id = $controlXml.attr('id');
    var $control = this.$control = UIUtils.getUnselectableSpan(this.id, 'office-control');
    $control.addClass('ctrl-' + this.type.toLowerCase());
    $control.data('desc', this.desc);

    var clickstream = this.GenerateClickstreamInfo($controlXml);
    $control.data('clickstreamInfo', clickstream);
 
    //Minimal Handling
    if ($controlXml.getTrueOrFalse('minimal', false)) {
        $control.addClass('minimal-control');
    }

    //Big Control Handling
    if ($controlXml.getTrueOrFalse('big', false)) {
        $control.addClass('big-control');
    }


};

ControlGenerators.ControlBase.prototype.AttachTooltip = function () {
    if (this.tooltipTargets.length > 0) {
        var $controlXml = this.$controlXml;
        for (var i = 0; i < this.tooltipTargets.length; i++) {
            var tooltipInfo = this.tooltipTargets[i];

            var xToolTip = null;
            var toolTipTarget = tooltipInfo.tooltipSelector.toLowerCase();
            xToolTip = $controlXml.find('tooltips tooltip[target="' + toolTipTarget + '"]');
            if (toolTipTarget == 'default') {
                xToolTip = $controlXml.find('tooltips tooltip[target="' + toolTipTarget + '"],tooltips tooltip[target=""],tooltip:not([target])');
            }
            if (xToolTip.length > 0) {
                var currentControlPart = this[tooltipInfo.target];
                if (currentControlPart != null) {
                    currentControlPart.addTooltip(xToolTip);
                }
            }
        }
    }
};

ControlGenerators.ControlBase.prototype.AttachTooltipFunctionality = function ($externallyPassedControl) {
    var showtooltip = this.showTooltip;
    var hideTooltip = this.hideTooltip;
    var $control = this.$control;
    if ($externallyPassedControl != null) {
        $control = $externallyPassedControl;
    }

    $control.hover(function () {
        hoveredControl = $(this);
        tooltipTimeout = setTimeout(showtooltip, 1000);
    }, hideTooltip);
};

ControlGenerators.ControlBase.prototype.GetToolTip = function (xToolTip) {
    var templateMarkup = '<div class="tooltip"><div class="tooltip-header">${header}</div><div class="tooltip-body">{{html body}}</div></div>';
    templateMarkup = templateMarkup.replace(/[\n\r\t]/g, "");
    var $template = jQuery.template('tooltipTemplate', templateMarkup);
    var jsonToolTip = xToolTip.convertToJSON();
    var $tooltip = jQuery.tmpl('tooltipTemplate', jsonToolTip);
    return $tooltip;
};
ControlGenerators.ControlBase.prototype.showTooltip = function () {
    var $tooltip = $(hoveredControl).find('.tooltip');
    if (!$tooltip.is(':visible')) {
        $('.tooltip').not($tooltip).hide();
        var ddLeft = $(hoveredControl).position().left;
        var $ribbon = $(hoveredControl).parents('.ribbon-section');
        var ddTop = $ribbon.outerHeight() + $ribbon.position().top;
        $tooltip.css({ 'top': ddTop, 'left': ddLeft });
        $tooltip.fadeIn(200);

        //Width Handling
        var overflow = UIUtils.getHorizontalOverflow($tooltip, SIMS.Objects.DOMElements.SIMArea);
        if (overflow > 0) {
            $tooltip.css('left', '-=' + (overflow+2));
        }
    }
};
ControlGenerators.ControlBase.prototype.hideTooltip = function (delay) {
    clearTimeout(tooltipTimeout);
    $(hoveredControl).find('.tooltip').delay(delay != null ? delay : 20).fadeOut(200);
};

ControlGenerators.ControlBase.prototype.handleStandardKey = function () {
};

ControlGenerators.ControlBase.prototype.addNavigationHover = function ($item) {
    this.getHoverItems($item).addClass("hovered");
};

ControlGenerators.ControlBase.prototype.removeNavigationHover = function ($item) {
    this.getHoverItems($item).removeClass("hovered");
};

ControlGenerators.ControlBase.prototype.getHoverItems = function ($control) {
    var $itemsToBeHovered = $();
    if ($control.is(".office-hover-default")) {
        $itemsToBeHovered = $itemsToBeHovered.add($control);
    }
    $itemsToBeHovered = $itemsToBeHovered.add($control.find(".office-hover-default").filter(function () {
        return $(this).closest(".dropdown-items-wrapper").length === 0;
    }));

    return $itemsToBeHovered;
};

ControlGenerators.ControlBase.prototype.getNextTabItem = function ($item) {
    var $ribbon = $item.closest(".ribbon");
    var exclude = ".ctrl-separator";
    var currentTabSelector = ".ribbon-tab-container:visible:first";
    var includeFromTab = ".section-launcher, .office-control";
    var selectedTabHeader = ".ribbon-tabs-wrapper .tab-header-selected:visible";

    var $itemsToLoopfrom = $ribbon.find(selectedTabHeader).add($ribbon.find(currentTabSelector).find(includeFromTab)).not(exclude);

    var currentIndex = $itemsToLoopfrom.index($item);

    var $tabItem = $($itemsToLoopfrom[(currentIndex + 1) % $itemsToLoopfrom.length]);

    return $tabItem;
};

//Fix for KL032
ControlGenerators.ControlBase.prototype.getPreviousTabItem = function ($item) {
    var $ribbon = $item.closest(".ribbon");
    var exclude = ".ctrl-separator";
    var currentTabSelector = ".ribbon-tab-container:visible:first";
    var includeFromTab = ".section-launcher, .office-control";
    var selectedTabHeader = ".ribbon-tabs-wrapper .tab-header-selected:visible";

    var $itemsToLoopfrom = $ribbon.find(selectedTabHeader).add($ribbon.find(currentTabSelector).find(includeFromTab)).not(exclude);

    var currentIndex = $itemsToLoopfrom.index($item);

    var $tabItem = null;
    if (currentIndex === 0) {
        $tabItem = $($itemsToLoopfrom[($itemsToLoopfrom.length -1)]);
    }
    else {
        $tabItem = $($itemsToLoopfrom[(currentIndex - 1)]);
    }

    return $tabItem;
};

ControlGenerators.ControlBase.prototype.getItemForStandardKey = function ($item, key) {
    var $openDropdown = $item.find(".dropdown-open:visible");

    if ($openDropdown.length > 0) {
        var $extractItemsFrom = $openDropdown;
        var $lastWrapper = $openDropdown.find(".dropdown-next-level-wrapper:visible").last();
        if ($lastWrapper.length > 0) {
            $extractItemsFrom = $lastWrapper;
        }

        return { item: $extractItemsFrom.find(".dropdown-item:visible:not(.disabled):first") };
    }
    else {
        var $itemWrapper = $item.parents(".ribbon");
        var exclude = ".ctrl-separator";
        var currentTabSelector = ".ribbon-tab-container:visible:first";
        var includeFromTab = ".section-footer, .office-control";
        var tabHeaders = ".ribbon-tabs-wrapper .tab-header:visible";

        $itemsToLoopfrom = $itemWrapper.find(tabHeaders).add($itemWrapper.find(currentTabSelector).find(includeFromTab)).not(exclude);
    }

    var itemInfo = ControlGetters.GetControlFunctionMap[key]($item, $itemsToLoopfrom, true);
    var $reqItem = itemInfo.item;

    if ($reqItem.is(".tab-header")) {
        $reqItem = $itemsToLoopfrom.filter(".tab-header-selected");
    }
    else if ($reqItem.is(".section-footer")) {
        $reqItem = $reqItem.find(".section-launcher");
    }

    itemInfo.item = $reqItem;

    return itemInfo;
};


var ControlGetters = {
    getControlImmediatelyToTheLeftOf: function ($control, $allItems, bLookAlongXY, bFarthest) {
        var w = $control.outerWidth(), h = $control.outerHeight(), controlX = $control.offset().left;
        var opts = bLookAlongXY ? { checkHoriz: true, checkVert: false, tolerance: 2} : null;
        var index = $allItems.index($control);
        var func = bFarthest ? jQuery.furthest : jQuery.nearest;
        var $filteredItems;

        var returnObj = { bounced: false };

        //At the beginning of a list
        if (index === 0) {
            returnObj.bounced = true;
            returnObj.item = jQuery.furthest({ y: $control.offset().top + ($control.outerHeight() / 2), x: controlX }, $allItems, opts).first();
            return returnObj;
        }

        $filteredItems = $($allItems.slice(0, index));

        returnObj.item = func({ y: $control.offset().top + ($control.outerHeight() / 2), x: controlX }, $filteredItems, opts).first();

        //At the beginning of a list
        if (returnObj.item.length === 0 || returnObj.item.offset().left > controlX) {
            returnObj.item = jQuery.furthest({ y: $control.offset().top + ($control.outerHeight() / 2), x: controlX }, $allItems, opts).first();
            returnObj.bounced = true;
        }

        return returnObj;
    },
    getControlImeediatelyOnTopOf: function ($control, $allItems, bLookAlongXY, bFarthest) {
        var opts = bLookAlongXY ? { checkHoriz: false, checkVert: true, tolerance: 2} : null;
        var controlX = $control.offset().left, controlY = $control.offset().top, controlH = $control.outerHeight(), controlW = $control.outerWidth();
        var index = $allItems.index($control);
        var pt = { y: controlY, x: controlX + 22 };
        var $filteredItems;

        var returnObj = { bounced: false };

        //Beginning of a list
        if (index === 0) {
            returnObj.bounced = true;
            returnObj.item = jQuery.furthest(pt, $allItems, opts).first();
            return returnObj;
        }
        $filteredItems = $($allItems.slice(0, index));
        var w = $control.outerWidth(), h = $control.outerHeight();

        var func = bFarthest ? jQuery.furthest : jQuery.nearest;

        returnObj.item = func(pt, $filteredItems, opts).first();

        //Beginning of a list
        if (returnObj.item.length === 0 || returnObj.item.offset().top > controlY) {
            returnObj.item = jQuery.furthest(pt, $allItems, opts).first();
            returnObj.bounced = true;
        }

        return returnObj;
    },
    getControlImmediatelyToTheRightOf: function ($control, $allItems, bLookAlongXY, bFarthest) {
        var index = $allItems.index($control);
        var opts = bLookAlongXY ? { checkHoriz: true, checkVert: false, tolerance: 2} : null;
        var func = bFarthest ? jQuery.furthest : jQuery.nearest;
        var w = $control.outerWidth(), h = $control.outerHeight(), controlX = $control.offset().left;
        var $filteredItems;

        var returnObj = { bounced: false };

        //At the end of a list
        if (index == $allItems.length - 1) {
            returnObj.item = jQuery.furthest({
                y: $control.offset().top + ($control.outerHeight() / 2),
                x: $control.offset().left + $control.outerWidth()
            }, $allItems, opts).first();
            returnObj.bounced = true;
            return returnObj;
        }

        $filteredItems = $($allItems.slice(index + 1, $allItems.length));

        returnObj.item = func({
            y: $control.offset().top + ($control.outerHeight() / 2),
            x: $control.offset().left + $control.outerWidth()
        }, $filteredItems, opts).first();

        //At the end of a list
        if (returnObj.item.length === 0 || returnObj.item.offset().left < controlX) {
            returnObj.item = jQuery.furthest({
                y: $control.offset().top + ($control.outerHeight() / 2),
                x: $control.offset().left + $control.outerWidth()
            }, $allItems, opts).first();
            returnObj.bounced = true;
        }

        return returnObj;
    },
    getControlImmediatelyBelow: function ($control, $allItems, bLookAlongXY, bFarthest) {
        var w = $control.outerWidth(), h = $control.outerHeight();
        var opts = bLookAlongXY ? { checkHoriz: false, checkVert: true, tolerance: 2} : null;
        var controlX = $control.offset().left, controlY = $control.offset().top, controlH = $control.outerHeight(), controlW = $control.outerWidth();
        var func = bFarthest ? jQuery.furthest : jQuery.nearest;
        debugger;
        var index = $allItems.index($control);
        var $filteredItems;

        var returnObj = { bounced: false };

        //At the end of a list
        if (index == $allItems.length - 1) {
            returnObj.item = jQuery.furthest({
                y: controlY + controlH,
                x: controlX
            }, $allItems, opts).first();
            returnObj.bounced = true;
            return returnObj;
        }

        $filteredItems = $($allItems.slice(index + 1, $allItems.length));

        returnObj.item = func({
            y: controlY + controlH,
            x: controlX + 22
        }, $filteredItems, opts).first();

        //At the end of a list
        if (returnObj.item.length === 0 || returnObj.item.offset().top < controlY) {
            $reqItem = jQuery.furthest({
                y: controlY + controlH,
                x: controlX
            }, $allItems, opts).first();
            returnObj.item = $reqItem;
        }

        return returnObj;
    }
};

ControlGetters.GetControlFunctionMap = { LEFT: ControlGetters.getControlImmediatelyToTheLeftOf, UP: ControlGetters.getControlImeediatelyOnTopOf, RIGHT: ControlGetters.getControlImmediatelyToTheRightOf, DOWN: ControlGetters.getControlImmediatelyBelow };