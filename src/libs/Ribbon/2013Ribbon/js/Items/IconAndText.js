namespace("ItemGenerators");

ItemGenerators.IconAndText = ItemGenerators.ItemBase.extend({
    Init: function ($itemXml) {
        var $item = this.base($itemXml);
        this.PartGetters = ['getIconPart', 'getItemTextPart'];

        return $item;
    },


    getIconPart: function ($itemXml) {
        var $icon = UIUtils.getUnselectableDiv('', 'dropdown-item-icon');
        var iconSrc = $itemXml.getAttribute('icon', null);
        if (iconSrc != null) {
            $icon.attr('style', 'background-image:url(' + iconSrc + ');');
        }
        else if ($itemXml.children('icon').length > 0) {
            $icon.append(getIcon($itemXml.find('icon')));
        }
        else if($itemXml.attr('showIcon') == "false" || $itemXml.attr('showIcon')==false)
        {
            $icon.addClass("no-icon");
        }
        return $icon;
    }
});