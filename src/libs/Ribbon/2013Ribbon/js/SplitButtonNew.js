/// <reference path="ComboBox.js" />
namespace("ControlGenerators");

ControlGenerators.SplitButtonNewBase = function () {
    this.tooltipTargets = [{ target: '$valuePart', tooltipSelector: 'icon' }, { target: '$arrow', tooltipSelector: 'arrow'}];
};
ControlGenerators.SplitButtonNewBase.prototype = new ControlGenerators.ComboBox();

ControlGenerators.SplitButtonNewBase.prototype.makeControl = function () {
    ControlGenerators.ComboBox.prototype.makeControl.apply(this, Array.prototype.slice(arguments, 0));
    this.$wrapper.addClass('hovered-frame');
    this.$valuePart.addClass('office-hover-default');
};

ControlGenerators.SplitButtonNewBase.prototype.AddFunctionality = function ($dropDown, $comboBox) {
    ControlGenerators.ComboBox.prototype.AddFunctionality.apply(this, [$dropDown, $comboBox]);
    var $control = this.$control;
    var eventId = this.$controlXml.attr('eventId');
    this.$valuePart.click(function () {
        var clickstreamInfo = $control.data('clickstreamInfo');
        $control.trigger('iconClick', [$control.data('desc'), eventId, undefined, undefined, clickstreamInfo]);
        //alert('Yo Nigga! You clicked icon part of ' + $control.data('desc') + eventId);
    });

    this.$arrow.click(function () {
        var clickstreamInfo = $control.data('clickstreamInfo');
        $control.trigger('arrowClick', [$control.data('desc'), undefined, undefined, undefined,clickstreamInfo]);
        //alert('Yo Nigga! You clicked arrow part of ' + $control.data('desc'));
    });

};

ControlGenerators.SplitButtonNewBase.prototype.GetItems = function () {
    var xItems = this.$controlXml.children('items');
    return ControlGenerators.ItemsGenerator.prototype.GetItems(xItems);
};

ControlGenerators.SplitButtonNewHorizontal = function () { };
ControlGenerators.SplitButtonNewHorizontal.prototype = new ControlGenerators.SplitButtonNewBase();

ControlGenerators.SplitButtonNewVertical = function () { };
ControlGenerators.SplitButtonNewVertical.prototype = new ControlGenerators.SplitButtonNewBase();
ControlGenerators.SplitButtonNewVertical.prototype.makeControl = function () {
    ControlGenerators.SplitButtonNewBase.prototype.makeControl.apply(this, Array.prototype.slice.call(arguments, 0));
    this.$label.prependTo(this.$arrow);

    var comboboxWidth = parseInt(this.$label.parents(".combobox:first").css('width'), 10);
    if(comboboxWidth !=0 && comboboxWidth!= undefined )
    {    //to make the arrow and text and second line come together.. Check Word - Review - Track Changes
        if((this.$label.text().length * 8)/comboboxWidth > 1)
        {
             this.$label.css({"display":"inline","line-height":"14px"});
        }
    }

}

ControlGenerators.SplitButtonMultipleSelect = function(){ };
ControlGenerators.SplitButtonMultipleSelect.prototype = new ControlGenerators.SplitButtonNewHorizontal();



ControlGenerators.SplitButtonMultipleSelect.prototype.GetItems = function (items) {
        var xItems = this.$controlXml.children('items');
        return ControlGenerators.ItemsGenerator.prototype.GetItems(xItems);
    };


