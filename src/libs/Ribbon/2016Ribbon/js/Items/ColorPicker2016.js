namespace("ItemGenerators2016");

ItemGenerators2016.ColorPicker = ItemGenerators.ColorPicker.extend({
    getControl: function ($itemXml) {
        this.manipulatorFactory = new SIMS.Manipulators.RibbonControlManipulatorFactory();
        var $ribbon = SIMS.Objects.DOMElements.Ribbon;

        var theme = (($ribbon!=null) && ($ribbon.length!=0)) ? ($ribbon.attr("theme") ? $ribbon.attr("theme") : 'Office') : 'Office';
        var recentColors = null;

        //Added this check to avoid crash in the Access Ribbon as Lazy Loading has not yet been implemented in the same.
        if ($ribbon !== undefined && $ribbon!=null) {
            if ($ribbon.attr("recentColors") !== undefined) {
                recentColors = $ribbon ? (JSON.parse($ribbon.attr("recentColors")) ? JSON.parse($ribbon.attr("recentColors")) : null) : null;
            }
        }

        var controlParams =
        {
            "type": "ColorGrid",
            "colorGridType": "patternColor",
            "patternType": "simplePattern",
            "theme": theme,
            "recentColors": recentColors,
            "selectedColor": "FFFFFF"
        };

        var sMode = $itemXml.attr('mode');
        if (sMode) {
            controlParams.patternType = sMode;
        }
        var preventCircularTabAndDown = $itemXml.attr('preventCircularTabAndDown');
        if (preventCircularTabAndDown) {
            controlParams.preventCircularTabAndDown = preventCircularTabAndDown;
        }

        var self = this;

        var colorPickedCallBack = function (controlName, $control, myCallbackData) {
            console.log(myCallbackData.index + "th color picked");
            if (this.$item != null && myCallbackData.eventID == 3) {       //only for enter or spacebar
                this.$item.trigger("colorPicked", [myCallbackData]);
                $control = $($control).filter(function () { return $(this).is(":visible"); });
                self.fireEventOnParentControl.apply($($control).parent(".dropdown-item"),[{ data: { self: this, color: myCallbackData.text || myCallbackData.message} }]); // additional parameter was passed in order to correct the text on the report page
            }

            if (myCallbackData.eventID === 1 || myCallbackData.eventID === 3) {
                $control.trigger("colorchanged", [$control, myCallbackData]);
            }
        };

        var $control = SIMS.Controls.Factory.getControl("", controlParams, this, colorPickedCallBack);
        return $control;
    }
});
                  
  