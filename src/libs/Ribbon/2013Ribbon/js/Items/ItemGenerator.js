namespace("ControlGenerators");

ControlGenerators.ItemsGenerator = function () {};
ControlGenerators.ItemsGenerator.prototype.Default = function () { };
ControlGenerators.ItemsGenerator.prototype.GetItems = function (xItems, parentType) {
    var children = $(xItems).children();

    //Get type
    var currentType = this.GetItemType(xItems, parentType);

    //$(xItems).attr('type') == null ? parentType : $(xItems).attr('type');
    //currentType = currentType == null ? 'Default' : currentType;
    var itemHt;
    //Wrapper
    var $items = UIUtils.getUnselectableDiv('', 'dropdown-items-wrapper items-' + currentType.toLowerCase());
    if ($(xItems).attr('wd') != null) {
        $items.css('width', $(xItems).attr('wd'));
    }

    if ($(xItems).attr('ht') != null) {
        itemHt = $(xItems).attr('ht');
    }

    //added on 15th May 2013. This can be used where items wrapper should be scrollable. Takes value from ribbon xml
    if ($(xItems).attr('max-height') != null) {
        var itemMaxHt = $(xItems).attr('max-height');
        $items.css('max-height', itemMaxHt);
    }
    
//    else {
//        itemHt = '24px';
//    }
    var $itemsText = $(xItems).attr('text');

    if ($itemsText != null) {
        $items.append($itemsText);
    }

    var contextMenuId = $(xItems).attr('menuId');
    var id = $(xItems).attr('id');

    this.InitializeFlags(xItems);

    for (var i = 0; i < children.length; i++) {
        var currentChild = children[i];
        var tagName = $(currentChild).tagName().toLowerCase();
        var type = this.GetItemType(currentChild, currentType);
        if (tagName == 'items') {
            $items.append(this.GetItems(currentChild, type));
        }
        else if (tagName == 'item') {
            var itemdiv = this.GetItem(currentChild, type);
            itemdiv.css('height', itemHt);
            $items.append(itemdiv);
        }
    }

    if($(xItems).attr('resizeHandles')){
        var $resizehandle = UIUtils.getUnselectableDiv('', 'dropdown-items-resize-handle');
        var $resizehanlerItem = UIUtils.getUnselectableDiv('', 'dropdown-items-resize-handleItem ' + $(xItems).attr('resizeHandles'));
        $resizehanlerItem.append($resizehandle);
        $items.append($resizehanlerItem);
    }

    if (this.ContextMenuType == "JSON") {
        if (contextMenuId) {
            $items.data("contextMenuId", contextMenuId);
            if (id) {
                $items.attr("id", id);
            }
            $(xItems).trigger("AddJSONCM", { MenuId: contextMenuId });
        }

        $items.on("mousedown", ".dropdown-item", function (e) {

            //added this flag to stop dropdown sub items from hiding when right clicked
            //because of the hover event binded on line 254 which hides the sub menu when mouseout happens.
            //The bug was that the mouseout was getting called when right clicked on any sub menu item. Mainly done to save from regression from unbinding and repeat binding of events.
            if (e.button == 2) // Right click
            {
                $items.parents(".dropdown-next-level-wrapper:first").data("noHide", true);   //Don't hide sub menu items when context menu is shown
            }
            else {
                $items.parents(".dropdown-next-level-wrapper:first").data("noHide", false);
            }


        });
    }
    else {
    if(contextMenuId && id)     //check if there is context menu and id for the wrapper
    {
      var jsonPath = "app/comps/Common/Ribbon/json/contextmenu/menu.json";

      if($(xItems).attr('jsonPath'))
      jsonPath = $(xItems).attr('jsonPath');

       var jsonData;

        $.ajax({
            url: jsonPath,
            async: false,
            dataType: 'json',
            success: function (data) {
                jsonData = data;
            }
        });

        //contextMenuData = $.parseJSON(contextMenuData);
        $items.data("contextMenuId",contextMenuId);
        $items.attr("id",id);
        $items.addContextMenu(contextMenuId,jsonData[contextMenuId][0], this.ContextMenuCallback, this, contextMenuTheme[gRibbonCMTheme.toString().toUpperCase()], menuTypes.genericContextMenu, contextMenuLocation.LEFT_BOTTOM);

        $items.on("mousedown",".dropdown-item",function(e)
        {
            if($(this).data("cmEventId")!=undefined)
                $items.data("cmEventId",$(this).data("cmEventId"));
            else
                $items.data("cmEventId",null);

            //added this flag to stop dropdown sub items from hiding when right clicked
            //because of the hover event binded on line 254 which hides the sub menu when mouseout happens.
            //The bug was that the mouseout was getting called when right clicked on any sub menu item. Mainly done to save from regression from unbinding and repeat binding of events.
            if(e.button == 2) // Right click
            {
                $items.parents(".dropdown-next-level-wrapper:first").data("noHide",true);   //Don't hide sub menu items when context menu is shown
            }
            else
            {
                $items.parents(".dropdown-next-level-wrapper:first").data("noHide",false);
            }


        });



    }

    //added to stop showing context menu on items which are not required
    $items.bind("contextmenu", function (e) {
        e.stopPropagation();

    });

    }
    return $items;

};

