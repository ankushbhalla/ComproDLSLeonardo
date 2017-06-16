namespace("ItemGenerators");
ItemGenerators.ImageItem = ItemGenerators.ItemBase.extend({
    Init: function ($itemXml) {
        var $item = this.base($itemXml)
        this.PartGetters = ['getImage'];
        return $item;
    },

    AddSubItemArrow: function () {
    },

    getImage: function ($itemXml) {
        //var itemDiv = UIUtils.getUnselectableSpan('', 'dropdown-image-item');
        var $iconPart = getIcon($itemXml.find('icon'));

        $iconPart.addClass('office-hover-default');
        if ($itemXml.attr("disabled") == "true") {
            $iconPart.removeClass('office-hover-default');
        }

        //        itemDiv.append($iconPart);
        //        itemDiv.data('imageName', this.$itemXml.attr('text'));

        return $iconPart;
    },

    AddClickstreamInfo: function ($item, $itemXml) {
        var itemText = "Item clicked";
        var $tooltipHeader = $itemXml.find("tooltip>header");

        if ($tooltipHeader.length > 0) { //If there is a rich tooltip
            itemText = $tooltipHeader.eq(0).text(); //eq(0) -- to guard against the condition when more than
            //one tooltip is there for a single image item (no such case found at the time of writing code)
        }

        else { //Try finding simple tooltip
            var simpleTooltip = $itemXml.attr("tooltip");
            if (simpleTooltip) {
                itemText = simpleTooltip;
            }
        }

        $item.data('clickstreamInfo', itemText);

    }
});