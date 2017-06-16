 /// <reference path="ControlBase.js" />
/// <reference path="jquery.xml2json.js" />
        namespace("ControlGenerators");
//////////////////////////////ComboBoxBase/////////////////////////////////////
ControlGenerators.ComboBoxBase = function() {
};
ControlGenerators.ComboBoxBase.prototype = new ControlGenerators.ControlBase();
ControlGenerators.ComboBoxBase.prototype.ItemsGenerator = new ControlGenerators.ItemsGenerator();

ControlGenerators.ComboBoxBase.prototype.handleAccessKey = function($control, key) {
    var $param = $control.find(".dropdown-button");
    if ($param.length === 0) {
        $param = $control;
    }
    if (key === "ESCAPE") {
        this.DropdownCloser.apply($param);
    }
    else {
        this.DropdownOpener.apply($param);
    }
};
ControlGenerators.ComboBoxBase.prototype.GetValuePart = function() {
    var $valuePart = $("<div class='combo-value-wrapper'/>");

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

    return $valuePart;
};
ControlGenerators.ComboBoxBase.prototype.GetLabel = function() {
    var $label = UIUtils.getUnselectableDiv();
    $label.text(this.$controlXml.attr('text'));
    return $label;
};
ControlGenerators.ComboBoxBase.prototype.GetIcon = function() {
    var $iconPart = UIUtils.getUnselectableDiv();
    $iconPart.append(getIcon(this.$controlXml.find('icon')));
    return $iconPart;
};

ControlGenerators.ComboBoxBase.prototype.GetArrowPart = function() {
    return getDropdownButton(true);
};
ControlGenerators.ComboBoxBase.prototype.GetItems = function() {
    var xItems = this.$controlXml.children('items');
    return ControlGenerators.ItemsGenerator.prototype.GetItems(xItems);
};

ControlGenerators.ComboBoxBase.prototype.GetItem = function() {
};
ControlGenerators.ComboBoxBase.prototype.AddItems = function() {
};
ControlGenerators.ComboBoxBase.prototype.AddFunctionality = function() {
};
ControlGenerators.ComboBoxBase.prototype.AddMoreFunctionality = function() {
};
ControlGenerators.ComboBoxBase.prototype.AddItemFunctionality = function() {
};
ControlGenerators.ComboBoxBase.prototype.ApplyStylesToComboBox = function() {
    this.$comboBox.css('width', this.$controlXml.attr('width'));
};

ControlGenerators.ComboBoxBase.prototype.FormatItemText = function() {
};
ControlGenerators.ComboBoxBase.prototype.$comboBox = null;
ControlGenerators.ComboBoxBase.prototype.$valuePart = null;
ControlGenerators.ComboBoxBase.prototype.$arrow = null;
ControlGenerators.ComboBoxBase.prototype.$dropDown = null;
ControlGenerators.ComboBoxBase.prototype.ItemsToBeHighlighttedOnClick = ['$wrapper'];

ControlGenerators.ComboBoxBase.prototype.DropdownOpener = function() {
};
ControlGenerators.ComboBoxBase.prototype.DropdownCloser = function() {
};
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////ComboBox//////////////////////////////////////////
ControlGenerators.ComboBox = function() {
};
ControlGenerators.ComboBox.prototype = new ControlGenerators.ComboBoxBase();
ControlGenerators.ComboBox.prototype.makeControl = function() {
    var $comboboxWrapper = this.$wrapper = UIUtils.getUnselectableDiv('', 'combobox-wrapper');
    this.$control.append($comboboxWrapper);

    //    var shortcutkey = this.$controlXml.attr('ak');
    //    var $tabSKdiv = UIUtils.getUnselectableDiv("", "ribbon-tab-SK");
    //    $tabSKdiv.addClass("SK_" + shortcutkey);
    //    this.$control.append($tabSKdiv);

    var $controlXml = this.$controlXml;
    var $comboBox = this.$comboBox = UIUtils.getUnselectableDiv('', 'combobox');
    //$comboBox.attr("tabindex", -1);

    this.ApplyStylesToComboBox();


    $comboboxWrapper.append($comboBox);

    //Text Box
    this.$valuePart = this.GetValuePart();
    $comboBox.append(this.$valuePart);

    //Arrow
    this.$arrow = this.GetArrowPart();
    $comboBox.append(this.$arrow);

    $comboBox.data('desc', this.$controlXml.attr('text'));

    //Add items
    if ($controlXml.find('items item').length > 0) {
        this.AddItems();
        $comboboxWrapper.append(this.$dropDown);

        //Add functionality to dropdown...
        this.AddFunctionality(this.$dropDown, $comboBox);
    }
    else {
        this.$dropDown = null;
    }

    if (this.$controlXml.attr("changeColor")) {
        var changeColorData = JSON.parse(this.$controlXml.attr("changeColor"));
        if (changeColorData.enable == "true") {
            this.$valuePart.find(".icon-binder").append("<div class='colorchanger'>");
        }
        if (changeColorData.top && changeColorData.top !== "") {
            this.$valuePart.find(".icon-binder .colorchanger").css("top", changeColorData.top);
        }
        if (changeColorData.left && changeColorData.left !== "") {
            this.$valuePart.find(".icon-binder .colorchanger").css("left", changeColorData.left);
        }
        if (changeColorData.width  && changeColorData.width !== "") {
            this.$valuePart.find(".icon-binder .colorchanger").css("width", changeColorData.width);
        }
        if (changeColorData.height && changeColorData.height !== "") {
            this.$valuePart.find(".icon-binder .colorchanger").css("height", changeColorData.height);
        }
        

        this.$wrapper.on("colorchanged", function(e, $control, myCallbackData) {
            var $colorchanger = $(this).find(".combobox .colorchanger");
            if ($colorchanger.length > 0) {
                $colorchanger.css("background-color", "#" + myCallbackData.selectedColor);
            }
            e.stopPropagation();
        });
    }
    return this.$control;
};
ControlGenerators.ComboBox.prototype.AddFunctionality = function($dropDown, $comboBox) {
    if ($dropDown != null) {
        var $curtain = this.$curtain = $('.dropdown-curtain');
        var hidetooltip = this.hideTooltip;

        //Get Items to be highlighted
        var itemsToBeHightlighted = [];
        for (var i = 0; i < this.ItemsToBeHighlighttedOnClick.length; i++) {
            var item = this[this.ItemsToBeHighlighttedOnClick[i]];
            if (item != null) {
                itemsToBeHightlighted.push(item);
            }
        }

        this.$arrow.click(this.DropdownOpener);

        if (this.$valuePart != null) {
            this.$valuePart.click(function(e) {
                e.stopPropagation();
                $('.combobox-dropdown').not($dropDown).hide();
                $comboBox.trigger("comboClick");
            });
        }

        var $simArea = SIMS.Objects.DOMElements.SIMArea;
        var self = this;

        $comboBox.focusout(this.DropdownCloser);

        $simArea.not(this.$arrow).not(this.$valuePart).bind('click contextmenu', function(e) {
            if ($simArea.has($(e.target)).length > 0)
                self.DropdownCloser();
        });

        $dropDown.hover(function(e) {
            e.stopPropagation();
        });

        this.AddMoreFunctionality($dropDown, $comboBox);
    }
};


