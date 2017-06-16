namespace("ControlGenerators");

ControlGenerators.ComboBox.prototype.makeControl = function(basefunc) {
	return function() {
		var $control = basefunc.apply(this);
		if (this.$controlXml.attr('leftOffset')) {
			$control.find('.combobox').data('leftOffset', this.$controlXml.attr('leftOffset'));
		};
		return $control;
	}
}(ControlGenerators.ComboBox.prototype.makeControl);

ControlGenerators.ComboBox.prototype.DropdownOpener = function(basefunc) {
	return function() {
		basefunc.apply(this, arguments);
		var $comboBox = $(this).closest('.combobox');
		if ($comboBox.data('leftOffset')) {
			var $simArea = SIMS.Objects.DOMElements.SIMArea;
			var $comboWrapper = $comboBox.closest('.combobox-wrapper');
			var $dropDown = $comboWrapper.find('.combobox-dropdown:not(.contextMenu)');
			var comboLeft = $comboBox.offset().left;
			var winWidth = $simArea.width();
			var ddWidth = $dropDown.width();
			var offset = 0;
			if ($comboBox.data('leftOffset')) {
				offset = parseInt($comboBox.data('leftOffset'));
			}
			if (comboLeft + ddWidth > winWidth) {
				$dropDown.css("left", (winWidth - ddWidth - comboLeft) - offset);
			}
		}

	}

}(ControlGenerators.ComboBox.prototype.DropdownOpener);

ControlGenerators.DropDownButtonHorizontal.prototype.DoubleClickHandler = function(e)
{
    var control = $(this).parents(".office-control:first");

    // Done for SO-98186, on double clicking the app icon control, message for dropdown close was not triggered.
    var $dropdown = control.find(".dropdown-open");
    if($dropdown.length > 0){
    	$dropdown.trigger("RibbonDropdownClosed");
    }
    
    var clickstreamInfo = control.data('clickstreamInfo') + " double-clicked";
    $(this).trigger("officeButtonClick", ["control double clicked", control.data('eventId'), undefined, undefined, clickstreamInfo]);
    $(this).parents(".combobox-wrapper:first").removeClass('active-toggle');
};