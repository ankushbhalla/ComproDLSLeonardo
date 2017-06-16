'use strict';
namespace('SIMS.SharedData');

SIMS.SharedData.KeyboardOwner = {
    CONTEXT_MENU: "CONTEXT_MENU",
    RIBBON: "RIBBON"
};

SIMS.SharedData.KeyboardData = {
    HANDLED: 0,
    IGNORED: 1,
    OVERRIDDEN: 2,
    OWNER: "",
    SHORTCUT_KEY_VISIBLE: false,
    CONTEXT_MENU_VISIBLE: false,
    KEYCODES: { //All special chracters or number keys are to be initialted by uderscore ('_')
        tabKey: 9,        enterKey: 13,        shiftKey: 16,     ctrlKey: 17, 
        altKey: 18,       escKey: 27,          pageUp: 33,       pageDown: 34, 
        leftKey: 37,      upKey: 38,           rightKey: 39,     downKey: 40, 
        
        _oneKey: 49,      _percentKey: 53,     _plusKey: 61,     _equalKey: 61,     _equalKeyChrome: 187,
        
        aKey: 65,         bKey: 66,            cKey: 67,         eKey: 69, 
        fKey: 70,         pKey: 80,            sKey: 83,         vKey: 86,         
        xKey: 88, 
        
        f1Key: 112,       f2Key: 113,          f3Key: 114,       f6Key: 117, 
        f7Key: 118,       f10Key: 121,         f12Key: 123,      graveAccKey: 192,
        zKey: 90,         backSpace: 8,        f4key: 115,       spacebarKey: 32,
        deleteKey: 46,    metaKey: 91,         rightMetaKey:93
    },

    KEYCODESMAP: { 8: "BACKSPACE", 9: "TAB", 13: "ENTER", 27: "ESCAPE", 32: "SPACE", 33: "PAGEUP", 35: "END", 36: "HOME", 37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 46: "DELETE", 61: "=", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 109: "NUM_DASH", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 173: "DASH", 187: "=", 188: "COMMA", 189: "DASH", 190: "PERIOD", 219: "OPEN_BRAKET", 221: "CLOSE_BRAKET", 192:"TIDLE" }
};

SIMS.SharedData.DocAreaData = {
    CURRENT_SHYTOOLBAR_INSIDE: null
};


SIMS.SharedData.TimeLog = {
    TASK_LOADING_START: null,
    TASK_LOADING_END: null,
    APP_RENDERING_START: null,
    APP_RENDERING_END: null
};

SIMS.SharedData.GAData = {
    GAEventStartTime: null,
    bFirstStateLoaded: false
};

SIMS.SharedData.RibbonOptimization = { 
    enableRibbonLazyLoad : true
};

// stores prefetching global data
SIMS.SharedData.Prefetch = {
    ENABLE: true,
    DELAY_TIME: 1500
};

SIMS.SharedData.QuestionType = {    
    NOTSPECIFED: "NotSpecifed",
    SIM: "SIM",
    NATIVE_TRUEFALSE: "Native_TrueFalse",
    NATIVE_MATCHING: "Native_Matching",
    NATIVE_RANKING: "Native_Ranking",
    NATIVE_FIB: "Native_FIB",
    NATIVE_MC: "Native_MC",    
    NATIVE_MR: "Native_MR"
};

SIMS.SharedData.QuestionStatus = {
    NOTGRADED: "NotGraded",
    NOTATTEMPTED: "NotAttempted",
    INCOMPLETE: "InComplete",
    TRAININGUNATTEMPTED: "TrainingUnAttempted",
    TRAININGINCOMPLETE: "TrainingInComplete",
    NOTAVAILABLE: "NotAvailable",
    CORRECT: "Correct",
    INCORRECT: "InCorrect"
};

SIMS.SharedData.StatusTextViewAll = {
    NOTGRADED: "Attempted",
    NOTATTEMPTED:  "Not Attempted",
    INCOMPLETE: "Incomplete",
    NOTAVAILABLE: "Not Available",
    CORRECT: "Correct",
    INCORRECT: "Incorrect"    
};