ControlGenerators.ComboBox.prototype.DropdownCloser = function() {

    var $curtain = $('.dropdown-curtain');
    var $dropdown = $('.SIMS .ribbon .dropdown-open,.SIMS .mt-kb-util .dropdown-open');

    $dropdown.hide();

    var $RibbonControl = $dropdown.closest('.office-control');
    var bTriggerEvent = true;
    if ($RibbonControl.length > 0 && $RibbonControl.data("SuppressTriggerDropdownEvent")){ // This check was added for SO-73393, by this check we have stopped firing "RibbonDropdownClosed" event on closing of dropdown for all controls having "SuppressTriggerDropdownEvent" as true in their data. for now this is set for Comboboxtext control only.
        bTriggerEvent = false;
    }
    
    if(bTriggerEvent){ 
        $dropdown.trigger("RibbonDropdownClosed");
    }
    
    $curtain.hide();

    $dropdown.removeClass('dropdown-open');

    //Remove highlights
    var $itemsToBeHightlighted = $dropdown.closest('.active-toggle');
    $itemsToBeHightlighted.removeClass('active-toggle');

    var $itemsToBeHightlighted = $dropdown.find('.hovered');
    $itemsToBeHightlighted.removeClass('hovered');



    //    for (var i = 0; i < itemsToBeHightlighted.length; i++) {
    //        itemsToBeHightlighted[i].removeClass('active-toggle');
    //    }
};

