
function containsText(str,text){
return (str.toLowerCase().indexOf(text) >= 0);
};

var ControlGenerator = Base.extend({
    _singletonInstance: null,
    getControl: null,
    getControlGenerator: null,
    getGeneratorInstance:null,
    
    //Making it singleton
    constructor: function () {
        if (this._singletonInstance != null) {
            return this._singletonInstance;
        }
        else {
            this.getControl = function (controlXml) {
                return this.getControlGenerator($(controlXml)).getControl();
            };

            this.controlGenerators = {};

            this.getControlGenerator = function (controlXml) {
                var controlType = controlXml.attr('type');
                var generator = this.getGeneratorInstance(controlType);
                if (generator == null) {
                    generator = this.getGeneratorInstance('ControlBase');
                }

                generator.SetControlXml(controlXml);
                return generator;
            };

            this.getGeneratorInstance = function (controlType) {
                if (this.controlGenerators[controlType] == null) {
                    if (ControlGenerators[controlType] != null) {
                        this.controlGenerators[controlType] = new ControlGenerators[controlType]();
                    }
                    else{
                        alert('Pleas include control generator for control Type - ' + controlType)
                    }
                }
                return this.controlGenerators[controlType];
            };

            this._singletonInstance = this;
        }
    }
});