SIMS.SharedData.AssignmentMode = {
    TRAINING: "Training",
    TEST: "Test"
};

// application modes enum
SIMS.SharedData.ApplicationModes = {
    Assignment : "assignment",
    Practice: "practicedirect"
};

//Application mode setter / getter function
SIMS.SharedData.CurrentAppMode = function () {
    var currentApplicationMode = SIMS.SharedData.ApplicationModes.Assignment;
    return {
        Set: function(appMode){

            switch(appMode) {
                case SIMS.SharedData.ApplicationModes.Practice:
                case SIMS.SharedData.ApplicationModes.Assignment:
                    currentApplicationMode = appMode;
                    break;

                default:
					currentApplicationMode = SIMS.SharedData.ApplicationModes.Assignment;
                    break;
            }
        },
        Get: function(){
            return currentApplicationMode;
        }
    }
}();

SIMS.SharedData.ShuffleOptions = {
    isEnabled: false
};

//Global variable containing configurations for connection drop/offline handling code
SIMS.SharedData.OfflineHandler = {

    isEnabled: true,  //set false to not load offline handler code 

    isLoaded: false,  //this is set true once offline handler code has been loaded and configured

    //path of JS files to be lazy loaded
    jsPaths: [
        "libs/offline/offline-custom.js" + SIMS.Core.PreloadData.RequestSuffix,
        "app/Core/Handlers/OfflineHandler.js" + SIMS.Core.PreloadData.RequestSuffix
    ]
};

SIMS.SharedData.ComponentThemes = {
    OFFICE2013: 0,
    WINDOWS10:  1,
    OFFICE2016: 2
};

SIMS.SharedData.MaximizeBtnModes = {
    NONE: -1,
    DEFAULT: 0,
    RESTORE:  1,
    DISABLED: 2
};


//Global Variable for Ribbon Contextual Tabs ID Mapping

//Contextual Tabs mapping for WORD Application
SIMS.SharedData.WordRibbonContextualTabIDs = {
    
    PICTURE_SELECT   : "PICTURE TOOLS FORMAT",
    SHAPE_SELECT     : "drawing Tools format" ,
    SMART_ART_FORMAT : "Smartart Tools Format",
    SMART_ART_DESIGN : "Smartart Tools Design",
    TABLE_DESIGN     : "Table Tools Design",
    TABLE_LAYOUT     : "Table Tools Layout"
};
//Contextual Tabs mapping for EXCEL Application
SIMS.SharedData.ExcelRibbonContextualTabIDs = {  

    Chart_Tools_Design: "Chart Tools Design",
    Chart_Tools_Format: "Chart Tools Format",
    Drawing_Tools_Format: "Drawing Tools Format",
    Header_Footer_Tools_Design: "Header & Footer Tools Design",
    Picture_Tools_Format: "Picture Tools Format",
    PivotChart_Tools_Analyze: "PivotChart Tools Analyze",
    PivotChart_Tools_Design: "PivotChart Tools Design",
    PivotChart_Tools_Format: "PivotChart Tools Format",
    PivotTable_Tools_Analyze: "PivotTable Tools Analyze",
    PivotTable_Tools_Design: "PivotTable Tools Design",
    Power_View: "Power View",
    PowerPivot: "PowerPivot",
    Slicer_Tools_Options: "Slicer Tools Options",
    SmartArt_Tools_Design: "SmartArt Tools Design",
    SmartArt_Tools_Format: "SmartArt Tools Format",
    Sparklines_Tools_Design: "Sparklines Tools Design",
    Table_Tools_Design: "Table Tools Design"

};
//Contextual Tabs mapping for PPT Application
SIMS.SharedData.PPTRibbonContextualTabIDs = {
    Picture_Tools_Format: "Picture Tools Format",
    Video_Tools_Playback: "Video Tools Playback",
    Video_Tools_Format: "Video Tools Format",
    Audio_Tools_Playback: "Audio Tools Playback",
    Audio_Tools_Format: "Audio Tools Format",
    Drawing_Tools_Format: "Drawing Tools Format",
    Chart_Tools_Design: "Chart Tools Design",
    Chart_Tools_Format: "Chart Tools Format",
    SmartArt_Tools_Design: "SmartArt Tools Design",
    SmartArt_Tools_Format: "SmartArt Tools Format",
    Table_Tools_Design: "Table Tools Design",
    Table_Tools_Layout: "Table Tools Layout"
};
//Contextual Tabs mapping for ACCESS Application
SIMS.SharedData.AccessRibbonContextualTabIDs = {
    Table_Tools_Fields: "Table Tools Fields",
    Table_Tools_Table: "Table Tools Table",
    Table_Tools_Design: "Table Tools Design",
    Query_Tools_Design: "Query Tools Design",
    Form_Layout_Tools_Design: "Form Layout Tools Design",
    Form_Layout_Tools_Arrange: "Form Layout Tools Arrange",
    Form_Layout_Tools_Format: "Form Layout Tools Format",
    Form_Design_Tools_Design: "Form Design Tools Design",
    Form_Design_Tools_Arrange: "Form Design Tools Arrange",
    Form_Design_Tools_Format: "Form Design Tools Format",
    Report_Layout_Tools_Design: "Report Layout Tools Design",
    Report_Layout_Tools_Arrange: "Report Layout Tools Arrange",
    Report_Layout_Tools_Format: "Report Layout Tools Format",
    Report_Layout_Tools_Page_setup: "Report Layout Tools Page setup",
    Report_Design_Tools_Design: "Report Design Tools Design",
    Report_Design_Tools_Arrange: "Report Design Tools Arrange",
    Report_Design_Tools_Format: "Report Design Tools Format",
    Report_Design_Tools_Page_setup: "Report Design Tools Page setup",
    Print_Preview: "Print Preview",
    Macro_Tools_Design: "Macro Tools Design",
    Relationship_Tools_Design: "Relationship Tools Design",
    Form_Tools_Datasheet: "Form Tools Datasheet"
};