ControlGenerators.ComboBox.prototype.DropdownOpener = function(e) {
    if (e != null && e.stopPropagation != null) {
        e.stopPropagation();
    }
    //this.hidetooltip(0);

    var $comboBox = $(this).closest('.combobox');
    $comboBox = $comboBox.length > 0 ? $comboBox : $(this).find('.combobox');
    var $ribbon = $comboBox.parents('.ribbon');
    $comboBox.find('.tooltip').delay(10).fadeOut(200);

    var $curtain = $('.dropdown-curtain');
    var $comboWrapper = $comboBox.closest('.combobox-wrapper');
    var $dropDown = $comboWrapper.find('.combobox-dropdown:not(.contextMenu)');

    //Lazy Generation of dropdowns
    if ($dropDown.children(".dropdown-items-wrapper").length == 0) {
        var itemsInfo = $dropDown.data("itemsInfo");

        var $generatedItems = ControlGenerators.ItemsGenerator.prototype.GetItems(itemsInfo);

        $generatedItems.appendTo($dropDown);

        $dropDown.removeData("itemsInfo");

        $dropDown.bind("mousemove", function() {
            $(this).find(".hovered").removeClass("hovered");

        });

    }

    // Change done to fix SIMS-79458, regression of colorgrid dd lazyloading
    // This data is set in ExcelRibbonComp
    if ($dropDown.data('colorIndex') != undefined) {
        $dropDown.find('.item-type-colorpicker .sims-ColorGrid.sims-control').setData({ index: $dropDown.data('colorIndex') });
        $dropDown.removeData('colorIndex');
    }

    if ($curtain.length == 0) {
        $curtain = UIUtils.getUnselectableDiv('', 'dropdown-curtain');
        $curtain.attr("tabindex", -1);
    }
    $ribbon.append($curtain);
    $curtain.show();
    $('.combobox-dropdown').not($dropDown).hide();

    var $RibbonControl = $dropDown.closest('.office-control');
    var bTriggerEvent = true;
    if($RibbonControl.length > 0 && $RibbonControl.data("SuppressTriggerDropdownEvent")){ // This check was added for SO-73393, by this check we have stopped firing "RibbonDropdownOpened" event on opening of dropdown for all controls having "SuppressTriggerDropdownEvent" as true in their data. for now this is set for Comboboxtext control only.
        bTriggerEvent = false;
    }

    if(bTriggerEvent){
        $dropDown.trigger("RibbonDropdownOpened");    
    }
    
    $dropDown.fadeToggle(200);
    var ddLeft = $comboBox.position().left;
    var ddTop = $comboBox.outerHeight() + $comboBox.position().top;

    $dropDown.css({top: ddTop, left: ddLeft, bottom: ""});

    var ddCss = {};
    ddCss.left = $comboBox.position().left;

    //Vertical Overflow
    var $simArea = SIMS.Objects.DOMElements.SIMArea;

    var vOverflow = UIUtils.getVerticalOverflow($dropDown, $simArea) + 40;

    if ((vOverflow > 0) && ($comboBox.offset().top - $dropDown.outerHeight()) > 0) {
        ddCss.bottom = $comboBox.position().top + $comboBox.outerHeight();
        ddCss.top = "";
    }
    else {
        ddCss.top = $comboBox.outerHeight() + $comboBox.position().top;
        ddCss.bottom = "";
    }

    //Fix for SIMS-403, Added check for window width
    var comboLeft = $comboBox.offset().left;
    var winWidth = $simArea.width();
    var ddWidth = $dropDown.width();
    if (comboLeft + ddWidth > winWidth) {
        ddCss.left = (winWidth - ddWidth - comboLeft) - 4;
    }

    $dropDown.css(ddCss);

    $dropDown.addClass('dropdown-open');
    //Add highlights
    //var $itemsToBeHightlighted = $(this).closest('.combobox-wrapper');
    $comboWrapper.addClass('active-toggle');

    //    for (var i = 0; i < itemsToBeHightlighted.length; i++) {
    //        itemsToBeHightlighted[i].addClass('active-toggle');
    //    }

    //Only if status bar exists
    var $statusBar = $('.excelStatusBar');
    if ($statusBar.length > 0) {
        $dropDown.css('height', '');
        //if overflow
        var ddHeight = $dropDown.outerHeight();
        var ddBottom = $dropDown.offset().top + ddHeight;
        var statusbarTop = $statusBar.offset().top;
        if (ddBottom > statusbarTop) {
            //resize
            ddHeight -= ddBottom - statusbarTop + 5;
            $dropDown.css('height', ddHeight + 'px');
        }
    }


    // Highlight first dropdown item when accessible or navigation state is active
    ////////////////////////////////////////////////////////////////////////////////

    if ($dropDown.closest('.accesible-state').length > 0 || $dropDown.closest('.navigation-key-state').length > 0) {

        var $subItems = $dropDown.find(".dropdown-item:visible:not(.disabled)");
        var $firstItem = null;

        if ($subItems != undefined && $subItems.length > 0) {
            $firstItem = $subItems.first();

            var $itemsToBeHovered = $();
            if ($firstItem.is(".office-hover-default")) {
                $itemsToBeHovered = $itemsToBeHovered.add($firstItem);
            }
            $itemsToBeHovered = $itemsToBeHovered.add($firstItem.find(".office-hover-default:visible"));

            $itemsToBeHovered.addClass("hovered");

        }



    }


    // Specific handling for TableGridDiv item for Word - Insert - Table
    var $tablegrid = $dropDown.find(".table-grid-div");
    if ($tablegrid.length != 0)
    {
        $($tablegrid).children(".table-grid-container").children().removeClass("hovered-table-element").attr("highlighted", "false");
        if ($($tablegrid).index() == 0 && $dropDown.closest('.accesible-state').length > 0 && $firstItem.find(".table-grid-div").length != 0)
        {
            $($tablegrid).children(".table-grid-container").children(":first-child").addClass("hovered-table-element");
            $($tablegrid).children(".table-grid-header").text("1x1 Table");
        }
        else
        {
            $($tablegrid).children(".table-grid-header").text("Insert Table");
        }
    }
    /////////////////////////////////////////////////////////////////////////////////

};

