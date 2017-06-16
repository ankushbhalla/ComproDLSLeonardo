namespace("ItemGenerators");

//////////////////////////FONT ITEMS/////////////////////////////
ItemGenerators.Font = ItemGenerators.IconAndText.extend({
    getIconPart: function ($itemXml) {
        var $icon = $("<div class='font-dropdown-item-icon dropdown-item-icon'/>");
        
        if($itemXml.attr('showIcon') == "false" || $itemXml.attr('showIcon')==false)
        {
            $icon.addClass("no-icon");
        } 
        
        return $icon;
    },

    getItemTextPart: function ($itemXml) {
        var itemText = $itemXml.attr("text");
        var $itemText = $('<div class="dropdown-item-text" unselectable="on" style="font-size:12pt;font-family: ' + itemText + ';">' + itemText + '</div>');
        return $itemText;
    }  
});
