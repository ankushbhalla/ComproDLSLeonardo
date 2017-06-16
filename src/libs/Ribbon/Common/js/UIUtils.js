'use strict';
var UIUtils = {};

UIUtils.getUnselectableGenericElement = function (tagName, id, className) {
    return UIUtils.getGenericHtmlElement({
        tagName: tagName,
        id: id,
        class: className,
        attributes: [{
            name: "unselectable",
            value: "on"
        }]
    });
};

UIUtils.getRadioButton = function (options) {
    var $radio = UIUtils.getGenericHtmlElement({
        tagName: "input",
        id: options.id,
        class: options.className,
        attributes: [{
            name: "name",
            value: options.name
        }, {
            name: "type",
            value: 'radio'
        }]
    });

    var $div = $("<span/>");
    $div.addClass(options.class);
    $div.text(options.text);
    $div.prepend($radio);
    
    return $div;
};

UIUtils.getUnselectableDiv = function (id, className) {
    return UIUtils.getUnselectableGenericElement("div", id, className);
};

UIUtils.getUnselectableSpan = function (id, className) {
    return UIUtils.getUnselectableGenericElement("span", id, className);
};

UIUtils.getGenericHtmlElement = function (options) {
    if (options == null) {
        return null;
    }
    else {
        var $element = $("<" + options.tagName + " />");
        if (options.id != null && options.id.length > 0) {
            $element.attr("id", options.id);
        }
        $element.attr("class", options.class);
        for (var i = 0; i < options.attributes.length; i++) {
            var currentAttr = options.attributes[i];
            $element.attr(currentAttr.name, currentAttr.value);
        }

        return $element;
    }
};

UIUtils.getHorizontalOverflow = function (overflowingElement, container) {
    var containerRight = (container == document ? 0 : $(container).offset().left) + $(container).outerWidth();
    var overflowingElementRight = $(overflowingElement).offset().left + $(overflowingElement).outerWidth();
    return overflowingElementRight - containerRight;
};

// To be Coded Later
//UIUtils.getImage = function(options) {
//}
//UIUtils.getImageFromXml = function (xmloptions) {
//}

UIUtils.getVerticalOverflow = function (overflowingElement, container) {
    var containerBottom = (container == document ? 0 : $(container).offset().top) + $(container).outerHeight();
    var overflowingElementBottom = $(overflowingElement).offset().top + $(overflowingElement).outerHeight();
    return overflowingElementBottom - containerBottom;
};

UIUtils.getVerticalOverflowFromTop = function (overflowingElement, container) {
    var containerTop = (container == document ? 0 : $(container).offset().top);
    var overflowingElementTop = $(overflowingElement).offset().top;
    return containerTop - overflowingElementTop;
};

UIUtils.getVerticalOverflowFromBottomAndTopBoth = function (overflowingElement, container) {
    var containerBottom = (container == document ? 0 : $(container).offset().top) + $(container).outerHeight();
    var overflowingElementBottom = $(overflowingElement).offset().top + $(overflowingElement).outerHeight();
    var overflowFromBottom = overflowingElementBottom - containerBottom;

    if(overflowingElement.offset().top - $(container).offset().top > overflowFromBottom)
    {
        return  overflowFromBottom;
    }
    else
    {
        return overflowingElement.offset().top - $(container).offset().top;
    }
};