ControlGenerators.ComboBox.prototype.AddItems = function() {
    var $items = this.$controlXml.children('items');
    this.$dropDown = this.GetDropdown();

    var $colorGrids = $items.length> 0 ? $items.find("item[type='ColorPicker']") : null;

    var goodToGenerateColorGrids = [];  // in case of ribbon controls used in Mini Toolbar / Shy Toolbar of Chart / PPT Text Placeholder/ Shape Placeholder etc
    // user needs to add attribute 'gtg' attribute and set it to 'true' so that these color grids are not lazy generated

    if($colorGrids.length>0)
    {
        goodToGenerateColorGrids = $colorGrids.filter(function(){
            return $(this).attr('gtg')=="true";
        });
    }
	
	
    //Add options	
	if(goodToGenerateColorGrids.length != 0)
	{
		var $generatedItems = this.GetItems($items);

        $generatedItems.appendTo(this.$dropDown);
	}
    else if ($colorGrids == null || $colorGrids.length == 0 || gRibbonCMTheme.toUpperCase() == 'WORD' || gRibbonCMTheme.toUpperCase() == 'EXCEL' || gRibbonCMTheme.toUpperCase() == 'PPT') {// Preventing Lazy Generation of Color Grids in PPT and Access -  Monalika-Ashwin
        this.$dropDown.data("itemsInfo", $items);
        //        var $generatedItems = this.GetItems($items);

        //        $generatedItems.appendTo(this.$dropDown);

        //        this.AddItemFunctionality($generatedItems, this.$dropDown, this.$valuePart);
    }
    else {
        var $generatedItems = this.GetItems($items);

        $generatedItems.appendTo(this.$dropDown);
    }

};

ControlGenerators.ComboBox.prototype.GetDropdown = function() {
    var $items = this.$controlXml.find('items');
    var ddWidth = $items.attr('width');
    var ddheight = $items.attr('height');
    if ($items.attr('ddscrolly')) {
        var ddscrolly = $items.attr('ddscrolly');
    }
    else{
        var ddscrolly = "none";
    }
    
    var $dropDown = UIUtils.getUnselectableDiv('', 'combobox-dropdown');
    $dropDown.css({'display': 'none', 'width': ddWidth, 'max-height': ddheight , 'overflow-y' : ddscrolly});
    return $dropDown;
};

