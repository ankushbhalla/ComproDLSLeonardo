namespace("ItemGenerators2016");

ItemGenerators2016.ItemBase = ItemGenerators.ItemBase.extendOverwrite({

    getItem: function (xItem, type, contextMenuType, IsRibbonItem) { 
        // IsRibbonItem argument is added to check if the item created is for ribbon or some other component
        this.IsRibbonItem = IsRibbonItem;
        return this.base(xItem, type, contextMenuType);
    },

    getItemTextPart: function ($itemXml) {    
        var itemText = $itemXml.attr('text');
        var $text = UIUtils.getUnselectableDiv('', 'dropdown-item-text');
        if(this.IsRibbonItem){
            var innerHtml = this.getItemTextInnerHtml($itemXml);
            $text.html(innerHtml);
        }
        else{
            $text.text(itemText);
        }
        return $text;
    },

    getItemTextInnerHtml: function ($itemXml) {
        
        // Changes done for SO-74398
        // $itemXml.attr('textForAccKey') property was added to store text with ~ sign in order to underline the access char evertime after reset
        // $itemXml.attr('text') was set to text without '~' as this is used as many other places also like showing clickstream, text in dropdown item.

        var newHTML, itemText;
        newHTML = itemText = $itemXml.attr('textForAccKey') || $itemXml.attr('text');
        
        if (itemText) {

            var tildeSplitArray = itemText.split("~");

            if (tildeSplitArray.length === 1) {
                var accesskey = $itemXml.attr('ak');
                if (accesskey) {
                    var aksplittedarray = itemText.toLowerCase().split(accesskey.toLowerCase());
                    if (aksplittedarray.length > 1) { //if access key is present
                        newHTML = itemText.substring(0, aksplittedarray[0].length) + '<span class="dropdown-item-accesskeyChar">' + itemText.charAt(aksplittedarray[0].length) + '</span>' + itemText.substring(aksplittedarray[0].length + 1);
                    }
                }
            }
            else if (tildeSplitArray.length === 2) {
                newHTML = tildeSplitArray[0] + '<span class="dropdown-item-accesskeyChar">' + tildeSplitArray[1].charAt(0) + '</span>' + tildeSplitArray[1].substring(1);
                $itemXml.attr('text', tildeSplitArray.join(""));
                $itemXml.attr('textForAccKey', itemText);
            }
        }

        return newHTML;
    },

    handleAccessKey: function ($item, key) {
        var $subItems = $item.find('.dropdown-next-level-wrapper:first');
        if (key === "ESCAPE") {
            $subItems.hide();
            $item.trigger("hideSubItems");
        }
        else{
            return this.base($item, key);
        }
    }

});