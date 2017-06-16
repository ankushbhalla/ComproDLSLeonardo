namespace("ItemGenerators");

ItemGenerators.Factory = Base.extend({
    _singletonInstance: null,
    getItem: null,
    getItemGenerator: null,
    getGeneratorInstance: null,

    //Making it singleton
    constructor: function () {
        if (this._singletonInstance != null) {
            return this._singletonInstance;
        }
        else {
            this.getItem = function (itemXml) {
                return this.getControlGenerator($(itemXml)).getItem();
            };

            this.itemGenerators = {};

            this.getItemGenerator = function (itemXml) {
                var itemType = itemXml.attr('type');
                var generator = this.getGeneratorInstance(itemType);
                if (generator == null) {
                    generator = this.getGeneratorInstance('ItemBase');
                }

                //generator.SetControlXml(controlXml);
                return generator;
            };

            this.getGeneratorInstance = function (itemType) {
                if (this.itemGenerators[itemType] == null) {
                    if (ItemGenerators2016[itemType] != null) {
                        this.itemGenerators[itemType] = new ItemGenerators2016[itemType]();
                    }
                    else if (ItemGenerators[itemType] != null) {
                        this.itemGenerators[itemType] = new ItemGenerators[itemType]();
                    }
                }
                return this.itemGenerators[itemType];
            };

            this._singletonInstance = this;
        }
    }
});