///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////ComboBoxText//////////////////////////////////////////
ControlGenerators.ComboBoxText = function() {
};
ControlGenerators.ComboBoxText.prototype = new ControlGenerators.ComboBox();
ControlGenerators.ComboBoxText.prototype.ItemsToBeHighlighttedOnClick = ['$arrow'];
ControlGenerators.ComboBoxText.prototype.GetLabel = function() {
    var $textBox = $("<input type='text' class='combo-textbox combobox-value-holder'/>");
    var defaultValue = this.$controlXml.getAttribute('defaulttext');

    var dontFireEventOnESC = this.$controlXml.attr('dontFireEventOnESC');
    if (dontFireEventOnESC != undefined) {
        $textBox.attr('dontFireEventOnESC', dontFireEventOnESC);
    }

    var NoStopPropagationOnESC = this.$controlXml.attr('NoStopPropagationOnESC');
    if (NoStopPropagationOnESC && NoStopPropagationOnESC == "true") {
        $textBox.attr('NoStopPropagationOnESC', true);
    }

    var ConfirmTextOnTab = this.$controlXml.attr('ConfirmTextOnTab');
    if (ConfirmTextOnTab && ConfirmTextOnTab == "true") {
        $textBox.attr('ConfirmTextOnTab', true);
    }

    var selectTextOnNav = this.$controlXml.attr('selectTextOnNav');
    if (selectTextOnNav) {
        $textBox.attr('selectTextOnNav', selectTextOnNav);
    }

    if (defaultValue != null) {
        this.setText($textBox, defaultValue);
    }

    //Selection on focus
    $textBox.focus(function(e) {
        e.preventDefault();
        $(this).select();
    });

    $textBox.bind("click", function(e) {
        if(navigator.userAgent.indexOf("Edge") === -1)
        {
            $(this).select();
        }
        else{
            $(this).select().focus();  
        }
    });

    var $comboBox = this.$control;

    $comboBox.data('SuppressTriggerDropdownEvent', true);

    var StopPropagationOnKeyDown = this.$controlXml.attr('StopPropagationOnKeyDown');
    if (StopPropagationOnKeyDown && StopPropagationOnKeyDown.toLowerCase() === "true") {
        $comboBox.data('StopPropagationOnKeyDown', true);
    }

    // Fetching Item Texts to show on autocomplete

    var itemsInfo = this.$controlXml.children('items');

    var children = $(itemsInfo).children();

    var textArray = [];

    textArray.length = 0;

    for (var i = 0; i < children.length; i++) {
        var currentChild = children[i];
        var tagName = $(currentChild).tagName().toLowerCase();

        if (tagName == 'items') {

            var subChildren = $(currentChild).children();

            for (var j = 0; j < subChildren.length; j++) {

                var currentSubChild = subChildren[j];
                var subtagName = $(currentSubChild).tagName().toLowerCase();
                if (subtagName == 'item') {
                    var str = $(currentSubChild).attr('text');
                    if (str != undefined) {
                        textArray.push($(currentSubChild).attr('text'));
                    }
                }
            }
        }
        else if (tagName == 'item') {

            var str = $(currentChild).attr('text');

            if (str != undefined) {
                textArray.push($(currentChild).attr('text'));
            }

        }

    }

    var T = new Trie();
    var i;
    for (i = 0; i < textArray.length; i++) {
        T.insert(textArray[i].toLowerCase());
    }

    this.$control.data("StopPropagationOnEnter", this.$controlXml.getAttribute('StopPropagationOnEnter'));


    //Firing event  ; Useful Key codes ALT = 18 ; F10 = 121 ; F6 = 117
    $textBox.bind("keydown", function(e) {

        var stopPropagation = false;

        if($comboBox.data('StopPropagationOnKeyDown')){
            stopPropagation = true;
        }

        if (e.keyCode === 13) { // Enter
            stopPropagation = true;
            var eventId = $comboBox.data('eventId');
            //if ($(this).data("val") !== $(this).attr('value')) {
            if ($(this).attr('defaultValue') !== $(this).attr('value')) {
                $(this).data("val", $(this).attr('value'));
                var clickstreamInfo = $comboBox.data('clickstreamInfo')+ " : " + $(this).data("val");
                //Reset to default value. If this is an correct action then value should be set via attributes in next state
                $(this).attr('value', $(this).attr('defaultValue'));
                $comboBox.trigger('selectedIndexChanged', [null, eventId, undefined, undefined, clickstreamInfo]);

            }
            $(this).blur();
        }

        if (e.keyCode === 9) { // TAB
            if($(this).attr("ConfirmTextOnTab")){
                e.preventDefault();
                var eventId = $comboBox.data('eventId');
                //if ($(this).data("val") !== $(this).attr('value')) {
                if ($(this).attr('defaultValue') !== $(this).attr('value')) {
                    $(this).data("val", $(this).attr('value'));
                    var clickstreamInfo = $comboBox.data('clickstreamInfo')+ " : " + $(this).data("val");
                    //Reset to default value. If this is an correct action then value should be set via attributes in next state
                    $(this).attr('value', $(this).attr('defaultValue'));
                    $comboBox.trigger('selectedIndexChanged', [null, eventId, undefined, undefined, clickstreamInfo]);

                }
            }

            if ($comboBox.find(".combobox-dropdown").is(":visible")) {
                e.preventDefault();
                stopPropagation = true;
            }

        }

        if (e.keyCode === 32) { // SPACE
            if ($comboBox.data("StopPropagationOnEnter") == "true") {
                stopPropagation = true;
            }

        }

        if (e.keyCode === 27) {
            if($(this).attr('NoStopPropagationOnESC')){
                stopPropagation = false;
            }
        }

        if (e.keyCode === 40 || e.keyCode === 38) { //DOWN || UP
            stopPropagation = false;
            var $dropdown = $comboBox.find(".combobox-dropdown");
            if ($dropdown != undefined) {
                if ($dropdown.is(":hidden"))
                    $comboBox.find(".dropdown-button").click();
            }


        }

        if(stopPropagation){
            e.stopPropagation();
        }
    }
    );



    $textBox.bind("keyup", function(e) {

        var keycode = (e.keyCode ? e.keyCode : e.which);

        if (e.keyCode === 40 || e.keyCode === 38) { //DOWN || UP
           
            var $selectedItem = $comboBox.find(".combobox-dropdown").find(".hovered:first");
            var $itemText = $selectedItem.find(".dropdown-item-text");
            var $imageItemText = $selectedItem.data('ImageItemText');
            if ($itemText.length > 0) {
                var $itemValue = $itemText.find(".dropdown-item-value");

                if ($itemValue.length > 0) {
                    this.value = $itemValue.text();
                }
                else
                    this.value = $itemText.text();

                $(this).select();
            }
            else if ($imageItemText != undefined){
                 this.value = $imageItemText; 
                 $(this).select();

            }
            

        }

        if (e.keyCode === 27) { //ESCAPE
            $(this).blur();
            this.value = $(this).attr('value');
            e.stopPropagation();

        }


        /////////////////////////////Trie Implementation   

        var englishAlphabetDigitsAndWhiteSpace = /[A-Za-z0-9 ]/g;

        var key = String.fromCharCode(e.which);

        if (englishAlphabetDigitsAndWhiteSpace.test(key)) {

            var queryText = this.value.toLowerCase();
            var result;

            var autoList = T.autoComplete(queryText);

            if (autoList != null && autoList.length > 0) {

                result = autoList[0];

                var i;
                var exactText;
                for (i = 0; i < textArray.length; i++) {
                    if (textArray[i].toLowerCase() === result) {
                        exactText = textArray[i];
                        break;
                    }
                    ;
                }

                //added this after accelerator keys and ribbon shortcuts have now been implemented on keydown event rather than keyup event.
                if (queryText.length != result.length)
                {
                    this.value = exactText;
                    this.setSelectionRange(queryText.length, result.length);
                }
            }

        }

        ////////////////////////////////////////////////

    }
    );



    $textBox.focus(function() {
        $(this).data("val", $(this).attr('value'));

    });


    $textBox.bind("focusout", function(e) {

        var eventId = $comboBox.data('eventId');
        var text = $(this).attr('value')

            if (($(this).attr('defaultValue') !== $(this).attr('value')) && $(this).attr('defaultValue') !== undefined) {

                $(this).data("val", text);
                var clickstreamInfo = $comboBox.data('clickstreamInfo')+ " : " + $(this).data("val");
                //Reset to default value. If this is an correct action then value should be set via attributes in next state
                $(this).attr('value', $(this).attr('defaultValue'));

                if ($textBox.attr('dontFireEventOnESC') == undefined || $textBox.attr('dontFireEventOnESC') != "true") {         //SIMS-118190
                    $comboBox.trigger('selectedIndexChanged', [null, eventId, undefined, undefined, clickstreamInfo]);
                }
 
            }
  
    });


    return $textBox;
};

