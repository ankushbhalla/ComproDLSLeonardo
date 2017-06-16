'use strict';
namespace("SIMS.Components");

//Enum for Tab stops in a dialog
SIMS.Components.TabGroup = {
    DIALOG_TABS: "DIALOG_TABS",
    DIALOG_BUTTONS: "DIALOG_BUTTONS",
    EMPTY_GROUP: "EMPTY_GROUP"
},

SIMS.Components.BaseComponent = Base.extend({// instance interface

    RegisteredComponent: null,
    $compWrapper: null,
    $thisCompElement: null,
    $thisBackgroundCurtain: null,
    keyControlMap: null,
    _compinfo: null,
    _compID: null,
    _controlGroups: null,
    _activeControlGroupId: null,
    _focusedControlGroupId: -1, //Contains Group ID of the Control which has focus. This is required to navigate TAB within this group
    _prevFocusedControlGroupID: -1,
    _controlWithFocus: null, //required for tracking control with focus
    CurrentCompInfo: null,
    AttributeSetName: "default",
    positionDim: {},
    contextMenuJson: null,
    bHasMultiAccessKey: false,
    bSupComponentHosted: false,

    metaKeyTranslationRequired: true,
    metaKeyExceptionList: null,


    dialogContainerCMTheme: undefined,
    currentTheme: SIMS.SharedData.ComponentThemes.OFFICE2013,
    frameIconPath: "",
    frameTitle: "",
    treatArrowKeysAsTabKey: true,
    failedAttrName: null,
    failedAttrValue: null,

    Initialize: function (CompInfo) {
        this.currentTheme = SIMS.SharedData.ComponentThemes.OFFICE2013;
        this.keyControlMap = new jsDictionary();
        this._controlGroups = new jsDictionary();
        this._activeControlGroupId = "1";
        this._focusedControlGroupId = this._prevFocusedControlGroupID = -1; //Default Focus to Tab Control 
        this._compinfo = CompInfo;
        this._compID = CompInfo["@id"];
        this.AttachComponentEvents(CompInfo, $("#" + (CompInfo["@id"])));
        this.RegisteredComponent = new SIMS.Models.ComponentRegistration();
        this.RegisterMe();
        this.sortControlGroupTabOrder();
        this.bindContextMenu();
        this.InitializeMetaKeyConfig();
    },

    //Function to provide exception list for META key translation
    InitializeMetaKeyConfig: function () {
        this.metaKeyTranslationRequired = true;
        this.metaKeyExceptionList = null;
    },

    //Test function to aid QA find dialogs with multi access keys
    testMultiAccessKey: function () {
        if (this.bHasMultiAccessKey) {
            alert("This component has multiple controls registered with a same Access Key. Please regression test 'Access key' handling for this component.");
        }
    },

    GenerateHTML: function () {
    },

    resetJSComponent: function () {
        this._compinfo = null;
        this._compID = null;
        this.CurrentCompInfo = null;
        this.AttributeSetName = "default";
        this._activeControlGroupId = "1";
        this._focusedControlGroupId = this._prevFocusedControlGroupID = -1; //Default Focus to Tab Control 
    },

    getControlGroup: function (groupId) {
        groupId = groupId == null || groupId.isEmpty() ? "1" : groupId;
        if (!this._controlGroups.ContainsKey(groupId)) {
            this._controlGroups.AddItem(groupId, new SIMS.Controls.ControlGroup(groupId, this));
        }
        return this._controlGroups.GetItem(groupId);
    },

    ResetToDefaultAttributes: function (compid) {

        if (this._compinfo.compType === "modaldialog" || this._compinfo.compType === "dialog" || this._compinfo.compType === "modalwindow") {
            var attrDictionary = this.RegisteredComponent.Attributes;
            var attributesList = attrDictionary.GetKeys();

            var nCount = attributesList.length;
            var attrVal = "";
            var attrName = "";


            for (var j = 0; j < nCount; j++) {
                attrName = attributesList[j];
                attrVal = attrDictionary.GetItem(attrName);
                 {
                    this.SetAttribute(compid, attrName, attrVal.Value);
                }                
            }
        }
    },

    getActiveControlGroup: function () {
        if (this._controlGroups.ContainsKey(this._activeControlGroupId)) {
            return this._controlGroups.GetItem(this._activeControlGroupId);
        }
    },

    setActiveControlGroup: function (groupId) {
        if (groupId != null && !groupId.isEmpty()) {
            this._activeControlGroupId = groupId;

            if (groupId === SIMS.Components.TabGroup.EMPTY_GROUP) {
                if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                    this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
                }
                else if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS)) {
                    this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_BUTTONS);
                }
                else {
                    var keys = this._controlGroups.GetKeys();
                    this.setFocusControlGroupID(keys[0]);
                }
            }
            else {
                //this.setFocusControlGroupID(groupId);
            }
        }
    },

    //Function to get next control group 
    getNextFocusControlGroup: function () {
        //0 for Tab Index
        //10 for Dialog Ok Cancel Buttons
        if (this._focusedControlGroupId === SIMS.Components.TabGroup.DIALOG_TABS) {
            if (this._activeControlGroupId === SIMS.Components.TabGroup.EMPTY_GROUP) {
                if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS) && this._controlGroups.GetItem(SIMS.Components.TabGroup.DIALOG_BUTTONS).GetTabControlsCount() > 0) {
                    this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_BUTTONS);
                }
            }
            else {
                this.setFocusControlGroupID(this._activeControlGroupId);
            }
        }
        else if (this._focusedControlGroupId === this._activeControlGroupId) {
            if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS) && this._controlGroups.GetItem(SIMS.Components.TabGroup.DIALOG_BUTTONS).GetTabControlsCount() > 0) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_BUTTONS);
            }
            else if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
            }
        }
        else if (this._focusedControlGroupId === SIMS.Components.TabGroup.DIALOG_BUTTONS) {
            if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
            }
            else {
                if (this._activeControlGroupId != SIMS.Components.TabGroup.EMPTY_GROUP) {
                    this.setFocusControlGroupID(this._activeControlGroupId);
                }
            }
        }
    },

    //Function to get previous control group
    getPrevFocusControlGroup: function () {
        //0 for Tab Index
        //10 for Dialog Ok Cancel Buttons
        if (this._focusedControlGroupId === SIMS.Components.TabGroup.DIALOG_BUTTONS) {
            if (this._activeControlGroupId === SIMS.Components.TabGroup.EMPTY_GROUP) {
                if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                    this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
                }
            }
            else {
                this.setFocusControlGroupID(this._activeControlGroupId);
            }
        }
        else if (this._focusedControlGroupId === this._activeControlGroupId) {
            if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
            }
            else if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS)) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_BUTTONS);
            }
        }
        else if (this._focusedControlGroupId === SIMS.Components.TabGroup.DIALOG_TABS) {
            if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS)) {
                this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_BUTTONS);
            }
            else {
                if (this._activeControlGroupId != SIMS.Components.TabGroup.EMPTY_GROUP) {
                    this.setFocusControlGroupID(this._activeControlGroupId);
                }
            }
        }
    },

    sortControlGroupTabOrder: function () {
        var keys = this._controlGroups.GetKeys();
        for (var count = 0; count < this._controlGroups.GetLength(); count++) {
            this._controlGroups.GetItem(keys[count]).SortTabOrder();
        }
    },

    setFocusControlGroupID: function (groupID) {
        if (this._controlGroups.ContainsKey(groupID)) {
            this._prevFocusedControlGroupID = this._focusedControlGroupId;
            this._focusedControlGroupId = groupID;
        }
    },

    DetachKeycodesFromControl: function (groupId, keyCodes, control) {
        if (keyCodes != null) {
            keyCodes = getArray(keyCodes);
        }

        var group = this.getControlGroup(groupId);

        if (keyCodes != null) {
            for (var i = 0; i < keyCodes.length; i++) {
                var key = keyCodes[i].toUpperCase();
                group.RemoveShortCut(key, getArray(control));
            }
        }
    },

    AttachKeycodesToControl: function (groupId, keyCodes, control, tabindex) {
        if (keyCodes != null) {
            keyCodes = getArray(keyCodes);
        }
        var group = this.getControlGroup(groupId);

        if (groupId === SIMS.Components.TabGroup.DIALOG_TABS) {
            this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS);
        }
        else if (this._focusedControlGroupId === -1) {
            this.setFocusControlGroupID(groupId);
        }

        if (keyCodes != null) {
            for (var i = 0; i < keyCodes.length; i++) {
                var key = keyCodes[i].toUpperCase();
                group.AddShortCut(key, getArray(control));
            }
        }

        //Record Tab orders
        if (tabindex != -1) {
            group.AddTabOrder(control, tabindex);
        }

    },

    GetMetaKeyTranslation: function (shortcutName) {
        if (this.metaKeyTranslationRequired == true && shortcutName != null) {
            if (this.metaKeyExceptionList != null && this.metaKeyExceptionList[shortcutName] != null) {
                return this.metaKeyExceptionList[shortcutName];
            }
            else {
                return shortcutName.replace(/META/g, "CTRL");
            }
        }
        else {
            return shortcutName;
        }
    },

    HandleAccelaraterKey: function (e, desc) {
        console.log(this._compinfo.compName + ": " + desc.keyCombination + " pressed.  Component Type:" + this._compinfo.compType);
        var key = desc.keyCombination;

        var activeGroup = this.getActiveControlGroup();

        var bHandled = false;
        if (key.contains("ALT") || this.HandleAcceleratorKeysCondition() === true) {
            if (activeGroup != null) {
                bHandled = activeGroup.HandleShortCut(key);
            }

            //In case Active Group Does not handle this send to Dialog Buttons and then to Dialog Tabs        
            if (!bHandled && this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_BUTTONS)) {
                var groupDialogButton = this._controlGroups.GetItem(SIMS.Components.TabGroup.DIALOG_BUTTONS);
                bHandled = groupDialogButton.HandleShortCut(key);
            }
            if (!bHandled && this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
                var groupTabButton = this._controlGroups.GetItem(SIMS.Components.TabGroup.DIALOG_TABS);
                bHandled = groupTabButton.HandleShortCut(key);
            }
        }

        if (bHandled == false) {

            if (this._compinfo.compType === "modaldialog" || this._compinfo.compType === "dialog" || this._compinfo.compType === "modalwindow") {

                if (this.HandleAcceleratorKeysCondition() === true) {
                    bHandled = true;
                }

                if (e.altKey && e.which === 115) {//ALT+F4  
                    bHandled = true;
                    this.CloseBtnEventLogger(9998, "ALT+F4 Pressed to Cancel Dialog", "ALT+F4");
                }
            }
        }

        return bHandled;
    },

    HandleAcceleratorKeysCondition: function () {
        return true;
    },

    HandleStandardKey: function (e, desc) {
        console.log(this._compinfo.compName + ": " + desc.keyCombination + " pressed.  Component Type:" + this._compinfo.compType);
        var key = desc.keyCombination;

        var bHandled = false;

        if (this._compinfo.compType === "modaldialog" || this._compinfo.compType === "dialog" || this._compinfo.compType === "modalwindow") {
            bHandled = true;
            if (e.which == 13) {
                if (this.frameTitle && this.frameTitle !== "") {
                    this.LogComponentEvent(9997, this.frameTitle + " Dialog : Enter Key Pressed to Confirm Dialog");
                }
                else {
                    this.LogComponentEvent(9997, "Enter Key Pressed to Confirm Dialog");
                }

            }
            else if (e.which == 27) {
                this.CloseBtnEventLogger(9998, "Escape Key Pressed to Cancel Dialog", "ESCAPE");
            }
            else if (e.altKey && e.which === 115) {//ALT+F4            
                this.CloseBtnEventLogger(9998, "ALT+F4 Pressed to Cancel Dialog", "ALT+F4");
            }
            else if (e.which == 32) { //SPACE
                if (desc.keyCombination === "ALT+SPACE" && (this._compinfo.compType === "modaldialog" || this._compinfo.compType === "dialog")) {
                    bHandled = true;
                    this.$compWrapper.find('div.DragHandle').showContextMenu(this._compID + "_menu");
                }
                else {
                    bHandled = false;
                }
            }

        }

        return bHandled;
    },

    /*
    *	Base handling of Tab key using Control Group Data Structure maintained by this class 
    */
    HandleTabKey: function (e, desc) {
        //Log Key Information to Console
        console.log(this._compinfo.compName + ": " + desc.keyCombination + " pressed.  Component Type:" + this._compinfo.compType);
        var key = desc.keyCombination;

        //Do nothing in case focusgroupID is not set.
        if (this._focusedControlGroupId === -1) {
            return false;
        }

        var groupWithFocus = this._controlGroups.GetItem(this._focusedControlGroupId);
        var groupChanged = false;

        if (key === "TAB" || (this.treatArrowKeysAsTabKey == true && (key === "DOWN" || key === "RIGHT"))) {
            if (groupWithFocus.isLastControlInFocus()) {
                groupChanged = true;
                this.getNextFocusControlGroup();
            }
            groupWithFocus = this._controlGroups.GetItem(this._focusedControlGroupId);
            //De-focalize old control
            if (this._controlWithFocus != null) {
                this._controlWithFocus.focalize(false);
            }
            //Focalize Current Control
            if (groupChanged === true) //Added for SIMS-112517 - For the case When Previous Group is Tab Controls Then also fetch the next control. Prior to this fix a fix was done which was not complete and caused regression SIMS-117642. 
            {
                groupWithFocus = this.GetUpdatedFocusControlGroup(groupWithFocus, true);
                this._controlWithFocus = groupWithFocus.setFirstControlAsFocused();
            }
            else {
                this._controlWithFocus = groupWithFocus.getNextTabControl();
            }
            this._controlWithFocus.focalize(true);
        }
        else if (key === "SHIFT+TAB" || (this.treatArrowKeysAsTabKey == true && (key === "LEFT" || key === "UP"))) {
            if (groupWithFocus.isFirstControlInFocus()) {
                groupChanged = true;
                this.getPrevFocusControlGroup();
            }
            groupWithFocus = this._controlGroups.GetItem(this._focusedControlGroupId);
            //De-focalize old control
            if (this._controlWithFocus != null) {
                this._controlWithFocus.focalize(false);
            }

            //Focalize Current Control
            if (groupChanged === true) //Added for SIMS-112517 - For the case When Previous Group is Tab Controls Then also fetch the next control. Prior to this fix a fix was done which was not complete and caused regression SIMS-117642. 
            {
                groupWithFocus = this.GetUpdatedFocusControlGroup(groupWithFocus, false);
                this._controlWithFocus = groupWithFocus.setLastControlAsFocused();
            }
            else {
                this._controlWithFocus = groupWithFocus.getPrevTabControl();
            }
            this._controlWithFocus.focalize(true);
        }
        return true;
    },

    GetUpdatedFocusControlGroup: function (currentGroupWithFocus, bNext) {
        return currentGroupWithFocus;
    },

    GetAttributeValueFromASet: function (attrName, attrSet, defaultSet, customSets) {
        var retValue = null;
        var attrArray = null;

        if (attrSet === "default" || SIMS.Objects.Utils.IsObjectDefined(attrSet) == false) {
            if (SIMS.Objects.Utils.IsObjectDefined(defaultSet) && SIMS.Objects.Utils.IsObjectDefined(defaultSet.attr)) {
                attrArray = getArray(defaultSet.attr);
                retValue = this.GetArrtibuteValueFronAttributeArray(attrArray, attrName);
            }
        }
        else {

            if (SIMS.Objects.Utils.IsObjectDefined(customSets) && SIMS.Objects.Utils.IsObjectDefined(customSets.attributeset)) {

                var attributesetArray = getArray(customSets.attributeset);

                var attributeset = attributesetArray.findSingle("@name", attrSet);

                if (SIMS.Objects.Utils.IsObjectDefined(attributeset) && SIMS.Objects.Utils.IsObjectDefined(attributeset.attr)) {
                    attrArray = getArray(attributeset.attr);
                    retValue = this.GetArrtibuteValueFronAttributeArray(attrArray, attrName);

                    if (retValue == null) {
                        if (attributeset["@inherits-default"] == "true") {
                            retValue = this.GetAttributeValueFromASet(attrName, "default", defaultSet, customSets);
                        }
                    }
                }
                else if (attrSet === "reset") {
                    retValue = this.GetAttributeValueFromASet(attrName, "default", defaultSet, customSets);
                }
            }
            else if (attrSet === "reset") {
                retValue = this.GetAttributeValueFromASet(attrName, "default", defaultSet, customSets);
            }
        }

        return retValue;
    },

    GetArrtibuteValueFronAttributeArray: function (attrArray, attrName) {
        var retValue = null;
        if (attrArray != null) {
            var attrNode = attrArray.findSingle("@name", attrName);
            if (attrNode != null) {
                retValue = attrNode["@value"];
            }
        }
        return retValue;
    },

    GetFinalAttributeValue: function (attrName, attrSet) {
        var checkValue = null;

        var Compinfo = this._compinfo;

        checkValue = this.GetAttributeValueFromASet(attrName, attrSet, Compinfo.finalattrs, Compinfo.finalattributesets);

        if (checkValue == null) {
            checkValue = this.GetAttributeValueFromASet(attrName, this.AttributeSetName, Compinfo.initialattrs, Compinfo.initialattributesets);
        }


        if (checkValue == null) {
            var currentAttribute = this.RegisteredComponent.Attributes.GetItem(attrName);
            checkValue = currentAttribute.Value;
        }

        return checkValue;
    },

    ValidateAttributes: function (attributes, attrSet) {
        //Resetting the member variables before starting the validation to clear the information saved in the previously performed validations.
        this.SaveFailedAttribute(null, null);

        for (var i = 0; i < attributes.length; i++) {
            var attrName = attributes[i];
            var currentAttribute = this.RegisteredComponent.Attributes.GetItem(attrName);

            if (currentAttribute.ValidateIt === true) {
                var checkValue = this.GetFinalAttributeValue(attrName, attrSet).toString();
                console.log("Pre GetAttribute('" + attrName + "')");
                //var finalValue = currentAttribute.Handler.GetAttribute(this._compID, attrName).toString();
                var finalValue = this.GetAttribute(this._compID, attrName).toString();
                console.log("GetAttribute('" + attrName + "') returned " + finalValue);
                console.log("Validating " + attrName + " " + checkValue + "==" + finalValue);
                if (!this.EqualsValidator(checkValue, finalValue, currentAttribute.ArgumentType)) {

                    //Filling the information of the failed attribute in the member variables.
                    //Code only comes in this block when the validation of a attribute fails.
                    this.SaveFailedAttribute(attrName, finalValue);
                    return false;
                }
            }
        }
        return true;
    },

    //Description -
    //Below function is called by the simplayer to get the incomplete action clickstream from the component.
    //It then delegates the work to fetch different parts of the information to it's internal functions.
    //After getting the output of all the internal functions, it combines the information into one single
    //string in a specific format and return it to the SIMPlayer.
    //Parameters -
    //attrName - Name of the attribute whose incomplete action string is needed to be generated.
    //attrValue - Value of the attribute at the time of validation.
    //Return Value -
    //Final string to be reported in the Clickstream.
    GetIncompleteActionSuffix: function (attrName, attrValue) {
        var retStr = "";

        if (attrName == null) {
            attrName = this.failedAttrName;
        }

        if (attrName) {
            if (attrValue == null) {
                attrValue = this.failedAttrValue;
            }

            var attrObj = this.GetAttributeObject(attrName);

            var translatedName = this.GetNameTranslation(attrObj);
            var translatedValue = this.GetValueTranslation(attrValue, attrObj);

            if (translatedName || translatedValue) {
                retStr = " - ";
                if (translatedName) {
                    retStr += translatedName;
                }

                if (translatedValue) {
                    retStr += translatedName ? ": " + translatedValue : translatedValue;
                }
            }
        }

        return retStr;
    },

    //Description - function to get the translated version of the attribute name passed.
    //Parameters -
    //attrObj - the reference of the attribute object.
    //Returns - Translated String for Attribute name
    GetNameTranslation: function (attrObj) {
        var tranalatedName = "";
        if (attrObj) {
            tranalatedName = attrObj.TranslatorInfo.GetNameTranslation();
        }
        return tranalatedName;
    },

    //Description - function to get the translated version of the attribute value passed.
    //Parameters -
    //attrValue - value of the attribute which is to be translated.
    //attrObj - reference of the attribute object.
    //Returns - Translated String for Attribute Value
    GetValueTranslation: function (attrValue, attrObj) {
        var translatedValue = "";
        if (attrObj) {
            translatedValue = attrObj.TranslatorInfo.GetValueTranslation(attrValue);
        }
        return translatedValue;
    },

    //Description - Allows adding Click Stream Information to an Attribute
    //Parameters -
    //attrName - Name of the attribute
    //nameTranslator - Either a predefined function in SIMS.Translators.Name OR definition of function OR a string
    //valueTranslator - Either a predefined function in SIMS.Translators.Value OR definition of function OR a string
    //Returns - None
    SetAttrTranslators: function (attrName, nameTranslator, valueTranslator) {
        var attrObj = this.GetAttributeObject(attrName);
        if (attrObj) {
            attrObj.SetTranslators(nameTranslator, valueTranslator);
        }
    },

    //Description - Wrapper function to keep the code of getting the reference of the attribute object at one place.
    //Parameters - attrName - name of the attribute whose reference is needed from the attribute object.
    GetAttributeObject: function (attrName) {
        var attrObj = null;
        if (attrName) {
            attrObj = this.RegisteredComponent.Attributes.GetItem(attrName);
        }
        return attrObj;
    },

    SaveFailedAttribute: function(attrName, attrValue){
        this.failedAttrName = attrName;
        this.failedAttrValue = attrValue;
    },

    ValidateAttributesFromAnySet: function (attributes) {
        var bReturnValue = false;

        if (this.ValidateAttributes(attributes, "default")) {
            bReturnValue = true;
        }
        else {
            var bContinueLoop = true;

            if (SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets) && SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets.attributeset)) {

                var attributesetArray = getArray(this._compinfo.finalattributesets.attributeset);

                var attributesetCount = attributesetArray.length;

                for (var i = 0; i < attributesetCount; i++) {

                    if (bContinueLoop && SIMS.Objects.Utils.IsObjectDefined(attributesetArray[i].attr)) {

                        var attrSet = attributesetArray[i]["@name"];

                        if (this.ValidateAttributes(attributes, attrSet)) {
                            bContinueLoop = false;
                            bReturnValue = true;
                            i = attributesetCount;
                            break;
                        }
                    }
                }
            }
        }
        return bReturnValue;
    },

    ValidateOnlyFinalAttributes: function (attrSet) {
        var attributesToBeValidated = this.getFinalAttributeArray(attrSet);
        return this.ValidateAttributes(attributesToBeValidated, attrSet);
    },

    getFinalAttributeArray: function (attrSet) {
        var finalAttrArray = [];
        if (attrSet == "default" || SIMS.Objects.Utils.IsObjectDefined(attrSet) == false) {
            var finalAttrs = this._compinfo.finalattrs != null ? getArray(this._compinfo.finalattrs.attr) : [];

            for (var i = 0; i < finalAttrs.length; i++) {
                finalAttrArray.push(finalAttrs[i]["@name"]);
            }
        }
        else if (SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets) && SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets.attributeset)) {

            var attributesetArray = getArray(this._compinfo.finalattributesets.attributeset);

            var attributeset = attributesetArray.findSingle("@name", attrSet);

            if (SIMS.Objects.Utils.IsObjectDefined(attributeset.attr)) {
                var finalAttrs = getArray(attributeset.attr);

                for (var i = 0; i < finalAttrs.length; i++) {
                    finalAttrArray.push(finalAttrs[i]["@name"]);
                }
            }
        }
        return finalAttrArray;
    },

    Validate: function (validationMode, attrSet) {
        var attributesToBeValidated = this.RegisteredComponent.Attributes;
        if (this.AttrSetInheritsDefault(attrSet)) {
            return this.ValidateAttributes(attributesToBeValidated.itemArray, attrSet);
        }
        else {
            return this.ValidateOnlyFinalAttributes(attrSet);
        }
    },

    AttrSetInheritsDefault: function (attrSet) {
        var bRetValue = true;

        if (SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets) && SIMS.Objects.Utils.IsObjectDefined(this._compinfo.finalattributesets.attributeset)) {

            var attributesetArray = getArray(this._compinfo.finalattributesets.attributeset);

            var attributeset = attributesetArray.findSingle("@name", attrSet);

            if (SIMS.Objects.Utils.IsObjectDefined(attributeset) && attributeset["@inherits-default"] == "false") {
                bRetValue = false;
            }
        }

        return bRetValue;
    },

    EqualsValidator: function (leftVal, rightVal, dataType) {
        var retValue = false;
        if (leftVal != null && rightVal != null) {

            if (dataType === undefined || dataType === null) {
                dataType = "text";
            }

            dataType = dataType.toLowerCase();
            leftVal = leftVal.toString();
            rightVal = rightVal.toString();

            //Adding checks for integer and float if value is empty string..

            switch (dataType) {
                case "bool":
                case "ignorecase":
                    leftVal = leftVal.toLowerCase();
                    rightVal = rightVal.toLowerCase();
                    break;
                case "int":
                    leftVal = leftVal === "" ? leftVal : parseInt(leftVal);
                    rightVal = rightVal === "" ? rightVal : parseInt(rightVal);
                    break;
                case "number":
                case "float":
                    leftVal = leftVal === "" ? leftVal : parseFloat(leftVal);
                    rightVal = rightVal === "" ? rightVal : parseFloat(rightVal);
                    break;

                case "stringinarray-ignorecase":
                    leftVal = leftVal.toLowerCase();
                    rightVal = rightVal.toLowerCase();
                case "stringinarray":
                    var allowedVals;
                    try {
                        allowedVals = JSON.parse(leftVal);
                    }
                    catch (ex) {    //JSON parse failed, so do string comparison
                        break;
                    }

                    if (Array.isArray(allowedVals)) {   //if not an Array, then do string comparison
                        if (allowedVals.indexOf(rightVal) !== -1) {
                            retValue = true;
                        }
                        return retValue;
                    }
                    break;

                case "text":
                case "string":
                case "file":
                case "json":
                default:
                    break;
            }

            if (leftVal === rightVal) {
                retValue = true;
            }
        }

        return retValue;
    },

    LoadCompAssets: function (compid) {
        var url = "ServerCode/SIM5Service.ashx?Method=GetComponentAssets&compId=" + compid;
        var strRet = SIMS.Objects.DataLayer.AjaxCall(url, "GET");
        var assetJSON = JSON.parse(strRet);
        var assetAr = getArray(assetJSON.assets.asset);
        $.each(assetAr, function (i, v) {
            loadjscssfile(v["@path"], v["@type"]);
        });
    },

    RegisterAttribute: function (Name, DefaultValue, ArgumentType, ValidateIt) {
        if (ValidateIt == null) {
            ValidateIt = true;
        }

        return this.RegisteredComponent.RegisterAttribute(Name, DefaultValue, ArgumentType, ValidateIt);
    },

    RegisterEvent: function (ID, Event, Desc, validateMe, closeMe, nextComp) {
        this.RegisteredComponent.RegisterEvent(ID, Event, Desc);
        this.RegisteredComponent.RegisterEventDetails(ID, Event, Desc, validateMe, closeMe, nextComp);
    },

    HandleKeyCombinations: function (event) {
        return true;
    },

    LogComponentEvent: function (eventId, desc, bSafe) {
        console.log("LogComponentEvent - " + this._compinfo.compName + " : " + desc + " : " + eventId);
        var eventDetails = this.RegisteredComponent.EventDetails.GetItem(eventId);

        if (desc == null || desc.trim() == "") {
            if (eventDetails != null) {
                desc = eventDetails.EventDesc;
            }
            GlobalLog(this._compinfo.compName + ": Event Description not provided for Event:" + eventId);
        }



        if (bSafe === undefined) {
            bSafe = false;
        }

        SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(this._compID, eventId, "notused", desc, eventDetails, this._compinfo.compName, bSafe));
        /*
        if (eventDetails.ValidateMe) {
        if (this.Validate('DEFAULT', "default")) {
        SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(this._compID, eventId, "notused", desc, eventDetails));
        }
        else {
        SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(this._compID, 9999, "Incorrect", desc, eventDetails));
        }
        }
        else {
        SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(this._compID, eventId, "notused", desc, eventDetails));
        }
        */

    },

    LogComponentEventWithDelay: function (eventId, desc, bSafe) {
        var self = this;

        setTimeout(function () {
            self.LogComponentEvent(eventId, desc, bSafe);
        }, 100);
    },

    LogClickStreamInfo: function (desc) {
        if (desc != null && desc.trim() != "") {
            console.log("LogClickStreamInfo - " + this._compinfo.compName + ": " + desc);
            SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(this._compID, 0, "Clickstream", desc, null, this._compinfo.compName));
        }
    },

    AddComponentUI: function (CompInfo, sHtml) {
        var $componentdiv = this.$thisCompElement = $(sHtml);
        $componentdiv.attr('id', CompInfo["@id"]);
        var $ComponentFrame = this.GetComponentFrame(CompInfo, $componentdiv);
        this.CreateModalDialogCurtain(CompInfo);
        this.$compWrapper = $ComponentFrame;
        SIMS.Objects.DOMElements.SIMArea.append($ComponentFrame);
    },

    Dispose: function () {
        if (this.RegisteredComponent != null) {
            this.RegisteredComponent.Dispose();
            this.RegisteredComponent = null;
        }

        if (this._controlGroups != null) {
            this._controlGroups.Dispose();
            this._controlGroups = null;
        }

        if (this.keyControlMap != null) {
            this.keyControlMap.Dispose();
            this.keyControlMap = null;
        }

        /*
        if (this.$compWrapper != null) {
        this.$compWrapper.remove();
        this.$compWrapper = null;
        }
        */

        this.$compWrapper = null;
        this.$thisCompElement = null;
        this.$thisBackgroundCurtain = null;

        this._compinfo = null;
        this._compID = null;
        this._activeControlGroupId = null;
        this._focusedControlGroupId = -1;
        this._prevFocusedControlGroupID = -1;
        this._controlWithFocus = null;
        this.CurrentCompInfo = null;
        this.AttributeSetName = "default";
        this.positionDim = {};
        this.contextMenuJson = null;

        this.bSupComponentHosted = false;
    },

    DisposeTask: function () {
        //this.RegisteredComponent.Dispose();
        //delete this.RegisteredComponent;
    },

    CreateModalDialogCurtain: function (CompInfo) {
        if (CompInfo.compType == "modaldialog" || CompInfo.compType == "modalwindow") {
            var curSimframeheight = gSimsAreaHeight;
            this.$thisBackgroundCurtain = $("<div id='BackroundCurtain_" + CompInfo["@id"] + "' class='BackroundCurtain' style='height:" + gSimsAreaHeight + "px;width:" + gSimsAreaWidth + "px;'></div>");
            SIMS.Objects.DOMElements.SIMArea.append(this.$thisBackgroundCurtain);
        }
        else {
            this.$thisBackgroundCurtain = null;
        }
    },

    GetComponentFrame: function (CompInfo, $componentdiv) {
        var $Frame = null;

        switch (CompInfo.compType) {
            case "dialog":
                $Frame = $("<div class='ComponentFrame DialogFrame' style='display:none;'><div class='InnerDlgFrame'><div class='DragHandle'><div class='HeaderTop'><img alt='' class='frameIcon' src=''/><div class='DlgButtonGroup'><div class='HelpImage' title='Help'/><div class='CloseImage' title='Close'/></div><div class='CompNameContainer'><span class='CompName'>Component Name</span></div></div></div><div class='ContainerDiv'></div></div></div>");
                break;
            case "modaldialog":
                $Frame = $("<div class='ComponentFrame DialogFrame' style='display:none;'><div class='InnerDlgFrame'><div class='DragHandle'><div class='HeaderTop'><img alt='' class='frameIcon' src=''/><div class='DlgButtonGroup'><div class='HelpImage' title='Help'/><div class='CloseImage' title='Close'/></div><div class='CompNameContainer'><span class='CompName'>Component Name</span></div></div></div><div class='ContainerDiv'></div></div></div>");
                break;
            case "simple":
                $Frame = $("<div class='ComponentFrame SimpleFrame' style='display:none;'><div class='ContainerDiv'></div></div>");
                break;
            default:
                $Frame = $("<div class='ComponentFrame SimpleFrame' style='display:none;'><div class='ContainerDiv'></div></div>");
                break;
        }

        // attach events to frame
        this.AttachFrameEvents(CompInfo, $Frame);

        // Set frame icon
        this.frameIconPath = this.GetIconPath();
        if (this.frameIconPath != "" && this.frameIconPath != null) {
            $Frame.find(".frameIcon").attr("src", this.frameIconPath);
            $Frame.find(".frameIcon").show();
        }
        else {
            this.frameIconPath = "";
            $Frame.find(".frameIcon").hide();
        }

        // Set help icon visibility
        if (this.GetHelpButtonVisibility() == true) {
            $Frame.find(".HelpImage").show();
        }
        else {
            $Frame.find(".HelpImage").hide();
        }

        // Set help icon visibility
        if (this.GetCloseButtonVisibility() == true) {
            $Frame.find(".CloseImage").show();
        }
        else {
            $Frame.find(".CloseImage").hide();
        }

        $Frame.find(".ContainerDiv").append($componentdiv);

        return $Frame;
    },

    // Override this function to return the path of the icon
    GetIconPath: function () {
        return null;
    },

    // Override this function to hide the help button
    GetHelpButtonVisibility: function () {
        return true;
    },

    GetCloseButtonVisibility: function () {
        return true;
    },
    // Override this function to set focus
    SetFocus: function (compinfo) {
        var $thisComp = $("#" + compinfo["@id"]);
        $thisComp.focus();

        //Default Handling
        if (this._controlGroups.ContainsKey(SIMS.Components.TabGroup.DIALOG_TABS)) {
            this.setFocusControlGroupID(SIMS.Components.TabGroup.DIALOG_TABS)
        }
        else {
            var keys = this._controlGroups.GetKeys();
            this.setFocusControlGroupID(keys[0]);
        }
    },

    LoseFocus: function () {
        this._focusedControlGroupId = -1;
        this._controlWithFocus = null;
    },

    GetCompMetadata: function (compName) {
        var url = "ServerCode/SIM5Service.ashx?Method=GetComponentMetadata&compName=" + compName;
        var strRet = SIMS.Objects.DataLayer.AjaxCall(url, "GET");
        return strRet;
    },


    AttachFrameEvents: function (CompInfo, $Frame) {
        var self = this;

        switch (CompInfo.compType) {
            case "dialog":

                $Frame.draggable({ containment: "#SIMArea", handle: "div.DragHandle" });

                $Frame.find(".HelpImage").mousedown(function () {
                    $(this).addClass("HelpImageClicked");
                });
                $Frame.find(".HelpImage").mouseup(function () {
                    $(this).removeClass("HelpImageClicked");
                });

                $Frame.find(".CloseImage").mousedown(function () {
                    $(this).addClass("CloseImageClicked");
                });
                $Frame.find(".CloseImage").mouseup(function () {
                    $(this).removeClass("CloseImageClicked");
                });

                $Frame.find(".HeaderTop").mouseup(function () {
                    $(this).css("cursor", "auto");
                });
                $Frame.find(".CloseImage").click(function () {
                    // send canceled message - it will be a safe event
                    // JW 2013-12-16 Cancel is not a safe event, it is being treated as unsafe if it is fired from any place except close button. It should be unsafe for close button as well.
                    //var currentCompInfo = $(this).parents(".ComponentFrame").find(".compDiv").data("compinfo");
                    self.CloseBtnEventLogger(9998, "Close button clicked on the dialog title bar to Cancel Dialog");
                    //SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(currentCompInfo["@id"], 9998, "cancel", currentCompInfo.compName + " closed.", null, currentCompInfo.compName));
                });
                break;
            case "modaldialog":

                $Frame.draggable({ containment: "#SIMArea", handle: "div.DragHandle" });

                $Frame.find(".HelpImage").mousedown(function () {
                    $(this).addClass("HelpImageClicked");
                });
                $Frame.find(".HelpImage").mouseup(function () {
                    $(this).removeClass("HelpImageClicked");
                });

                $Frame.find(".CloseImage").mousedown(function () {
                    $(this).addClass("CloseImageClicked");
                });
                $Frame.find(".CloseImage").mouseup(function () {
                    $(this).removeClass("CloseImageClicked");
                });

                $Frame.find(".HeaderTop").mouseup(function () {
                    $(this).css("cursor", "auto");
                });
                $Frame.find(".CloseImage").click(function () {
                    // send canceled message - it will be a safe event
                    // JW 2013-12-16 Cancel is not a safe event, it is being treated as unsafe if it is fired from any place except close button. It should be unsafe for close button as well.
                    //var currentCompInfo = $(this).parents(".ComponentFrame").find(".compDiv").data("compinfo");
                    self.CloseBtnEventLogger(9998, "Close button clicked on the dialog title bar to Cancel Dialog");
                    //SEND_MESSAGE("COMP_ACTION", new SIMEventArgs(currentCompInfo["@id"], 9998, "cancel", currentCompInfo.compTitle + " dialog closed.", null, currentCompInfo.compName));
                });
                break;
            default:
                break;
        }

        var $compIcon = $Frame.find(".frameIcon");
        if ($compIcon.length > 0) {
            $compIcon.on('dblclick', function (e) {
                self.CloseBtnEventLogger(9998, "Dialog Icon double clicked to Cancel Dialog");
                fireContextMenuHide();
                e.stopPropagation();
            });

            var compID = CompInfo["@id"];
            $compIcon.attr('id', compID + '_frameicon');
            this.setContextMenuJson();
            var json = self.setIconJson();

            $compIcon.addContextMenu(compID + "_iconmenu", json, self.iconContextMenuHandler, self, self.dialogContainerCMTheme);

            $compIcon.on('click', function (evt) {
                var $compIcon = $(this);
                self.positionDim.targetXPos = $compIcon.offset().left;
                self.positionDim.targetYPos = $compIcon.offset().top;
                self.positionDim.targetHeight = $compIcon.height() + 9;
                self.positionDim.targetWidth = -3;
                $compIcon.showContextMenu(compID + "_iconmenu");
            });
        }
        return $Frame;
    },

    bindContextMenu: function () {
        this.setContextMenuJson();
        if (this.contextMenuJson != null) {
            if (this._compinfo.compType === "modaldialog" || this._compinfo.compType === "dialog") {
                var $frame = this.$compWrapper.find('div.DragHandle');
                $frame.attr('id', this._compID + '_cm');

                $frame.addContextMenu(this._compID + "_menu", this.contextMenuJson, this.contextMenuHandler, this, this.dialogContainerCMTheme);

                $frame.find('.DlgButtonGroup').contextmenu(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }
    },

    setIconJson: function () {

        var iconMenuJson = {

            "move": { "name": "Move",
                "icon": {},
                "eventId": "",
                "accesskey": "",
                "desc": "Move Clicked",
                "tooltip": "",
                "disabled": false,
                "listWidth": "140"
            },
            "close": { "name": "<b>Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alt+F4</b>",
                "icon": { "img": "assets/ComponentFrame/img/close.png", "bgPos": "3px 6px" },
                "eventId": "9998",
                "accesskey": "C",
                "desc": "Close Clicked",
                "tooltip": "",
                "disabled": false
            }
        };
        return iconMenuJson;
    },

    setContextMenuJson: function () {
        this.contextMenuJson = this.setIconJson();
    },

    iconContextMenuHandler: function (args) {
        var responseEvent = args[1];
        switch (responseEvent.type) {
            case callBackType.CALLBACK_ON_SELECTION:
                this.FireEventOnMenuItemClick(responseEvent);
                break;
            case callBackType.CUSTOMIZATION_REQUEST:
                //                console.log("in CUSTOMIZATION_REQUEST");
                var originalMenuId = responseEvent.menuId;
                var customizationResponse = {
                    posDim: {// Position and Dimensions of target element (new target element, eg. a single cell in case of excel)
                        x: this.positionDim.targetXPos,
                        y: this.positionDim.targetYPos,
                        targetH: this.positionDim.targetHeight,
                        targetW: this.positionDim.targetWidth
                    }
                };

                return customizationResponse;
               // break;

            default: break;
        }
    },

    contextMenuHandler: function (args) {
        var currentTargetElement = args[0];
        var responseEvent = args[1];
        switch (responseEvent.type) {
            case callBackType.CALLBACK_ON_SELECTION:
                this.FireEventOnMenuItemClick(responseEvent);
                break;

            case callBackType.CUSTOMIZATION_REQUEST:
                var originalMenuId = responseEvent.menuId;
                //This positioning of the dialog header context is done to support the custom position of
                //context menu on pressing ALT+SPACE.
                var customizationResponse = {
                    posDim: {
                        x: currentTargetElement.offset().left - currentTargetElement.width() + 7,
                        y: currentTargetElement.offset().top,
                        targetW: currentTargetElement.width(),
                        targetH: currentTargetElement.height()
                    }
                };

                return customizationResponse;
               // break;

            default: break;
        }
    },

    FireEventOnMenuItemClick: function (responseEvent) {
        var eventId = responseEvent.id;
        var eventDesc = responseEvent.desc;
        if (eventId != null && eventId != "")
            this.LogComponentEvent(eventId, eventDesc);
    },

    SetAttribute: function (compid, attrName, attrValue) {
    },

    GetAttribute: function (compid, attrName) {
        return "";
    },

    SetCompInfo: function (compinfo) {
        this._compinfo = compinfo;
    },

    SetCompState: function (compinfo) {
        var self = this;
        var $thisComp = $("#" + compinfo["@id"]);
        $thisComp.data("compinfo", compinfo);

        var $CompFrame = this.$compWrapper; // $thisComp.parents(".ComponentFrame");

        var SimsAreaHeight = SIMS.Objects.DOMElements.SIMArea.height();
        var SimsAreaWidth = SIMS.Objects.DOMElements.SIMArea.width();

        this.frameTitle = compinfo.compTitle;
        // set component name
        $CompFrame.find(".CompName").html(compinfo.compTitle);
        if (compinfo.sizeandpos != undefined) {
            if (compinfo.sizeandpos.attr != null) {
                var attrAr = getArray(compinfo.sizeandpos.attr);
                var attrArLen = attrAr.length;
                for (var i = 0; i < attrArLen; i++) {
                    //$.each(attrAr, function (i, v) {
                    //var attr = v;
                    var attr = attrAr[i];
                    var name = attr["@name"];
                    switch (name) {
                        case "height":
                            switch (compinfo.compType) {
                                case "dialog":
                                case "modaldialog":
                                    var ht = self.GetAttribute(compinfo["@id"], "COMP_HEIGHT");
                                    if (ht != "") {
                                        $thisComp.css("height", ht + "px");
                                    }
                                    else {
                                        $thisComp.css("height", attr["@value"] == "*" ? "100%" : attr["@value"] + "px");
                                    }

                                    $CompFrame.css("top", ((SimsAreaHeight - $thisComp.height() - 44) / 2).toString() + "px");
                                    break;

                                default:
                                    var height = attr["@value"];
                                    // Code for supporting calc - e.g. 30%+150px
                                    if (height.indexOf('+') > -1 || height.indexOf('-') > -1) { //set the height if value is to be calculated calc().
                                        if (height.indexOf('+') > -1) {
                                            var calcHeight;
                                            calcHeight = attr["@value"].split('+');
                                            $CompFrame.css('height', calcHeight[0].trim()).css('height', "+=" + calcHeight[1].trim());
                                        } else {
                                            var calcHeight;
                                            calcHeight = attr["@value"].split('-');
                                            $CompFrame.css('height', calcHeight[0].trim()).css('height', "-=" + calcHeight[1].trim());
                                        }
                                    }
                                    // Code ends
                                    else if (height.indexOf('%') > -1) { //set the height if value is provided in percentage (say 50%).
                                        $CompFrame.css("height", attr["@value"]);
                                    }
                                    else
                                        $CompFrame.css("height", attr["@value"] == "*" ? "100%" : attr["@value"] + "px");
                                    break;
                            }
                            break;

                        case "width":
                            switch (compinfo.compType) {
                                case "dialog":
                                case "modaldialog":
                                    var wid = self.GetAttribute(compinfo["@id"], "COMP_WIDTH");
                                    if (wid != "") {
                                        $thisComp.css("width", wid + "px");
                                    }
                                    else {
                                        $thisComp.css("width", attr["@value"] == "*" ? "100%" : attr["@value"] + "px");
                                    }
                                    $CompFrame.css("left", ((SimsAreaWidth - $thisComp.width()) / 2).toString() + "px");
                                    break;

                                default:
                                    {
                                        var wid = attr["@value"];
                                        if (wid.indexOf('%') > -1) { //set the width if value is provided in percentage (say 50%).
                                            $CompFrame.css("width", attr["@value"]);
                                        }
                                        else
                                            $CompFrame.css("width", attr["@value"] == "*" ? "100%" : attr["@value"] + "px");
                                    }
                                    break;
                            }
                            break;

                        case "top":
                            switch (compinfo.compType) {
                                case "dialog":
                                case "modaldialog":
                                    var ht = $thisComp.height();
                                    if (ht == 0 && attrAr.findSingle("@name", "COMP_WIDTH") == null) {//If Width is not mentioned in the xml
                                        ht = self.GetAttribute(compinfo["@id"], "COMP_HEIGHT");
                                    }
                                    //$CompFrame.css("top", attr["@value"] == "center" ? ((SimsAreaHeight - $thisComp.height() - 44) / 2 ).toString()+"px" : attr["@value"] + "px");
                                    $CompFrame.css("top", ((SimsAreaHeight - ht - 44) / 2).toString() + "px");
                                    break;

                                default:
                                    var top = attr["@value"];
                                    // Code for supporting calc - e.g. 30%+150px
                                    if (top.indexOf('+') > -1 || top.indexOf('-') > -1) { //set the height if value is to be calculated calc().
                                        if (top.indexOf('+') > -1) {
                                            var calcTop;
                                            calcTop = attr["@value"].split('+');
                                            var mtop = calcTop[0].trim().substring(0, calcTop[0].trim().indexOf('%'));

                                            $CompFrame.css('top', SimsAreaHeight * mtop / 100).css('top', "+=" + calcTop[1].trim());
                                        } else {
                                            var calcTop;
                                            calcTop = attr["@value"].split('-');
                                            var mtop = calcTop[0].trim().substring(0, calcTop[0].trim().indexOf('%'));
                                            $CompFrame.css('top', SimsAreaHeight * mtop / 100).css('top', "-=" + calcTop[1].trim());
                                        }

                                    }
                                    // Code ends
                                    else if (top.indexOf('%') > -1) { //set the top pos if value is provided in percentage from top (say 50% from top).
                                        top = top.substring(0, top.indexOf('%'));
                                        $CompFrame.css("top", SimsAreaHeight * top / 100);
                                    }
                                    else
                                        $CompFrame.css("top", attr["@value"] == "center" ? (SimsAreaHeight - $CompFrame.height()) / 2 : attr["@value"] + "px");

                                    break;
                            }
                            break;

                        case "bottom": $CompFrame.css("bottom", attr["@value"] + "px");
                            break;

                        case "right": $CompFrame.css("right", attr["@value"] + "px");
                            break;

                        case "left":
                            switch (compinfo.compType) {
                                case "dialog":
                                case "modaldialog":
                                    var wid = $thisComp.width();
                                    if (wid == 0 && attrAr.findSingle("@name", "COMP_WIDTH") == null) {//If Width is not mentioned in the xml
                                        wid = self.GetAttribute(compinfo["@id"], "COMP_WIDTH");
                                    }

                                    //$CompFrame.css("left", attr["@value"] == "center" ? (SimsAreaWidth - $thisComp.width()) / 2 : attr["@value"] + "px");
                                    $CompFrame.css("left", ((SimsAreaWidth - wid) / 2).toString() + "px");
                                    break;

                                default:
                                    var left = attr["@value"];
                                    if (left.indexOf('%') > -1) { //set the left pos if value is provided in percentage from left (say 50% from left).
                                        left = left.substring(0, left.indexOf('%'));
                                        $CompFrame.css("left", SimsAreaWidth * left / 100);
                                    }
                                    else
                                        $CompFrame.css("left", attr["@value"] == "center" ? (SimsAreaWidth - $CompFrame.width()) / 2 : attr["@value"] + "px");
                                    break;
                            }
                            break;
                    }
                    //});
                }
            }
        }
    },

    HideComponent: function (compid) {
        // In case of subcomponents there are multiple parents with class ".ComponentFrame"
        //$("#" + compid).parents(".ComponentFrame").remove();
        //alert($("#" + compid).parents(".ComponentFrame").length);
        if (this.$compWrapper != undefined) {

            if (this.hostComponent != null) {
                this.hostComponent.RemoveSubComponent(compid);
            }

            this.$compWrapper.remove();
        }

        //SIMS.Objects.DOMElements.SIMArea.find("#BackroundCurtain_" + compid).remove();
        if (this.$thisBackgroundCurtain != null) {
            this.$thisBackgroundCurtain.remove();
        }
    },


    ShowComponent: function (compid, bShow, compInfo) {
        if (!bShow) {
            //$("#" + compid).parents(".ComponentFrame").hide();
            this.$compWrapper.hide();
            if (this.$thisBackgroundCurtain != null) {
                this.$thisBackgroundCurtain.hide();
            }
        }
        else {
            //$("#" + compid).parents(".ComponentFrame").show();
            if (this.$thisBackgroundCurtain != null) {
                this.$thisBackgroundCurtain.show();
            }
            this.$compWrapper.show();
        }

    },
    getCompMode: function () {
        return this._compinfo["@mode"];
    },

    UpdateComponentState: function (compInfo, attrSet) {
        var self = this;
        this.CurrentCompInfo = compInfo;
        //this.AttributeSetName = attrSet;
        //alert(attrSet);
        if (attrSet === "default" || SIMS.Objects.Utils.IsObjectDefined(attrSet) == false) {
            //Set Initial State
            if (SIMS.Objects.Utils.IsObjectDefined(compInfo.initialattrs)) {
                if (compInfo.initialattrs.attr != null) {
                    var attrAr = getArray(compInfo.initialattrs.attr);
                    var attrArLen = attrAr.length;
                    for (var i = 0; i < attrArLen; i++) {
                        //$.each(getArray(compInfo.initialattrs.attr), function (i, attr) {
                        var attr = attrAr[i];
                        var compattr = self.RegisteredComponent.Attributes;
                        if (compattr.ContainsKey(attr["@name"])) {
                             {
                                self.SetAttribute(compInfo["@id"], attr["@name"], attr["@value"]);
                            }
                        }
                        //});
                    }
                }
            }
        }
        else {

            if (SIMS.Objects.Utils.IsObjectDefined(compInfo.initialattributesets) && SIMS.Objects.Utils.IsObjectDefined(compInfo.initialattributesets.attributeset)) {

                var attributesetArray = getArray(compInfo.initialattributesets.attributeset);

                var attributeset = attributesetArray.findSingle("@name", attrSet);

                if (attributeset != null) {
                    if (attributeset["@inherits-default"] == "true") {
                        this.UpdateComponentState(compInfo, "default");
                    }

                    if (attributeset.attr != null) {
                        var attrAr = getArray(attributeset.attr);
                        var attrArLen = attrAr.length;
                        for (var i = 0; i < attrArLen; i++) {
                            //$.each(getArray(attributeset.attr), function (i, attr) {
                            var attr = attrAr[i];
                            var compattr = self.RegisteredComponent.Attributes;
                            if (compattr.ContainsKey(attr["@name"])) {
                                try {
                                    self.SetAttribute(compInfo["@id"], attr["@name"], attr["@value"]);
                                }
                                catch (ex) {
                                    GlobalLog("!!FAILURE!! In Set Attribute... CompId: " + compInfo["@id"] + " Attr:" + attr["@name"] + " Val:" + attr["@value"] + " - Error description: " + ex.message);
                                    console.log(ex.toString());
                                }
                            }
                            //});
                        }
                    }
                }
                else {
                    console.log(attributeset + "is not defined in initialattributesets for component : " + this._compinfo.compName);
                    this.UpdateComponentState(compInfo, "default");
                }

            }
            else {
                console.log("initialattributesets is not defined for component : " + this._compinfo.compName);
                this.UpdateComponentState(compInfo, "default");
            }

        }
        this.AttributeSetName = attrSet;
    },

    ReceiveComponentMessage: function (compMessageArgs) {
        console.log(this._compinfo.compName + ": Message Id:" + compMessageArgs.MessageId + "  MessageName:" + compMessageArgs.MessageName);
    },

    SendMessageToComponents: function (messageid, messageName, messageDetails) {
        SEND_MESSAGE("COMP_MESSAGE", new CompMessageArgs(this._compID, messageid, messageName, messageDetails));
    },


    /*
    * Function:  ShowRibbonTab
    * Purpose :  Send message to RibbonComponent to Show any contextual Tabs
    * Returns :  void
    * Inputs  :  Array ,comma separated values, single value of ContextualTab Id
    * Path    :  Path of these IDs- app/core/models/SharedData.js -> SIMS.SharedData.WordRibbonContextualTabIDs(for Word)
    */
    ShowRibbonTab: function (tabNames, tabToBeSelected) {
        if (!Array.isArray(tabNames)) {
            tabNames = tabNames.split(",");
        }
        var msgArgs = { hide: false, tab: tabNames, selectTab: tabToBeSelected };
        this.SendMessageToComponents(SIMS.SharedData.UniqueMessages.SHOW_HIDE_RIBBON_TAB, 'SHOW_HIDE_RIBBON_TAB', msgArgs);
    },

    /*
    * Function:  HideRibbonTab
    * Purpose :  Send message to RibbonComponent to Hide any contextual Tabs
    * Returns :  void
    * Inputs  :  Array ,comma separated values, single value of ContextualTab Id
    * Path    :  Path of these IDs- app/core/models/SharedData.js -> SIMS.SharedData.WordRibbonContextualTabIDs(for Word)
    */
    HideRibbonTab: function (tabNames, selectedTabIdsArray) {
        if (!Array.isArray(tabNames)) {
            tabNames = tabNames.split(",");
        }
        var msgArgs = { hide: true, tab: tabNames, selectedTabsArray: selectedTabIdsArray };
        this.SendMessageToComponents(SIMS.SharedData.UniqueMessages.SHOW_HIDE_RIBBON_TAB, 'SHOW_HIDE_RIBBON_TAB', msgArgs);
    },

    /*
    * Function:  RemoveAllContextualTab
    * Purpose :  Hide all the Ribbon Contexctual Tabs from specific application
    * Returns :  void
    * Inputs  :  Shared RibbonContextualTabIds eg-SIMS.SharedData.WordRibbonContextualTabIDs
    * Path    :  Path of these IDs- app/core/models/SharedData.js
    */
    RemoveAllContextualTab: function (RibbonContextualTabIDs, selectedTabIdsArray) {

        //iterate though all the keys in object obtainded form shared data Ribbon's Ids
        for (var tabs in RibbonContextualTabIDs) {
            if (RibbonContextualTabIDs.hasOwnProperty(tabs)) {
                this.HideRibbonTab(RibbonContextualTabIDs[tabs], selectedTabIdsArray);
            }
        }
    },




    // bMakeModal == true, as modal dialog, else modless
    SwitchComponentMode: function (bMakeModal) {
        SEND_MESSAGE("COMP_SWITCH_MODE", new CompMessageArgs(this._compID, 1, "COMP_SWITCH_MODE", { MakeModal: bMakeModal }));
    },
    UpdateComponentFrameSize: function (wid, ht) {
        this.$thisCompElement.css("width", wid + "px");
        this.$thisCompElement.css("height", ht + "px");
    },

    ShowLoadingCurtain: function (bShow) {
        SEND_MESSAGE("SHOW_CURTAIN", bShow);
    },

    UpdateDialogTitle: function (titleText) {
        this.$compWrapper.find('.CompName').text(titleText);
        this.frameTitle = titleText;
    },

    UpdateTitleLeftPadding: function (leftPadding) {
        this.$compWrapper.find('.CompName').css("margin-left", leftPadding);
    },

    UpdateCompPosition: function (left, top) {
        if (left) {
            this.$compWrapper.css("left", left + "px");
        }
        if (top) {
            this.$compWrapper.css("top", top + "px");
        }
    },

    UpdateCompIcon: function (iconPath) {
        if (iconPath != null && iconPath != "") {
            this.$compWrapper.find(".frameIcon").attr("src", iconPath).show();
        }
        else {
            this.$compWrapper.find(".frameIcon").hide();
        }
        this.frameIconPath = iconPath;
    },

    // Host Component Interface

    subComponentStack: null,

    HostSubComponent: function (subComponent, hostParams) {

        this.bSupComponentHosted = true;
        if (this.subComponentStack === null) {
            this.subComponentStack = {};
        }

        this.subComponentStack[subComponent._compID] = subComponent;

        subComponent.$compWrapper.addClass("SubCompFrame");

        subComponent.SetHostComponent(this);

        this.HandleSubComponent(subComponent._compID, hostParams, subComponent.$compWrapper);

    },

    HandleSubComponent: function (compID, hostParams, $childCompWrapper) {
    },

    RemoveSubComponent: function (compID) {
    },

    AttachKeyCodesWithHost: function (hostcomp, keyCodeGroup) {
    },

    clearSubComponentStack: function () {

        delete this.subComponentStack;
        this.subComponentStack = {};

    },

    // Sub Component Interface

    hostComponent: null,

    SetHostComponent: function (hostcomp) {

        this.hostComponent = hostcomp;
    },

    RegisterF6Panes: function () {
        console.log("BaseComponent: RegisterF6Panes - " + this._compinfo.compName);
        return null;
    },

    HandleF6Focus: function (bSetFocus, paneObject) {
        if (paneObject != null) {
            console.log("BaseComponent: HandleF6Focus - " + this._compinfo.compName + "   SetFocus:" + bSetFocus + " paneObject.Name:" + paneObject.Name);
        }
        else {
            console.log("BaseComponent: HandleF6Focus - " + this._compinfo.compName + "   SetFocus:" + bSetFocus + " paneObject is NULL");
        }
    },

    ResetToDefaultSelection: function () {

    },

    OnAppGroupChange: function (args) {
        SEND_MESSAGE("CHANGE_APP_GROUP", new CompMessageArgs(this._compID, "CHANGE_APP_GROUP", "CHANGE_APP_GROUP", args));
    },

    SetHelpButtonVisibility: function (isVisible) {
        var $hlpBtn = this.$compWrapper.find(".HelpImage");

        if (isVisible) {
            $hlpBtn.show();
        }
        else {
            $hlpBtn.hide();
        }
    },

    CloseBtnEventLogger: function (eventId, desc, keyCombination) {
        this.LogComponentEventWithDelay(eventId, desc);
    },

    ChangeMaximizeBtnState: function () {
    },

    ActivateWindow: function (bActivate, nZIndex) {

    },

    IsActiveWindowFrame: function () {
        return false;
    },

    ShownAtTaskBar: function () {
        return false;
    },

    SetDisplayMode: function (compInfo) {
        if (compInfo["@displaymode"] == "hide") {
            SIMS.Objects.DOMElements.SIMArea.find("#" + compInfo["@id"]).css("display", "none");
        }
        else {
            SIMS.Objects.DOMElements.SIMArea.find("#" + compInfo["@id"]).css("display", "block");
        }
    }
    //    ,

    //    AddClassTagsToChildren: function () {
    //        console.log("BaseComponent: AddClassTagsToChildren - " + this._compinfo.compName);
    //        //this.$compWrapper.find('*').addClass("SIM5-" + this._compID);
    //        //this.$compWrapper.addClass("SIM5-" + this._compID);
    //    },

    //    HasF6Focus: function () {
    //        console.log("BaseComponent: HasF6Focus - " + this._compinfo.compName);
    //        if (SIMS.SharedData.KeyboardData.OWNER == "") {
    //            return $(document.activeElement).hasClass("SIM5-" + this._compID);
    //            /*if ($(document.activeElement).closest(".SIM5-" + this._compID) > 0) {
    //                return true;
    //            }
    //            else {
    //                return false;
    //            }*/
    //        }
    //        else {
    //            return false;
    //        }
    //    },

    //    GetF6FocusedPane: function () {
    //        console.log("BaseComponent: GetF6FocusedPane - " + this._compinfo.compName);
    //        return null;
    //        //return { GroupID: SIMS.Components.F6PaneGroups.CENTER_PANES, PaneObject: { CompID: this._compID, Name: "GRID"} };
    //    }
});