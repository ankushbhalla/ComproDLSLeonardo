'use strict';
namespace("SIMS.Models");

SIMS.Models.Event = function () {
    this.EventID;
    this.EventName; //Friendly name
    this.EventDesc;
    this.ValidateMe;
    this.CloseMe;
    this.NextComp;
};

SIMS.Models.Attribute = function () {
    this.Name;
    this.Value;
    this.Type;
    this.ArgumentType;
    this.ValidateIt;
    var self = this;

    //Description - function to set both the name and value translators in tanslatorInfo obj.
    //Parameters -
    //nameTranslator - Either a function to translate the name of the attribute OR a string which will be returned everytime the translated name is asked.
    //valueTranslator - Either a function to translate the passed value of the attribute OR a string which will be returned everytime the translated value is asked.
    //Returns - None
    this.SetTranslators = function(nameTranslator, valueTranslator){
        this.TranslatorInfo.SetTranslators(nameTranslator, valueTranslator);
    };

    //Object which saves the information of the translators in a closure to prevent direct access to this data.
    //This is an internal class used by the attribute class to save the translation logic.
    this.TranslatorInfo = function () {
        var nameTranslator = SIMS.Translators.Name.DEFAULT,
            valueTranslator = SIMS.Translators.Value.DEFAULT;
        return {

            //Description - function to set the value of the internal variables kept for saving the translators.
            //Parameters -
            //nameTranslatorFn - translator for the name of the attribute.
            //valueTranslatorFn - translator for the value of the attribute.
            SetTranslators: function (nameTranslatorFn, valueTranslatorFn) {
                if (nameTranslatorFn && valueTranslatorFn) {
                    nameTranslator = nameTranslatorFn;
                    valueTranslator = valueTranslatorFn;
                }
                else {
                    GlobalLog("!!FAILURE!! SetTranslators method call thrown an exception - Name or Value translator not provided for " + self.Name + " attribute.");
                }
            },

            //Description - function to get the translated name of the attribute.
            //Parameters - None.
            //Returns - string
            GetNameTranslation: function(){
                return this.GetTranslation(self.Name, nameTranslator);
            },

            //Description - function to get the translated version of the attribute value passed in the function based on the translator saved in the attribute object.
            //Parameters - attrValue - the value of the attribute which is to be translated.
            //Returns - string
            GetValueTranslation: function(attrValue){
                var translatedValue = "";

                if(attrValue!=null)
                {
                    translatedValue = this.GetTranslation(attrValue, valueTranslator);
                }

                return translatedValue;
            },

            //Description - function to perform the translation operation.
            //Parameters - 
            //param - the value which is to be translated.
            //translator - logic to translate the value. Could be a function or a string.
            GetTranslation: function(param, translator){
                var translatedValue = "";

                if(typeof translator === "string")
                {
                    translatedValue = translator;
                }
                else if(typeof translator === "function")
                {
                    translatedValue = translator(param);//Make sure that the string value is returned in all cases
                    if(typeof translatedValue !== "string")
                    {
                        translatedValue = JSON.stringify(translatedValue);
                    }
                }

                return translatedValue;
            }
        };
    }();
    // Self invoking function to form a closure of values - nameTranslator, valueTranslator
};

SIMS.Models.ComponentRegistration = function () {
    //Array of Attributes
    this.Attributes = new jsDictionary();

    //Array of Events
    this.Events = new jsDictionary();

    //Array of EventDetails
    this.EventDetails = new jsDictionary();

    //Register Attribute Method
    this.RegisterAttribute = function (Name, DefaultValue, ArgumentType, validateIt) {
        var tmpAttr = new SIMS.Models.Attribute();
        tmpAttr.Name = Name;
        tmpAttr.Value = DefaultValue;
        tmpAttr.ArgumentType = ArgumentType;
        tmpAttr.ValidateIt = validateIt;
        //Add it to the Attributes Array
        this.Attributes.AddItem(tmpAttr.Name, tmpAttr);
        return tmpAttr; //Returning Attribute Object to Allow Chaining in BaseComponents' RegisterAttribute Function
    };

    //Edit Registered Attributes
    //Name - Key, Identifier of the registered component
    //newDefault - New Default Value. Pass this as null in case this value is not be changed
    //validateIt - New value of validateIt. Pass this as null in case this value is not be changed
    this.EditRegisterdAttribute = function (Name, newDefault, validateIt, dataType) {
        var existingAttr = null;
        var retVal = false;
        if (this.Attributes.ContainsKey(Name)) {
            existingAttr = this.Attributes.GetItem(Name);
            if (newDefault != null) {
                existingAttr.Value = newDefault;
                retVal = true;
            }
            if (validateIt != null) {
                existingAttr.ValidateIt = validateIt;
                retVal = true;
            }
            if(dataType != null){
                existingAttr.ArgumentType = dataType;
            }
        }
        return retVal;
    };

    //Register Event Method
    this.RegisterEvent = function (ID, Event, Desc) {
        var tempEvent = new Events();
        tempEvent.EventID = ID;
        tempEvent.EventName = Event;
        tempEvent.EventDesc = Desc;
        this.Events.AddItem(tempEvent.EventID, tempEvent);
    };

    //Register Event Method
    this.RegisterEventDetails = function (ID, eventName, eventDesc, validateMe, closeMe, nextComp) {
        var tempEventDetails = new SIMS.Models.Event();
        tempEventDetails.EventID = ID;
        tempEventDetails.EventName = eventName;
        tempEventDetails.EventDesc = eventDesc;
        tempEventDetails.ValidateMe = validateMe;
        tempEventDetails.CloseMe = closeMe;
        tempEventDetails.NextComp = nextComp;
        this.EventDetails.AddItem(ID, tempEventDetails);
    };

    this.Dispose = function () {
        this.Attributes.Dispose();
        this.Attributes = null;

        this.Events.Dispose();
        this.Events = null;

        this.EventDetails.Dispose();
        this.EventDetails = null;
    };
}

function Events() {
    this.EventID;
    this.EventName; //Friendly name
    this.EventDesc;
}