ControlGenerators.ComboBoxText.prototype.handleAccessKey = function($control, key) {
    if(navigator.userAgent.indexOf("Edge") === -1)
    {
        $control.find("input").select();
    }
    else{
        $control.find("input").select().focus();  
    }

    return true;
};

ControlGenerators.ComboBoxText.prototype.addNavigationHover = function($item) {  
    var $textBox = $item.find("input"); 
     this.getHoverItems($item).addClass("hovered");
     if ($textBox.attr('selectTextOnNav') && $textBox.attr('selectTextOnNav') === "true") {
        $textBox.select().focus();
     }

};

ControlGenerators.ComboBoxText.prototype.removeNavigationHover = function ($item) {  
    var $textBox = $item.find("input"); 
      this.getHoverItems($item).removeClass("hovered");
    if ($textBox.attr('selectTextOnNav') && $textBox.attr('selectTextOnNav') === "true") { 
        if($item.find(".combobox-dropdown").is(":hidden")){
            $textBox.blur();
        }   
    }
};

ControlGenerators.ComboBoxText.prototype.setText = function($control, sText) {
    if (!$control.is('input.combo-textbox')) {
        $control = $control.find('input.combo-textbox');
    }
    $control.val(sText);
    $control.attr('value', sText);
    $control.attr('defaultValue', sText);
};

ControlGenerators.ComboBoxText.prototype.GetIcon = function() {
    return null;
};

////////////////DropDownButton/////////////////////
ControlGenerators.DropDownButtonHorizontal = function() {
};
ControlGenerators.DropDownButtonHorizontal.prototype = new ControlGenerators.ComboBox();
ControlGenerators.DropDownButtonHorizontal.prototype.GetArrowPart = function() {
    return getDropdownButton(false);
};
ControlGenerators.DropDownButtonHorizontal.prototype.ApplyStylesToComboBox = function() {
    ControlGenerators.ComboBoxBase.call();
    this.$comboBox.addClass('office-hover-default');
};
ControlGenerators.DropDownButtonHorizontal.prototype.AddFunctionality = function($dropdown, $comboBox) {
    ControlGenerators.ComboBox.prototype.AddFunctionality.call(this, $dropdown, $comboBox);
    this.$valuePart.click(this.DropdownOpener);

    if (this.$controlXml.attr("dblClick"))
    {
        if (this.$controlXml.attr("dblClick").toString().toLowerCase() == "true")
        {
            this.$valuePart.bind("dblclick", this.DoubleClickHandler);
        }

    }

};


ControlGenerators.DropDownButtonHorizontal.prototype.DoubleClickHandler = function(e)
{
    var control = $(this).parents(".office-control:first");
    var clickstreamInfo = control.data('clickstreamInfo') + " double-clicked";
    $(this).trigger("officeButtonClick", ["control double clicked", control.data('eventId'), undefined, undefined, clickstreamInfo]);
    $(this).parents(".combobox-wrapper:first").removeClass('active-toggle');
};

ControlGenerators.ImageDropdown = function() {
};
ControlGenerators.ImageDropdown.prototype = new ControlGenerators.DropDownButtonHorizontal();
ControlGenerators.ImageDropdown.prototype.GetArrowPart = function() {
    return $("<div />");
};


ControlGenerators.CondensedSectionControl = function() {
};
ControlGenerators.CondensedSectionControl.prototype = new ControlGenerators.ImageDropdown();

ControlGenerators.CondensedSectionControl.prototype.makeControl = function() {
    var $comboboxWrapper = this.$wrapper = UIUtils.getUnselectableDiv('', 'combobox-wrapper condensed-controlwrapper');
    this.$control.append($comboboxWrapper);

    //    var shortcutkey = this.$controlXml.attr('ak');
    //    var $tabSKdiv = UIUtils.getUnselectableDiv("", "ribbon-tab-SK");
    //    $tabSKdiv.addClass("SK_" + shortcutkey);
    //    this.$control.append($tabSKdiv);

    var $controlXml = this.$controlXml;
    var $comboBox = this.$comboBox = UIUtils.getUnselectableDiv('', 'combobox condensed-control');
    //$comboBox.attr("tabindex", -1);

    this.ApplyStylesToComboBox();


    $comboboxWrapper.append($comboBox);

    //Text Box
    this.$valuePart = this.GetValuePart();
    $comboBox.append(this.$valuePart);

    //Arrow
    this.$arrow = this.GetArrowPart();
    $comboBox.append(this.$arrow);

    $comboBox.data('desc', this.$controlXml.attr('text'));

    //Add items

    this.AddItems();
    $comboboxWrapper.append(this.$dropDown);

    if (this.$controlXml.attr("sectionWidth"))
    {
        this.$dropDown.css({width: this.$controlXml.attr("sectionWidth")});
    }

    //Add functionality to dropdown...
    this.AddFunctionality(this.$dropDown, $comboBox);




    return this.$control;
};




