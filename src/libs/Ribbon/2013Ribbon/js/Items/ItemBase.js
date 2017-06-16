namespace("ItemGenerators");

ItemGenerators.ItemBase = Base.extend({
    $itemXml: null,
    type: null,
    $item: null,
    PartGetters: null,

    addNavigationHover: function ($item) {
        this.getHoverItems($item).addClass("hovered");
    },

    addNavigationHoverOnParentItemOnly: function($item){
        this.getHoverItemsForParentItemOnly($item).addClass("hovered");
    },
    removeNavigationHover: function ($item) {
        this.getHoverItems($item).removeClass("hovered");
    },

    getHoverItems: function ($control) {
        var $itemsToBeHovered = $();
        if ($control.is(".office-hover-default")) {
            $itemsToBeHovered = $itemsToBeHovered.add($control);
        }
        $itemsToBeHovered = $itemsToBeHovered.add($control.find(".office-hover-default:visible"));

        return $itemsToBeHovered;
    },

    getHoverItemsForParentItemOnly: function($control){
        var $itemsToBeHovered = $();
        if ($control.is(".office-hover-default")) {
            $itemsToBeHovered = $itemsToBeHovered.add($control);
        }
        return $itemsToBeHovered;
    },

    getItemForStandardKey: function ($item, key) {

        var $itemWrappers = $item.parents(".dropdown-items-wrapper").filter(function () {
            return $(this).parent().is(".dropdown-next-level-wrapper") || $(this).parent().is(".combobox-dropdown") || $(this).is(".gallery-items");
        });

        var $dropdown = $itemWrappers.first();
        var $itemsToLoopfrom = $dropdown.find(".dropdown-item:visible:not(.disabled)").not(".exclude_from_loop");
        var itemInfo = ControlGetters.GetControlFunctionMap[key]($item, $itemsToLoopfrom, true);
        if (itemInfo.item.length === 0) {
            itemInfo.item = ControlGetters.GetControlFunctionMap[key]($item, $itemsToLoopfrom, true, true);
            itemInfo.bounced = true;
        }

        var $newItem = itemInfo.item;
        var scrollableDiv = $newItem.parents(".items-scrollable");
        var itemHeight = $newItem.height();
        if (itemHeight == 0) {
            itemHeight = $newItem.find(".icon-binder").height();
        }


        if (scrollableDiv.length > 0 && ($item.offset().top != $newItem.offset().top)) {

            var itemTopPos = $newItem.offset().top;
            var divTopPos = scrollableDiv.offset().top;

            var newScrollTopVal = itemTopPos - divTopPos;

            if (itemTopPos > divTopPos + scrollableDiv.outerHeight() - (2 * itemHeight + 20)) {

                newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + 2 * itemHeight + scrollableDiv.scrollTop() + 20;
                scrollableDiv.scrollTop(newScrollTopVal);
            }
            else if (itemTopPos < divTopPos + (2 * itemHeight + 20)) {

                newScrollTopVal = divTopPos - itemTopPos - scrollableDiv.scrollTop() - (2 * itemHeight + 20);

                scrollableDiv.scrollTop(newScrollTopVal);
            }
        }

        var scrollableDiv = $newItem.parents(".items-font");
        if (scrollableDiv.length > 0 && ($item.offset().top != $newItem.offset().top)) {

            var itemTopPos = $newItem.offset().top;
            var divTopPos = scrollableDiv.offset().top;

            var newScrollTopVal = itemTopPos - divTopPos;

            if (itemTopPos > divTopPos + scrollableDiv.outerHeight() - $newItem.height()) {

                newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + $newItem.height() + scrollableDiv.scrollTop() + 20;
                scrollableDiv.scrollTop(newScrollTopVal);
            }
            else if (itemTopPos < divTopPos + $newItem.height()) {

                newScrollTopVal = divTopPos - itemTopPos - scrollableDiv.scrollTop() + 20;
                newScrollTopVal = Math.abs(newScrollTopVal);
                scrollableDiv.scrollTop(newScrollTopVal);
            }
        }

        return itemInfo;
    },

    ShowContextMenu: function ($item) {
        var $parentWrapper = $item.parents(".dropdown-items-wrapper:first");

        if ($item.data("contextMenuId") != undefined && $item.data("contextMenuId") != null) {
            $item.data("sendPos", true);
            $item.showContextMenu($item.data("contextMenuId"));            
            return true;
        }
        else if ($parentWrapper.data("contextMenuId") != null || $parentWrapper.data("contextMenuId") != undefined) {
            if ($item.data("cmEventId") != undefined)
                $parentWrapper.data("cmEventId", $item.data("cmEventId"));
            else
                $parentWrapper.data("cmEventId", null);
            $parentWrapper.data("sendPos", true);
            $parentWrapper.showContextMenu($parentWrapper.data("contextMenuId"));
            return true;
        }
        else {
            $parentWrapper.data("cmEventId", null);
            return false;
        }
    },


    getNextTabItem: function ($item) {
        var $currentDropdown = $item.closest(".dropdown-next-level-wrapper,.combobox-dropdown, .gallery-items-expanded");
        var exclude = ".item-type-separator";
        var include = ".dropdown-item:not(.disabled)";

        var $itemsToLoopfrom = $currentDropdown.find(include).not(exclude);

        var currentIndex = ((($itemsToLoopfrom.index($item)) + 1) % $itemsToLoopfrom.length);
        var startIndex = currentIndex;
        var $tabItem = $($itemsToLoopfrom[currentIndex]);

        while ($tabItem.is(":hidden")) {
            currentIndex = (currentIndex + 1) % $itemsToLoopfrom.length;
            if(currentIndex == startIndex)
                    return null;
            $tabItem = $($itemsToLoopfrom[currentIndex]);

        }

        var scrollableDiv = $tabItem.parents(".items-scrollable");

        if (scrollableDiv.length > 0) {

            var itemTopPos = $tabItem.offset().top;
            var divTopPos = scrollableDiv.offset().top;

            var newScrollTopVal = itemTopPos - divTopPos;

            if (itemTopPos > divTopPos + scrollableDiv.outerHeight()) {

                newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + $tabItem.outerHeight() + scrollableDiv.scrollTop() + 20;
                scrollableDiv.scrollTop(newScrollTopVal);
            }
            else if (itemTopPos < divTopPos) {

                newScrollTopVal = divTopPos - itemTopPos - scrollableDiv.scrollTop();

                scrollableDiv.scrollTop(newScrollTopVal);
            }
        }

        var scrollableDiv = $tabItem.parents(".items-font");

        if (scrollableDiv.length > 0) {

            var itemTopPos = $tabItem.offset().top;
            var divTopPos = scrollableDiv.offset().top;

            var newScrollTopVal = itemTopPos - divTopPos;

            if (itemTopPos > divTopPos + scrollableDiv.outerHeight()) {

                newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + $tabItem.outerHeight() + scrollableDiv.scrollTop() + 20;
                scrollableDiv.scrollTop(newScrollTopVal);
            }
            else if (itemTopPos < divTopPos) {

                newScrollTopVal = divTopPos - itemTopPos - scrollableDiv.scrollTop();
                newScrollTopVal = Math.abs(newScrollTopVal);
                scrollableDiv.scrollTop(newScrollTopVal);
            }
        }

        return $tabItem;


    },

    //Fix for KL032
    getPreviousTabItem: function ($item) {
        var $currentDropdown = $item.closest(".dropdown-next-level-wrapper,.combobox-dropdown, .gallery-items-expanded");
        var exclude = ".item-type-separator";
        var include = ".dropdown-item:not(.disabled)";

        var $itemsToLoopfrom = $currentDropdown.find(include).not(exclude);

        var currentIndex = $itemsToLoopfrom.index($item);
        var startIndex = currentIndex;
        currentIndex = currentIndex - 1;
        if (currentIndex < 0) {
            currentIndex = $itemsToLoopfrom.length - 1;
        }
        var $tabItem = $($itemsToLoopfrom[currentIndex]);

        while ($tabItem.is(":hidden")) {
            currentIndex = currentIndex - 1;

            if (currentIndex == startIndex) {
                return null;
            }

            if (currentIndex < 0) {
                currentIndex = $itemsToLoopfrom.length - 1;
            }
            var $tabItem = $($itemsToLoopfrom[currentIndex]);

        }

        var scrollableDiv = $tabItem.parents(".items-scrollable");

        if (scrollableDiv.length > 0) {
            if ($tabItem.hasClass("item-type-imageitem")) {
                var $imgdiv = $tabItem.find(".icon-wrapper").length > 0 ? $tabItem.find(".icon-wrapper") : $tabItem.find(".icon-binder").parent();
                var itemTopPos = $imgdiv.offset().top;
                var divTopPos = scrollableDiv.offset().top;

                var newScrollTopVal = itemTopPos - divTopPos;

                if (itemTopPos > divTopPos + scrollableDiv.outerHeight()) {

                    newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + $imgdiv.outerHeight() + scrollableDiv.scrollTop();
                    scrollableDiv.scrollTop(newScrollTopVal);
                }
                else if (itemTopPos < divTopPos) {
                    newScrollTopVal = scrollableDiv.scrollTop() - $imgdiv.outerHeight();
                    scrollableDiv.scrollTop(newScrollTopVal);
                }
            }
            else {
                var itemTopPos = $tabItem.offset().top;
                var divTopPos = scrollableDiv.offset().top;

                var newScrollTopVal = itemTopPos - divTopPos;

                if (itemTopPos > divTopPos + scrollableDiv.outerHeight()) {

                    newScrollTopVal = itemTopPos - (divTopPos + scrollableDiv.height()) + $tabItem.outerHeight() + scrollableDiv.scrollTop();
                    scrollableDiv.scrollTop(newScrollTopVal);
                }
                else if (itemTopPos < divTopPos) {
                    newScrollTopVal = scrollableDiv.scrollTop() - divTopPos + itemTopPos;
                    scrollableDiv.scrollTop(newScrollTopVal);
                }
            }
        }

        return $tabItem;


    },

    handleStandardKey: function ($item, key) {
        if (key === "ENTER" || key === "RIGHT" && $item.find('.dropdown-next-level-wrapper:first').length > 0) {
            this.handleAccessKey($item, key);
            return true;
        }
        return false;
    },
    handleAccessKey: function ($item, key) {
        var $subItems = $item.find('.dropdown-next-level-wrapper:first');
        if (key === "ESCAPE") {
            $subItems.hide();
        }

        else if ($subItems.length > 0) {
            ControlGenerators.ItemsGenerator.prototype.showSubItems($item, $subItems);
            //$subItems.first().fadeIn(200);
        }
        else {
            this.fireEventOnParentControl.apply($item, [{ data: {self: this}}]);
            return true;
        }
    },
    Init: function ($itemXml) {
        //Disabled handling
        var className = 'dropdown-item office-hover-default Sim5-ContextMenuItem';
        if ($itemXml.getTrueOrFalse('disabled')) {
            className = 'dropdown-item disabled';
        }

        var $item = UIUtils.getUnselectableDiv('', className);

        this.AddCustomClassName($item, $itemXml);

        this.AddTooltip($item, $itemXml);

        this.PartGetters = ['getItemTextPart'];

        return $item;
    },

    AddTooltip: function ($item, $itemXml) {
        var tooltipText = $itemXml.attr("tooltip");

        if ($itemXml.children('tooltips').length > 0) {
            var xToolTip = null;
            xToolTip = $itemXml.find('tooltips tooltip');
            $item.addTooltip(xToolTip);
        }
        else if (tooltipText) {
            $item.attr("title", tooltipText);
        }
    },

    AddCustomClassName: function ($item, $itemXml) {
        var className = $itemXml.attr("classname");
        if (className) {
            $item.addClass(className);
        }
    },

    AttachKeyboardShortcutHolders: function ($item, $itemXml) {
        var shortCut = $itemXml.attr("ak");
        if (shortCut != null && shortCut.length > 0) {
            $item.addShortCut(shortCut);
        }
    },
    MakeItem: function ($item, $itemXml, contextMenuType) {
        for (var i = 0; i < this.PartGetters.length; i++) {
            if (this[this.PartGetters[i]] != null) {
                $item.append(this[this.PartGetters[i]]($itemXml));
            }
        }

        this.AddSeprator($item, $itemXml);

        this.AddSubItemArrow($item);

        this.AttachData($item, $itemXml, 'eventId');

        this.AttachData($item, $itemXml, 'ICMessageId');

        this.AttachData($item, $itemXml, 'itemValue');

        this.AttachData($item, $itemXml, 'cmEventId');

        this.AttachData($item, $itemXml, 'ImageItemText');

        this.AttachItemType($item);

        this.AddFunctionality($item);

        this.AttachKeyboardShortcutHolders($item, $itemXml);

        this.BlockRightClick($item);

        if (contextMenuType !== "JSON") {  // this check was added so that old context menu does not gets attached if menuType attribute is given in ribbon.xml.
            this.AddContextMenu($item, $itemXml);
        }

        this.AddClickstreamInfo($item, $itemXml);
    },

    AddSeprator: function($item, $itemXml){
        //default Separator
        if ($itemXml.attr('separator') == 'true') {
            $item.addClass('dropdown-item-text-separator');
        }

        //dashed seperator
        else if ($itemXml.attr('separator') == 'dashed') {
            $item.addClass('dropdown-item-text-separator-dashed');
        }
    },
    AddContextMenu: function ($item, $itemXml) {
        var xContextMenu = $itemXml.children("contextmenu").children("items").first();

        if (xContextMenu.length > 0) {
            var $contextMenu = ControlGenerators.ItemsGenerator.prototype.GetItems(xContextMenu);

            $contextMenu.addClass("contextMenu combobox-dropdown");
            //$contextMenu.attr('id', "ribbon-cm-" + this.$controlXml.attr('text').removeSpaces());

            $item.append($contextMenu);

            this.bindContextMenu($contextMenu, $item);
        }



        /*if( $item.data('eventId')!=null && $item!=null && args)
        {
        if($itemXml.attr("cmData"))
        {
        var contextMenuData = $.parseJSON($itemXml.attr("cmData"));
        $item.data("contextMenuId", $item.data('eventId')+this.$item.index());
        $item.addContextMenu($item.data("contextMenuId"), contextMenuData, this.ContextMenuCallback, this, contextMenuTheme.EXCEL, menuTypes.genericContextMenu, contextMenuLocation.LEFT_BOTTOM);
        }
        else if(args[0] != undefined)
        {
        var contextMenuData = $.parseJSON(args[0]);
        $item.data("contextMenuId", args[1]);
        $item.addContextMenu($item.data("contextMenuId"), contextMenuData, this.ContextMenuCallback, this, contextMenuTheme.EXCEL, menuTypes.genericContextMenu, contextMenuLocation.LEFT_BOTTOM);
        }

        } */

    },

    bindContextMenu: function ($contextMenu, $item) {
        $item.contextMenu({
            $menu: $contextMenu,
            //captureClickFor: captureClick,
            //doNotHideOnClickOf: '.shyToolBarInside',
            //shyToolBar: '.shyToolBarInside',
            inSpeed: 25,
            outSpeed: 50
        });
    },

    /*ContextMenuCallback: function (args) {
    var currentTargetElement = args[0];
    var responseEvent = args[1];

    switch (responseEvent.type) {
    case callBackType.CALLBACK_ON_SELECTION:
    this.fireContextMenuEvent(currentTargetElement.data("cmEventId"),responseEvent.desc);
    break;

    case callBackType.CALLBACK_ON_FOCUS:

    break;

    case callBackType.CALLBACK_ON_HIDE:

    break;

    case callBackType.CUSTOMIZATION_REQUEST:
    if(currentTargetElement.data("sendPos")== true)
    {
    currentTargetElement.data("sendPos",false);

    var customizationResponse = {

    posDim: {
    x : currentTargetElement.offset().left,
    y : currentTargetElement.offset().top,
    targetH : 10,
    targetW : 10
    }

    };
    return customizationResponse;
    }
    break;

    default:
    break;
    }
    },*/

    BlockRightClick: function ($item) {
        $item.bind("contextmenu", function (e) {
            //e.stopPropagation();
            e.preventDefault();

        });
    },

    AddSubItemArrow: function ($item) {
        var icondiv = UIUtils.getUnselectableDiv('', 'dropdown-item-nextlevel-arrow');
        var icon = getRightArrow();
        $(icondiv).append(icon);
        $item.append(icondiv);
    },

    AttachItemType: function ($item) {
        $item.data("itemType", this.type);
    },
    AttachData: function ($item, $itemXml, dataId) {
        var eventId = $itemXml.attr(dataId);
        if (eventId != null && !Polyfills.isEmpty(eventId)) {
            $item.data(dataId, eventId);
        }
    },
    AddFunctionality: function ($item) {
        var self = this;
        $item.click({self: self},this.fireEventOnParentControl);
        $item.mousedown(function (e) { e.preventDefault(); });
    },
    fireEventOnParentControl: function (e) {
        var $this = $(this);

        var self = e.data.self;
        var evt = e; //Backup of the e object
        var clickstreamInfo = "";

        if (!(e instanceof $.Event)) {
            e = null; //To bypass if (e) conditions in case e is not a jQuery event object
        }
        var dropdownItemWrapper = $this.find(".dropdown-next-level-wrapper:first .dropdown-items-wrapper");
        
        //added on 25.9.2013 so as to prevent triggering "selectedIndexChanged" event (hence INCORRECT ACTION) when item with sub items is clicked....
        if ($this.is(".dropdown-item") && $this.find(".dropdown-next-level-wrapper:first .dropdown-items-wrapper").children(".dropdown-item").length != 0) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        //added on 22 jan 2016 as a fix for following issue SO-27063. Gallery shape Item does not have dropdown item as it immediate children. Therefore checking if item is gallery shape and has dropdown item anywhere inside it. 
        else if ($this.is(".dropdown-item") && dropdownItemWrapper.children(".GalleryShape").length != 0 && dropdownItemWrapper.find(".dropdown-item").length != 0) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        else {
            var $gallery = $this.parents(".ctrl-gallery");
            if ($gallery.length > 0) {
                $gallery.trigger("itemSelected");
            }

            ControlGenerators.ComboBox.prototype.DropdownCloser.call();
            $(".dropdown-next-level-wrapper, .combobox-dropdown").hide();

            if (e) {
                e.stopPropagation();
            }
            var $this = $(this);
            var itemText = "";

            var $comboBox = $this.closest(".office-control");

            if ($comboBox.length == 0) {
                $comboBox = $this.closest(".combobox-dropdown");
            }

            if ($comboBox.length == 0) {
                $comboBox = $this.closest(".ribbon");
            }

            if ($this.is(".dropdown-item")) {
                itemText = $this.text();
                clickstreamInfo += self.GetClickstreamInfo($this, evt);
            }
            else if ($this.is(".dropdown-image-item")) {
                itemText = $this.data('imageName');
            }
            var eventId = $this.data('eventId');
            var ICMessageId = $this.data('ICMessageId');
            var itemValue = $this.data('itemValue');

            //get click stream of parent drop down items if any 
            var $parentDropdownItems = $this.parentsUntil(".office-control").filter(".dropdown-item");
            if($parentDropdownItems.length > 0) {
                clickstreamInfo = $parentDropdownItems.eq(0).data('clickstreamInfo') + " : " + clickstreamInfo;
            }

            var controlClickstreamInfo = $comboBox.data('clickstreamInfo');
            controlClickstreamInfo =controlClickstreamInfo ? controlClickstreamInfo + " : " : "";
            clickstreamInfo = controlClickstreamInfo + clickstreamInfo;
            $comboBox.trigger('selectedIndexChanged', [itemText, eventId, ICMessageId, itemValue, clickstreamInfo]);
        }

    },

    /*fireContextMenuEvent: function (cmEventId, desc) {

    var $this = $(this);
    var $gallery = $this.parents(".ctrl-gallery");

    if ($gallery.length > 0) {
    $gallery.trigger("itemSelected");
    }

    ControlGenerators.ComboBox.prototype.DropdownCloser.call();
    $(".dropdown-next-level-wrapper, .combobox-dropdown").hide();


    var $this = this.$item;

    var $comboBox = $this.closest(".office-control");

    if ($comboBox.length == 0) {
    $comboBox = $this.closest(".combobox-dropdown");
    }

    if ($comboBox.length == 0) {
    $comboBox = $this.closest(".ribbon");
    }
    $comboBox.trigger('selectedIndexChanged', ["Context menu item clicked", cmEventId,null , desc]);


    },*/


    getItemTextPart: function ($itemXml) {
        var itemText = $itemXml.attr('text');
        var $text = UIUtils.getUnselectableDiv('', 'dropdown-item-text');

        //Done for fixing SO-11199
        //default Separator
        // if ($itemXml.attr('separator') == 'true') {
        //     $text.addClass(' dropdown-item-text-separator');
        // }

        // //dashed seperator
        // else if ($itemXml.attr('separator') == 'dashed') {
        //     $text.addClass(' dropdown-item-text-separator-dashed');
        // }

        $text.text(itemText);
        return $text;
    },
    getItem: function (xItem, type, contextMenuType) {
        var $itemXml = $(xItem);
        this.type = type;
        var $item = this.Init($itemXml);
        this.MakeItem($item, $itemXml, contextMenuType);

        this.$item = $item;
        //add ids - required for practice mode
        if ($itemXml.attr('id') && $item.attr("id") == null)        //avoid overriding already assigned ids
        {
            $item.attr("id", $itemXml.attr('id'));
        }

        return $item;
    },

    //To add clickstream info for items in the data of the item
    AddClickstreamInfo: function ($item, $itemXml) {
       $item.data('clickstreamInfo', ($itemXml.attr('text') || ""));
    },

    //To extract clickstream info
    GetClickstreamInfo: function ($item, e) {
        return ($item.data('clickstreamInfo') || "");
    }
});