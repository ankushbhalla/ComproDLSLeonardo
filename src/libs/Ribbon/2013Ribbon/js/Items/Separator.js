namespace("ItemGenerators");

ItemGenerators.Separator = ItemGenerators.ItemBase.extend({
    getItem: function (xItem, type) {
        var $itemXml = $(xItem);
        var separatormode = $itemXml.attr('mode');
        var cssclass;
        if (separatormode == 'solid') {
            cssclass = ' dropdown-item-text-separator';
        }
        else if (separatormode == 'dashed') {
            cssclass = ' dropdown-item-text-separator-dashed';
        }
        var itemDiv = UIUtils.getUnselectableDiv('', cssclass);
        return itemDiv;
        //SIMS.Controls.Factory
        //$iconPart.addClass('office-hover-default');
        //return $iconPart;
    }
});