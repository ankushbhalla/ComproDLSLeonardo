namespace("SIMS.Manipulators");

SIMS.Manipulators.TabHeader.oldSelectTab = SIMS.Manipulators.TabHeader.selectTab;
SIMS.Manipulators.TabHeader.selectTab = function($tabHeader, $tabContainer) {
    
    var $ribbon = $tabHeader.closest(".ribbon");
    if (!this.isCollapsedMode($ribbon)) { //base handling for non-collpased mode
        return SIMS.Manipulators.TabHeader.oldSelectTab.apply(this, [$tabHeader, $tabContainer]);
    } else {
        return this.selectTabForCollapsedMode($tabHeader, $tabContainer, $ribbon);
    }
};

SIMS.Manipulators.TabHeader.isCollapsedMode = function($ribbon) {
    var isCollapsedMode = false;
    if ($ribbon.length > 0) {
        isCollapsedMode = $ribbon.hasClass("COLLAPSED");
    }
    return isCollapsedMode;

};

SIMS.Manipulators.TabHeader.selectTabForCollapsedMode = function($tabHeader, $tabContainer, $ribbon) {
    var retVal = false;
    if ($tabHeader.is('.tab-header-backstage')) {
        this.UnbindSIMAreaMouseDown();
        retVal = SIMS.Manipulators.TabHeader.oldSelectTab.apply(this, [$tabHeader, $tabContainer]);
    }
    else if ($tabHeader.hasClass("tab-header-selected")) {
        this.UnbindSIMAreaMouseDown();
        this.HideTabContainer($ribbon);
    } else {
        retVal = SIMS.Manipulators.TabHeader.oldSelectTab.apply(this, [$tabHeader, $tabContainer]);
        this.BindSIMAreaMouseDownInCollapsedMode($ribbon);
    }
    return retVal;

};

SIMS.Manipulators.TabHeader.SIMAreaMouseDownHandler = function($ribbon, e) {
    if ((!$(e.target).closest(".ribbon").length > 0) || ($(e.target).closest(".title-bar").length > 0)) {
        this.UnbindSIMAreaMouseDown();
        this.HideTabContainer($ribbon);
    }

}
SIMS.Manipulators.TabHeader.BindSIMAreaMouseDownInCollapsedMode = function($ribbon) {
    this.UnbindSIMAreaMouseDown();
    SIMS.Objects.DOMElements.SIMArea.on("mousedown.tabs",  $.proxy(this.SIMAreaMouseDownHandler,this, $ribbon));
};


SIMS.Manipulators.TabHeader.HideTabContainer = function($ribbon) {
    var $selectedTabHeader = $ribbon.find(".tab-header-selected");
    if ($selectedTabHeader.length > 0) {
        $selectedTabHeader.removeClass("tab-header-selected");
    }
    var $selectedTabContainer = $ribbon.find(".ribbon-tab-container");
    if ($selectedTabContainer.length > 0) {
        $selectedTabContainer.hide();
    }
    

};

SIMS.Manipulators.TabHeader.UnbindSIMAreaMouseDown = function() {
SIMS.Objects.DOMElements.SIMArea.off("mousedown.tabs",  this.SIMAreaMouseDownHandler);
};