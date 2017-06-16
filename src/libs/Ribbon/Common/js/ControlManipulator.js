'use strict';
$.fn.getData = function () {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).getData($(this));
};

$.fn.setData = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).setData($(this), data);
};

$.fn.focalize = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).focalize($(this), data);
};

$.fn.enable = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).enable($(this), data);
}; 

$.fn.reinitialize = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).reinitialize($(this), data);
};

$.fn.handleAccessKey = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).handleAccessKey($(this), data);
};

$.fn.handleAccessKeyMultiControl = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).handleAccessKeyMultiControl($(this), data);
};

$.fn.isFocused = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).isFocused($(this));
};

$.fn.isEnabled = function(data) {
    var controlType = $(this).data('type');
    if (controlType != undefined)
        return SIMS.Controls.Factory.getGenerator(controlType).isEnabled($(this));
    else
        return false;
};

$.fn.showTableMarkers = function (data) {
    var controlType = $(this).data('type');
    return SIMS.Controls.Factory.getGenerator(controlType).showTableMarkers($(this), data);
};