//Main Tabs mapping for ACCESS Application
SIMS.SharedData.AccessRibbonMainTabIDs = {
    Home: "Home",
    Create: "Create",
    External_Data: "External Data",
    Database_Tools: "Database Tools"
};

SIMS.SharedData.SnappingAreas = {
    NONE: "NONE",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    TOP: "TOP",
    BOTTOM: "BOTTOM",
    LEFT_TOP: "LEFT_TOP",
    RIGHT_TOP: "RIGHT_TOP",
    LEFT_BOTTOM: "LEFT_BOTTOM",
    RIGHT_BOTTOM: "RIGHT_BOTTOM"
};

SIMS.SharedData.ZIndexData = {
    WindowFrameStartIndex: 3000,
    WindowFrameResetAfterIndex: 3050,
    WindowFrameEndIndex: 3100,
    /* WindowFrameStartIndex Reserved from 3000 to 3100 */
    OverlayModalWindow:3150,


    Win10ActionCenter: 3199,
    //Taskbar and start menu: reserved - 3200-3250
    Win10Taskbar: 3200,

    //Learning aids pop up: reserved - 3500-3600
    LearningAidDivTooltip: 3500,

    //Virtual keyboard: reserved - 10010-10020
    VirtualKeyboard: 10010  //keep it > 9999 (z-index applied on Increase Font tooltips for instruction)
};

SIMS.SharedData.ComponentTypes = {
    DEFAULT: "default",
    MODAL_DIALOG: "modaldialog",
    MODAL_WINDOW: "modalwindow",
    DIALOG: "dialog",
    WINDOW_FRAME: "windowframe",
    PANE: "modeless pane"
};

//GlobalFag to check if practice is on or not
SIMS.SharedData.PracticeData = {
    isPracticeOn: false
};

SIMS.SharedData.VirtualKBData = { 
    isEnabled: true
};

SIMS.SharedData.BrowserCheck = {
    edge: bowser.msedge,
    msie: bowser.msie,
    webkit: bowser.webkit,
    chrome: bowser.chrome,
    safari: bowser.safari,
    firefox: bowser.firefox,
    version: bowser.version,
    opera: bowser.opera
};
