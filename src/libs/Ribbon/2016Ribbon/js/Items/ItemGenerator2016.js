namespace("ControlGenerators");

ControlGenerators.ItemsGenerator.prototype.GetItemTypeGeneratorIstance = function(type){
    var generator = ItemGenerators2016[type] || ItemGenerators[type];
    return generator;
};

ControlGenerators.ItemsGenerator.prototype.GenerateItem = function(generator, xItem, type){
    
    // this.ContextMenuType is passed to identify if the item is using new JSON CM approach or not ( this was needed in makeItem function in itembase.js )
    // IsAccessUnderlineRequired argument is added to check if the item created is for ribbon or some other component
    var $itemDiv = generator.prototype.getItem(xItem, type, this.ContextMenuType, this.IsAccessUnderlineRequired);
    return $itemDiv;
};

ControlGenerators.ItemsGenerator.prototype.InitializeFlags = function(xItems)
{
    var $xmlRibbonObj = $(xItems).closest('ribbon,[mt-kb-util="true"]'); // added mt-kb-util attr selector for enabling access keys in mini toolbar
    if($(xItems).length > 0){     
        this.IsAccessUnderlineRequired = false;
        if($xmlRibbonObj.length > 0){
            this.IsAccessUnderlineRequired = true;
        }
    }   

    // Fix for SIMS-121413
    //note that this.ContextMenuType is static, so it must be updated everytime here to avoid conflict if two ribbons esp. from different applications are open side by side.
    this.ContextMenuType = $xmlRibbonObj.attr('menutype') || null;
    
};

ControlGenerators.ItemsGenerator.prototype.FireSubDropdownVisibilityEvent = function ($itemDiv, eventType) {
    if(eventType == "hide"){
        $itemDiv.trigger("hideSubItems");
    }
    else if(eventType == "show"){
        $itemDiv.trigger("showSubItems");
    }
};