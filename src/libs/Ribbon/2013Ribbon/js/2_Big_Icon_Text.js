
namespace("ControlGenerators");

ControlGenerators.Big_Icon_Text = function () { };
ControlGenerators.Big_Icon_Text.prototype = new ControlGenerators.ComboBox();
ControlGenerators.Big_Icon_Text.prototype.GetValuePart = function () {
    var $valuePart = this.$arrow = $("<div class='combo-value-wrapper'/>");

    var $icon = this.GetIcon();
    var $value = this.GetLabel();

    if ($icon != null) {
        $icon.addClass('combo-icon-part control-icon');
        $valuePart.append($icon);
    }

    if ($value != null) {
        this.$label = $value;
        $value.addClass('combo-value-part control-label');
        $valuePart.append($value);
    }

    //Arrow
    this.$arrowpart = this.GetArrowPart();
    $valuePart.append(this.$arrowpart);

    return $valuePart;
};

ControlGenerators.Big_Icon_Text.prototype.makeControl = function () {
    var $comboboxWrapper = this.$wrapper = UIUtils.getUnselectableDiv('', 'combobox-wrapper');
    this.$control.append($comboboxWrapper);
    var $controlXml = this.$controlXml;
    this.$comboBox = UIUtils.getUnselectableDiv('', 'combobox');
    this.$comboBox.attr("tabindex", -1);

    if (this.$controlXml.attr('wd') != null) {
        this.$comboBox.css('width', this.$controlXml.attr('wd'));
    }
    if (this.$controlXml.attr('wraptext') != null && this.$controlXml.attr('wraptext') == 'true') {
        this.$comboBox.css('text-wrap', 'normal');
    }

    this.ApplyStylesToComboBox();


    $comboboxWrapper.append(this.$comboBox);

    //Text Box
    this.$valuePart = this.GetValuePart();



    this.$wrapper.addClass('hovered-frame');
    this.$valuePart.addClass('office-hover-default');

    this.$comboBox.append(this.$valuePart);

    this.$comboBox.data('desc', this.$controlXml.attr('text'));

    //Add items
    if ($controlXml.find('items item').length > 0) {
        this.AddItems();
    }
    else {
        this.$dropDown = null;
    }
    $comboboxWrapper.append(this.$dropDown);

    this.AttachButtonEvents();

    //Add functionality to dropdown...
    this.AddFunctionality(this.$dropDown, this.$comboBox);

    if (this.$controlXml.attr('hasList') == 'true') {
        this.$control.addClass('has-list');
    }

    return this.$control;
};

ControlGenerators.Big_Icon_Text.prototype.AttachButtonEvents = function () {
    var $control = this.$control;
    var $controlXml = this.$controlXml;
    this.$valuePart.click(function (e) {
        $control.data('state', '');
        if ($controlXml.find('items').length == 0) {
            var clickstreamInfo = $control.data('clickstreamInfo');
            $control.trigger('officeButtonClick', [$control.data('desc'), $control.data('eventId'), undefined, undefined, clickstreamInfo]);
        }
    });
};

        //apply css styles to button
    ControlGenerators.Big_Icon_Text.prototype.ApplyStylesToButton = function () {
        this.$wrapper.css('width', this.$controlXml.attr('width'));
    };

        //get first part of split part button
    ControlGenerators.Big_Icon_Text.prototype.GetFirstPart = function ($controlXml) {
        //var $firstPart = $("<div class='combo-value-wrapper office-hover-default'/>");
        var $firstPart = UIUtils.getUnselectableDiv('', 'firstpart');
        var $firstPartframe = UIUtils.getUnselectableDiv('', 'control-frame office-hover-default');
        var $icon = getIcon($controlXml.find('icon'));


        if ($icon != null) {
            $icon.addClass('icon-part');
            $firstPartframe.append($icon);
        }

        var $text = getLabel($controlXml.find('text'));

        if ($text != null) {
            $firstPartframe.append($text);
        }

        var $arrowRequired = $controlXml.attr('hasItems');
        if ($arrowRequired == "true") {
            //var $arrowpart = UIUtils.getUnselectableDiv('', 'officearrow');
            //Add an arrow to arrow part
            var $arrow = getDownArrow();
            $text.append($arrow);
            //$firstPartframe.append($arrowpart);
        }
        $firstPartframe.append($text);
        $firstPart.append($firstPartframe);

        return $firstPart;
    };

