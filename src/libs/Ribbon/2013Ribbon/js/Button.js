/// <reference path="ControlBase.js" />

namespace("ControlGenerators");
ControlGenerators.ButtonBase = function () {
    this.AddButtonClass = function () { };
    this.$button = null;
};
ControlGenerators.ButtonBase.prototype = new ControlGenerators.ControlBase();

ControlGenerators.ButtonBase.prototype.fireButtonClick = function ($control) {
    //$control.data('state', '');
    var clickstreamInfo = $control.data('clickstreamInfo');
    $control.trigger('officeButtonClick', [$control.data('desc'), $control.data('eventId'), $control.data('ICMessageId'), undefined, clickstreamInfo]);
    return false;
};

ControlGenerators.ButtonBase.prototype.handleAccessKey = function ($control, key) {
    this.fireButtonClick($control);
    return true;
};

ControlGenerators.Button = function () { };
ControlGenerators.Button.prototype = new ControlGenerators.ButtonBase();

ControlGenerators.Button.prototype.makeControl = function () {
    //var controlLabel = $controlXml.attr("text");
    //this.type = $controlXml.attr('type');
    var $controlXml = this.$controlXml;

    var bEnabled = true;
    var disabled = $controlXml.attr('disabled');
    if (disabled != null && (disabled.toLowerCase() == 'true' || disabled == '1')) {
        bEnabled = false;
    }

    this.$button = bEnabled ? getHoveredSpan(bEnabled) : UIUtils.getUnselectableSpan();
    this.$button.addClass("button-binder");
    this.$button.appendTo(this.$control);

    this.AddButtonClass();

    //Add Button Icon
    var $iconXml = $controlXml.find("icon");
    var $icon = getIcon($iconXml);
    $icon.addClass("button-icon");
    this.$button.append($icon);

    //Add button text
    var $buttonText = UIUtils.getUnselectableSpan("", "button-label");
    $buttonText.text(this.desc);
    this.$button.append($buttonText);

    //Width handling
    var wd = $controlXml.attr("wd");
    if (wd != null && !wd.isEmpty()) {
        this.$button.css("width", wd);
    }

    //Add Functionality
    this.AddFuctionality();
    this.AddMoreFunctionality();

    return this.$control;
};

ControlGenerators.Button.prototype.AddFuctionality = function () {
    var self = this;
    this.$button.click(function () {
        self.fireButtonClick($(this).parents(".office-control").first());
        //alert("Yo nigga! You clicked " + $(this).data('desc'));
    });
};

ControlGenerators.ToggleButton = function () { };
ControlGenerators.ToggleButton.prototype = new ControlGenerators.Button();
//ControlGenerators.ToggleButton.prototype.AddMoreFunctionality = function () {
//    this.$button.click(function () {
//        $(this).toggleClass('active-toggle');
//        $(this).data('state', $(this).hasClass('active-toggle').toString());
//    });
//};

ControlGenerators.MinimalButton = function () { };
ControlGenerators.MinimalButton.prototype = new ControlGenerators.Button();
ControlGenerators.MinimalButton.prototype.AddButtonClass = function () {
    this.$button.addClass('minimal-button');
};

////////////////MinimalToggleButton/////////////////////
ControlGenerators.MinimalToggleButton = function () { };
ControlGenerators.MinimalToggleButton.prototype = new ControlGenerators.MinimalButton();
//ControlGenerators.MinimalToggleButton.prototype.AddMoreFunctionality = ControlGenerators.ToggleButton.prototype.AddMoreFunctionality;
//--------------MinimalToggleButton--------------------/
