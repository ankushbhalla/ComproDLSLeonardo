namespace("SIMS.Components.Common.RibbonBase");


var gRibbonCMTheme = "EXCEL";
SIMS.Components.Common.RibbonCurrentTabName = "";
SIMS.Components.Common.RibbonCurrentSectionName = "";
SIMS.Components.Common.RibbonXML = { // This data is added to cache ribbon xml, at a time only last used xml is being cached across all application. Also this implementation is not done for Win 10 explorer ribbon.
    XmlData: null,
    XmlPath: null,
    Get: function (XmlPath) {
        if (this.XmlPath && this.XmlData && this.XmlPath.toLowerCase() === XmlPath.toLowerCase()) {
            return this.XmlData.cloneNode(true);
        }
    },
    Set: function (XmlData, XmlPath) {
        this.XmlData = XmlData;
        this.XmlPath = XmlPath;
    }
};

SIMS.Components.Common.RibbonBase = SIMS.Components.Common.AccessKeyComponent.extend({
    //PUBLIC
    Compinfo: null,
    //Constructor    
    ArrValCompVal: null,
    //this.ribbonGenerator = new ribbonGenerator();
    ribbonXmlPath: 'word-ribbon.xml',
    appName: 'word',
    ribbonGenerator: null,
    compId: null,
    attrUpdateList: null,

    focusCompIdForAccessKeys: null,
    activatedTabsList: null,
    ribbonXmlPathMap: {},

    constructor: function () {
        this.base();
        this.activatedTabsList = [];
        //Fix for KL032
        //These chnages are done here because file menu also uses accesskeycomponent.js, so in order to limit chnages to ribbon component only these changes are done here.
        this._navigationKeyState._keyHandlers.TAB = function () {
            var $tabItem = null;
            if (arguments[1] === "SHIFT+TAB") {
                $tabItem = this._manipulator.getPreviousTabItem(this._currentItem);
            }
            else {
                $tabItem = this._manipulator.getNextTabItem(this._currentItem);
            }

            if ($tabItem)
                this.setCurrentItem($tabItem);
        };

        this._navigationAndAccessibilityState._keyHandlers.TAB = function () {
            var $tabItem = null;
            if (arguments[1] === "SHIFT+TAB") {
                $tabItem = this._manipulator.getPreviousTabItem(this._currentItem);
            }
            else {
                $tabItem = this._manipulator.getNextTabItem(this._currentItem);
            }

            if ($tabItem)
                this.setCurrentItem($tabItem);
        };
    },

    AddPathToXmlPathMap: function (key, value) {
        this.ribbonXmlPathMap[key] = value + SIMS.Core.PreloadData.RequestSuffix;        
    },

    GetXmlPathFromMap: function (attrValue) {

        if (this.ribbonXmlPathMap[attrValue.toLowerCase()]) {
            attrValue = this.ribbonXmlPathMap[attrValue.toLowerCase()];
        }
        else if(attrValue.indexOf("ver=rd") != -1){
            GlobalLog("Ribbon path provided in the task xml contains RD version query parameter. Component add this parameter by itself. Please remove this parameter from Ribbon path.");
        }
        else{
            var paramIndex = attrValue.indexOf("?");
            if(paramIndex != -1)
                attrValue = attrValue.slice(0,paramIndex);
            attrValue += SIMS.Core.PreloadData.RequestSuffix;
        }
        return attrValue;
    },

    getSeedAccessibles: function () {

        return this.$thisCompElement.find(".ribbon-tabs-wrapper .accessible:visible, .title-bar .accessible:visible");

    },
    getSeedingNavigationControl: function () {
        return this.$thisCompElement.find(".tab-header-selected:first");
    },
    getUniqueComponentIdentity: function () {
        return "RIBBON";
    },
    Validate: function (validationMode, attrSet) {
        return this.ValidateOnlyFinalAttributes(attrSet);
    },
    RegisterF6Panes: function () {
        console.log("RegisterF6Panes - RibbonBase " + this._compinfo.compName);
        return [{ GroupID: SIMS.Components.F6PaneGroups.TOP_PANES, PaneObject: { CompID: this._compID, Name: "RIBBON"}}];
    },
    HandleF6Focus: function (bSetFocus, paneObject) {

        if (paneObject != null) {
            console.log("HandleF6Focus - RibbonBase " + this._compinfo.compName + "   SetFocus:" + bSetFocus + " paneObject.Name:" + paneObject.Name);
        }
        else {
            console.log("HandleF6Focus - RibbonBase " + this._compinfo.compName + "   SetFocus:" + bSetFocus + " paneObject is NULL");
        }

        if (bSetFocus) {
            this.goIntoAccessibilityState(true);
        }
        else {
            this.goIntoNormalState(true);
        }
    },

    ////////////////////////////////////////////////////
    // Ribbon Optimiazations methods moved to base class
    //////////////////////////////////////////////////////

    setAttributeValue: function (attrName, className, attrVal) {
        var value = {};
        value.classname = className;
        value.attrVal = attrVal;
        value.attrName = attrName;
        this.attrUpdateList.push(value);



    },
    removeAttrFrmUpdateList: function (attrName, className, attrVal) {
        var index = -1;
        if (this.attrUpdateList.length != 0) {
            for (var i = 0, len = this.attrUpdateList.length; i < len; i++) {
                if (this.attrUpdateList[i].classname == className && this.attrUpdateList[i].attrVal == attrVal && this.attrUpdateList[i].attrName == attrName) {
                    index = i;
                    break;
                }
            }

            if (index != -1) {
                this.attrUpdateList.splice(index, 1);         //remove that object
            }

        }

    },
    UpdateTabAttributes: function (compId, attrList) {
        var self = this;

        for (var i = 0; i < attrList.length; i++) {
            self.SetAttribute(compId, attrList[i].attrName, attrList[i].attrValue);
        }


    },
    UpdateTabSubRibbon: function (subRibbonXML) {

        var ribbonGenr = this.ribbonGenerator;

        ribbonGenr.updateTabBody(subRibbonXML);
    },
    LazyLoadTab: function (tabXML, $tabCont) {
        var self = this;
        var ribbonGenr = this.ribbonGenerator;

        var $tabBody = ribbonGenr.getTabBody(tabXML, true);
        $tabCont.append($tabBody);

        var attrUpdateList = this.attrUpdateList.slice(0); //checkbox, spin_val

        if (attrUpdateList.length != 0) {
            for (var i = 0; i < attrUpdateList.length; i++)         //try to set attribute value if any
            {
                if (attrUpdateList[i].attrName == 'CHECKBOX')
                    self.toggleCheckBox(attrUpdateList[i].classname, attrUpdateList[i].attrVal);
                else if (attrUpdateList[i].attrName == 'SPIN_VAL')
                    self.setSpinVal(attrUpdateList[i].classname, attrUpdateList[i].attrVal);
            }
        }
    },
    addAttrDataInTab: function ($tab, attrName, attrValue) {
        var dataObj = {};
        dataObj.attrName = attrName;
        dataObj.attrValue = attrValue;

        if ($tab.data('attrList') != undefined) {
            var dataArr = $tab.data('attrList');
            dataArr.push(dataObj);
            //dataArr = $.unique(dataArr);
            $tab.data('attrList', dataArr);
        }
        else {
            $tab.data('attrList', [dataObj]);
        }
    },
    toggleCheckBox: function (params, attrValue) {
        var $control = this.$thisCompElement.find('.office-control.' + params);



        var className = params;
        if ($control.length != 0) {
            var bChecked = false;
            if (attrValue) {
                //bChecked = Boolean(attrValue);

                if (attrValue == "false" || attrValue == false) {
                    bChecked = false;
                }
                else {
                    bChecked = true;
                }

            }


            var params = {
                checked: bChecked
            };
            this.manipulatorFactory.getManipulator($control).setData($control, params);
            this.removeAttrFrmUpdateList('CHECKBOX', className, attrValue);
        }

        else {
            this.setAttributeValue('CHECKBOX', className, attrValue);
        }


    },
    setSpinVal: function (controlClassName, attrValue) {
        var $spinControl = this.$thisCompElement.find('.' + controlClassName);

        if ($spinControl != undefined && $spinControl.length > 0) {
            var data = $spinControl.find(".sims-SpinControl").setData({
                currentvalue: attrValue
            });
            this.removeAttrFrmUpdateList('SPIN_VAL', controlClassName, attrValue);
        }
        else {
            this.setAttributeValue('SPIN_VAL', controlClassName, attrValue);
        }
    },

    Dispose: function () {

        SIMS.Objects.DOMElements.Ribbon = null;

        SIMS.Manipulators.TabHeader._ribbonGenerator = null;

        //clear global variable "hoveredControl" defined in OfficeTooltips and ControlBase
        if (window.hoveredControl) {
            window.hoveredControl.remove();
            window.hoveredControl = null;
        }


        /******************************************************* ItemGenerators *******************************************************/

        if (ItemGenerators.ColorPicker && ItemGenerators.ColorPicker.prototype.$item) {
            ItemGenerators.ColorPicker.prototype.$item.remove();
            ItemGenerators.ColorPicker.prototype.$item = null;
        }

        if (ItemGenerators.CustomItem && ItemGenerators.CustomItem.prototype.$item) {
            ItemGenerators.CustomItem.prototype.$item.remove();
            ItemGenerators.CustomItem.prototype.$item = null;
        }

        if (ItemGenerators.Default && ItemGenerators.Default.prototype.$item) {
            ItemGenerators.Default.prototype.$item.remove();
            ItemGenerators.Default.prototype.$item = null;
        }

        if (ItemGenerators.Font && ItemGenerators.Font.prototype.$item) {
            ItemGenerators.Font.prototype.$item.remove();
            ItemGenerators.Font.prototype.$item = null;
        }

        if (ItemGenerators.IconAndText && ItemGenerators.IconAndText.prototype.$item) {
            ItemGenerators.IconAndText.prototype.$item.remove();
            ItemGenerators.IconAndText.prototype.$item = null;
        }

        if (ItemGenerators.IconTextDesc && ItemGenerators.IconTextDesc.prototype.$item) {
            ItemGenerators.IconTextDesc.prototype.$item.remove();
            ItemGenerators.IconTextDesc.prototype.$item = null;
        }

        if (ItemGenerators.ImageArea && ItemGenerators.ImageArea.prototype.$item) {
            ItemGenerators.ImageArea.prototype.$item.remove();
            ItemGenerators.ImageArea.prototype.$item = null;
        }

        if (ItemGenerators.ImageItem && ItemGenerators.ImageItem.prototype.$item) {
            ItemGenerators.ImageItem.prototype.$item.remove();
            ItemGenerators.ImageItem.prototype.$item = null;
        }

        if (ItemGenerators.ItemBase && ItemGenerators.ItemBase.prototype.$item) {
            ItemGenerators.ItemBase.prototype.$item.remove();
            ItemGenerators.ItemBase.prototype.$item = null;
        }

        if (ItemGenerators.ItemHeader && ItemGenerators.ItemHeader.prototype.$item) {
            ItemGenerators.ItemHeader.prototype.$item.remove();
            ItemGenerators.ItemHeader.prototype.$item = null;
        }

        if (ItemGenerators.Separator && ItemGenerators.Separator.prototype.$item) {
            ItemGenerators.Separator.prototype.$item.remove();
            ItemGenerators.Separator.prototype.$item = null;
        }

        if (ItemGenerators.TableGridDiv && ItemGenerators.TableGridDiv.prototype.$item) {
            ItemGenerators.TableGridDiv.prototype.$item.remove();
            ItemGenerators.TableGridDiv.prototype.$item = null;
        }

        if (ItemGenerators.Text && ItemGenerators.Text.prototype.$item) {
            ItemGenerators.Text.prototype.$item.remove();
            ItemGenerators.Text.prototype.$item = null;
        }

        /******************************************************* ItemGenerators *******************************************************/



        /******************************************************* ControlGenerators *******************************************************/
        if (ControlGenerators.Big_Icon_Text && ControlGenerators.Big_Icon_Text.prototype.$control) {
            ControlGenerators.Big_Icon_Text.prototype.$control.remove();
            ControlGenerators.Big_Icon_Text.prototype.$control = null;
        }

        if (ControlGenerators.Big_Icon_TextFM && ControlGenerators.Big_Icon_TextFM.prototype.$control) {
            ControlGenerators.Big_Icon_TextFM.prototype.$control.remove();
            ControlGenerators.Big_Icon_TextFM.prototype.$control = null;
        }

        if (ControlGenerators.Button && ControlGenerators.Button.prototype.$control) {
            ControlGenerators.Button.prototype.$control.remove();
            ControlGenerators.Button.prototype.$control = null;
        }

        if (ControlGenerators.ButtonBase && ControlGenerators.ButtonBase.prototype.$control) {
            ControlGenerators.ButtonBase.prototype.$control.remove();
            ControlGenerators.ButtonBase.prototype.$control = null;
        }

        if (ControlGenerators.CheckBox && ControlGenerators.CheckBox.prototype.$control) {
            ControlGenerators.CheckBox.prototype.$control.remove();
            ControlGenerators.CheckBox.prototype.$control = null;
        }

        if (ControlGenerators.ComboBox && ControlGenerators.ComboBox.prototype.$control) {
            ControlGenerators.ComboBox.prototype.$control.remove();
            ControlGenerators.ComboBox.prototype.$control = null;
        }

        if (ControlGenerators.ComboBoxBase && ControlGenerators.ComboBoxBase.prototype.$control) {
            ControlGenerators.ComboBoxBase.prototype.$control.remove();
            ControlGenerators.ComboBoxBase.prototype.$control = null;
        }

        if (ControlGenerators.ComboBoxReadonlyText && ControlGenerators.ComboBoxReadonlyText.prototype.$control) {
            ControlGenerators.ComboBoxReadonlyText.prototype.$control.remove();
            ControlGenerators.ComboBoxReadonlyText.prototype.$control = null;
        }

        if (ControlGenerators.ComboBoxText && ControlGenerators.ComboBoxText.prototype.$control) {
            ControlGenerators.ComboBoxText.prototype.$control.remove();
            ControlGenerators.ComboBoxText.prototype.$control = null;
        }

        if (ControlGenerators.CondensedSectionControl && ControlGenerators.CondensedSectionControl.prototype.$control) {
            ControlGenerators.CondensedSectionControl.prototype.$control.remove();
            ControlGenerators.CondensedSectionControl.prototype.$control = null;
        }

        if (ControlGenerators.ControlBase && ControlGenerators.ControlBase.prototype.$control) {
            ControlGenerators.ControlBase.prototype.$control.remove();
            ControlGenerators.ControlBase.prototype.$control = null;
        }

        if (ControlGenerators.DropDownButtonHorizontal && ControlGenerators.DropDownButtonHorizontal.prototype.$control) {
            ControlGenerators.DropDownButtonHorizontal.prototype.$control.remove();
            ControlGenerators.DropDownButtonHorizontal.prototype.$control = null;
        }

        if (ControlGenerators.DropDownButtonHorizontalFM && ControlGenerators.DropDownButtonHorizontalFM.prototype.$control) {
            ControlGenerators.DropDownButtonHorizontalFM.prototype.$control.remove();
            ControlGenerators.DropDownButtonHorizontalFM.prototype.$control = null;
        }

        if (ControlGenerators.Gallery && ControlGenerators.Gallery.prototype.$control) {
            ControlGenerators.Gallery.prototype.$control.remove();
            ControlGenerators.Gallery.prototype.$control = null;
        }

        if (ControlGenerators.Icon_Text_Spinner_Button && ControlGenerators.Icon_Text_Spinner_Button.prototype.$control) {
            ControlGenerators.Icon_Text_Spinner_Button.prototype.$control.remove();
            ControlGenerators.Icon_Text_Spinner_Button.prototype.$control = null;
        }

        if (ControlGenerators.Icon_Text_Textbox_Button && ControlGenerators.Icon_Text_Textbox_Button.prototype.$control) {
            ControlGenerators.Icon_Text_Textbox_Button.prototype.$control.remove();
            ControlGenerators.Icon_Text_Textbox_Button.prototype.$control = null;
        }

        if (ControlGenerators.Image && ControlGenerators.Image.prototype.$control) {
            ControlGenerators.Image.prototype.$control.remove();
            ControlGenerators.Image.prototype.$control = null;
        }

        if (ControlGenerators.ImageDropdown && ControlGenerators.ImageDropdown.prototype.$control) {
            ControlGenerators.ImageDropdown.prototype.$control.remove();
            ControlGenerators.ImageDropdown.prototype.$control = null;
        }

        if (ControlGenerators.MinimalButton && ControlGenerators.MinimalButton.prototype.$control) {
            ControlGenerators.MinimalButton.prototype.$control.remove();
            ControlGenerators.MinimalButton.prototype.$control = null;
        }

        if (ControlGenerators.MinimalToggleButton && ControlGenerators.MinimalToggleButton.prototype.$control) {
            ControlGenerators.MinimalToggleButton.prototype.$control.remove();
            ControlGenerators.MinimalToggleButton.prototype.$control = null;
        }

        if (ControlGenerators.Separator && ControlGenerators.Separator.prototype.$control) {
            ControlGenerators.Separator.prototype.$control.remove();
            ControlGenerators.Separator.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonBase && ControlGenerators.SplitButtonBase.prototype.$control) {
            ControlGenerators.SplitButtonBase.prototype.$control.remove();
            ControlGenerators.SplitButtonBase.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonHorizontal && ControlGenerators.SplitButtonHorizontal.prototype.$control) {
            ControlGenerators.SplitButtonHorizontal.prototype.$control.remove();
            ControlGenerators.SplitButtonHorizontal.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonHorizontalMinimal && ControlGenerators.SplitButtonHorizontalMinimal.prototype.$control) {
            ControlGenerators.SplitButtonHorizontalMinimal.prototype.$control.remove();
            ControlGenerators.SplitButtonHorizontalMinimal.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonMultipleSelect && ControlGenerators.SplitButtonMultipleSelect.prototype.$control) {
            ControlGenerators.SplitButtonMultipleSelect.prototype.$control.remove();
            ControlGenerators.SplitButtonMultipleSelect.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonNewBase && ControlGenerators.SplitButtonNewBase.prototype.$control) {
            ControlGenerators.SplitButtonNewBase.prototype.$control.remove();
            ControlGenerators.SplitButtonNewBase.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonNewHorizontal && ControlGenerators.SplitButtonNewHorizontal.prototype.$control) {
            ControlGenerators.SplitButtonNewHorizontal.prototype.$control.remove();
            ControlGenerators.SplitButtonNewHorizontal.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonNewVertical && ControlGenerators.SplitButtonNewVertical.prototype.$control) {
            ControlGenerators.SplitButtonNewVertical.prototype.$control.remove();
            ControlGenerators.SplitButtonNewVertical.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonVertical && ControlGenerators.SplitButtonVertical.prototype.$control) {
            ControlGenerators.SplitButtonVertical.prototype.$control.remove();
            ControlGenerators.SplitButtonVertical.prototype.$control = null;
        }

        if (ControlGenerators.SplitButtonWithLabel && ControlGenerators.SplitButtonWithLabel.prototype.$control) {
            ControlGenerators.SplitButtonWithLabel.prototype.$control.remove();
            ControlGenerators.SplitButtonWithLabel.prototype.$control = null;
        }

        if (ControlGenerators.Text && ControlGenerators.Text.prototype.$control) {
            ControlGenerators.Text.prototype.$control.remove();
            ControlGenerators.Text.prototype.$control = null;
        }

        if (ControlGenerators.Textbox_Button && ControlGenerators.Textbox_Button.prototype.$control) {
            ControlGenerators.Textbox_Button.prototype.$control.remove();
            ControlGenerators.Textbox_Button.prototype.$control = null;
        }

        if (ControlGenerators.ToggleButton && ControlGenerators.ToggleButton.prototype.$control) {
            ControlGenerators.ToggleButton.prototype.$control.remove();
            ControlGenerators.ToggleButton.prototype.$control = null;
        }

        /******************************************************* ControlGenerators *******************************************************/


        this.base();
    },

    IsSelectedInRibbon: function (selectedTabsArray) {  //check if contextual Tab is alrady selected
        try {
            if (selectedTabsArray != undefined) {
                if (!Array.isArray(selectedTabsArray)) {
                    selectedTabsArray = selectedTabsArray.split(",");
                }
                var selectedTabRibbon;
                if (this.$thisCompElement.find('.tab-header-selected').length > 0 && this.$thisCompElement.find('.tab-header-selected').data("tabclass") !== undefined && this.$thisCompElement.find('.tab-header-selected').data("tabclass") !== null) {
                    selectedTabRibbon = this.$thisCompElement.find('.tab-header-selected').data("tabclass").split("-")[2];
                }

                for (var tabs = 0; tabs < selectedTabsArray.length; tabs++) {

                    var checkContextualTab = selectedTabsArray[tabs].removeSpaces().replace("&", "").toLowerCase();
                    if (selectedTabRibbon == checkContextualTab)
                        return true;

                }
                return false;
            }
        }
        catch (ex) {
            return false;
        }
    },

    RemoveTabFromList: function (attrValue) {
        var tabNameMin = attrValue.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();
        var searchedIndex = $.inArray(tabNameMin, this.activatedTabsList);
        if (searchedIndex >= 0) {
            this.activatedTabsList.splice(searchedIndex, 1);
        }
    },

    HideTab: function () {
        // to be overwritten in respective ribboncomp.js
        // add code written in setattribute function for HIDE_TAB attribute
    },

    CheckIfTabIsActivated: function (tabName) {
        var IsTabActivated = false;
        var TabNameToBeCompared = tabName.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();
        if (this.activatedTabsList.indexOf(TabNameToBeCompared) !== -1) {
            IsTabActivated = true;
        }
        return IsTabActivated;
    },

    // Contextual Tab handling using enter component messaging
    ReceiveComponentMessage: function (compMessageArgs) {

        var MessageId = parseInt(compMessageArgs.MessageId);
        // check for specific ID-
        // desable this functionality for PRACTIVE mode .this is because in practice user can deselect contextual element with blurb still pointing to contextual tab
        if (MessageId == SIMS.SharedData.UniqueMessages.SHOW_HIDE_RIBBON_TAB && SIMS.SharedData.PracticeData.isPracticeOn != undefined && SIMS.SharedData.PracticeData.isPracticeOn == false) {
            var appContextualId;
            var self = this;

            //All Contextual TabNames-Array .. All contextual tabs are getting activated here
            var TabName = compMessageArgs.MessageDetails.tab;
            if (!compMessageArgs.MessageDetails.hide) {
                for (var counter = TabName.length - 1; counter >= 0; counter--) {
                    if (this.CheckIfTabIsActivated(TabName[counter])) {
                        this.SetAttribute(self.compId, "ACTIVATE_TAB", TabName[counter]);
                    }
                }
                var selectTab = compMessageArgs.MessageDetails.selectTab;

                // check if tab to be selected is already selected in Ribbon
                if (selectTab != null && self.IsSelectedInRibbon(selectTab) == false) {
                    self.SetAttribute(self.compId, "SEL_TAB", selectTab);  //select Home tab 
                }
            }
            else {

                var selectedTabsArray = compMessageArgs.MessageDetails.selectedTabsArray;

                // check if tabs to be selected is already selected in Ribbon
                if (selectedTabsArray == undefined || (!self.IsSelectedInRibbon(selectedTabsArray))) {
                    // code to hide contextual Tab
                    //check if last selected tab was a contextual tab- > then select home tab
                    //Getting the selected contextualTab name
                    var selectedTab;

                    if (this.$thisCompElement.find('.tab-header-selected').length > 0 && this.$thisCompElement.find('.tab-header-selected').data("tabclass") !== undefined && this.$thisCompElement.find('.tab-header-selected').data("tabclass") !== null) {
                        selectedTab = this.$thisCompElement.find('.tab-header-selected').data("tabclass").split("-")[2];
                    }


                    var appName = this.appName.toString().toLowerCase();
                    var RibbonContextualTabIDs; //All  contextual Tab ids
                    switch (appName) {

                        case "word":
                            {
                                RibbonContextualTabIDs = SIMS.SharedData.WordRibbonContextualTabIDs;
                                break;
                            }
                        case "ppt":
                            {
                                RibbonContextualTabIDs = SIMS.SharedData.PPTRibbonContextualTabIDs;
                                break;
                            }
                        case "excel":
                            {
                                RibbonContextualTabIDs = SIMS.SharedData.ExcelRibbonContextualTabIDs;
                                break;
                            }
                        case "access":
                            {
                                RibbonContextualTabIDs = SIMS.SharedData.AccessRibbonContextualTabIDs;
                                break;
                            }
                    }

                    //for loop is required because because contextual tab attribute is set for other non contextual tab(eg developer). 
                    //Therefore we need to check by the key map stored in shared data
                    for (var tabs in RibbonContextualTabIDs) {
                        // checking if selected tabs in contextualTab Array (word Contextula tab IDs)
                        var minRiibonTabName = RibbonContextualTabIDs[tabs].removeSpaces().replace("&", "").toLowerCase();
                        if (minRiibonTabName == selectedTab) {
                            self.SetAttribute(self.compId, "SEL_TAB", "HOME");  //select Home tab 
                            break;
                        }
                    }
                    // Hide required  tabs
                    for (var counter = TabName.length - 1; counter >= 0; counter--) {
                        //this.SetAttribute(self.compId,"HIDE_TAB",TabName[counter]);
                        this.HideTab(TabName[counter]);
                    }

                }

            }
        }

    }


});
