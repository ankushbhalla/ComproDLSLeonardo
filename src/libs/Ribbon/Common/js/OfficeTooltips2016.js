// OfficeTooltip file for Office 2016
// Overwrite the function whcih require modifications.

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

            var verticalOverflow = UIUtils.getVerticalOverflow($tooltip, SIMS.Objects.DOMElements.SIMArea);
            if(verticalOverflow > 0) {
                $tooltip.css('top', hoveredControl.offset().top - $tooltip.outerHeight() -2);
            }            
        }
    }
};