ControlGenerators.CondensedSectionControl.prototype.DropdownCloser = function() {

    var $ribbon = SIMS.Objects.DOMElements.SIMArea.find(".ribbon");

    var $control = $ribbon.find('.ctrl-condensedsectioncontrol').find('.combobox-wrapper.active-toggle').first().parent();
    if (!($control.find("input").is(":focus") || !(!($control.data("avoidClose"))))) //if any of the inputs is focused then don't close the dropdown
    {
        var $curtain = $ribbon.find('.section-dropdown-curtain');
        var $dropdown = $ribbon.find('.section-dropdown-open');

        $dropdown.hide();
        $curtain.hide();

        $dropdown.removeClass('section-dropdown-open');

        //Remove highlights
        var $itemsToBeHightlighted = $dropdown.closest('.active-toggle');
        $itemsToBeHightlighted.removeClass('active-toggle');

        var $itemsToBeHightlighted = $dropdown.find('.hovered');
        $itemsToBeHightlighted.removeClass('hovered');
    }
    $control.removeData("avoidClose");

};


ControlGenerators.CondensedSectionControl.prototype.ForceDropdownCloser = function($control) {


    var $curtain = $control.find('.section-dropdown-curtain');
    var $dropdown = $control.find('.section-dropdown-open');

    $dropdown.hide();
    $curtain.hide();

    $dropdown.removeClass('section-dropdown-open');

    //Remove highlights
    var $itemsToBeHightlighted = $dropdown.closest('.active-toggle');
    $itemsToBeHightlighted.removeClass('active-toggle');

    var $itemsToBeHightlighted = $dropdown.find('.hovered');
    $itemsToBeHightlighted.removeClass('hovered');

};




ControlGenerators.CondensedSectionControl.prototype.DropdownOpener = function(e) {
    if (e != null && e.stopPropagation != null) {
        e.stopPropagation();
    }
    //this.hidetooltip(0);

    var $comboBox = $(this).closest('.combobox');
    $comboBox = $comboBox.length > 0 ? $comboBox : $(this).find('.combobox:first');
    var $ribbon = $comboBox.parents('.ribbon');
    $comboBox.find('.tooltip').delay(10).fadeOut(200);

    var $curtain = $('.dropdown-curtain');
    var $comboWrapper = $comboBox.closest('.combobox-wrapper');
    var $dropDown = $comboWrapper.children('.condensed-combobox-dropdown:not(.contextMenu)');


    if ($curtain.length == 0) {
        $curtain = UIUtils.getUnselectableDiv('', 'section-dropdown-curtain');
        $curtain.attr("tabindex", -1);
    }
    $ribbon.append($curtain);
    $curtain.show();
    $('.combobox-dropdown').not($dropDown).hide();
    $dropDown.fadeToggle(200);
    var ddLeft = $comboBox.position().left;
    var ddTop = $comboBox.outerHeight() + $comboBox.position().top;

    $dropDown.css({top: ddTop, left: ddLeft, bottom: ""});

    var ddCss = {};
    ddCss.left = $comboBox.position().left;

    //Vertical Overflow
    var $simArea = SIMS.Objects.DOMElements.SIMArea;

    var vOverflow = UIUtils.getVerticalOverflow($dropDown, $simArea) + 40;

    if ((vOverflow > 0) && ($comboBox.offset().top - $dropDown.outerHeight()) > 0) {
        ddCss.bottom = $comboBox.position().top + $comboBox.outerHeight();
        ddCss.top = "";
    }
    else {
        ddCss.top = $comboBox.outerHeight() + $comboBox.position().top;
        ddCss.bottom = "";
    }

    //Fix for SIMS-403, Added check for window width
    var comboLeft = $comboBox.offset().left;
    var winWidth = $simArea.width();
    var ddWidth = $dropDown.width();
    if (comboLeft + ddWidth > winWidth) {
        ddCss.left = (winWidth - ddWidth - comboLeft) - 4;
    }

    $dropDown.css(ddCss);

    $dropDown.addClass('section-dropdown-open');
    //Add highlights
    //var $itemsToBeHightlighted = $(this).closest('.combobox-wrapper');
    $comboWrapper.addClass('active-toggle');

    //    for (var i = 0; i < itemsToBeHightlighted.length; i++) {
    //        itemsToBeHightlighted[i].addClass('active-toggle');
    //    }

    //Only if status bar exists
    var $statusBar = $('.excelStatusBar');
    if ($statusBar.length > 0) {
        $dropDown.css('height', '');
        //if overflow
        var ddHeight = $dropDown.outerHeight();
        var ddBottom = $dropDown.offset().top + ddHeight;
        var statusbarTop = $statusBar.offset().top;
        if (ddBottom > statusbarTop) {
            //resize
            ddHeight -= ddBottom - statusbarTop + 5;
            $dropDown.css('height', ddHeight + 'px');
        }
    }





};


ControlGenerators.CondensedSectionControl.prototype.AddItems = function() {
    this.$dropDown = this.GetDropdown();

    //Add options

    var $dummySectionDiv = UIUtils.getUnselectableDiv('', 'section-div');

    $dummySectionDiv.appendTo(this.$dropDown);

};


ControlGenerators.CondensedSectionControl.prototype.GetDropdown = function() {
    var $dropDown = UIUtils.getUnselectableDiv('', 'condensed-combobox-dropdown');
    $dropDown.css({'display': 'none'});
    return $dropDown;
};

ControlGenerators.CondensedSectionControl.prototype.handleAccessKey = function($control, key) {
    var $param = $control.find(".condensed-control").children(".dropdown-button");
    if ($param.length === 0) {
        $param = $control;
    }

    if (key === "ESCAPE") {

        if (!($control.find("input").is(":focus")))
            this.DropdownCloser.apply($param);
    }
    else {
        this.DropdownOpener.apply($param);
    }
};



