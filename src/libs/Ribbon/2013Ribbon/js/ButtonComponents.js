/// <reference path="ControlBase.js" />
/// <reference path="jquery.xml2json.js" />


//----------------------******************----------------------------------------------
//public methods
//----------------------******************----------------------------------------------
//ICON
function getIcon(iconXml) {
    if (iconXml == null) {
        return null;
    }

    var $icon = $(iconXml);
    var $imgCrop = $icon.find("imgcrop");

    var iconAttrs = [];

    //Building Icon Attributes
    var src = $icon.getAttribute("src", null);
    if(src!=null){
        iconAttrs.push({ name: "src", value: src });
    }
    iconAttrs.push({ name: "height", value: $icon.getAttribute("ht", "16px") });
    iconAttrs.push({ name: "width", value: $icon.getAttribute("wd", "16px") });
    if($imgCrop!=null)
    {
        iconAttrs.push({ name: "top", value: $imgCrop.getAttribute("top", null) });
        iconAttrs.push({ name: "left", value: $imgCrop.getAttribute("left", null) });
    }
    else
    {
        iconAttrs.push({ name: "top", value: $imgCrop.getAttribute("top", "0px") });
        iconAttrs.push({ name: "left", value: $imgCrop.getAttribute("left", "0px") });
    }


    var $iconBinder = getGenericIcon(iconAttrs);

    return $iconBinder;

};

//TEXT
function getLabel(textXml) {
    var $label = UIUtils.getUnselectableDiv('','control-label centered-text');
    $label.text(textXml.text());
    return $label;
};

//DOWN ARROW
//Leonardo Start
function getDownArrow() {
    var eleAttrs = [{ name: "src", value: "src/libs/Ribbon/img/EwaCommon.png" }, //Changing Image Path
                    { name: "width", value: "5px" },
                    { name: "height", value: "3px" },
                    { name: "top", value: "-133px" },
                    { name: "left", value: "-74px"}];
    var $arrow = getGenericIcon(eleAttrs);
    $arrow.addClass("office-arrow");
    return $arrow;
};

//Right ARROW
function getRightArrow() {
    var eleAttrs = [{ name: "src", value: "src/libs/Ribbon/img/EwaCommon.png" },//changing Image Path
                    { name: "width", value: "4px" },
                    { name: "height", value: "7px" },
                    { name: "top", value: "-113px" },
                    { name: "left", value: "-129px"}];
    var $arrow = getGenericIcon(eleAttrs);
    $arrow.addClass("office-arrow");
    return $arrow;
};
//Leonardo End
//UP ARROW

//LIST
function getComboBox(){

};

//TEXTBOX
function getTextBox(){

}

//SPINNER

//CHECK BOX

//RADIO BUTTON
function getRadioButton(options) {
    var $radio = UIUtils.getGenericHtmlElement({
        tagName: "input",
        id: options.id,
        class: options.className,
        attributes: [{
            name: "name",
            value: options.name
        }, {
            name: "type",
            value: 'radio'
        }]
    });

    var $div = $("<span/>");
    $div.addClass(options.class);
    $div.text(options.text);
    $div.prepend($radio);
    
    return $div;
};

//----------------------******************----------------------------------------------



//----------------------******************----------------------------------------------
//private methods
//----------------------******************----------------------------------------------
function getGenericIcon(iconAttrs) {
    var $wrapper = UIUtils.getUnselectableDiv('', 'icon-wrapper');
    var $img = $("<img class='icon' />");
    var $iconBinder = UIUtils.getUnselectableSpan("", "icon-binder");
    $iconBinder.appendTo($wrapper);
    //Adding Icon Attributes
    for (var i = 0; i < iconAttrs.length; i++) {
        var currentItem = iconAttrs[i];
        if (currentItem.value != null) {
            var currentItemName = currentItem.name.toLowerCase();
            if (currentItemName == "height" || currentItemName == "width") {
                $iconBinder.css(currentItem.name, currentItem.value);
            }
            else {
                if (currentItemName == "src") {
                    $img.attr(currentItem.name, currentItem.value);
                }
                else {
                    $img.css(currentItem.name, currentItem.value);
                }
            }
        }
    }

    $iconBinder.append($img);

    return $wrapper;
};


