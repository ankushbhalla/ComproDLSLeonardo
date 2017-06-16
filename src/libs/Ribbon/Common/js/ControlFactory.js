'use strict';
//namespace declaration
namespace("SIMS.Controls");

//Class Declaration
SIMS.Controls.Factory = function () { };

SIMS.Controls.Factory.Generators = {};

SIMS.Controls.Factory.$controlList = $();   //Memory fix: SIMS-106375

//Interface Method
//Param: controlID : ID of the control
//Param: controlParams : The data from which the control will be initialized
//Param: callbackFuncOwner : The object on which the callback function is to called
//Param: callbackFunc : The call back function (handler) for control events
//Returns : The generated control as a jQuery element
//Desc : generates the control specified by the data in 'controlParams'
SIMS.Controls.Factory.getControl = function (controlID, controlParams, callbackFuncOwner, callbackFunc) {
    var type = controlParams.type;
    var controlGenerator = this.getGenerator(type);
    if (controlGenerator != null) {
        var $control = controlGenerator.generateControl(controlID, controlParams, callbackFuncOwner, callbackFunc);

        //$controlList will be removed later while unloading task
        SIMS.Controls.Factory.$controlList = SIMS.Controls.Factory.$controlList.add($control);

        return $control;
    }
    else {
        throw "SIMSControlFactory : Control Type empty or null " + type;
    }
};

SIMS.Controls.Factory.getGenerator = function (type) {
    if (type != null && type != "") {

        var controlGenerator = this.Generators[type];
        if (!controlGenerator) {
            if (SIMS.SharedData.AssignmentVersion == SIMS.SharedData.AssignmentVersions.OFFICE2016
                && SIMS.Controls2016 != null
                && SIMS.Controls2016[type] != null) {
                controlGenerator = SIMS.Controls2016[type];
            }
            else {
                controlGenerator = SIMS.Controls[type];
            }
            if (!controlGenerator) {
                throw "SIMSControlFactory : Invalid Control Type " + type;
                return;
            }
            else {
                this.Generators[type] = new controlGenerator();
            }
        }
        return this.Generators[type];
    }
};

/*
Function is called from SIMPlayer during unloading of task
*/
SIMS.Controls.Factory.DisposeControlList = function () {
    SIMS.Controls.Factory.$controlList.remove();    //remove will clear jQuery data and bound events in addition to element itself
    SIMS.Controls.Factory.$controlList = $();

    //Closures in Inner classes of SpinControl cause leakage in Ribbon, so delete SpinControl static utility class
    //This peice of should be removed once proper fix is implemented in the control itself
    delete SIMS.Controls.Factory.Generators["SpinControl"];
}