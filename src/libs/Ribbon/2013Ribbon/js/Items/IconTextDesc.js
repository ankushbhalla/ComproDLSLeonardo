namespace("ItemGenerators");

ItemGenerators.IconTextDesc = ItemGenerators.IconAndText.extend({
    getItemTextPart: function ($itemXml) {
        var $textPart = $('<div class="dropdown-item-text" unselectable="on" />');
        var $text = this.getValue($itemXml);
        var $desc = this.getDesc($itemXml);

        $textPart.append($text, $desc);
        return $textPart;
    },
    getIconPart: function ($itemXml) {
        var $icon = ItemGenerators.IconAndText.prototype.getIconPart($itemXml);
        $icon.addClass("dropdown-big-icon");
        return $icon;
    },
    getValue: function ($itemXml) {
        var text = $itemXml.attr('text');
        text = text != null && !text.isEmpty() ? text : "";
        return $('<div class="dropdown-item-value" unselectable="on"><b>' + text + '</b></div>');
    },
    getDesc: function ($itemXml) {
        var desc = $itemXml.attr('desc');
        desc = desc != null && !desc.isEmpty() ? desc : "";
        return $('<div class="dropdown-item-desc" unselectable="on">' + desc + '</div>');
    }
});
                  
  