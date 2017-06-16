namespace("ControlGenerators");
ControlGenerators.Separator = function () {
};
ControlGenerators.Separator.prototype = new ControlGenerators.ControlBase();
ControlGenerators.Separator.prototype.getControl = function () {
    //var $controlXml = this.$controlXml;
    var $control = this.$control;
    var $separator = UIUtils.getUnselectableSpan('', 'office-separator');
    $separator.appendTo($control);
    return $control;
};