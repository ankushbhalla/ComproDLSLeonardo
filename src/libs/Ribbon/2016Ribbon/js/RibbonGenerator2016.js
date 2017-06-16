// <reference path="jquery-1.8.2.js" />
// <reference path="UIUtils.js" />
// <reference path="OfficeUIUtils.js" />
// <reference path="ControlGenerator.js" />

"use strict";

var ribbonGenerator16 = function () {


    // In this way we can call the function of base class as it has been done on the commented code for getRibbonFromXml function.
    //this.getRibbonFromXml = function (ribbonXml, appName) {  
    //    var $ribbon = ribbonGenerator16.prototype.getRibbonFromXml(ribbonXml, appName);
    //};
    this.subRibbonImgCheckFlag = true;

    this.$ribbonXmlArray = [];  
    this.fixMultiRibbonTabSelection = false;
    /*Memory leak fix: Redefining $ribbonXmlArray as own property of ribbonGenerator16   
      REASON: Dispose function called for RibbonGenrator2016 loops through the prototypal property ($ribbonXmlArray) of ribbonGenerator16;
       and when it comes to resetting $ribbonXmlArray to null, it sets its own property which results in multiple instances of ribbonxml in this.$ribbonXmlArray  
    */
    this.getRibbonFromXml = function(ribbonXml, appName, ribbonMode) {
        SIMS.Objects.DOMElements.Ribbon = null;
        this.appName = appName;

        var $ribbonXml = this.$ribbonXml = $(ribbonXml);
        this.$ribbonXmlArray.push(this.$ribbonXml);

        var $ribbon = this.$ribbon = $("<div class='" + this.appName + " ribbon' />");

        this.menuType = $ribbonXml.find('ribbon').attr('menutype');

        if (this.menuType == "JSON") {
            this.ribbonContextMenu = new SIMS.Components2016.Common.RibbonContextMenu($ribbon, this.appName);
            $ribbon.attr('id', 'ribbonmaindiv');   // this id was added as new context menu does not hide if ID not present.
            this.bindAddJSONCMEvent();
            $ribbon.data('ContextMenuType', 'JSON');
        }

        if(ribbonMode && ribbonMode !== SIMS.Components2016.Common.RibbonVisibilityModes.NORMAL){
            $ribbon.addClass(ribbonMode);  
        }


        //Make Title Bar
        //Leonardo - Start
        //var $titleBar = this.getTitleBar($ribbonXml.find('ribbon titlebar'));
        //$ribbon.append($titleBar);
        //Leonardo - End

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
            $contextualTabHead.text(headText);
            var headNameMin = headText.removeSpaces().replace("&", "").toLowerCase();
            $contextualTabHead.addClass("contextual-head-" + headNameMin);
            $contextualTabHead.data("tabclass", $($contextualTabs[index]).data("tabclass"));

            var self = this;
            $contextualTabHead.bind('click', function (e, desc) {
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
       
        //Leonardo Start
        /*
        //Adding Tell me Search Box
        var $TellMeBox = $('<li class="tellMeSearchBox"/>');
        var $TellMeBoxImage = UIUtils.getUnselectableDiv('', 'tellMeBoxImage');
        var $TellMeBoxText = UIUtils.getUnselectableDiv('', 'tellMeBoxText');
        $TellMeBoxText.text("Tell me what you want to do...");
        $TellMeBoxImage.appendTo($TellMeBox);
        $TellMeBoxText.appendTo($TellMeBox);
        $TellMeBox.appendTo(this.$tabsWrapper);


        //Adding user info
        if (this.appName.toLowerCase() == "win10explorer") { // adding this case for win10 file exploror ribbon
            var $xUserInfo = $ribbonXml.find('userinfo');
            if ($xUserInfo != null) {
                var $userInfo = $('<li class="userinfo"/>');

                //Collapse button for windows 10 explorer
                var $collapseBtn = UIUtils.getUnselectableDiv('', 'collapseButton');

                //Help button for windows 10 explorer
                var $helpeBtn = UIUtils.getUnselectableDiv('', 'helpButton');

                $userInfo.append($collapseBtn, $helpeBtn);

                $userInfo.appendTo($tabsWrapper);
            }
        }
        else {
            var $xUserInfo = $ribbonXml.find('userinfo');  // For all office applications
            if ($xUserInfo != null) {
                var $userInfo = $('<li class="userinfo"/>');

                //user name
                var $username = UIUtils.getUnselectableDiv('', 'username');
                $username.text($xUserInfo.attr('name'));


                //Share Button
                
                var $sharebuttonXML =  $ribbonXml.find('shareButton control[identifier="sharebuttonEnabled"]');
                if ($sharebuttonXML.length > 0) {    
                    var $shareButton = $('<li class="shareButtonLI"/>');
                    $userInfo.append($username);
                    $shareButton.append(this.controlGeneratorFactory.getControl($sharebuttonXML));
                    $tabsWrapper.append($shareButton);
                   
                } else {
                    var $sharebutton = UIUtils.getUnselectableDiv('', 'sharebutton');
                    var $icon = UIUtils.getUnselectableDiv('', 'userinfo-icon');
                    var $sharetext = UIUtils.getUnselectableDiv('', 'sharetext');
                    $sharetext.text("Share");
                    $sharebutton.append($icon, $sharetext);
                    
                    $userInfo.append($username, $sharebutton);
                }

                $userInfo.appendTo($tabsWrapper);         
            }
        }
        */
        //Leonardo End
        
        //Select Second tab by Default... changing selector from "tab-header:nth-child(2)" to "tab-header-home"
        var bCreateTabs = true;
        if (ribbonMode === SIMS.Components2016.Common.RibbonVisibilityModes.COLLAPSED) {
            bCreateTabs = false;
        }
        if (bCreateTabs) {
            var $secondTabHeader = $ribbon.find('.tab-header-home');
            this.manipulatorFactory.getManipulator($secondTabHeader).selectTab($secondTabHeader);
        }
      

        if (this.menuType == "JSON") {
            //this.ribbonContextMenu.UpdateMenuBindings();
        }
        else {
           // this.AddContextMenus();
        }

        if (this.appName.toString().toLowerCase() == "ppt") {
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
                    if (navigator.userAgent.indexOf("Edge") != -1) {
                        $clickedItem.focus();
                    }
                    e.preventDefault();
                }
                //}
            };

            SIMS.Objects.DOMElements.SIMArea.unbind("mousedown", selectionRetainer).bind("mousedown", selectionRetainer);
            //////////////////////////////////////////////////////////////////////////
        }


        /*if (gSimsAreaWidth < 1279) {
            $ribbon.find(".");

        }*/

        SIMS.Objects.DOMElements.Ribbon = $ribbon;  // to make the ribbon available without parsing the DOM
        return $ribbon;

    };


    this.updateRibbonfromXML = function (ribbonXml, ribbon, AttachSubRibbonWithIdentifier, fixMultiRibbonTabSelection) {
        this.fixMultiRibbonTabSelection = fixMultiRibbonTabSelection ? true: false;


        ribbonGenerator16.prototype.updateRibbonfromXML.apply(this, [ribbonXml, ribbon, true]);
        // AttachSubRibbonWithIdentifier attribute is always passed as true as this is used to add identifier to the newly added control.

        if (this.subRibbonImgCheckFlag) {
            this.CheckForIncorrectImages(ribbonXml);
        }
       
    };

    this.IncorrectImagesDirectories =  [
        //"app/comps/common/ribbon/img",
        "app/comps/common/ribbon/sprites",
        "app/comps2016/common/ribbon/sprites"
    ];

    this.CheckForIncorrectImages = function(ribbonXml){

        var subribbontext = new XMLSerializer().serializeToString(ribbonXml);
        
        for(var i=0; i<this.IncorrectImagesDirectories.length; i++){
            if (subribbontext.toLowerCase().indexOf(this.IncorrectImagesDirectories[i]) >= 0){
                GlobalLog("Some images in this sub-Ribbon.xml is referred from " + this.IncorrectImagesDirectories[i] + " folder. Please replace these images with the images from img folder of current Office version of ribbon component");
            }
        }
    };

     this.getTabContainer = function(tabName){
        if (this.fixMultiRibbonTabSelection) {
            return this.$ribbon.find('#ribbon-tab-container-' + tabName);
        } else {
            return SIMS.Objects.DOMElements.Ribbon.find('#ribbon-tab-container-'+tabName);
        }
    };

};
   


ribbonGenerator16.prototype = new ribbonGenerator();

//ribbonGenerator16.prototype.controlGeneratorFactory = new ControlGenerator2016();