ControlGenerators.ItemsGenerator.prototype.InitializeFlags = function(xItems)
{
    // Fix for SIMS-121413
    //note that this.ContextMenuType is static, so it must be updated everytime here to avoid conflict if two ribbons esp. from different applications are open side by side.
    this.ContextMenuType = $(xItems).closest('ribbon').attr('menutype') || null;
};


ControlGenerators.ItemsGenerator.prototype.ContextMenuCallback = function (args) {
    var currentTargetElement = args[0];
    var responseEvent = args[1];

    switch (responseEvent.type) {
        case callBackType.CALLBACK_ON_SELECTION:
            this.fireContextMenuEvent(currentTargetElement.data("cmEventId"), responseEvent.id, responseEvent.desc, currentTargetElement);
            break;

        case callBackType.CALLBACK_ON_FOCUS:

            break;

        case callBackType.CALLBACK_ON_HIDE:

            break;

        case callBackType.CUSTOMIZATION_REQUEST:
            if (currentTargetElement.data("sendPos") == true) {
                currentTargetElement.data("sendPos", false);

                var selectedElement = currentTargetElement.find(".dropdown-item.hovered:first");
                var selectedItem = currentTargetElement.hasClass("dropdown-item")==true ? currentTargetElement : selectedElement;

                var customizationResponse = {

                    posDim: {
                        x: selectedItem.length > 0 ? selectedItem.offset().left : currentTargetElement.offset().left,
                        y: selectedItem.length > 0 ? selectedItem.offset().top : currentTargetElement.offset().top,
                        targetH: selectedItem.height() != 0 ? selectedItem.height() : 10,
                        targetW: selectedItem.width() != 0 ? selectedItem.width() : 10
                    }

                };
                return customizationResponse;
            }
            break;

        default:
            break;
    }
};


ControlGenerators.ItemsGenerator.prototype.fireContextMenuEvent = function (cmEventId, index, desc, currentTargetElement) {


    var $this = currentTargetElement;

    var $gallery = $this.parents(".ctrl-gallery:first");

    if ($gallery.length > 0) {
        $gallery.trigger("itemSelected");
    }
    else{
        ControlGenerators.ComboBox.prototype.DropdownCloser.call();
    }

    //to close sub item dropdown items
    $(".dropdown-next-level-wrapper, .combobox-dropdown").hide();
    var $comboBox = $this.closest(".office-control");

    if ($comboBox.length == 0) {
        $comboBox = $this.closest(".combobox-dropdown");
    }

    if ($comboBox.length == 0) {
        $comboBox = $this.closest(".ribbon");
    }

    $comboBox.trigger('selectedIndexChanged', ["Context menu item " + desc + " clicked", cmEventId, null , {"cmIndex":index}]);


};


ControlGenerators.ItemsGenerator.prototype.ShowContextMenu = function($items)
{
    $items.data("sendPos",true);
    $items.showContextMenu($items.data("contextMenuId"));
};


ControlGenerators.ItemsGenerator.prototype.GetItemType = function (xItemNode, parentType) {

    var currentType = $(xItemNode).attr('type');
    if (currentType == null) {
        if (parentType != null) {
            currentType = parentType;
        }
        else {
            currentType = "Default";
        }
    }
    return currentType;
};

