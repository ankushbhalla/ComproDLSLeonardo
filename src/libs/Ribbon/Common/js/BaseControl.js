'use strict';
namespace("SIMS.Controls");

//Enum for Tab stops in a dialog
SIMS.Controls.EventId = {
    CHECKED: "1",
    KEY_DOWN: "3"
},

//Class Declaration
SIMS.Controls.BaseControl = Base.extend({// instance interface

    //Class Methods

    //Helper
    createControl: function (controlID, controlParams, callbackFuncOwner, callbackFunc) { },

    //Helper
    attachEventHandlers: function ($control, controlID, controlParams, callbackFuncOwner, callbackFunc) { },

    fireEvent: function (callBackFuncOwner, callbackFunction, args) {

        if (callbackFunction != null) {
            return callbackFunction.apply(callBackFuncOwner, args);
        }
    },

    reinitialize: function ($control, controlParams) {
    },

    enable: function ($control, bEnable) {
        //Add enable Status to control's data
        //Should be added to overridden function as well
        $control.data("enableStatus", bEnable);
    },

    //Indicates control is enabled.
    isEnabled: function ($control) {
        var enableStatus = $control.data("enableStatus");
        if (enableStatus === undefined || enableStatus === null) {
            enableStatus = true;
        }
        return enableStatus;
    },

    focalize: function ($control, bFocalise) {
        if (bFocalise == false) {
            $control.blur();
        }
        else {
            $control.focus();
            //To be updated in individual Control's focalize
            this.triggerFocusEvent($control);
        }
    },

    isFocused: function ($control) {
        return $control.is(":focus");
    },

    handleAccessKey: function ($control, data) {

    },

    handleAccessKeyMultiControl: function ($control, data) {
        this.handleAccessKey($control, data);        
    },
    //Interface Method
    //Param: controlID : ID of the control
    //Param: controlParams : The data from which the control will be initialized
    //Param: callbackFuncOwner : The object on which the callback function is to called
    //Param: callbackFunc : The call back function (handler) for control events
    //Returns : The generated control as a jQuery element
    //Desc : generates the control specified by this class
    generateControl: function (controlID, controlParams, callbackFuncOwner, callbackFunc) {
        var $control = this.createControl(controlID, controlParams, callbackFuncOwner, callbackFunc);
        this.attachEventHandlers($control, controlID, controlParams, callbackFuncOwner, callbackFunc);
        this.attachControlData($control, controlID, controlParams, callbackFuncOwner, callbackFunc);
        return $control;
    },

    attachControlData: function ($control, controlID, controlParams, callbackFuncOwner, callbackFunc) {
        var _this = this;

        if ($control != null && $control.length > 0) {
            $control.addClass('sims-control');
            $control.data('type', controlParams.type);
            $control.data('controlName', controlID);


            if (controlParams.type != null && controlParams.type != "") {
                $control.addClass('sims-' + controlParams.type);
            }


            //Adding focus functionality
            if (controlParams.focusable !== false) {
                var tabIndex = controlParams.tabIndex != null ? parseInt(controlParams.tabIndex) : -1;
                $control.attr("tabindex", tabIndex);


                if (controlParams.accesskeys != null && controlParams.accesskeys != "") {
                    $control.data('accesskeys', controlParams.accesskeys);
                }

                //Temp code for testing 
//                 $control.focusin(function () {                    
//                     $control.css("border", "1px solid red");
//                 });

                $control.focus(function () {
                    //Debug code
                    console.log("focus acquired by " + $control.text());
                });

                $control.focusout(function () {
                    //Temp code for testing 
                    //$control.css("border", "none");
                    console.log("focus lost by " + $control.text());
                });
                //Debug code
            }

            //        if (controlID) {
            //            $control.attr('id', controlID);
            //        }
        }
    },

    //Interface Method
    setData: function ($control, controlParams) { },

    //Interface Method
    getData: function ($control) { },

    //Function to register focus gained by the control
    triggerFocusEvent: function ($control) {
        $control.trigger("FOCUS_GAINED", $control);
        return false;
    }
});



