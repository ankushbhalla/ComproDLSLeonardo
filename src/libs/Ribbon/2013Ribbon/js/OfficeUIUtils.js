function getSplitButtonPart() {
    var $part = getHoveredSpan();
    $part.addClass("split-button-part");
    return $part;
};

function getHoveredSpan() {
    return UIUtils.getUnselectableSpan("", "office-hover-default");
};

function getDropdownButton(bHoverEffect) {
    var $arrowButton = UIUtils.getUnselectableSpan('', 'dropdown-button');
    $arrowButton.append(getDownArrow());
    if (bHoverEffect)
    { $arrowButton.addClass('office-hover-default'); }
    return $arrowButton;
};

$.fn.addShortCut = function (key) {
    var $shortCutDiv = $('<div class="ribbon-SK">' + key + '</div>');
    $(this).append($shortCutDiv);

    //    var top = $(this).offset().top + 13;
    //    var left = $(this).offset().left;

    //    $shortCutDiv.css({ 'top': top, 'left': left });


    $(this).data('accessShortcut', key);
    $(this).addClass('accessible');
};

/**** Start -- Support for Hidden ShortCut Keys ***/
$.fn.addHiddenShortCuts = function (keys) {

    $(this).data('accessHiddenShortcuts', keys);

};
/**** End -- Support for Hidden ShortCut Keys ***/