ControlGenerators.ItemsGenerator.prototype.GetItemTypeGeneratorIstance = function(type){
    var generator = ItemGenerators[type];
    return generator;
};

ControlGenerators.ItemsGenerator.prototype.GenerateItem = function(generator, xItem, type){
    // this.ContextMenuType is passed to identify if the item is using new JSON CM approach or not ( this was needed in makeItem function in itembase.js )
    var $itemDiv = generator.prototype.getItem(xItem, type, this.ContextMenuType);
    return $itemDiv;
};
ControlGenerators.ItemsGenerator.prototype.GetItem = function (xItem, type, ht) {
    var $xItem = $(xItem);
    var generator = this.GetItemTypeGeneratorIstance(type);
    var $itemDiv = this.GenerateItem(generator, xItem, type);  
    $itemDiv.addClass('item-type-' + type.toLowerCase());

    if ($xItem.attr('hassubitems') != null && $xItem.attr('hassubitems') == 'true') {
        //first make the arrow visible
        $itemDiv.find('.dropdown-item-nextlevel-arrow').css('visibility', 'visible');

        var xItemsNode = $xItem.children('items');
        var $nextLevelDivWrapper = UIUtils.getUnselectableDiv('', 'dropdown-next-level-wrapper');
        $itemDiv.append($nextLevelDivWrapper);


        var $nextLevelDiv = this.GetItems(xItemsNode, this.GetItemType(xItemsNode));
        $nextLevelDivWrapper.append($nextLevelDiv);
        if ($itemDiv.width() != 0) {
            $nextLevelDivWrapper.css('left', $itemDiv.width());
        }
        else {
            //to be set according to width of parent div later.
            //$nextLevelDivWrapper.css('left', '140px');
        }


        $nextLevelDivWrapper.css('position', 'absolute').hide();
        //this.PlaceNextLevelDiv($itemDiv, $nextLevelDivWrapper);

        this.attachHoverFunctionality($itemDiv, $nextLevelDivWrapper);


    }

    var contextMenuId = $(xItem).attr('menuId');
    var id = $(xItem).attr('id');
    var cmevent = $(xItem).attr('cmEventId');


    if (this.ContextMenuType == "JSON")    //checking f if new context menu is to be used or not
    {
        if (contextMenuId) {
            $itemDiv.data("contextMenuId", contextMenuId);
            $(xItem).trigger("AddJSONCM", { MenuId: contextMenuId });
        }

        if (cmevent != null)   //avoid overriding already assigned ids
        {
            $itemDiv.data("cmevent", cmevent);
        }

        $itemDiv.on("mousedown", function (e) {

            //added this flag to stop dropdown sub items from hiding when right clicked
            //because of the hover event binded on line 254 which hides the sub menu when mouseout happens.
            //The bug was that the mouseout was getting called when right clicked on any sub menu item. Mainly done to save from regression from unbinding and repeat binding of events.
            if (e.button == 2) // Right click
            {
                $itemDiv.parents(".dropdown-next-level-wrapper:first").data("noHide", true);   //Don't hide sub menu items when context menu is shown
            }
            else {
                $itemDiv.parents(".dropdown-next-level-wrapper:first").data("noHide", false);
            }


        });
    }
    else {
        if (contextMenuId && id)     //check if there is context menu and id for the wrapper
        {
        var jsonPath = "app/comps/Common/Ribbon/json/contextmenu/menu.json";

        if ($(xItem).attr('jsonPath'))
            jsonPath = $(xItem).attr('jsonPath');

        var jsonData;

        $.ajax({
            url: jsonPath,
            async: false,
            dataType: 'json',
            success: function (data) {
                jsonData = data;
            }
        });

        //contextMenuData = $.parseJSON(contextMenuData);

        $itemDiv.data("contextMenuId", contextMenuId);
        $itemDiv.data("cmEventId", cmevent);
        $itemDiv.attr("id", id);
        $itemDiv.addContextMenu(contextMenuId, jsonData[contextMenuId][0], this.ContextMenuCallback, this, contextMenuTheme[gRibbonCMTheme.toString().toUpperCase()], menuTypes.genericContextMenu, contextMenuLocation.LEFT_BOTTOM);

        $itemDiv.on("mousedown", function (e) {
            if ($(this).data("cmEventId") == undefined)
                $itemDiv.data("cmEventId", null);

            //added this flag to stop dropdown sub items from hiding when right clicked
            //because of the hover event binded on line 254 which hides the sub menu when mouseout happens.
            //The bug was that the mouseout was getting called when right clicked on any sub menu item. Mainly done to save from regression from unbinding and repeat binding of events.
            if (e.button == 2) // Right click
            {
                $itemDiv.parents(".dropdown-next-level-wrapper:first").data("noHide", true);   //Don't hide sub menu items when context menu is shown
            }
            else {
                $itemDiv.parents(".dropdown-next-level-wrapper:first").data("noHide", false);
            }


        });

        }

    }

    return $itemDiv;
};

