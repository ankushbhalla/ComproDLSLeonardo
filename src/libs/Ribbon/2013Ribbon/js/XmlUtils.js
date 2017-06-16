$.fn.getAttribute = function (attrName, valueIfNull) {
    var attrVal = $(this).attr(attrName);
    if (attrVal == null || attrVal == undefined || attrVal == "") {
        if (valueIfNull != null && valueIfNull.length > 0) {
            return valueIfNull;
        }
        else {
            return null;
        }
    }
    return attrVal;
};
$.fn.getTrueOrFalse = function (attrName, defaultValue) {
    var bool = defaultValue != null ? defaultValue : false;
    if ($(this).length > 0) {
        var val = $(this).getAttribute(attrName, null);

        if (val != null) {
            if (val.toLowerCase() == 'true' || val.toLowerCase() == '1') {
                bool = true;
            }
            else if (val.toLowerCase() == 'false' || val.toLowerCase() == '0') {
                bool = false;
            }
        }
    }
    return bool;
};

$.fn.convertToJSON = function () {
    var xml = (new XMLSerializer()).serializeToString($(this)[0]);
    var json = $.xml2json(xml);
    return json;
};

$.fn.tagName = function () {
    return $(this).prop('tagName');
};

function htmlEncode (value) {
    if (value) {
        return $('<div/>').html(value).html();
    } else {
        return '';
    }
}