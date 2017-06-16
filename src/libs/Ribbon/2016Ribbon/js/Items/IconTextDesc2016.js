namespace("ItemGenerators2016");

ItemGenerators2016.IconTextDesc = ItemGenerators.IconTextDesc.extend({
    getValue: function ($itemXml) {
	    var text;
	    if(this.IsRibbonItem){
	    	text = this.getItemTextInnerHtml($itemXml);
		}
		else{
			text = $itemXml.attr('text');
		}
        text = text != null && !text.isEmpty() ? text : "";
        return $('<div class="dropdown-item-value" unselectable="on"><b>' + text + '</b></div>');
    }
});
                  
  