ControlGenerators.CondensedSectionControl.prototype.UpdateControlData = function($control, dataName, value) {

    $control.data(dataName, value);

};


////////////////File Menu DropDown/////////////////////
//This control should not be used in Ribbon////////////
ControlGenerators.DropDownButtonHorizontalFM = function() {
};
ControlGenerators.DropDownButtonHorizontalFM.prototype = new ControlGenerators.DropDownButtonHorizontal();


ControlGenerators.DropDownButtonHorizontalFM.prototype.handleStandardKey = function() {
};

ControlGenerators.DropDownButtonHorizontalFM.prototype.addNavigationHover = function($item) {
    this.getHoverItems($item).addClass("hovered");
};

ControlGenerators.DropDownButtonHorizontalFM.prototype.removeNavigationHover = function($item) {
    this.getHoverItems($item).removeClass("hovered");
};

ControlGenerators.DropDownButtonHorizontalFM.prototype.getHoverItems = function($control) {
    var $itemsToBeHovered = $();
    if ($control.is(".office-hover-default")) {
        $itemsToBeHovered = $itemsToBeHovered.add($control);
    }
    $itemsToBeHovered = $itemsToBeHovered.add($control.find(".office-hover-default").filter(function() {
        return $(this).closest(".dropdown-items-wrapper").length === 0;
    }));

    return $itemsToBeHovered;
};

ControlGenerators.DropDownButtonHorizontalFM.prototype.getNextTabItem = function($item) {

    var $rightPane = $item.closest(".ribbon");

    var $nextItem;

    var $allItems = $rightPane.find("*:visible").filter(function() {

        return $(this).data("tab-order");
    });

    var currentTabOrder = $item.data("tab-order");

    var maxTabOrder = 0;

    $allItems.each(function() {

        if ($(this).data("tab-order") > maxTabOrder) {
            maxTabOrder = $(this).data("tab-order");
        }
    });


    var counter = 0;
    while (($nextItem == null || $nextItem == undefined || $nextItem.length < 1) && counter < 10) {

        $nextItem = $allItems.filter(function() {

            return $(this).data("tab-order") === (currentTabOrder % maxTabOrder) + 1;
        });

        currentTabOrder++;
        counter++;
    }

    if ($nextItem.length > 0) {
        return {item: $nextItem}.item;
    }
    return {item: null};

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

ControlGenerators.DropDownButtonHorizontalFM.prototype.getItemForStandardKey = function($item, key) {
    if (key == "UP" || key == "DOWN") {
        this.handleAccessKey($item, key);
    }

    var $openDropdown = $item.find(".dropdown-open:visible");

    if ($openDropdown.length > 0) {
        var $extractItemsFrom = $openDropdown;
        var $lastWrapper = $openDropdown.find(".dropdown-next-level-wrapper:visible").last();
        if ($lastWrapper.length > 0) {
            $extractItemsFrom = $lastWrapper;
        }

        return {item: $extractItemsFrom.find(".dropdown-item:visible:not(.disabled):first")};
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



///////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////ComboBoxReadonlyText//////////////////////////////////////////
ControlGenerators.ComboBoxReadonlyText = function() {
};
ControlGenerators.ComboBoxReadonlyText.prototype = new ControlGenerators.ComboBox();
ControlGenerators.ComboBoxReadonlyText.prototype.ItemsToBeHighlighttedOnClick = ['$arrow'];
ControlGenerators.ComboBoxReadonlyText.prototype.GetLabel = function() {
    var self = this;
    var $textBox = $("<input type='text' class='combo-textbox combobox-value-holder' readonly/>");
    var defaultValue = this.$controlXml.getAttribute('defaulttext');
    if (defaultValue != null) {
        this.setText($textBox, defaultValue);
    }

    //Selection on focus
    /* $textBox.focus(function (e) {
     self.$arrow.click();
     e.preventDefault();
     });*/

    //Binding click instead of focus for issue with Chrome
    $textBox.click(function(e) {
        //self.$arrow.click();

        $(this).closest(".combobox").find(".dropdown-button").first().click();
        e.preventDefault();
        e.stopPropagation();
    });


    $textBox.bind("keydown", function(e) {
        if (e.keyCode === 13) { // Enter
            $(this).blur();
        }

    }
    );

    return $textBox;
};




ControlGenerators.ComboBoxReadonlyText.prototype.handleAccessKey = function($control, key) {
    //$control.find("input").click();

    var $param = $control.find(".dropdown-button");
    if ($param.length === 0) {
        $param = $control;
    }
    if (key === "ESCAPE") {
        this.DropdownCloser.apply($param);
    }
    else {
        this.DropdownOpener.apply($param);
    }

};

ControlGenerators.ComboBoxReadonlyText.prototype.setText = function($control, sText) {
    if (!$control.is('input.combo-textbox')) {
        $control = $control.find('input.combo-textbox');
    }
    $control.val(sText);
    $control.attr('value', sText);
    $control.attr('defaultValue', sText);
};

ControlGenerators.ComboBoxReadonlyText.prototype.GetIcon = function() {
    return null;
};