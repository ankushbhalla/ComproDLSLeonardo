'use strict';
namespace('SIMS');

//Structure to hold Translators for Attribute Name and Value. These Translators are applied to convert attribute name and value to a user friendly string which is displayed in Click stream
SIMS.Translators = {

    Name: {
        DEFAULT : function (attrName){
            return SIMS.Translators.Name.BASIC(attrName);
        },

        BASIC : function (attrName) {
            attrName = attrName.split("_").map(function (currentValue, index) {
                return currentValue.toLowerCase().replace(/^([\w{1}])/g, function (match) {
                    return match.toUpperCase();
                });
            });

            return attrName.reduce(function (total, currentValue) {
                return  total? (total + " " + currentValue) : currentValue;
            });
        },

        NONE: function (attrName){
            return "";
        }
    },

    Value: {
        DEFAULT : function (attrValue){
            return SIMS.Translators.Value.NONE(attrValue);
        },

        BASIC: function (attrValue){
            var translatedValue = "";
            switch(typeof attrValue)
            {
                case "string":
                    translatedValue = SIMS.Translators.Value.STRING(attrValue);
                    break;

                case "object":
                    translatedValue = SIMS.Translators.Value.JSON(attrValue);
                    break;

                case "number":
                    translatedValue = SIMS.Translators.Value.NUMBER(attrValue);
                    break;

                case "boolean":
                    translatedValue = SIMS.Translators.Value.BOOL(attrValue);
                    break;

                default:
                    translatedValue = "";
                    break;
            }

            if(translatedValue.length>10)
            {
                translatedValue = translatedValue.slice(0,7) + "...";
            }

            return translatedValue;
        },

        NONE: function (attrValue){
            return "";
        },

        BOOL: function (attrValue){
            return attrValue.toString();
        },

        NUMBER: function (attrValue){
            return attrValue.toString();
        },

        INT: function (attrValue){
            return parseInt(attrValue).toString();
            },

        FLOAT: function (attrValue){
            return SIMS.Translators.Value.NUMBER(attrValue);
        },

        STRING: function (attrValue){
            return attrValue;
        },

        TEXT: function(attrValue){
            return SIMS.Translators.Value.STRING(attrValue);
        },

        JSON: function (attrValue) {
            return JSON.stringify(attrValue);
        }
    }
};