ControlGenerators.ItemsGenerator.prototype.attachHoverFunctionality = function ($itemDiv, $nextLevelDivWrapper) {
    var self = this;
    $itemDiv.hover(function () {
        self.showSubItems($itemDiv, $nextLevelDivWrapper);
        $nextLevelDivWrapper.data("noHide",false);
    },
         function () {
             if (!$nextLevelDivWrapper.data("noHide")) {

                 //Fix for SIMS-107122: adding delay otherwise sub menu hides before user reaches it in lower resolution
                 //$nextLevelDivWrapper.hide();
                 setTimeout(function () {
                     if (!$itemDiv.is(":hover") && !$nextLevelDivWrapper.is(":hover")) {
                         $nextLevelDivWrapper.hide();
                     }
                 }, 200);
                 self.FireSubDropdownVisibilityEvent($itemDiv,"hide");
             }
         });
};

ControlGenerators.ItemsGenerator.prototype.showSubItems = function ($itemDiv, $nextLevelDivWrapper) {
    //var top = $itemDiv.position().top;
    //$nextLevelDivWrapper.css('top', top);

    //$itemDiv.siblings().children(".dropdown-next-level-wrapper").hide();
    this.FireSubDropdownVisibilityEvent($itemDiv,"show");

    $nextLevelDivWrapper.fadeIn(200)
        .css('top', "0px");    //fixing SIMS-107122: issue - position calculation has a bug that once overflow is applied, next time when same sub menu is displayed its position is not recalculated.

    //handling Vertical Overflow
    var overflow = UIUtils.getVerticalOverflow($nextLevelDivWrapper, SIMS.Objects.DOMElements.SIMArea);

    if (overflow > 0) {
        $nextLevelDivWrapper.css('top', "-=" + overflow);
    }

    //check for gallery
    var isGallerySubItem = $itemDiv.parents(".office-control:first").hasClass("ctrl-gallery");
    if(isGallerySubItem)
    {
        //adjust left
        $nextLevelDivWrapper.css("left",$itemDiv.outerWidth());
    }

    //Handling horizontal overflow
    overflow = UIUtils.getHorizontalOverflow($nextLevelDivWrapper, SIMS.Objects.DOMElements.SIMArea);
    if (overflow > 0) {
        if(!isGallerySubItem)
        {
            $nextLevelDivWrapper.css('right', "100%");
        }
        else
        {
            var shiftLeft = parseInt($nextLevelDivWrapper.css("left")) - ($itemDiv.outerWidth() + $nextLevelDivWrapper.outerWidth());
            $nextLevelDivWrapper.css("left",shiftLeft + "px");
        }
    }

};

ControlGenerators.ItemsGenerator.prototype.PlaceNextLevelDiv = function ($itemDiv, $nextLevelDiv) {
    var currItemDivLeftPosition = $itemDiv.position().left;
    var currItemDivTopPosition = $itemDiv.position().top;

    var nextLevelDivtop = currItemDivTopPosition;
    var nextLevelDivLeft = currItemDivLeftPosition + 135 + "px";

    $nextLevelDiv.css('top', nextLevelDivtop);
    $nextLevelDiv.css('left', nextLevelDivLeft);
};


ControlGenerators.ItemsGenerator.prototype.FireSubDropdownVisibilityEvent = function ($itemDiv, eventType) {
};
