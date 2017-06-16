namespace("ItemGenerators");
ItemGenerators.ItemHeader = ItemGenerators.ItemBase.extend({
    getItemTextPart: function ($itemXml) {
        var $headerWrapper = UIUtils.getUnselectableDiv('', 'items-header-wrapper');
        var itemDiv = UIUtils.getUnselectableDiv('', 'items-ItemHeader');
        $(itemDiv).text($itemXml.attr('text'));

        itemDiv.appendTo($headerWrapper);

        return $headerWrapper;
    },
    AddSubItemArrow:function () {
    },
    fireEventOnParentControl: function () {
    }
});