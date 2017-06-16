// <reference path="jquery-1.8.2.js" />
// <reference path="UIUtils.js" />
// <reference path="OfficeUIUtils.js" />
// <reference path="ControlGenerator.js" />


    var ribbonGenerator = function() {
    this.$ribbon = null;
    this.appName = 'word';
    this.activeTabList = "";
    this.menuType;
    this.$ribbonXmlArray = [];
	
    this.getRibbonFromXml = function(ribbonXml, appName) {
        SIMS.Objects.DOMElements.Ribbon = null;
        this.appName = appName;

        var $ribbonXml = this.$ribbonXml = $(ribbonXml);
        this.$ribbonXmlArray.push(this.$ribbonXml);

        var $ribbon = this.$ribbon = $("<div class='" + this.appName + " ribbon' />");

        this.menuType = $ribbonXml.find('ribbon').attr('menutype');

        if (this.menuType == "JSON") {
            this.ribbonContextMenu = new SIMS.Components.Common.RibbonContextMenu($ribbon, this.appName);
            $ribbon.attr('id', 'ribbonmaindiv');   // this id was added as new context menu does not hide if ID not present.
            this.bindAddJSONCMEvent();
            $ribbon.data('ContextMenuType', 'JSON');
        }

        //Make Title Bar
        var $titleBar = this.getTitleBar($ribbonXml.find('ribbon titlebar'));
        $ribbon.append($titleBar);

        //Make Tabs
        var $tabs = $ribbonXml.find("ribbon tabs tab");
        var $tabsWrapper = this.$tabsWrapper = UIUtils.getUnselectableGenericElement("ul", "", "ribbon-tabs-wrapper");
        $ribbon.append($tabsWrapper);
        //Adding Tabs
        for (var i = 0; i < $tabs.length; i++) {
            var tabXml = $tabs[i];
            this.AddTab(tabXml);
        }

        //adding head for contextual tabs in title bar area.
        var $contextualTabs = $ribbon.find(".tab-header-contextual");
        for (var index = 0; index < $contextualTabs.length; index++) {
            var $contextualTabHead = $("<div></div>").addClass("contextual-tab-head");
            /*var $contextualTabHead = UIUtils.getUnselectableDiv('', 'contextual-tab-head');*/

            var headText = $($contextualTabs[index]).data("head-text") || "";
            $contextualTabHead.text(headText.toUpperCase());
            var headNameMin = Polyfills.removeSpaces(headText).replace("&", "").toLowerCase();
            $contextualTabHead.addClass("contextual-head-" + headNameMin);
            $contextualTabHead.data("tabclass", $($contextualTabs[index]).data("tabclass"));

            var self = this;
            $contextualTabHead.bind('click', function(e, desc) {
                var tabClass = $(this).data("tabclass");
                var tab = self.$ribbon.find("." + tabClass);
                //special handling for chart tool tabs
                if (tabClass == "tab-header-charttoolsformat")
                    tab = self.$ribbon.find(".tab-header-charttoolsdesign");

                if (tabClass == "tab-header-tabletoolslayout")
                    tab = self.$ribbon.find(".tab-header-tabletoolsdesign");

                if (tabClass == "tab-header-smartarttoolsformat")
                    tab = self.$ribbon.find(".tab-header-smartarttoolsdesign");

                tab.trigger("click");
            });

            $titleBar.append($contextualTabHead);
        }
        //////////////////////////////////////////////////////////////////////////

        //Adding user info
        //Leonardo Start
        // if (this.appName.toLowerCase() == "win10explorer") { // adding this case for win10 file exploror ribbon
        //     var $xUserInfo = $ribbonXml.find('userinfo');
        //     if ($xUserInfo != null) {
        //         var $userInfo = $('<li class="userinfo"/>');

        //         //Collapse button for windows 10 explorer
        //         var $collapseBtn = UIUtils.getUnselectableDiv('', 'collapseButton');

        //         //Help button for windows 10 explorer
        //         var $helpeBtn = UIUtils.getUnselectableDiv('', 'helpButton');

        //         $userInfo.append($collapseBtn, $helpeBtn);
                
        //         $userInfo.appendTo($tabsWrapper);
        //     }
        // }
        // else {
        //     var $xUserInfo = $ribbonXml.find('userinfo');  // For all office applications
        //     if ($xUserInfo != null) {
        //         var $userInfo = $('<li class="userinfo"/>');

        //         //user name
        //         var $username = UIUtils.getUnselectableDiv('', 'username');
        //         $username.text($xUserInfo.attr('name'));

        //         //Arrow
        //         var $arrow = getDownArrow();

        //         //User Icon
        //         var $icon = $('<img class="userinfo-icon" src="app/comps/common/Ribbon/img/user.png"/>');

        //         $userInfo.append($username, $arrow, $icon);

        //         $userInfo.appendTo($tabsWrapper);
        //     }
        // }
        //Leonardo End

        //Select Second tab by Default... changing selector from "tab-header:nth-child(2)" to "tab-header-home"
        var $secondTabHeader = $ribbon.find('.tab-header-home');
        this.manipulatorFactory.getManipulator($secondTabHeader).selectTab($secondTabHeader);


        if (this.menuType == "JSON") {
           // this.ribbonContextMenu.UpdateMenuBindings();
        }
        else {
            //this.AddContextMenus();
        }

        if(this.appName.toString().toLowerCase() == "ppt")
        {
            //////////////////////////////////////////////////////////////////////////
            //Selection Retainer - prevents focus shifting to Ribbon
            var blockFor = ".ribbon:not(.SIMS-PPTFileMenu)";

            var selectionRetainer = function (e) {
               // if ($(e.target).parents(".contextMenuBinder").add($(e.target).parents(".shyToolBarDropDown")).length == 0) {
                    var $clickedItem = $(e.target);
                    if ($clickedItem.closest(blockFor).length > 0) {
                        if ($clickedItem.is("input[type=text]:not(.ctrl-comboboxreadonlytext .combo-textbox)")) {
                            $clickedItem.select();
                        }
                        e.preventDefault();
                    }
                //}
            };

            SIMS.Objects.DOMElements.SIMArea.unbind("mousedown",selectionRetainer).bind("mousedown", selectionRetainer);
            //////////////////////////////////////////////////////////////////////////
        }


        /*if (gSimsAreaWidth < 1279) {
            $ribbon.find(".");

        }*/

        
        SIMS.Objects.DOMElements.Ribbon = $ribbon;  // to make the ribbon available without parsing the DOM
        return $ribbon;
    };

    this.AddContextMenus = function() {
        var $ribXml = this.$ribbonXml;
        var $ribbon = this.$ribbon;
        var xRibbonContextMenu = $ribXml.find("defaultcontextmenus:first>ribbon");
        if (xRibbonContextMenu.length > 0) {
            var $cm = ControlGenerators.ItemsGenerator.prototype.GetItems(xRibbonContextMenu);
            $cm.attr("tabindex", "-1");
            // There is 2 wrapper class, so give the wrapper class MenuItemsIterator (InsideWhich menuItems are there)
            $cm.find('.dropdown-items-wrapper').addClass("MenuItemsIterator");
            $cm.appendTo($ribbon);
            this.bindContextMenu($cm, $ribbon);
        }

        var $titlebar = this.$ribbon.find(".title-bar");
        var xtitlebarContextMenu = $ribXml.find("defaultcontextmenus:first>titlebar");
        if (xtitlebarContextMenu.length > 0) {
            var $cm = ControlGenerators.ItemsGenerator.prototype.GetItems(xtitlebarContextMenu);
            $cm.attr("tabindex", "-1");
            // There is 2 wrapper class, so give the wrapper class MenuItemsIterator (InsideWhich menuItems are there)
            $cm.find('.dropdown-items-wrapper').addClass("MenuItemsIterator");
            $cm.appendTo($titlebar);
            this.bindContextMenu($cm, $titlebar);
        }

        var xControlContextMenu = $ribXml.find("defaultcontextmenus>control");
        var $controls = $ribbon.find(".office-control");
        if ($controls.length > 0) {
            var $cm = ControlGenerators.ItemsGenerator.prototype.GetItems(xControlContextMenu);

            // There is 2 wrapper class, so give the wrapper class MenuItemsIterator (InsideWhich menuItems are there)
            $cm.find('.dropdown-items-wrapper').addClass("MenuItemsIterator");
            $cm.attr("tabindex", "-1");
            $cm.appendTo($ribbon);
            for (var i = 0; i < $controls.length; i++) {
                var $control = $($controls[i]);
                if ($control.children(".contextMenu").length == 0) {
                    this.bindContextMenu($cm, $control);
                }
            }
        }
    };

    this.bindContextMenu = function($contextMenu, $item) {
        $contextMenu.addClass("contextMenu combobox-dropdown");
        $contextMenu.attr("tabindex", "-1");
        $item.contextMenu({
            $menu: $contextMenu,
            //captureClickFor: captureClick,
            //doNotHideOnClickOf: '.shyToolBarInside',
            //shyToolBar: '.shyToolBarInside',
            inSpeed: 25,
            outSpeed: 50
        });
    };

    this.getTitleBar = function($titleBarXml) {
        var $titleBar = UIUtils.getUnselectableDiv('', 'title-bar');
        SIMS.Components.Common.RibbonCurrentTabName = "Titlebar";
        SIMS.Components.Common.RibbonCurrentSectionName = "";
        var $sections = $titleBarXml.find('sections section');

        for (var i = 0; i < $sections.length; i++) {
            var newGroup = this.getGroup($sections[i]);
            var identifier = $($sections[i]).attr('identifier');
            if (identifier != '' || identifier != undefined) {
                newGroup.addClass(identifier);
            }
            $titleBar.append(newGroup);
        }

        $titleBar.find(".office-control").addClass("titlebar-control");

        return $titleBar;
    };


    this.updateTitleBar = function ($titleBarXml) {

        SIMS.Components.Common.RibbonCurrentTabName = "Titlebar";
        SIMS.Components.Common.RibbonCurrentSectionName = "";
        var $sections = $titleBarXml.find('sections section');

        for (var i = 0; i < $sections.length; i++) {
            var identifier = $($sections[i]).attr('identifier');

            if (identifier != '' && identifier != undefined) {

                var newSection = this.getGroup($sections[i]);
                if (this.AttachSubRibbonWithIdentifier) {
                    $(newSection).addClass(identifier);
                }
                $(newSection).find(".office-control").addClass("titlebar-control");
                var oldSection = $('.title-bar .control-group.' + identifier);
                oldSection.replaceWith(newSection);

            }
            // Incase identifier is not found on section, update control as earlier
            else { 
                this.updateSection($sections[i]);
            }
        }
    };


    this.AddTab = function (tabXml) {
        var tabName = $(tabXml).attr('name');

        //Adding tab header
        var $tabHeader = this.getTabHeader(tabXml);
        this.$tabsWrapper.append($tabHeader);

        //Adding tab body

        var $tabContainer = UIUtils.getUnselectableDiv("ribbon-tab-container-" + Polyfills.removeSpaces(tabName).replace("&", "").toLowerCase(), "ribbon-tab-container");

       // $tabContainer.data('tabxml',tabXml);
        this.$ribbon.append($tabContainer);

        if (!SIMS.SharedData.RibbonOptimization.enableRibbonLazyLoad) {
            var self = this;
            $tabContainer.append(self.getTabBody(tabXml));
            $tabHeader.click(function () {
                        self.manipulatorFactory.getManipulator($(this)).selectTab($(this), $tabContainer);
            });
        }
        else {

            if ($(tabXml).attr('disabled') != 'true') {
                var self = this;
                if (this.appName.toString().toLowerCase() == "excel" || this.appName.toString().toLowerCase() == "word" || this.appName.toString().toLowerCase() == "access" || this.appName.toString().toLowerCase() == "ppt" || this.appName.toString().toLowerCase() == "win10explorer")    //do lazy generation only in Word and Excel only
                {
                    $tabContainer.data('tabxml', tabXml);
                }
                else {
                    $tabContainer.append(self.getTabBody(tabXml));
                }

                //Attching Fucnctionality
                $tabHeader.click(function () {
                    self.manipulatorFactory.getManipulator($(this)).selectTab($(this), $tabContainer);
                });

            }
        }
    };

    this.getTabHeader = function(tabXml) {
        var type = $(tabXml).attr('type');
        var tabName = $(tabXml).attr("name");
        var tabNameMin = Polyfills.removeSpaces(tabName).replace("&", "").toLowerCase();
        var $tabHead = UIUtils.getUnselectableGenericElement("li", "", "tab-header");
        if (type != null && type.length > 0) {
            $tabHead.addClass('tab-header-' + type.toLowerCase());
        }

        //contextual tab head name
        var headname = $(tabXml).attr('headertext');
        $tabHead.data("head-text", headname);

        $tabHead.data('tabcontainer', '#ribbon-tab-container-' + tabNameMin);

        var tabDisplayName = tabName;
        if (type != undefined) {
            if (type.toLowerCase() == "contextual")
                tabDisplayName = tabName.replace(headname, "");
        }
        $tabHead.text(tabDisplayName);
        $tabHead.addClass("tab-header-" + tabNameMin);
        //added for contextual tab click handling
        $tabHead.data("tabclass", "tab-header-" + tabNameMin);
        if(!$tabHead.attr("id")){
            $tabHead.attr("id", "tab-header-" + tabNameMin);
        }

        //Shortcut key
        var shortcutkey = $(tabXml).attr("ak");
        if (shortcutkey != null) {
            $tabHead.addShortCut(shortcutkey);
        }
        return $tabHead;
    };

    this.selectTabByName = function(tabName) {
        var $tabHeader = $(".tab-header:contains(" + tabName + ")").filter(function() {
            return $(this).text() === tabName;
        });
        this.selectTab($tabHeader);
    };



    this.getTabBody = function(tabXml,gtg) {
        var $tabXml = $(tabXml);
        var tabName = $tabXml.attr("name");
        SIMS.Components.Common.RibbonCurrentTabName = tabName;
        var tabType = "" + $tabXml.attr("type");
        var goodToGenerate = true;

        var $tabContainer = UIUtils.getUnselectableGenericElement("ul", "ribbon-tab-" + tabName, "ribbon-tab-content");

        tabType = tabType.toLowerCase();
        tabName = tabName.toLowerCase();

        if (tabType == "contextual")
        {
            goodToGenerate = (this.activeTabList.indexOf(tabName) > -1) ? true : false;
        }



        if (goodToGenerate == true || gtg)
        {
            var $sections = $tabXml.find("sections section");
            for (var i = 0; i < $sections.length; i++) {
                            var $section = $($sections[i]);
                            if ($($sections[i]).attr("type") === "condensed") {
                                $tabContainer.append(this.getCondensedSection($sections[i]));
                            }
                            else {
                $tabContainer.append(this.getSection($sections[i]));
                           }
            }
        }



        return $tabContainer;
    };

    this.getCondensedSection = function(sectionXml) {
        var $section = $(sectionXml);
        var self = this;
        var $condensedSectionControl = null;
        // add null checks
        var condSecControlXML = $section.children("control[type='CondensedSectionControl']");
        if(condSecControlXML.length >0)
        {
            $condensedSectionControl = this.controlGeneratorFactory.getControl(condSecControlXML);

            var condSectionXML =  $section.children('condensedsection');

            if(condSectionXML.length>0)
            {
                var $condensedSection = this.getSection(condSectionXML);
                $condensedSection.find(".section-content-wrapper").addClass("condensed-section");
                $condensedSectionControl.find(".section-div").replaceWith($condensedSection);

                $condensedSection.noRepeatBind('officeButtonClick selectedIndexChanged dropdownMenuItemClick iconClick spinValueChanged checkChanged launcherClick', function(e, desc, eventId, ICMessageId, eventInfo)
                {
                    if((eventInfo==undefined) || (eventInfo.spinChangedBy == "enter"))    //special handling for spin control
                    {
                        var $parentControl = $(this).parents(".office-control.ctrl-condensedsectioncontrol:first");

                        if($parentControl.length>0)
                        {
                            self.manipulatorFactory.getManipulator($parentControl).ForceDropdownCloser($parentControl);
                            self.manipulatorFactory.getManipulator($parentControl).UpdateControlData($parentControl,"avoidClose",false);
                        }

                    }
                    else if(eventInfo && (eventInfo.spinChangedBy == "arrow"))      //special handling for spin control
                    {
                        var $parentControl = $(this).parents(".office-control.ctrl-condensedsectioncontrol:first");

                        if($parentControl.length>0)
                            self.manipulatorFactory.getManipulator($parentControl).UpdateControlData($parentControl,"avoidClose",true);
                    }
                });
            }


        }

        return $condensedSectionControl;
    };



    this.getSection = function(sectionXml) {
        var $sectionXml = $(sectionXml);
        var sectionName = $sectionXml.attr('name');
        SIMS.Components.Common.RibbonCurrentSectionName = sectionName;
        var sectionWidth = $sectionXml.attr('width');
        var sectionIdentiFier = $sectionXml.attr('identifier');
        var sectionVisibility = $sectionXml.attr('visible');


        var $section = $("<li class='ribbon-section'/>");
        //if (sectionIdentiFier !== undefined && sectionVisibility !== undefined) {

        if (sectionIdentiFier !== undefined)
            $section.attr('id', sectionIdentiFier);
        /*HideOnLowRes for December Demo*/
        var hideOnLowRes = $sectionXml.attr('display');
        if (hideOnLowRes != undefined && hideOnLowRes == 'hideOnLowRes') {
            $section.addClass('hideOnLowRes');
        }

        if ($sectionXml.attr('nrows') == '2') {
            $section.addClass('two-row-section');
        }

        $section.css('width', sectionWidth);
        var $sectionWrapper = UIUtils.getUnselectableSpan('', 'section-wrapper');
        var $sectionContentWrapper = UIUtils.getUnselectableSpan('', 'section-content-wrapper');
        var $sectionContent = this.getGroup($sectionXml);
        $sectionContent.addClass('section-content');

        var $sectionFooterArea = UIUtils.getUnselectableSpan('', 'section-footer');
        var $sectionTitle = UIUtils.getUnselectableSpan("", "section-title");
        var $sectionTitleWrapper = UIUtils.getUnselectableSpan("", "section-title-wrapper");

        $sectionTitle.text(sectionName);
        $sectionTitleWrapper.append($sectionTitle);
        $sectionFooterArea.append($sectionTitleWrapper);

        //Launcher
        var eventid = $sectionXml.attr('eventId');
        if ($sectionXml.getTrueOrFalse('launcher', false)) {
            var $dialogLauncher = this.getLauncher(sectionName, eventid, $(sectionXml).attr("ak"));
            $dialogLauncher.addTooltip($sectionXml.find('>tooltips>tooltip'));
            $sectionFooterArea.append($dialogLauncher);

            //            $dialogLauncher.bind('launcherClick', function (e,desc) {
            //                console.log(desc);
            //            });
        }
        $sectionWrapper.append($sectionContentWrapper);
        $sectionContentWrapper.append($sectionContent);
        $sectionWrapper.append($sectionFooterArea);

        $section.append($sectionWrapper);

        if (sectionVisibility == "false")
        {
            $section.addClass("sectionHide");
        }

        return $section;
    };

    this.getLauncher = function(sectionName, eventId, shortcutkey) {
        var $dialogLauncher = UIUtils.getUnselectableSpan("", "section-launcher office-hover-default");
        var clickstreamInfo = SIMS.Components.Common.RibbonCurrentTabName + " Tab : "  + SIMS.Components.Common.RibbonCurrentSectionName + " Group : Launcher";
        $dialogLauncher.data('sectionName', sectionName);
        $dialogLauncher.data('eventId', eventId);
        $dialogLauncher.data('clickstreamInfo', clickstreamInfo);
        $dialogLauncher.click(function() {
            $(this).trigger("launcherClick", [sectionName, eventId, clickstreamInfo]);
        });

        //Shortcut key
        if (shortcutkey != null) {
            $dialogLauncher.addShortCut(shortcutkey);
        }

        return $dialogLauncher;
    };

    this.getGroup = function(groupXml) {
        var $grpXml = $(groupXml);

        //Orientation
        var orientation = $grpXml.attr('orientation');

        var $group = UIUtils.getUnselectableSpan('', orientation == 'vertical' ? 'control-group-vertical' : 'control-group');

        //Float
        var float = $grpXml.attr('float');
        if (float != null && float.length > 0) {
            $group.css('float', float);
        }

        var orientation = $grpXml.attr('orientation');
        if (orientation == 'vertical') {
            $group.addClass('control-group-vertical');
        }

        //Getting groups recursively
        var $groupItems = $(groupXml).children('control');
        for (var i = 0; i < $groupItems.length; i++) {
            var itemXml = $groupItems[i];

            if ($(itemXml).children('control').length == 0) {
                $group.append(this.controlGeneratorFactory.getControl(itemXml));
            }
            else {
                $group.append(this.getGroup(itemXml));
            }
        }


        return $group;
    };

    this.updateRibbonfromXML = function (ribbonXml, ribbon, AttachSubRibbonWithIdentifier) {

        var $ribbonXml = this.$ribbonXml = $(ribbonXml);
        this.$ribbonXmlArray.push(this.$ribbonXml);

        if (this.menuType == "JSON") {
            $ribbonXml.find("ribbon").attr("menutype", "JSON");
            this.bindAddJSONCMEvent();
        }

        if (AttachSubRibbonWithIdentifier) {
            this.AttachSubRibbonWithIdentifier = true;
        }
        else {
            this.AttachSubRibbonWithIdentifier = false;
        }

        if (ribbon != null/* && ribbon.length > 0*/)
            this.$ribbon = $(ribbon);

        //        var $ribbon = this.$ribbon = $("<div class='" + this.appName + " ribbon' />");

        //Update Title Bar

        //        var $titleBar = this.getTitleBar($ribbonXml.find('ribbon titlebar'));
        //        $ribbon.append($titleBar);

        //Update Tabs
        // means updating titlebar
        var $tabs = $ribbonXml.find("ribbon tabs tab,ribbon titlebar");


        //        var $tabsWrapper = this.$tabsWrapper = UIUtils.getUnselectableGenericElement("ul", "", "ribbon-tabs-wrapper");
        //        $ribbon.append($tabsWrapper);

        //Adding Tabs

        for (var i = 0; i < $tabs.length; i++) {
            var tabXml = $tabs[i];
            this.UpdateTab(tabXml);
        }

        //Update ContextMenu

        //this.UpdateContextMenus();



    };

    this.UpdateTab = function(tabXml) {
        //var tabName = $(tabXml).attr('name');

        //Adding tab header
        //var $tabHeader = this.getTabHeader(tabXml);

        //this.$tabsWrapper.append($tabHeader);

        //Adding tab body

        //var $tabContainer = UIUtils.getUnselectableDiv("ribbon-tab-container-" + tabName.removeSpaces().replace("&", "").toLowerCase(), "ribbon-tab-container");

        //$tabContainer.append(this.getTabBody(tabXml));


        this.updateTabHeader(tabXml);



        this.updateTabBody(tabXml);



        //this.$ribbon.append($tabContainer);

        //        if ($(tabXml).attr('disabled') != 'true') {
        //            var self = this;

        //            //Attching Fucnctionality
        //            $tabHeader.click(function () {
        //                self.manipulatorFactory.getManipulator($(this)).selectTab($(this), $tabContainer);
        //            });
        //        }
    };

    this.updateTabHeader = function(tabXml) {
        //update shortcut key...

        if ($(tabXml).attr("name") != undefined) {

            var tabName = Polyfills.removeSpaces($(tabXml).attr("name")).replace("&", "").toLowerCase();
            var $tabHead = this.$ribbon.find(".tab-header-" + tabName);

            //////////////////////////////////////////////////////////////////////////
            // Implemented for SIMS-69992
            if ($(tabXml).attr("newname") != undefined) {
                var newtabName = $(tabXml).attr("newname");
                $tabHead.text(newtabName);
            }
            //////////////////////////////////////////////////////////////////////////

            //////////////////////////////////////////////////////////////////////////
            // Implemented for SIMS-61773
            var convert = $(tabXml).attr("convertToContextual");
            if (convert != undefined && convert == 'true') {
                if (!$tabHead.hasClass('tab-header-selected')) { // Do not convert tab to contextual if tab is visible.
                    $tabHead.addClass('tab-header-contextual');
                }
            }
            //////////////////////////////////////////////////////////////////////////

            var shortcutkey = $(tabXml).attr("ak");

            if (shortcutkey != null && shortcutkey != undefined) {

                if ($tabHead != undefined && $tabHead != null) {
                    $tabHead.find(".ribbon-SK").remove();
                    $tabHead.addShortCut(shortcutkey);
                }

            }
        }

    };


    this.updateTabBody = function(tabXml) {
        
        var $tabXml = $(tabXml);
        var tabName = $tabXml.attr("name");


        if(tabName)
        {
            SIMS.Components.Common.RibbonCurrentTabName = tabName;
            tabName =  Polyfills.removeSpaces($tabXml.attr("name")).replace("&", "").toLowerCase();
            var $tabContainer = this.getTabContainer(tabName);
            
            if($tabContainer.children().length==0) {// tab has not been created yet
              $tabContainer.data('subRibbonUpdate',tabXml);
            }
            else{
                if ($tabXml.attr('isTabUpdate') == "true") {
                    this.regenerateTab(tabXml);
                }
                else {
                    var $sections = $tabXml.find("sections section");
                    for (var i = 0; i < $sections.length; i++) {
                        this.updateSection($sections[i]);
                    }
                }
            }
            //UIUtils.getUnselectableGenericElement("ul", "ribbon-tab-" + tabName, "ribbon-tab-content");
        }

        else{ //titlebar doesnot have name and is created everytime, so lazyloading not handled for titlebar
            if ($tabXml.is('titlebar') == true) {
                this.updateTitleBar($tabXml);
            }
        }
    };

    this.getTabContainer = function(tabName){
        return SIMS.Objects.DOMElements.Ribbon.find('#ribbon-tab-container-'+tabName);
    };



    this.regenerateTab = function(tabXml) {
        var $ribbon = this.$ribbon;
        var $tabxml = $(tabXml);
        var tabName = $tabxml.attr("name");
        var oldTabContainer = $ribbon.find('ul#ribbon-tab-' + tabName);
        var updatedTabWrapper = this.getTabBody(tabXml, true);
        oldTabContainer.replaceWith(updatedTabWrapper);
    };

    this.updateSection = function(sectionXml) {
        var $sectionXml = $(sectionXml);

        var sectionName = $sectionXml.attr('name');
        SIMS.Components.Common.RibbonCurrentSectionName = sectionName;
        //        var sectionWidth = $sectionXml.attr('width');

        //        var $section = $("<li class='ribbon-section'/>");

        /*HideOnLowRes for December Demo*/

        //        var hideOnLowRes = $sectionXml.attr('display');

        //        if (hideOnLowRes != undefined && hideOnLowRes == 'hideOnLowRes') {
        //            $section.addClass('hideOnLowRes');
        //        }

        //        if ($sectionXml.attr('nrows') == '2') {
        //            $section.addClass('two-row-section');
        //        }

        //        $section.css('width', sectionWidth);

        //        var $sectionWrapper = UIUtils.getUnselectableSpan('', 'section-wrapper');
        //        var $sectionContentWrapper = UIUtils.getUnselectableSpan('', 'section-content-wrapper');

        this.updateGroup($sectionXml);

        //        $sectionContent.addClass('section-content');

        //        var $sectionFooterArea = UIUtils.getUnselectableSpan('', 'section-footer');
        //        var $sectionTitle = UIUtils.getUnselectableSpan("", "section-title");
        //        var $sectionTitleWrapper = UIUtils.getUnselectableSpan("", "section-title-wrapper");

        //        $sectionTitle.text(sectionName);
        //        $sectionTitleWrapper.append($sectionTitle);
        //        $sectionFooterArea.append($sectionTitleWrapper);

        //Launcher
        //        var eventid = $sectionXml.attr('eventId');

        //        if ($sectionXml.getTrueOrFalse('launcher', false)) {
        //            var $dialogLauncher = this.getLauncher(sectionName, eventid, $(sectionXml).attr("ak"));
        //            $dialogLauncher.addTooltip($sectionXml.find('>tooltips>tooltip'));
        //            $sectionFooterArea.append($dialogLauncher);

        //            //            $dialogLauncher.bind('launcherClick', function (e,desc) {
        //            //                console.log(desc);
        //            //            });
        //        }

        //        $sectionWrapper.append($sectionContentWrapper);
        //        $sectionContentWrapper.append($sectionContent);
        //        $sectionWrapper.append($sectionFooterArea);

        //        $section.append($sectionWrapper);

        //        return $section;
    };

    this.updateGroup = function(groupXml) {

        var $grpXml = $(groupXml);

        //Orientation
        //        var orientation = $grpXml.attr('orientation');

        //        var $group = UIUtils.getUnselectableSpan('', orientation == 'vertical' ? 'control-group-vertical' : 'control-group');

        //        //Float
        //        var float = $grpXml.attr('float');
        //        if (float != null && float.length > 0) {
        //            $group.css('float', float);
        //        }

        //        var orientation = $grpXml.attr('orientation');
        //        if (orientation == 'vertical') {
        //            $group.addClass('control-group-vertical');
        //        }

        //Getting groups recursively
        var $groupItems = $(groupXml).children('control');

        for (var i = 0; i < $groupItems.length; i++) {
            var itemXml = $groupItems[i];

            if ($(itemXml).children('control').length == 0) {
                this.updateControl(itemXml);
            }
            else {
                this.updateGroup(itemXml);
            }
        }
    };

    this.updateControl = function(itemXml) {



        var $ribbon = this.$ribbon ? this.$ribbon : SIMS.Objects.DOMElements.Ribbon;

        var $itemXml = $(itemXml);

        var id = $itemXml.attr('identifier');

        //var $controlParent = null;

        var selector = "." + id;

        if (id != null && !id.isEmpty()) {

            var $prevControl = $ribbon.find(selector);

            var $newControl = this.controlGeneratorFactory.getControl($itemXml);
            if($prevControl.hasClass("titlebar-control"))
            {
                $newControl.addClass("titlebar-control");
            }
            $prevControl.replaceWith($newControl);

            //$controlParent = $prevControl.parent();
            //$(selector).remove();
            //$controlParent.remove(selector);
        }
        //        if ($controlParent != null) {
        //            $controlParent.append(this.controlGeneratorFactory.getControl($itemXml));
        //        }

    };


    this.bindAddJSONCMEvent = function () {
        var self = this;
        this.$ribbonXml.noRepeatBind('AddJSONCM', function (e, eventInfo) {
            if (eventInfo && eventInfo.MenuId) {
                self.ribbonContextMenu.CMdata.Add(eventInfo.MenuId);
                //self.ribbonContextMenu.UpdateMenuBindings();
            }
        });
    };

    this.controlGeneratorFactory = new ControlGenerator();
    this.manipulatorFactory = new SIMS.Manipulators.RibbonControlManipulatorFactory();
            
    this.Dispose = function () {

        //preventing memory leak caused because of binding event 'AddJSONCM' on $ribbonXml
        //SIMCMP-3839 : fix for memory leak due to ribbon optimization code changes
        for (var i = 0; i < this.$ribbonXmlArray.length; i++) {
            this.$ribbonXmlArray[i].unbind();
        }

        //force disposing just to ensure minimal leak in future
        this.$ribbon = null;
        this.$ribbonXmlArray = null;
        this.$ribbonXml = null;
        this.$tabsWrapper = null;
    };




};

