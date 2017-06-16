'use strict';
var hoveredControl;
var tooltipTimeout;
var mouseXForTT, mouseYForTT;
$(document).ready(function () {
    $(document).mousemove(function (e) {
        mouseXForTT = e.pageX;
        mouseYForTT = e.pageY;
    });
});

var OfficeUIUtls = {};
OfficeUIUtls.TooltipHelpers = {};
OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters = {};
OfficeUIUtls.TooltipHelpers.PositioningTranslator = function (positioning) {
    //Supported Modes: RibbonBottom, Floating
    var translation = positioning;

    if (positioning == '' || positioning == 'Default' || positioning == null) {
        //Default is RibbonBottom
        translation = 'RibbonBottom';
    }
    return translation;
};

OfficeUIUtls.TooltipHelpers.TranslateTooltipType = function (tooltipType) {
    var translation = tooltipType;
    if (tooltipType == '' || tooltipType == 'Default' || tooltipType == null) {
        translation = 'HeaderBody';
    }
    return translation;
};

OfficeUIUtls.TooltipHelpers.TooltipParts = ['header', 'body', 'pic', 'help'];
OfficeUIUtls.TooltipHelpers.TooltipTypes = {};
OfficeUIUtls.TooltipHelpers.TooltipTypes.HeaderBody = { header: true, body: true };
OfficeUIUtls.TooltipHelpers.TooltipTypes.BodyOnly = { body: true };
OfficeUIUtls.TooltipHelpers.TooltipTypes.HeaderBodyPic = { header: true, body: true, pic: true };
OfficeUIUtls.TooltipHelpers.TooltipTypes.HeaderBodyHelp = { header: true, body: true, help: true };
OfficeUIUtls.TooltipHelpers.TooltipTypes.HeaderBodyPicHelp = { header: true, body: true, pic: true, help: true };

OfficeUIUtls.TooltipHelpers.TranslateTooltipTypeIntoClasses = function (tooltipType) {
    var typeInfo = OfficeUIUtls.TooltipHelpers.TooltipTypes[tooltipType];
    var classNames = '';
    var tooltipParts = OfficeUIUtls.TooltipHelpers.TooltipParts;
    for (var i = 0; i < tooltipParts.length; i++) {
        if (!typeInfo[tooltipParts[i]]) {
            classNames += 'tooltip-no' + tooltipParts[i] + ' ';
        }
    }
    return classNames;
};

OfficeUIUtls.TooltipHelpers.GetToolTip = function (xToolTip) {
    var tooltipType = $(xToolTip).attr('type');
    tooltipType = OfficeUIUtls.TooltipHelpers.TranslateTooltipType(tooltipType);
    var toolTipClasses = OfficeUIUtls.TooltipHelpers.TranslateTooltipTypeIntoClasses(tooltipType);
    var templateMarkup = '<div class="tooltip ' + toolTipClasses + 'tooltip-' + tooltipType.toLowerCase() + '"><div class="tooltip-header">${header}</div><div class="tooltip-image"><div class="tooltip-image-div"{{if img}} style="background-image:url(${img.src});width:${img.wd};height:${img.ht};background-position:${img.imgcrop.left} ${img.imgcrop.top}"{{/if}} /></div><div class="tooltip-body">{{html body}}</div><div class="tooltip-help"><div class="tooltip-help-icon"/><div class="tooltip-help-text">{{if helptext}}${helptext}{{else}}Tell me more{{/if}}</div></div></div>';
    templateMarkup = templateMarkup.replace(/[\n\r\t]/g, "");
    var $template = jQuery.template('tooltipTemplate', templateMarkup);
    var jsonToolTip = xToolTip.convertToJSON();
    var $tooltip = jQuery.tmpl('tooltipTemplate', jsonToolTip);

    //Positioning
    var tooltipPosition = $(xToolTip).attr('position');
    tooltipPosition = OfficeUIUtls.TooltipHelpers.PositioningTranslator(tooltipPosition);
    $tooltip.data('positiongetter', tooltipPosition);
    return $tooltip;
};

OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters.RibbonBottom = function () {
    var ddLeft = $(hoveredControl).offset().left;
    var $ribbon = $(hoveredControl).parents('.ribbon-tab-container');
    if ($ribbon.length > 0) {
        var ddTop = $ribbon.outerHeight() + $ribbon.offset().top;
        return { top: ddTop, left: ddLeft };
    }
};

OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters.Floating = function () {
    var ddLeft = mouseXForTT - ($(hoveredControl).offset().left - $(hoveredControl).position().left) + 10 /*Cursor Dimensions*/;
    var ddTop = mouseYForTT - ($(hoveredControl).offset().top - $(hoveredControl).position().top) + 20 /*Cursor Dimensions*/;

    return { top: ddTop, left: ddLeft };
};

OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters.Item = function () {
    var ddLeft = mouseXForTT + 10 /*Cursor Dimensions*/;
    var ddTop = mouseYForTT  + 20 /*Cursor Dimensions*/;

    return { top: ddTop, left: ddLeft };
};

OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters.CondensedSection = function () {
    var ddLeft = $(hoveredControl).offset().left;
    var $ribbon = $(hoveredControl).parents('.ribbon-section:first');
    if ($ribbon.length > 0) {
        var ddTop = $ribbon.outerHeight() + $ribbon.offset().top + 3;
        return { top: ddTop, left: ddLeft };
    }
};

OfficeUIUtls.TooltipHelpers.ShowTooltip = function () {

    var $tooltip = $(hoveredControl).children('.tooltip'); // changed from $(hoveredControl).find('.tooltip') as items / children can also have tooltips
    
    //--------------------------------------------For SO-10352------------------------------------------------------------------------
    if($(hoveredControl).closest(".ribbon").length > 0  && !$tooltip.hasClass("tooltip-bodyonly") && !$tooltip.data("isWidthSet")) { //Bodyonly check -- SIMS-135929
        var ttWidth = $tooltip.width();
        $tooltip.width(ttWidth);
        $tooltip.data("isWidthSet", true);
    }
    //--------------------------------------------------------------------------------------------------------------------------------
    if (!$tooltip.is(':visible')) {
        var toolTipPositionGetter = $tooltip.data('positiongetter');
        if(toolTipPositionGetter!= undefined)
        {        
            $('.tooltip').not($tooltip).hide();
            var tooltipPosition = OfficeUIUtls.TooltipHelpers.ToolTipPositionGetters[toolTipPositionGetter](hoveredControl);
            if (tooltipPosition == undefined) {
                return;
            }
            $tooltip.css({ 'top': tooltipPosition.top, 'left': tooltipPosition.left });
            $tooltip.fadeIn(200);

            //Width Handling
            var overflow = UIUtils.getHorizontalOverflow($tooltip, SIMS.Objects.DOMElements.SIMArea);
            if (overflow > 0) {
                $tooltip.css('left', '-=' + (overflow + 2));
            }

            if($tooltip.hasClass("tooltip-headerbodypic") || $tooltip.hasClass("tooltip-headerbodypichelp"))
            {
                var verticalOverflow = UIUtils.getVerticalOverflow($tooltip, SIMS.Objects.DOMElements.SIMArea);
                if(verticalOverflow > 0) {
                    $tooltip.css('top', hoveredControl.offset().top - $tooltip.outerHeight() -2);
                }
            }
        }
    }
};
OfficeUIUtls.TooltipHelpers.HideTooltip = function (delay) {
    clearTimeout(tooltipTimeout);
    $(hoveredControl).find('.tooltip').delay(delay != null ? delay : 20).fadeOut(200);
};

OfficeUIUtls.TooltipHelpers.AttachTooltipFunctionality = function ($externallyPassedControl) {
    var showtooltip = OfficeUIUtls.TooltipHelpers.ShowTooltip;
    var hideTooltip = OfficeUIUtls.TooltipHelpers.HideTooltip;
    var $control = this.$control;
    if ($externallyPassedControl != null) {
        $control = $externallyPassedControl;
    }

    $control.hover(function (e) {
        hoveredControl = $(this);
        //mouseXForTT = e.pageX;
        //mouseYForTT = e.pageY;

        tooltipTimeout = setTimeout(showtooltip, 1000);
    }, hideTooltip);
};

jQuery.fn.addTooltip = function (xToolTip) {

    if (!($(this).find(".tooltip").length > 0)) {
        var showtooltip = OfficeUIUtls.TooltipHelpers.ShowTooltip;
        var hideTooltip = OfficeUIUtls.TooltipHelpers.HideTooltip;
        $(this).hover(function (e) {
            if (!($(this).find(".tooltip").length > 0)) {
                if (xToolTip != null && xToolTip.length > 0) {
                    var $tooltip = OfficeUIUtls.TooltipHelpers.GetToolTip(xToolTip);
                    $tooltip.appendTo($(this));
                }
            }
            hoveredControl = $(this);
            tooltipTimeout = setTimeout(showtooltip, 1000);
        }, hideTooltip);
    }
};
