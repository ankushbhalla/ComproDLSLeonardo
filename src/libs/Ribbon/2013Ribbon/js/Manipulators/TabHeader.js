namespace("SIMS.Manipulators");

SIMS.Manipulators.TabHeader = function () {
};

SIMS.Manipulators.TabHeader.getNextTabItem = ControlGenerators.ControlBase.prototype.getNextTabItem;
SIMS.Manipulators.TabHeader.getPreviousTabItem = ControlGenerators.ControlBase.prototype.getPreviousTabItem;
SIMS.Manipulators.TabHeader.addNavigationHover = ControlGenerators.ControlBase.prototype.addNavigationHover;
SIMS.Manipulators.TabHeader.removeNavigationHover = ControlGenerators.ControlBase.prototype.removeNavigationHover;
SIMS.Manipulators.TabHeader.getHoverItems = function ($item) {
    return $item;
};

SIMS.Manipulators.TabHeader.handleAccessKey = function ($control, key) {
    return this.selectTab($control);
};

SIMS.Manipulators.TabHeader.handleStandardKey = function ($control, key) {
    return this.selectTab($control);
};


SIMS.Manipulators.TabHeader.ShowContextMenu = function($control)
{

    var $ribbon = $control.parents(".ribbon:first");
    if ($ribbon.length!=0) {
        if ($ribbon.data('ContextMenuType') === "JSON") {
            $control.showContextMenu("ribbon");
        }
        else {
            $ribbon.triggerHandler('contextmenu'); // does not bubble up the event

            var $cm = $ribbon.find(".contextMenu:visible");
            if($cm.length>0)
            {
                $cm = $cm.first();
                var left = $control.offset().left;
                var top = $control.offset().top + $control.outerHeight();  // set its position
                $cm.offset({left : left,top : top});
            }
        }
        return true;
    }
    else
        return false;
};

SIMS.Manipulators.TabHeader.getItemForStandardKey = function ($item, key) {
    if (key === "LEFT") {
        var $requiredItem = $item.prev(".tab-header:visible");
        if ($requiredItem.length > 0) {
            return { item: $requiredItem };
        }

        return $item.siblings(".tab-header:visible").last();
    }
    else if (key === "RIGHT") {
        var $requiredItem = $item.next(".tab-header:visible");
        if ($requiredItem.length > 0) {
            return { item: $requiredItem };
        }

        return { item: $item.siblings(".tab-header:visible").first() };
    }
    else if (key === "DOWN") {
        return { item: $item.parents(".ribbon").find(".ribbon-tab-container:visible:first .office-control:first") };
    }
    else if (key === "UP") {
        var $itemsToLoopfrom = $item.parents(".ribbon").find(".title-bar .office-control:visible:not(.disabled)");
        var $reqItem = ControlGetters.GetControlFunctionMap[key]($item, $itemsToLoopfrom, true);
        return { item: $requiredItem };
    }
};

SIMS.Manipulators.TabHeader.selectTab = function ($tabHeader, $tabContainer) {

    if (!$tabHeader.is('.tab-header-backstage')) {
        $tabHeader.addClass("tab-header-selected");
        $tabHeader.siblings().removeClass("tab-header-selected");
        if ($tabContainer == null) {
            $tabContainer = $tabHeader.parent().parent().find($tabHeader.data('tabcontainer'));
        }

        //Lazy Generation of Tab content
        var $tabXml = $tabContainer.data('tabxml');
        if ($tabXml) {

            if (!SIMS.SharedData.RibbonOptimization.enableRibbonLazyLoad) {//No lazyloading of ribbon

                if (!this._ribbonGenerator) {
                    this._ribbonGenerator = new ribbonGenerator();
                }
                $tabContainer.append(this._ribbonGenerator.getTabBody($tabXml));

            }
            else { //lazy loading of ribbon

                if ($tabHeader.hasClass('tab-header-home'))     // need to call once for Home tab because until that time the event listener is not bound for 'lazyLoadTab' event
                {
                    if (!this._ribbonGenerator) {
                        this._ribbonGenerator = new ribbonGenerator();
                    }
                    $tabContainer.append(this._ribbonGenerator.getTabBody($tabXml, true));
                }
                else {
                    $tabContainer.trigger('lazyLoadTab', { tabXML: $tabXml, tabContainer: $tabContainer });       //trigger tab generation
                }


                if ($tabContainer.data('subRibbonUpdate'))                 //first the sub ribbon has to be updated then the attributes
                {
                    //this._ribbonGenerator.updateTabBody($tabContainer.data('subRibbonUpdate'));
                    $tabContainer.trigger('updateTabSubRibbon', { subRibXML: $tabContainer.data('subRibbonUpdate') });
                    //$tabContainer.trigger('updateTab',{attrList : $tabContainer.data('subRibbonUpdate')});
                    $tabContainer.removeData('subRibbonUpdate');
                }

                if ($tabContainer.data('attrList')) {
                    $tabContainer.trigger('updateTabAttributes', { attrList: $tabContainer.data('attrList') });
                    $tabContainer.removeData('attrList');
                }

            }
        }    //Lazy generation code

        //Free resources //Moved out as same code to be run for both cases i.e. Lazy Loading and No Lazy Loading
        $tabContainer.removeData('tabxml');
        $tabContainer.trigger('lazyload');
        
        $tabContainer.show();
        $tabContainer.siblings('.ribbon-tab-container').hide();

        //Allow event on Ribbon Tab click
        //Time delay is introduced in order to let the code of accesskeys to be executed at first, before the custom event listener is triggered and event is fired
        if ($tabHeader.attr("enableTabClickEvent")) {
            setTimeout(function (e) {
                $tabHeader.trigger("fireEventOnTabClick");
                $tabHeader.attr("enableTabClickEvent", false)
            }, 0);
        }
       
        return false;
    }
    else {
        $tabHeader.trigger("fileMenu");
        return true;
    }
};