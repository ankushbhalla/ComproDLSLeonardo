namespace("ItemGenerators");

ItemGenerators.ColorPicker = ItemGenerators.ItemBase.extend({
    Init: function ($itemXml) {
        var $item = this.base($itemXml);
        this.PartGetters = ['getControl'];

        return $item;
    },

    AddSubItemArrow: function () {
    },


    getNextTabItem: function ($item) {
        return this.getItemForStandardKey($item, "TAB");
    },



    getItemForStandardKey: function ($item, key) {
        //Local variable required for your controls will be declared here

        if ($($item).data("goToNext") == true) {
            $($item).data("goToNext", false);

            if (key == "TAB" || key == "SHIFT+TAB") {
                return this.tabToNext($item);
            }
            else {
                return this.navigateToNext($item, key);
            }
        }

        var $control = $($item).find(".sims-ColorGrid").first();
        var colorGridType = $control.data('colorGridType');
        var currIndex = 1;
        var nextIndex = 2;
        var colorPickerManipulator = this.manipulatorFactory.getManipulator($control);


        if (colorGridType === "backgroundColor") {

            if (!(currIndex >= 0 && currIndex <= 70)) {
                currIndex = 0;
            }

            switch (key) {

                case "TAB": //Tab
                    $control.find(".i-" + currIndex).removeClass('clr-focus');
                    break;

                case "LEFT": //Left Key
                    if (currIndex > 0) {
                        nextIndex = currIndex - 1;
                    }
                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                case "RIGHT": //Right Key
                    if (currIndex < 70) {
                        nextIndex = currIndex + 1;
                    }

                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                case "UP": //Up Key
                    if ((currIndex > 0 && currIndex <= 10) || (currIndex > 60 && currIndex <= 70)) {
                        nextIndex = currIndex - 1;
                    }
                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;
                case "DOWN":  //Down Key
                    if ((currIndex >= 0 && currIndex < 10) || (currIndex > 60 && currIndex < 70)) {
                        nextIndex = currIndex + 1;
                    }

                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                default:
                    break;
            }

        }

        else if (colorGridType === "patternColor") {

            switch (key) {

                case "TAB": //Tab

                    if (currIndex >= 1 && currIndex <= 69) {
                        nextIndex = currIndex + 1;
                    }

                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                case "LEFT": //Left Key
                    if (currIndex % 10 === 1) {
                        nextIndex = currIndex + 9;
                    }

                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                case "RIGHT": //Right Key
                    if (currIndex % 10 !== 0) {
                        nextIndex = currIndex + 1;
                    }
                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                case "UP": //Up Key
                    if ((currIndex >= 1 && currIndex <= 10) || currIndex === 0 || currIndex === 71 || currIndex === 100) {
                        nextIndex = colorPickerManipulator.findNextIndex($control, currIndex, 'UP');
                        if (nextIndex == null) {
                            return this.navigateToNext($item, key);
                        }
                    }
                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);
                    break;

                case "DOWN":  //Down Key
                    if (currIndex >= 1 && currIndex <= 60) {
                        nextIndex = currIndex + 10;
                    }

                    colorPickerManipulator.focusChange($control, currIndex, nextIndex);

                    break;

                default:
                    break;
            }



        }

        return $item;

    },


    navigateToNext: function ($item, key) {
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


        if (scrollableDiv.length > 0) {

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
        if (scrollableDiv.length > 0) {

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

    tabToNext: function ($item) {

        //normal tab handling..

        var $currentDropdown = $item.closest(".dropdown-next-level-wrapper,.combobox-dropdown, .gallery-items-expanded");
        var exclude = ".item-type-separator";
        var include = ".dropdown-item:not(.disabled)";

        var $itemsToLoopfrom = $currentDropdown.find(include).not(exclude);

        var currentIndex = ((($itemsToLoopfrom.index($item)) + 1) % $itemsToLoopfrom.length);

        var $tabItem = $($itemsToLoopfrom[currentIndex]);

        while ($tabItem.is(":hidden")) {
            currentIndex = (currentIndex + 1) % $itemsToLoopfrom.length;

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


    getControl: function ($itemXml) {

        this.manipulatorFactory = new SIMS.Manipulators.RibbonControlManipulatorFactory();

        var $ribbon = SIMS.Objects.DOMElements.Ribbon;

        var theme = (($ribbon!=null) && ($ribbon.length!=0)) ? ($ribbon.attr("theme") ? $ribbon.attr("theme") : 'Office') : 'Office';
        var recentColors = null;

        //Added this check to avoid crash in the Access Ribbon as Lazy Loading has not yet been implemented in the same.
        if ($ribbon !== undefined && $ribbon!=null) {
            if ($ribbon.attr("recentColors") !== undefined) {
                recentColors = $ribbon ? (JSON.parse($ribbon.attr("recentColors")) ? JSON.parse($ribbon.attr("recentColors")) : null) : null;
            }
        }

        var controlParams =
        {
            "type": "ColorGrid",
            "colorGridType": "patternColor",
            "patternType": "simplePattern",
            "theme": theme,
            "recentColors": recentColors,
            "selectedColor": "FFFFFF"
        };

        var sMode = $itemXml.attr('mode');
        if (sMode) {
            controlParams.patternType = sMode;
        }

        var self = this;

        var colorPickedCallBack = function (controlName, $control, myCallbackData) {
            console.log(myCallbackData.index + "th color picked");
            if (this.$item != null && myCallbackData.eventID == 3) {       //only for enter or spacebar
                this.$item.trigger("colorPicked", [myCallbackData]);
                $control = $($control).filter(function () { return $(this).is(":visible"); });
                self.fireEventOnParentControl.apply($($control).parent(".dropdown-item"),[{ data: { self: this, color: myCallbackData.text || myCallbackData.message} }]); // additional parameter was passed in order to correct the text on the report page
            }

            if (myCallbackData.eventID === 1 || myCallbackData.eventID === 3) {
                $control.trigger("colorchanged", [$control, myCallbackData]);
            }
        };

        var $control = SIMS.Controls.Factory.getControl("", controlParams, this, colorPickedCallBack);
        return $control;
    },

    //Overriding GetClickstreamInfo for ColorPicker, because the clickstream info can only be generated
    //after the event is triggered
    GetClickstreamInfo: function ($item, e) {
        var itemText = "Color Picked ";

        if (e) {
            if (e instanceof $.Event) {
                var colorName = "";
                var $evtTarget = $(e.target); 
                var $closestColor = $evtTarget.closest(".color");
                colorName = $closestColor.length > 0 ? $closestColor.attr('title') : "";
                              
                if(colorName)  {
                    itemText += ": " + colorName;
                }

                else  {
                    var text = $evtTarget.contents().filter(function(){ 
                        return this.nodeType == 3; 
                    }).text();
                    if(text) {
                        itemText += ": " + text; 
                    }
                    // itemText = itemText + $evtTarget.text();   
                }
            }
            else { //for keyboard handling
                itemText += ": " + e.data.color;
            }
        }

        return itemText;
    }

    

});