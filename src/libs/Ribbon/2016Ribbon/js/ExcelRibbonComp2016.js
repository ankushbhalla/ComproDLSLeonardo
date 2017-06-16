'use strict';
namespace("SIMS.Components2016.Excel");

// This class is extended from Excelribboncomp.js ( which is used for Office 13)

//Class Declaration and Derivation
SIMS.Components2016.Excel.Ribbon = SIMS.Components.Excel.Ribbon.extend({
    
    fixMultiRibbonTabSelection: false,
    // Overriding of constructor can be done in this way
    constructor: function () {
       this.base();       
       // This is a map that maps the Office 13 ribbon xmls to Office 16 xmls
       this.AddPathToXmlPathMap("app/comps/common/ribbon/excel-ribbon.xml", "app/comps2016/common/ribbon/excel-ribbon.xml");
       this.AddPathToXmlPathMap("app/comps2016/common/ribbon/excel-ribbon.xml", "app/comps2016/common/ribbon/excel-ribbon.xml");
    },

    // For adding any new attribute then the attribute registered in RegisterAttributes function
    RegisterAttributes: function () {
        this.base();

        this.RegisteredComponent.EditRegisterdAttribute("CHART_HEIGHT", null, null, "float");
        this.RegisteredComponent.EditRegisterdAttribute("CHART_WIDTH", null, null, "float");

        this.RegisterAttribute("CHART_TEXT_FILL_COLOR", "0", 'int');
        this.RegisterAttribute("PICTURE_TOOLS_HEIGHT", "", 'float');
        this.RegisterAttribute("PIVOTCHART_TOOLS_FORMAT_CHART_ELEMENTS", "", 'text');
        this.RegisterAttribute("RIBBON_MODE", SIMS.Components2016.Common.RibbonVisibilityModes.NORMAL, 'text',false);
        this.RegisterAttribute("SLICER_SIZE_WIDTH", "", 'number');

          /**Below attribute has been added to set the display of a contextual tab to none. 
        Existing attribute (HIDE_TAB) is not relevent because it hides and then deactivates the tab. 
        Our requirement is only to hide the tab on task launch so then tab show / hide functionality could work as expected when a contextual element is clicked.**/
        this.RegisterAttribute("TAB_TO_DISPLAY_NONE", "", 'string',false); 
        this.RegisterAttribute("TELL_ME_SEARCH_BOX_WIDTH", "", 'string',false); 
        this.RegisterAttribute("FIX_MULTIRIBBON_TAB_SELECTION", false, 'bool',false); 


        //...add new attributes here
    },

    //// For adding any new events then the attribute registered in RegisterAttributes function
    RegisterEvents: function () {
        this.base();
        //...add new events here
        //For Ex:-
        //this.RegisterEvent(9, "Ribbon_SaveAs_Click", "Ribbon: SaveAs is clicked", false, false, "");
        this.RegisterEvent(3001, "Excel -> Insert statistics chart -> more statiscal charts", "", false, false, "");
        this.RegisterEvent(3002, "Excel -> Insert hierarchy chart -> more hierarchy charts", "", false, false, "");
        this.RegisterEvent(3003, "Excel -> Insert Waterfall or Stock Chart -> More Waterfall or Stock Chart", "", false, false, "");
        this.RegisterEvent(3004, "Excel -> Excel -> Sparkline Tools Design Tab -> Group Section -> Axis Control ->Vertical Axis Minimum ->Same for all Sparklines", "", false, false, "");
        this.RegisterEvent(3005, "Excel -> Excel -> Sparkline Tools Design Tab -> Group Section -> Axis Control ->Vertical Axis Maximum ->Same for all Sparklines", "", false, false, "");
        this.RegisterEvent(3006, "Excel -> Chart Tools Design - Add Chart Elements -> Data Labels -> More Data Label Options", "", false, false, "");
        this.RegisterEvent(3007, "Excel -> Chart Tools Format -> Shape Styles -> Shape outline -> Colour picker", "", false, false, "");
        this.RegisterEvent(3008, "Excel -> Chart Tools Format -> Shape Styles -> Shape outline -> Weight -> 1pt", "", false, false, "");    
        this.RegisterEvent(3009, "Excel -> Chart Tools Format -> WordArt Styles -> Text Fill -> Colour picker", "", false, false, ""); 
        this.RegisterEvent(3010, "Excel -> Home Tab -> Font Size -> 32", "", false, false, ""); 
        this.RegisterEvent(3011, "Excel -> View Tab -> Zoom Group -> 100%", "", false, false, "");
        this.RegisterEvent(3012, "Excel -> Table Tools Design Tab -> Table Styles Group -> Light -> Table Style Light 16", "", false, false, "");
        this.RegisterEvent(3013, "Excel -> PivotChart Tools Design - Add Chart Elements -> Data Labels -> More Data Label Options", "", false, false, "");
        this.RegisterEvent(3014, "Excel -> PivotTable Tools Analyze - Actions -> Clear -> Clear All", "", false, false, "");
        this.RegisterEvent(3015, "Excel -> PivotTable Tools Analyze - Actions -> Clear -> Clear Filters", "", false, false, "");
        this.RegisterEvent(3016, "Excel -> PivotChart Tools Design - Quick Layout -> Layout1", "", false, false, "");
        this.RegisterEvent(3017, "Excel -> PivotChart Tools Design - Styles->Style 14", "", false, false, "");
        this.RegisterEvent(3018, "Excel -> PivotChart Tools Design - Styles->Style 13", "", false, false, "");
        this.RegisterEvent(3019, "Excel -> PivotTable Tools Design - Styles->Medium 11", "", false, false, "");
        this.RegisterEvent(3020, "Excel -> PivotTable Tools Design - Styles->Medium 2 -> Context Menu event Id", "", false, false, "");
        this.RegisterEvent(3021, "Excel -> PivotTable Tools Design - Styles->Medium 2 -> Event Id", "", false, false, "");
        this.RegisterEvent(3022, "Excel -> Data Tab - Data Tools->Data Validation -> Clear validataion circles", "", false, false, "");
        this.RegisterEvent(3023, "Excel -> PivotTable Tools Design - Styles->Medium 3 -> Context Menu event Id", "", false, false, "");
        this.RegisterEvent(3024, "Excel -> PivotTable Tools Design - Styles->Medium 13 -> Event Id", "", false, false, "");
        this.RegisterEvent(3025, "Excel -> PivotChart Tools Design - Add Chart Elements -> Data Labels -> Center", "", false, false, "");
        this.RegisterEvent(3026, "Excel -> PivotTable Tools Design - Styles->Medium 9 -> Event Id", "", false, false, "");
        this.RegisterEvent(3027, "Excel -> PivotTable Tools Design - Styles->Medium 6 -> Event Id", "", false, false, "");
        this.RegisterEvent(3028, "Excel -> Formulas -> Function Library -> Date and Time 9 -> YEARFRAC ", "", false, false, "");
        this.RegisterEvent(3029, "Excel -> Data -> Data Tools -> Relationships", "", false, false, "");
        this.RegisterEvent(3030, "SHARE_BUTTON", "Excel -> Share Button", false, false, "");
        this.RegisterEvent(3031, "Excel -> Formulas -> Function Library -> Logical -> AND ", "", false, false, "");
        this.RegisterEvent(3032, "Excel -> PivotChart Tools Design - Add Chart Elements -> Data Labels -> Best Fit", "", false, false, "");
        this.RegisterEvent(3033, "Excel -> Insert Tab -> Add-ins -> Add-ins -> Manage other add-ins", "", false, false, ""); 
        this.RegisterEvent(3034, "POWER_REPORT_VIEW_BUTTON", "Excel -> Insert a Power Report View Button", false, false, "");
        this.RegisterEvent(3035, "Excel -> Page Layout Tab -> Fonts -> Cambria", "", false, false, ""); 
        this.RegisterEvent(3036, "Excel -> Data Tab -> Get & Transform -> New Query -> From Web", "", false, false, ""); 
        this.RegisterEvent(3037, "Excel - SlicerToolsOptions -> Size -> width", "", false, false, "");
        this.RegisterEvent(3038, "Excel - Data Tab- > Forecast -> Forecast Sheet", "", false, false, "");
        this.RegisterEvent(3039, "Excel - Drawing Tools Format Tab- > Shape Fill -> Gradient -> More Gradients...", "", false, false, "");
        this.RegisterEvent(3040, "Excel - Drawing Tools Format Tab- > Shape Fill -> Texture -> More Textures...", "", false, false, "");
        this.RegisterEvent(3041, "Excel - Drawing Tools Format Tab- > Text Fill -> Gradient -> More Gradients", "", false, false, "");
        this.RegisterEvent(3042, "Excel - Drawing Tools Format Tab- > Text Fill -> Texture -> More Gradients", "", false, false, "");
        this.RegisterEvent(3043, "Excel - Saprklines Tools Design Tab- > Show -> Low Point", "", false, false, "");
        this.RegisterEvent(3044, "Excel - Saprklines Tools Design Tab- > Style -> Sparkline Style Accent 3, (no light or dark)", "", false, false, "");
        this.RegisterEvent(3045, "Excel -> Home tab -> Cells group -> Delete -> Delete Table Rows", "", false, false, "");
        this.RegisterEvent(3046, "Excel -> Insert tab -> Text -> Wordart -> Wordart2", "", false, false, "");    
        this.RegisterEvent(3047, "Excel -> Drawing Tools Format tab -> Shape Styles group -> Shape Fill -> Texture -> Canvas", "", false, false, "");    
        this.RegisterEvent(3048, "Excel -> Chart Tools Design tab  -> Chart Styles group  ->  Gallery -> Style 4", "", false, false, "");  
        this.RegisterEvent(3049, "Excel -> SmartArt Tools Design tab  -> SmartArt Styles group  ->  SmartArt Styles -> Cartoon", "", false, false, "");
        this.RegisterEvent(3050, "Excel -> Table Tools Design Tab -> Table Styles group -> Table Style Medium 4", "", false, false, "");
   		this.RegisterEvent(3051, "Excel -> Picture Tools Format tab -> Picture Styles group -> More -> Drop Shadow Rectangle", "", false, false, "");
        this.RegisterEvent(3052, "Excel -> Picture Tools Format tab -> Adjust group -> Artistic Effects -> Artistic Effects Options...", "", false, false, "");
        this.RegisterEvent(3053, "Excel -> Page Layout tab  -> Themes group  -> Themes -> Crop", "", false, false, "");
        this.RegisterEvent(3054, "Excel -> Page Layout Tab -> Arrange -> Align ->Align Left", "", false, false, "");
        this.RegisterEvent(3055, "Excel -> Drawing Tools Format Tab -> Arrange -> Align ->Align Left", "", false, false, "");
        this.RegisterEvent(3056, "Excel -> Shape Styles group ->  Shape Effects, Bevel -> Soft Round", "", false, false, "");

    },

    // For adding any new attribute then the attribute registered in RegisterAttributes function in this file and add a switch case to handle it.
    // For modifying any existing attribute simply add the switch case and add the new code.
    SetAttribute: function (compid, attrName, attrValue) {

        var $thisComp = this.$thisCompElement;
        var params = null;


        try {
            var attr = getArray(this._compinfo.initialattrs.attr).find("@name", attrName);

            if (attr.length > 0) {
                params = attr[0]["@params"];
            }
        }
        catch (ex) { };

        switch (attrName) {
            case "RIBBON_PATH":
                this.ribbonXmlPath = this.GetXmlPathFromMap(attrValue);
                var self = this;
                var ribbonGenr = this.ribbonGenerator = new ribbonGenerator16();

                if (this.ribbonGenArr) {
                    this.ribbonGenArr.push(this.ribbonGenerator);
                }

                var path = this.ribbonXmlPath; // = 'Comps/ExcelRibbon/word-ribbon.xml';

                //Load 1024 ribbon xml for lower resolutions
                //Leonardo Start
                if ($(window).width() < 1279) {
                    path = this.ribbonXmlPath.replace(".xml", "_1024.xml");

                }
                //Leonardo End

                //Making ribbon generation to be only once for a task...
                //Need to correct this later if required
                if ($thisComp.children('.ribbon').length == 0) {

                    var storedXml = SIMS.Components.Common.RibbonXML.Get(path);

                    if (storedXml) {
                        self.CreateRibbon(storedXml);
                    }
                    else {
                        $.ajax({
                            async: false,
                            url: path,
                            success: function (xml) {
                                SIMS.Components.Common.RibbonXML.Set(xml, path);
                                self.CreateRibbon(xml);
                            }
                        });
                    }
                }
                break;

            case "FONT_COLOR":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.setColorGridVal('homefontColor', attrValue);
                }
                break;

            case "ACTIVATE_TAB":
                var attrVal = attrValue;
                if (attrVal.toUpperCase() == "PICTURE TOOLS FORMAT") {
                    console.log("Ribbon:Picture Contextual Tab Activated by Ribbon");
                }
                //Header footer tab name is corrected in ribbon xml. Thus to support the old tasks below check is added.
                if (attrValue == "Header Footer Tools" || attrValue == "Header & Footer Tools")
                    attrVal = "Header Footer Tools Design";

                var tabNameMin = attrVal.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();

                // adding modified tab name in a array which is used to check at the time when contextual tab is shown or hide.
                if (this.activatedTabsList.indexOf(tabNameMin) === -1) {
                    this.activatedTabsList.push(tabNameMin);
                }

                var $tabHeader = $thisComp.find('.tab-header-' + tabNameMin);

                $tabHeader.show();

                //add css for contextual tab head
                var headText = $tabHeader.data("head-text");
                if (headText != undefined) {

                    var headNameMin = headText.removeSpaces().replace("&", "").toLowerCase();
                    var $contextualTabHead = $thisComp.find(".contextual-head-" + headNameMin);

                    //special handling for Excel Power Pivot ribbon contextual tabs
                    if ($contextualTabHead.parents().hasClass('excel-power-pivot ribbon')) {
                        $contextualTabHead.text(headText.toLowerCase());
                    }

                    //special handling for chart tools design tab
                    if ($tabHeader.is(".tab-header-charttoolsdesign")) {
                        var $chartToolFormatTab = $thisComp.find(".tab-header-charttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $chartToolFormatTab.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-charttoolsformat")) {
                        var $chartToolDesignTab = $thisComp.find(".tab-header-charttoolsdesign");
                        $contextualTabHead.css({ "left": $chartToolDesignTab.offset().left, "width": $tabHeader.outerWidth() + $chartToolDesignTab.outerWidth() + 3 })
                    }
                        //special handling for table tools tabs  -- Word Ribbon
                    else if ($tabHeader.is(".word .tab-header-tabletoolsdesign")) {
                        var $tab = $thisComp.find(".tab-header-tabletoolslayout");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-tabletoolslayout")) {
                        var $tab = $thisComp.find(".tab-header-tabletoolsdesign");
                        $contextualTabHead.css({ "left": $tab.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 3 })
                    }
                        //special handling for smartart tools tabs
                    else if ($tabHeader.is(".tab-header-smartarttoolsformat")) {
                        var $tab = $thisComp.find(".tab-header-smartarttoolsdesign");
                        $contextualTabHead.css({ "left": $tab.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-smartarttoolsdesign")) {
                        var $tab = $thisComp.find(".tab-header-smartarttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-pivottabletoolsanalyze")) {
                        var $pivottabletoolsdesign = $thisComp.find(".tab-header-pivottabletoolsdesign");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $pivottabletoolsdesign.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-pivottabletoolsdesign")) {
                        var $pivottabletoolsanalyze = $thisComp.find(".tab-header-pivottabletoolsanalyze");
                        $contextualTabHead.css({ "left": $pivottabletoolsanalyze.offset().left, "width": $tabHeader.outerWidth() + $pivottabletoolsanalyze.outerWidth() + 3 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsanalyze")) {
                        var $pivotcharttoolsdesign = $thisComp.find(".tab-header-pivotcharttoolsdesign");
                        var $pivotcharttoolsformat = $thisComp.find(".tab-header-pivotcharttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $pivotcharttoolsdesign.outerWidth() + $pivotcharttoolsformat.outerWidth() + 6 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsdesign")) {
                        var $pivotcharttoolsanalyze = $thisComp.find(".tab-header-pivotcharttoolsanalyze");
                        var $pivotcharttoolsformat = $thisComp.find(".tab-header-pivotcharttoolsformat");
                        $contextualTabHead.css({ "left": $pivotcharttoolsanalyze.offset().left, "width": $pivotcharttoolsanalyze.outerWidth() + $tabHeader.outerWidth() + $pivotcharttoolsformat.outerWidth() + 6 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsformat")) {
                        var $pivotcharttoolsanalyze = $thisComp.find(".tab-header-pivotcharttoolsanalyze");
                        var $pivotcharttoolsdesign = $thisComp.find(".tab-header-pivotcharttoolsdesign");
                        $contextualTabHead.css({ "left": $pivotcharttoolsanalyze.offset().left, "width": $pivotcharttoolsanalyze.outerWidth() + $tabHeader.outerWidth() + $pivotcharttoolsdesign.outerWidth() + 6 })
                    }
                    else {
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() })
                    }
                    $contextualTabHead.show();

                    //special handling for Excel Power Pivot ribbon contextual tabs, as those TABs open at the left side of the title bar instead of right
                    //Threfore repositioning of title text is avoided
                    if (!($contextualTabHead.parents().hasClass('excel-power-pivot ribbon'))) {
                        var $control = $thisComp.find('.title-bar .office-control.ctrl-text');
                        var wd = $control.innerWidth();
                        var controlPos = ($tabHeader.offset().left - wd).toString() + "px";
                        $control.css({ "position": "absolute", "left": "255px", "top": "6px" });
                    }
                    else {
                        // do nothing
                    }

                    this.AdjustTellMeSerachBox();

                }

                break;

            case "DOCUMENT_NAME":
                var splittedarray = attrValue.split("-");
                if (splittedarray.length > 1) {
                    splittedarray[splittedarray.length - 1] = splittedarray[splittedarray.length - 1].replace(/Microsoft /gi, "");
                }
                attrValue = splittedarray.join("-");
                this.base(compid, "DOCUMENT_NAME", attrValue);
                break;

            case "CHART_TEXT_FILL_COLOR":
            	var $charttoolsformatTab = $thisComp.find('#ribbon-tab-container-charttoolsformat');

                if ($charttoolsformatTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($charttoolsformatTab, attrName, attrValue);
                } else {
                    this.setColorGridVal('Chart_Tools_Text_Fill_Color', attrValue);
                }
                break;

            case "PICTURE_TOOLS_HEIGHT":

                var $picturetoolsTab = $thisComp.find('#ribbon-tab-container-picturetoolsformat');

                if ($picturetoolsTab.children().length == 0) //not yet created
                {
                    this.addAttrDataInTab($picturetoolsTab, attrName, attrValue);
                } else {
                    attrValue = this.setSpinVal('picture-height', attrValue);
                }
                break;
            case "PIVOTCHART_TOOLS_FORMAT_CHART_ELEMENTS":
                var $pivotChartToolsFormatTab = $thisComp.find('#ribbon-tab-container-pivotcharttoolsformat');
                
                if ($pivotChartToolsFormatTab.children().length == 0) //not yet created
                {
                    this.addAttrDataInTab($pivotChartToolsFormatTab, attrName, attrValue);
                } else {
                    this.setTextBoxVal("charttools-chartelements", attrValue);
                }
                break;
            case "RIBBON_MODE":
                this.UpdateRibbonVisibilityMode($thisComp, attrValue);
                break;
            case "SLICER_SIZE_WIDTH":
                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('slicertools_size_width', attrValue);
                }
                break;
            case "TAB_TO_DISPLAY_NONE":
                 this.HideTab(attrValue);
                break;
            case "TELL_ME_SEARCH_BOX_WIDTH":
                var $Tellmetext = this.$thisCompElement.find('.tellMeSearchBox .tellMeBoxText');
                $Tellmetext.css({
                    "width": attrValue
                });
                break;
            case "FIX_MULTIRIBBON_TAB_SELECTION":
                    this.fixMultiRibbonTabSelection = attrValue.toLowerCase() === "true" ? true : false;
                break;
            default:
                {
                    this.base(compid, attrName, attrValue);
                }
        }
    },

    CreateRibbon: function (xml) {        
        this.ribbonGenerator.activeTabList = ["Home"]

        this.$thisCompElement.append(this.ribbonGenerator.getRibbonFromXml(xml, this.appName, this.RibbonMode));

        this.ribbonGenerator.activeTabList = "";

        //Should be called in GenerateHTML, however due to repeat binding issue kept here
        this.AttachComponentEvents(this._compinfo, this.$thisCompElement);
    },

     PostSubRibbonAjaxCall: function(xml){
        //$thisComp.children().remove();
        this.ribbonGenerator.updateRibbonfromXML(xml, this.$thisCompElement.children('.ribbon'), this.AttachSubRibbonWithIdentifier, this.fixMultiRibbonTabSelection);
        //reset controlXMLUPdate as update is complete
        this.controlXMLUpdate = "false";
        this.AttachSubRibbonWithIdentifier = false;
        //self.AttachComponentEvents(self._compinfo, $thisComp);

    },

    GetAttribute: function (compid, attrName) {
        var attrValue = "";
        var $thisComp = this.$thisCompElement;

        var attr = getArray(this._compinfo.finalattrs.attr).find("@name", attrName);
        var params = null;
        if (attr.length > 0) {
            params = attr[0]["@params"];
        }

        switch (attrName) {

            case "PICTURE_TOOLS_HEIGHT":
                attrValue = $thisComp.find('#ribbon-tab-container-picturetoolsformat .picture-height .sims-SpinControl').getData().currentvalue;
                break;

            case "CHART_TEXT_FILL_COLOR":
                attrValue = this.getColorGridVal('chart_text_fill_color');
                break;
            case "FONT_SIZE":
                var $fontSize = $thisComp.find('.office-control.font-size input.combo-textbox');
                //attrValue = $fontSize.attr('value');
                attrValue = $fontSize.data("val") || $fontSize.attr("value");
                break;
            case "SLICER_SIZE_WIDTH":
                attrValue = $thisComp.find('#ribbon-tab-container-slicertoolsoptions .slicertools_size_width .spinContainer .spinInput').val();
                break;
            default:
                attrValue = this.base(compid, attrName);
        }
        return attrValue;
    },

    FireSimEvent: function(id, controlEventArgs, clickstreamStr) {

        var checkHandled = false;
        switch (id) {
            case 909:
                checkHandled = this.handleSpinnerControlEvent(id, "picture-height", "PICTURE_TOOLS_HEIGHT", controlEventArgs, clickstreamStr);
                break;
            case 225:
                checkHandled = this.handleSpinnerControlEvent(id, "scaling", "PAGE_LAYOUT_SCALE", controlEventArgs, clickstreamStr);
                break;
            case 621:
                checkHandled = this.handleSpinnerControlEvent(id, "slicertools_size_height", "SLICER_SIZE_HEIGHT", controlEventArgs, clickstreamStr);
                break;
            case 622:
                checkHandled = this.handleSpinnerControlEvent(id, "slicertools_buttons_width", "SLICER_BUTTON_WIDTH", controlEventArgs, clickstreamStr);
                break;
            case 623:
                checkHandled = this.handleSpinnerControlEvent(id, "slicer-column", "SLICER_BUTTON_COLUMN", controlEventArgs, clickstreamStr);
                break;
            case 3037:
                checkHandled = this.handleSpinnerControlEvent(id, "slicertools_size_width", "SLICER_SIZE_WIDTH", controlEventArgs, clickstreamStr);
                break;
            default:
                break;
        }

        if (!checkHandled) {
            this.base(id, controlEventArgs, clickstreamStr);
        }
    },

    ChartSpinButtonEventhandler: function(compEventId, spinCtrlName, finalAttrName, controlEventArgs, clickstreamStr) {
        var checkHandled = false;
        switch (compEventId) {
            case 551:
                checkHandled = this.handleSpinnerControlEvent(compEventId, "chart-height", "CHART_HEIGHT", controlEventArgs, clickstreamStr);
                break;
            case 552:
                checkHandled = this.handleSpinnerControlEvent(compEventId, "chart-width", "CHART_WIDTH", controlEventArgs, clickstreamStr);
                break;
            default:
                break;
        }

        if (!checkHandled) {
            this.base(compEventId, spinCtrlName, finalAttrName, controlEventArgs, clickstreamStr);
        }

    },

    AttachComponentEvents: function (CompInfo, $Comp) {
        this.base(CompInfo, $Comp);
        this.AttachDropdownToggleEvents($Comp);
    },
    /*
      Showing context menu on ALT + SpaceBar
    */
    HandleApplicationContextMenu: function () {
        return this.ShowApplicationContextMenu(".title-bar .office-control.titlebar-control.appController");
    }
});