ControlGenerators.SplitButtonMultipleSelect.prototype.AddItems = function () {
        var $items = this.$controlXml.children('items');
        this.$dropDown = this.GetDropdown();

        var self= this.$control;
        if(this.$controlXml.attr("itemClickEvent"))
        $(self).data("itemClickEvent",this.$controlXml.attr("itemClickEvent"));

        $(self).data("mode",this.$controlXml.attr("mode").toLowerCase()=="redo"?"Redo":"Undo");

        if(this.$controlXml.attr("defaultText"))
        {
            $(self).data("defaultText",this.$controlXml.attr("defaultText"));
        }
        else
        {
            $(self).data("defaultText","Cancel");
        }

    //add items

        var $generatedItems = this.GetItems($items);
        $generatedItems.appendTo(this.$dropDown);

        var lastDiv = UIUtils.getUnselectableDiv('', 'dropdown-items-special dropdown-item-text');
        lastDiv.css({'width': $items.attr("wd"), 'height': "23px"});

        lastDiv.appendTo(this.$dropDown.find(".dropdown-items-wrapper"));
        lastDiv.html($(self).data("defaultText"));


    var $itemsToBeHovered = [];
    var $itemsToBeRemovedFromHover = [];
    var $tempItem = null;
    var selectedIndex = null;

    var subitems = this.$dropDown.children().find(".dropdown-item");

    for(var i=0; i < subitems.length ; i++)
    {


       $(subitems[i]).mouseover(function(){

             var parent = $(this).parent();
             selectedIndex = $(this).index() +1;
             for(var j=0; j<=$(this).index(); j++)
             {
                 $tempItem = $(parent).children().get(j);
                 //alert("Index on mouseover::"+ $($tempItem).index());
                 $itemsToBeHovered.push($tempItem);
             }

               $($itemsToBeHovered).each(function (){
                      $(this).addClass("hovered");
               });

               $(parent).find(".dropdown-items-special").html($(self).data("mode")+ " " +selectedIndex +" Actions");

               $itemsToBeHovered = [];
               $tempItem = null;

           }
         );


        $(subitems[i]).mouseout(function(){

                var parent = $(this).parent();
                // alert("Index"+ $(this).index())
                for(var j=0; j<=$(this).index(); j++)
                {
                    $tempItem = $(parent).children().get(j);
                    //alert("Index on mouseout::"+ $($tempItem).index());
                    $itemsToBeRemovedFromHover.push($tempItem);
                }

                $($itemsToBeRemovedFromHover).each(function (){
                    $(this).removeClass("hovered");
                });

                $(parent).find(".dropdown-items-special").html($(parent).parents(".office-control.ctrl-splitbuttonmultipleselect:first").data("defaultText"));

                $itemsToBeRemovedFromHover = [];
                $tempItem = null;
            }


        );

       // note keyboard up down arrows not working



        //to avoid sending 9999 event through itemBase
        $(subitems[i]).unbind("click");

        $(subitems[i]).click(function (e) {
                //alert("Clicked "+ selectedIndex);
                self.trigger('selectedIndexChanged', [$(self).data("mode"), $(self).data("itemClickEvent"),null,selectedIndex, $(self).data('clickstreamInfo')+" : "+$(self).data("mode")]);
            }
        );
    }

    this.AddItemFunctionality(self);
};


ControlGenerators.SplitButtonMultipleSelect.prototype.AddItemFunctionality = function (self) {

    var $control  =  $(self);
    var self = this;
    $control.bind("selectedIndexChanged",function (e, desc, eventId, ICMessageId, eventInfo) {
        if(eventId!=$control.data("itemClickEvent"))
        {
            e.stopPropagation();

            var itemText = desc;
            var itemValue = eventInfo;          // to differentiate between same text items
            var subItems = self.$dropDown.find(".dropdown-item");
            var selectedIndex = 0;

            for(var i = 0;i < subItems.length; i++)
            {
                if($(subItems[i]).text() == itemText)
                {
                    if(itemValue)
                    {
                      if($(subItems[i]).data("itemValue") == itemValue)
                      {
                          selectedIndex = i;
                          break;
                      }
                    }
                    else
                    {
                        selectedIndex = i;
                        break;
                    }

                }
            }

            var clickstreamInfo = $control.data('clickstreamInfo') + " : " + $control.data("mode");
            $control.trigger('selectedIndexChanged', [$control.data("mode"), $control.data("itemClickEvent"),null,(selectedIndex+1), clickstreamInfo]);
        }

    });

};

ControlGenerators.SplitButtonWithLabel= function(){ };
ControlGenerators.SplitButtonWithLabel.prototype = new ControlGenerators.SplitButtonNewHorizontal();


ControlGenerators.SplitButtonWithLabel.prototype.makeControl = function () {
    ControlGenerators.SplitButtonNewHorizontal.prototype.makeControl.apply(this, Array.prototype.slice.call(arguments, 0));
    this.$label.prependTo(this.$arrow);
};