//    ControlGenerators.Big_Icon_Text.prototype.AddFunctionality = function () {
//        var $control = this.$control;
//        this.$firstPart.click(function () {
//            //$control.trigger('iconClick', [$control.data('desc')]);
//        });
//    };

    ControlGenerators.Big_Icon_Text.prototype.GetItems = function () {
        var xItems = this.$controlXml.children('items');
        return ControlGenerators.ItemsGenerator.prototype.GetItems(xItems);
    };

//    ControlGenerators.Big_Icon_Text_Dropdown = function () { };
//    ControlGenerators.Big_Icon_Text_Dropdown.prototype = new ControlGenerators.Big_Icon_Text();

//    ControlGenerators.Big_Icon_Text_Dropdown.prototype.AttachButtonEvents = function () {
////        var $control = this.$control;
////        this.$valuePart.click(function (e) {
////            $control.data('state', '');
////            $control.trigger('officeButtonClick', [$control.data('desc'), $control.data('state')]);
////            //alert("Yo nigga! You clicked " + $(this).data('desc'));
////        });
    //    };



    ////////////////File Menu DropDown/////////////////////
    //This control should not be used in Ribbon////////////
    ControlGenerators.Big_Icon_TextFM = function () { };
    ControlGenerators.Big_Icon_TextFM.prototype = new ControlGenerators.Big_Icon_Text();


    ControlGenerators.Big_Icon_TextFM.prototype.handleStandardKey = function () {
    };

    ControlGenerators.Big_Icon_TextFM.prototype.addNavigationHover = function ($item) {
        this.getHoverItems($item).addClass("hovered");
    };

    ControlGenerators.Big_Icon_TextFM.prototype.removeNavigationHover = function ($item) {
        this.getHoverItems($item).removeClass("hovered");
    };

    ControlGenerators.Big_Icon_TextFM.prototype.getHoverItems = function ($control) {
        var $itemsToBeHovered = $();
        if ($control.is(".office-hover-default")) {
            $itemsToBeHovered = $itemsToBeHovered.add($control);
        }
        $itemsToBeHovered = $itemsToBeHovered.add($control.find(".office-hover-default").filter(function () {
            return $(this).closest(".dropdown-items-wrapper").length === 0;
        }));

        return $itemsToBeHovered;
    };

    ControlGenerators.Big_Icon_TextFM.prototype.getNextTabItem = function ($item) {

        var $rightPane = $item.closest(".ribbon");

        var $nextItem;

        var $allItems = $rightPane.find("*:visible").filter(function () {

            return $(this).data("tab-order");
        });

        var currentTabOrder = $item.data("tab-order");

        var maxTabOrder = 0;
        $allItems.each(function () {

            if ($(this).data("tab-order") > maxTabOrder) {
                maxTabOrder = $(this).data("tab-order");
            }
        });


        var counter = 0;
        while (($nextItem == null || $nextItem == undefined || $nextItem.length < 1) && counter < 10) {

            $nextItem = $allItems.filter(function () {

                return $(this).data("tab-order") === (currentTabOrder % maxTabOrder) + 1;
            });

            currentTabOrder++;
            counter++;
        }

        if ($nextItem.length > 0) {
            return { item: $nextItem}.item;
        }
        return { item: null };

        //    var $ribbon = $item.closest(".ribbon");
        //    var exclude = ".ctrl-separator";
        //    var currentTabSelector = ".ribbon-tab-container:visible:first";
        //    var includeFromTab = ".section-launcher, .office-control";
        //    var selectedTabHeader = ".ribbon-tabs-wrapper .tab-header-selected:visible";

        //    var $itemsToLoopfrom = $ribbon.find(selectedTabHeader).add($ribbon.find(currentTabSelector).find(includeFromTab)).not(exclude);

        //    var currentIndex = $itemsToLoopfrom.index($item);

        //    var $tabItem = $($itemsToLoopfrom[(currentIndex + 1) % $itemsToLoopfrom.length]);

        //    return $tabItem;
    };

    ControlGenerators.Big_Icon_TextFM.prototype.getItemForStandardKey = function ($item, key) {
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