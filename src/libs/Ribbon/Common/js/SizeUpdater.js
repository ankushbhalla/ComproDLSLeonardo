var gSimsAreaHeight = 0;
var gSimsAreaWidth = 0;
var gSimsAreaLeft = 0;
var gSimsAreaTop = 0;
var gSimsAreaBorderWidth = 0;
var rightNavWidth = 250;
var bottomNavHeight = 100;

function ResizeComponents(SimsAreaHeight, currSimsAreaWidth, WindowHeight) {
    console.log("SimsAreaHeight :" + SimsAreaHeight + "currSimsAreaWidth :" + currSimsAreaWidth + "WindowHeight :" + WindowHeight);

    //$("#SIMArea").height(SimsAreaHeight);
    //$("#SIMArea").width(currSimsAreaWidth);
        
    /*$(".FullscreenCurtainBlue").height(WindowHeight);
    $(".FullscreenCurtainBackground").height(WindowHeight);*/
    
    //$("#LoadingBackgroundCurtain").height(WindowHeight);
    /*$("#BackroundCurtainForGreenDlg").height(WindowHeight);*/
    
    //$("#LoadingCurtain").height(SimsAreaHeight);
    /*$(".BackroundCurtain").height(SimsAreaHeight);*/

    if (window.Cache != undefined) {

        $(".compDiv").each(function () {
            var compId = $(this).attr("id");
            var compInfo = $("#" + compId).data("compinfo");

            if (compInfo) {
                var name = compInfo.compName;

                var nLen = window.Cache.length;
                for (i = 0; i < nLen; i++) {
                    if (window.Cache[i] != null) {
                        if (window.Cache[i][0] == name) {
                            if (window.Cache[i][1]._compJS != null) {
                                if (window.Cache[i][1]._compJS.resize != undefined) {
                                    window.Cache[i][1]._compJS.resize(compId, SimsAreaHeight, currSimsAreaWidth);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
};

function ResizeContentsOnScreen() {
    //correction 
    var DefaultCorrection = 2;
    WindowHeight = $(window).height() - DefaultCorrection;
    SimsAreaHeight = WindowHeight - $NavArea.outerHeight();
    //$("#SIMArea").height(SimsAreaHeight);
    $(".FullscreenCurtainBlue").height(WindowHeight);
    $(".FullscreenCurtainBackground").height(WindowHeight);
    //$("#LoadingCurtain").height(SimsAreaHeight);
    //$("#LoadingBackgroundCurtain").height(WindowHeight);
    $("#BackroundCurtainForGreenDlg").height(WindowHeight);
    $(".BackroundCurtain").height(SimsAreaHeight);


};

function ResizeContentsOnScreen11(bSendMessage) {
    var DefaultCorrection = 0;
    var WindowHeight = 0;
    var WindowWidth = 0;

    var SimsAreaHeight = 0;
    var currSimsAreaWidth = 0;

    WindowHeight = $(window).height() - DefaultCorrection;
    WindowWidth = $(window).width();

 /*   if (bSendMessage) {
        SEND_MESSAGE("DISPLAY_BOTTOM_NAVIGATOR");
        SimsAreaHeight = WindowHeight - $("#NavArea").height();
    }
    currSimsAreaWidth = WindowWidth;*/

    if ((WindowWidth >= 1420)) {
        if (bSendMessage) {
            SEND_MESSAGE("DISPLAY_RIGHT_NAVIGATOR");
        }

        currSimsAreaWidth = WindowWidth - rightNavWidth;
        SimsAreaHeight = WindowHeight;
        //$("#SIMArea").width(currSimsAreaWidth - 250);
    } else {
    if (bSendMessage) {
        SEND_MESSAGE("DISPLAY_BOTTOM_NAVIGATOR");
        SimsAreaHeight = WindowHeight - $("#NavArea").height();
    }
    else {
        SimsAreaHeight = WindowHeight - bottomNavHeight; //  - $("#NavArea").height();
    }       //$("#SIMArea").width(currSimsAreaWidth);    

    currSimsAreaWidth = WindowWidth;
    }
    
    //Store in global variables
    gSimsAreaHeight = SimsAreaHeight - gSimsAreaBorderWidth;
    gSimsAreaWidth = currSimsAreaWidth - gSimsAreaBorderWidth;
    gSimsAreaLeft = $("#SIMArea").offset().left;
    gSimsAreaTop = $("#SIMArea").offset().top;

    ResizeComponents(gSimsAreaHeight, gSimsAreaWidth, WindowHeight);

    try {
        ResetBlurbDraggingGlobalVariables();
    }
    catch (err) {
        // Handle error(s) here
    }
    
}

$(document).ready(function () {
    //ResizeContentsOnScreen11(false);
    if (SIMS.SharedData.AssignmentVersion === SIMS.SharedData.AssignmentVersions.OFFICE2016) {
        rightNavWidth = 252;
        bottomNavHeight = 110;
    }
   // $("[rel=showtooltip]").showTooltip(); 
});

function HookResizeEvent() {
    $(window).resize(function () {
        ResizeContentsOnScreen11(true);
    });
};