namespace("SIMS.Manipulators");

SIMS.Manipulators.RibbonControlManipulatorFactory = Base.extend({
    _controlFactory: null,
    _itemFactory: null,
    _singletonInstance: null,
    handleAccessKey: null,

    //Making Singleton
    constructor: function () {
        if (this._singletonInstance != null) {
            return this._singletonInstance;
        }
        else {
            this._controlFactory = new ControlGenerator();
            this._itemFactory = new ItemGenerators.Factory();
            this.getManipulator = function ($control) {

                if ($control.is(".filemenu-manipulator")) {

                    if (($control.is(".submenu-item"))||($control.is(".left-pane-submenu-item"))) {

                        return SIMS.Manipulators.FileSubMenuList;
                    }

                    if (($control.is(".folder-item"))||($control.is(".right-pane-folder-item"))) {

                        return SIMS.Manipulators.FileFolderItem;
                    }

                    if ($control.is(".change-filetype-item")) {

                        return SIMS.Manipulators.ChangeFileTypeList;
                    }

                    if ($control.is(".tempImgTextSelector")) {

                        return SIMS.Manipulators.NewTemplateList;
                    }

                    if ($control.is(".hyperLinkList")) {

                        return SIMS.Manipulators.SearchLinks;
                    }

                    if ($control.is(".tempSearchWrap")) {

                        return SIMS.Manipulators.SearchInput;
                    }

                    if ($control.is(".tempSearchImgWrap")) {

                        return SIMS.Manipulators.SearchButton;
                    }

                    if ($control.is(".general-hyperlink")) {

                        return SIMS.Manipulators.GeneralHyperlink;
                    }
                    if ($control.is(".featured-personal-hyperlink")) {

                        return SIMS.Manipulators.FeaturedPersonalHyperlink;
                    }

                    if ($control.is(".general-textbox")) {

                        return SIMS.Manipulators.GeneralTextBox;
                    }

                    if ($control.is(".navigation-button")) {

                        return SIMS.Manipulators.NavigationButton;
                    }

                    if ($control.is(".start-page-left-pane-item")) {

                        return SIMS.Manipulators.StartPageLeftPaneItem;
                    }
                    if ($control.is(".hyperlink")) {

                        return SIMS.Manipulators.Hyperlink;
                    }
                    if ($control.is(".HyperlinkWithoutStandardKeyHandling")) {

                        return SIMS.Manipulators.HyperlinkWithoutStandardKeyHandling;
                    }
                    if ($control.is(".manage-doc-option-manipulator")) {
                        return SIMS.Manipulators.ManageDocOption;
                    }

                    return SIMS.Manipulators.FileMenuList;
                }

                var type = $control.data("controlType");
                if (type != null && type != "") {
                    var generator = this._controlFactory.getGeneratorInstance(type);

                    if (!generator) {
                        generator = SIMS.Controls.Factory.getGenerator(type);
                    }

                    return generator;
                }
                type = $control.data("itemType");
                if (type != null && type != "") {
                    return this._itemFactory.getGeneratorInstance(type);
                }
                else if ($control.is(".tab-header")) {
                    return SIMS.Manipulators.TabHeader;
                }
                else if ($control.is(".section-launcher")) {
                    return SIMS.Manipulators.SectionLauncher;
                }


            };
            this.handleAccessKey = function ($control, key) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                return requiredManipulator.handleAccessKey($control, key);
            };
            this.handleStandardKey = function ($control, key) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                return requiredManipulator.handleStandardKey($control, key);
            };
            this.getItemForStandardKey = function ($control, key) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                return requiredManipulator.getItemForStandardKey($control, key);
            };

            this.addNavigationHover = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                return requiredManipulator.addNavigationHover($control);
            };

            this.addNavigationHoverOnParentItemOnly = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                return requiredManipulator.addNavigationHoverOnParentItemOnly($control);
            };

            this.removeNavigationHover = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!=undefined)
                    return requiredManipulator.removeNavigationHover($control);
            };

            this.getNextTabItem = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!= undefined)
                    return requiredManipulator.getNextTabItem($control);
            };

            //Fix for KL032
            this.getPreviousTabItem = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if (requiredManipulator != undefined) {
                    if (requiredManipulator["getPreviousTabItem"]) {
                        return requiredManipulator.getPreviousTabItem($control);    
                    }
                    else {
                        return requiredManipulator.getNextTabItem($control);
                    }
                }                    
                    
            };

            this.ShowContextMenu = function ($control) {
                var requiredManipulator = this.getManipulator($control);
                if(requiredManipulator!=undefined)
                {
                    if(typeof (requiredManipulator.ShowContextMenu) != "undefined")
                        return requiredManipulator.ShowContextMenu($control);
                    else
                     return null;
                }

            };

            this.getSpecialEnterMode = function ($control) {
                var requiredManipulator = this.getManipulator($control);

                if (typeof (requiredManipulator.getSpecialEnterMode) != "undefined") {
                    // safe to use the function
                    return requiredManipulator.getSpecialEnterMode($control);
                }
                else
                    return null;      

            };
        }
    }
});