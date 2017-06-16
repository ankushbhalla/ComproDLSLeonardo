ControlGenerators.ControlBase.prototype.AttachTooltip = function (oldFunc) {
    return function () {
        var titleText = this.$controlXml.attr("tooltip-title");
        if (titleText) {
                this.$control.attr("title", titleText);
        }
        else{
            oldFunc.apply(this);
        }
    };
} (ControlGenerators.ControlBase.prototype.AttachTooltip);