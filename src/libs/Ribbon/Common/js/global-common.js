'use strict';

var supportedVersions = {
    'msie': 99, //far number till we get IE back as supported... 
    'safari': 99, //far number till we get Safari back as supported...
    'chrome': 23,
    'mozilla': 17,
    'msedge': 12
};

var globalFilePath = "app/global2013.js";

var GlobalLog = function (strMessage) {
    if (SIMS.Objects.ExamManager.lmsMode === 0) {
        console.log(strMessage);
        alert(strMessage);
    }
};

var localStorageDict = null;

var FillLocalStorageDictionary = function () {
    var taskResourceDictionary = localStorage.getItem("resources");
    localStorageDict = JSON.parse(taskResourceDictionary);
};

var GetLocalStorageData = function (itemPath) {
    var retValue = null
    if (localStorageDict != null) {
        retValue = localStorageDict._items[itemPath];
    }
    return retValue;
};

var namespace = function (name, separator, container) {
    var ns = name.split(separator || '.'),
    o = container || window,
    i,
    len;
    for (i = 0, len = ns.length; i < len; i++) {
        o = o[ns[i]] = o[ns[i]] || {};
    }
    return o;
};

var stringToClass = function (str) {
    
    var arr = str.split(".");

    var fn = (window || this);
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }

    if (typeof fn !== "function") {
        throw new Error("function not found");
    }

    return fn;
};

var Polyfills = {};


// Array.prototype.find = function (key, val) {
//     var results = [];
//     for (var i = 0; i < this.length; i++) {
//         var currentEl = this[i];
//         if (currentEl[key] == val) {
//             results.push(currentEl);
//         }
//     }
//     return results;
// };

// Array.prototype.findSingle = function (key, val) {
//     var results = this.find(key, val);
//     if (results.length > 1) {
//         //throw "Query returned more than one elements.";
//         GlobalLog("Query returned more than one elements.");
//         return results[0];
//     }
//     else {
//         return results[0];
//     }
// };

// String.prototype.contains = function (text) {
//     return this.indexOf(text) !== -1;
// };

// String.prototype.startsWith = function (text) {
//     return this.indexOf(text) === 0;
// };

// String.prototype.endsWith = function(suffix) {
//     return this.indexOf(suffix, this.length - suffix.length) !== -1;
// };


Polyfills.removeSpaces = function (string) {
    return string.replace(/\s/g, '');
};

Polyfills.isEmpty = function (string) {
    return string == "";
};

// if (!String.prototype.trim) {
//     String.prototype.trim = function () {
//         return this.replace(/^\s+|\s+$/g, '');
//     };
// }

namespace('SIMS');
namespace("SIMS.Objects");
namespace('SIMS.SharedData');
namespace('SIMS.Core');

SIMS.SharedData.OfficeVersions = {
    OFFICE2013: "",
    OFFICE2016: "Office2016"
};

/*-------------------------------------------------- Enum Declaration Section ---------------------------------------------------*/

SIMS.SharedData.AppIDs = {
    WORD2013: "20",
    EXCEL2013: "21",
    PPT2013: "22",
    ACCESS2013: "23",
    OFFICE2013: "24",
    WINDOWS10: "25",
    WORD2016: "26",
    EXCEL2016: "27",
    PPT2016: "29",
    ACCESS2016: "28",
    OFFICE2016: "30",
    NATIVE: "00",
    NOTSPECIFIED: "-1"
};

SIMS.SharedData.AssignmentVersions = {
    DEFAULT: "Office2013",
    OFFICE2016: "Office2016",
    NOTSPECIFIED: "-1"
};

SIMS.SharedData.SIMBodyClassNames = {
    DEFAULT: "",
    OFFICE2013: "", //"Office2013",
    OFFICE2016: "Office2016",
    WINDOWS8: "", //"Windows8", 
    WINDOWS10: "", //"Windows10"
    NATIVE: ""
};

SIMS.SharedData.ComponentVersions = {
    OFFICE2013: "Office2013",
    WINDOWS8: "Office2013", //"Windows8",
    WINDOWS10: "Office2013", //"Windows10",
    OFFICE2016: "Office2016"    
};

SIMS.SharedData.ApplicationNames = {
    WORD2013: "Word 2013",
    EXCEL2013: "Excel 2013",
    PPT2013: "PPT 2013",
    ACCESS2013: "Access 2013",
    OFFICE2013: "Office 2013",
    WINDOWS10: "Windows 10",
    WORD2016: "Word 2016",
    EXCEL2016: "Excel 2016",
    PPT2016: "PPT 2016",
    ACCESS2016: "Access 2016",
    OFFICE2016: "Office 2016",
    NATIVE: "NATIVE"
};

//Enum for View All Labels. Not in use right now, declared here for future use.
SIMS.SharedData.ViewAllAppLabels = {
    WORD2013: "Word",
    EXCEL2013: "Excel",
    PPT2013: "PPT",
    ACCESS2013: "Access",
    OFFICE2013: "Office 2013",
    WINDOWS10: "Windows 10",
    WORD2016: "Word 2016",
    EXCEL2016: "Excel 2016",
    PPT2016: "PPT 2016",
    ACCESS2016: "Access 2016",
    OFFICE2016: "Office 2016",
    NATIVE: "Native"
};

/* Dictionary of AppIDs against AssignmentVersions */
SIMS.SharedData.AppIdDictionary = {};

SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.WORD2013] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.DEFAULT,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.WORD2013
};

SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.EXCEL2013] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.DEFAULT,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.EXCEL2013
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.PPT2013] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.DEFAULT,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.PPT2013
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.ACCESS2013] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.DEFAULT,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.ACCESS2013
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.OFFICE2013] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.DEFAULT,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.OFFICE2013
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.WINDOWS10] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.NOTSPECIFIED,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.WINDOWS10
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.WORD2016] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.OFFICE2016,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.WORD2016
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.EXCEL2016] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.OFFICE2016,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.EXCEL2016
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.PPT2016] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.OFFICE2016,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.PPT2016
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.ACCESS2016] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.OFFICE2016,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.ACCESS2016
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.OFFICE2016] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.OFFICE2016,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.OFFICE2016
};
SIMS.SharedData.AppIdDictionary[SIMS.SharedData.AppIDs.NATIVE] = {
    AssignmentVersion: SIMS.SharedData.AssignmentVersions.NOTSPECIFIED,
    ViewAllLabel: SIMS.SharedData.ViewAllAppLabels.NATIVE
};
/* Dictionary of AppIDs against AssignmentVersions */

/*-------------------------------------------------- Enum Declaration Section ---------------------------------------------------*/

SIMS.Core.ResponseCodes = {
    Success: "0",
    Error: "7",
    LaunchFailed: "8"
};

SIMS.Core.PreloadData = {
                                FileList : null,
                                RequestSuffix : "?ver=rdyyyymmdd"
                            };

// SIMS.SharedData.OfficeVersion = SIMS.SharedData.OfficeVersions.OFFICE2013;

function ShowLoadingAndBandwidthStatus() {
    document.getElementById("LoadingCurtain").style.display = "block";

    setTimeout(bandwidthObject.calcBandwidthState, 100);

    var classes = {};
    classes[SIMS.SharedData.AssignmentVersions.OFFICE2016] = {
        good : "bandwidth-icon pso-font pso pso-good",
        upperAverage : "bandwidth-icon pso-font pso pso-u_avg",
        average : "bandwidth-icon pso-font pso pso-avg",
        belowAverage : "bandwidth-icon pso-font pso pso-b_avg",
        poor : "bandwidth-icon pso-font pso pso-poor"
    };

    classes[SIMS.SharedData.AssignmentVersions.DEFAULT] = {
        good : "bandwidth-icon good",
        upperAverage : "bandwidth-icon u_avg",
        average : "bandwidth-icon avg",
        belowAverage : "bandwidth-icon b_avg",
        poor : "bandwidth-icon poor"
    };

    if (document.getElementsByTagName("body")[0].addEventListener) {
        document.getElementsByTagName("body")[0].addEventListener("updateBandwidthStatus", function (event) {

            document.getElementsByClassName("bandwidth-text")[0].innerHTML = event.title;
            document.getElementsByClassName("bandwidth-text")[0].className = "bandwidth-text";

            if (event.value == bandwidthObject.bandwidth_state_description.good.value) {
                document.getElementsByClassName("bandwidth-icon")[0].className = classes[SIMS.SharedData.AssignmentVersion].good;
            } else if (event.value == bandwidthObject.bandwidth_state_description.u_avg.value) {
                    document.getElementsByClassName("bandwidth-icon")[0].className = classes[SIMS.SharedData.AssignmentVersion].upperAverage;
            } else if (event.value == bandwidthObject.bandwidth_state_description.avg.value) {
                    document.getElementsByClassName("bandwidth-icon")[0].className = classes[SIMS.SharedData.AssignmentVersion].average;
            } else if (event.value == bandwidthObject.bandwidth_state_description.b_avg.value) {
                    document.getElementsByClassName("bandwidth-icon")[0].className = classes[SIMS.SharedData.AssignmentVersion].belowAverage;
            } else if (event.value == bandwidthObject.bandwidth_state_description.poor.value) {
                    document.getElementsByClassName("bandwidth-icon")[0].className = classes[SIMS.SharedData.AssignmentVersion].poor;
            }
        }, false);
    }
}

function StartSIM5LazyLoading() {
    LazyLoad.js([globalFilePath],
        function () { LoadLazyCSS(); }
        );
}

function ReadLaunchParams() {
    //APA - This is for replacing the EXAMID.. Now a hardcoded exam id is not being passed
    //instead, these parameters will be passed to LMS to retrieve the ExamDetails
    var src = window.location.search.replace("?", "");
    var prmarr = src.split("&");
    var params = {};

    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    //test line 1
    //test line 2
    if (params.returnURL != null) {
        //APA - Special Handling for ReturnURL
        //replace [[QM]] with ? and [[AMP]] with &
        //This logic is set so that the parameters are NOT lost in the way.. 
        //as param is being passed along with other standard URL parameters

        params.returnURL = decodeURIComponent(params.returnURL);
        params.returnURL = params.returnURL.replace(/\[\[QM\]\]/g, "?");
        params.returnURL = params.returnURL.replace(/\[\[AMP\]\]/g, "&");
        params.returnURL = params.returnURL.replace(/\[\[EQ\]\]/g, "=");
        params.lmsMode = 1;
    }
    else {
        params.resultID = 0;
        params.nonce = Math.floor((Math.random() * 2145780) + 1);
        params.launchCode = 0;
        if(params.launchMode === undefined){
            params.launchMode = 0;
        }
        params.userid = 0;
        params.username = 0;
        params.lmsserviceurl = "NotDefined";
        params.lmsMode = 0;
        params.lmsaliveurl = "";
        //resLinkID is chosen as the param used for passing the TaskRepo XML name..
        //Hence, this change... I.e. set as zero ONLY IF resLinkID==NULL
        if (params.resLinkID == null) {
            params.resLinkID = 0;
        }
        params.returnURL = "SIMSReport.html";
        params.title = "";
    }

    params.simsRandCall = Math.floor((Math.random() * 2145780) + 1);
    params.simDefaultExamId = 1;

    //Code for launching SIM5 Taks from Baloo
    if (params.balooPreview && params.balooPreview === "true") {
        params.balooPreview = true;
    }
    else {
        params.balooPreview = false;
    }

    if (params.lmsaliveurl != null && params.lmsaliveurl != "") {
        params.sendAliveCall = true;
        if (params.lmsaliveurl.indexOf("?") != -1) {
            params.finalLmsAliveUrl = params.lmsaliveurl + "&simalive=";
        }
        else {
            params.finalLmsAliveUrl = params.lmsaliveurl + "?simalive=";
        }
    }
    else {
        params.sendAliveCall = false;
    }

    SIMS.Objects.LaunchParams = params;
}

function ReadExamAndAppDetails(examDetailsJson) {
    SIMS.Objects.ExamDetails = examDetailsJson;
    if (!SIMS.Objects.ExamDetails.ERROR) 
    {   
        var taskList = SIMS.Objects.ExamDetails.config.tasklist;
        var taskArr = getArray(taskList.task);
        SetGlobalAppID(taskArr);
        CheckForAssignmentValidity(taskArr);
    }
    else
    {   
        //Proceeding with default parameters, assuming error handling will be done in exam manager.
        SIMS.SharedData.AssignmentVersion = SIMS.SharedData.AssignmentVersions.OFFICE2016;
        globalFilePath = "app/global2016.js" + SIMS.Core.PreloadData.RequestSuffix;

    }
}

function AppLazyInit() {
    ShowLoadingAndBandwidthStatus();

    ReadLaunchParams();

    //Below commented code is moved to AppLazyInit2 function.
    // ReadExamAndAppDetails(examDetailsJson);

    // StartSIM5LazyLoading();

    // if(SIMS.SharedData.AssignmentVersion == SIMS.SharedData.AssignmentVersions.OFFICE2016){
    //     document.getElementsByClassName("loader-container")[0].className="loader-container loader-container16-show";
    // }
    // else{
    //     document.getElementsByClassName("loader-container")[0].className="loader-container loader-container13-show";
    // }

    GetExamDetailsAsync(SIMS.Objects.LaunchParams, true, AppLazyInit2);
}

function AppLazyInit2(examDetailsJson){
    ReadExamAndAppDetails(examDetailsJson);
    StartSIM5LazyLoading();

    if(SIMS.SharedData.AssignmentVersion == SIMS.SharedData.AssignmentVersions.OFFICE2016){
        document.getElementsByClassName("loader-container")[0].className="loader-container loader-container16-show";
    }
    else{
        document.getElementsByClassName("loader-container")[0].className="loader-container loader-container13-show";
    }
}


//Function to lazy load the practice javascript files
function LoadLazyPracticeJS(callback, examManagerObj) {
    LazyLoad.js(SIMS.Core.PreloadData.FileList.PRACTICE,
        function () { callback(examManagerObj); }
        );
}

//Lazy load practice tool Resources
function LoadLazyPracticeToolResources(callback, examManagerObj) {
    LazyLoad.js([
        "SIM5-Investigations/Practice Creator/practiceCreator.js",
        "SIM5-Investigations/Practice Creator/js/bootstrap.js"
        ],
        function () { LazyLoadPracticeToolCSS(callback, examManagerObj); }
        );
}

function LazyLoadPracticeToolCSS(callback, examManagerObj) {
    LazyLoad.css([       
        "SIM5-Investigations/Practice Creator/bootstrap-custom.css"],
        function () { callback(examManagerObj) }
        );
}

function onBodyLoad() {
    var browserSupported = checkIfBrowserSupported();
    var isRelaunchUrl = checkIfRelaunchUrl();

    if (browserSupported == true || isRelaunchUrl) {

        AppLazyInit();

    } else {
        document.getElementById("NoSupportContainer").style.display='block';
        document.getElementById("MainFrame").style.display='none';
    }
}

function checkIfBrowserSupported(){
   
    var isBrowserSupported = false;

    if((bowser.msie && bowser.version >= supportedVersions.msie) ||
        (bowser.chrome && bowser.version >= supportedVersions.chrome) ||
        (bowser.safari && bowser.version >= supportedVersions.safari) ||
        ((bowser.mozilla||bowser.firefox) && bowser.version >= supportedVersions.mozilla) ||
        (bowser.msedge && bowser.version >= supportedVersions.msedge)
        ){
        isBrowserSupported = true;
    }

    return isBrowserSupported;

};

function checkIfRelaunchUrl() {
    var urlLowerCase = window.location.toString().toLowerCase();
    return urlLowerCase.indexOf("?relaunchkey=") !== -1 || urlLowerCase.indexOf("&relaunchkey=") !== -1;
};

function launchSIMS(){
    document.getElementById("NoSupportContainer").style.display='none';
    document.getElementById("MainFrame").style.display='block';
    AppLazyInit();
};

var GetAllValuesOfAnAttribute = function (compID, attrName) {
    var resultsArray = [];
    if (SIMS.Objects.ExamManager.SIM != null) {
        if (SIMS.Objects.ExamManager.SIM.taskJSON != null) {
            try {
                var statesArray = getArray(SIMS.Objects.ExamManager.SIM.taskJSON.task.states.state);
                var statesCount = statesArray.length;
                for (var nStateLoop = 0; nStateLoop < statesCount; nStateLoop++) {

                    var compAr = getArray(statesArray[nStateLoop].comps.comp);

                    var requiredComp = compAr.findSingle("@id", compID);
                    if (requiredComp != null) {

                        var attrArray = null;
                        var attrLen = 0;
                        if (requiredComp.initialattrs != null && requiredComp.initialattrs.attr != null) {
                            attrArray = getArray(requiredComp.initialattrs.attr);
                            attrLen = attrArray.length;
                            for (var attrLoop = 0; attrLoop < attrLen; attrLoop++) {
                                if (attrArray[attrLoop]["@name"] == attrName) {
                                    resultsArray.push(attrArray[attrLoop]["@value"]);
                                }
                            }
                        }

                        if (requiredComp.initialattributesets != null && requiredComp.initialattributesets.attributeset != null) {
                            var attributesetArray = getArray(requiredComp.initialattributesets.attributeset);
                            var attributesetLength = attributesetArray.length;
                            var attrArray = null;
                            var attrLen = 0;
                            for (var attributesetLoop = 0; attributesetLoop < attributesetLength; attributesetLoop++) {
                                attrArray = getArray(attributesetArray[attributesetLoop].attr);
                                attrLen = attrArray.length;
                                for (var attrLoop = 0; attrLoop < attrLen; attrLoop++) {
                                    if (attrArray[attrLoop]["@name"] == attrName) {                                        
                                        resultsArray.push(attrArray[attrLoop]["@value"]);                                        
                                    }
                                }
                            }
                        }

                    }
                }
            }
            catch (ex) {
                resultsArray = [];
            }
        }
    }
    return jQuery.unique(resultsArray);
};


var ServiceURL = "ServerCode/SIM5Service.ashx" + SIMS.Core.PreloadData.RequestSuffix;
var ServerURL = "";
var RelativePath = "";
    
function AjaxCall(URL, GetPost) {
    var responseStr = "";
    var client;
    if (XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        client = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        client = new ActiveXObject("Microsoft.XMLHTTP");
    }
    client.open(GetPost, URL, false);
    client.send();
    return client.responseText;
};

function AsyncAjaxCall (URL, GetPost, strname, SuccesCallbackFunction, ErrorCallbackFunction) {
    var client;
    if (XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        client = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        client = new ActiveXObject("Microsoft.XMLHTTP");
    }

    client.onreadystatechange = function () {
        if(client.readyState == 4){
            if (client.status == 200) {
                SuccesCallbackFunction(client.response, strname);
            }
            else if(client.status == 500 && ErrorCallbackFunction!=null){                
                ErrorCallbackFunction(client.response, strname);
            }
        }
    };

    client.open(GetPost, URL, true);

    client.send();
};

function getArray(data) {
    if (data.length == undefined){ data = [data]; }
    return data;
};

function GetExamDetails(params, bJSON) {
    var paramsString = "&resLinkID=" + params.resLinkID + "&resultID=" + params.resultID + "&nonce=" + params.nonce + "&launchCode=" + params.launchCode + "&launchMode=" + params.launchMode + "&userid=" + params.userid + "&username=" + params.username + "&simDefaultExamId=" + params.simDefaultExamId + "&lmsserviceurl=" + params.lmsserviceurl + "&title=" + params.title + "&simsRandCall=" + params.simsRandCall;
    var url = ServerURL + RelativePath + ServiceURL + "&Method=GetExamDetails" + paramsString;
    var strRet = AjaxCall(url, "GET");
    return bJSON === true ? JSON.parse(strRet) : strRet;
};

function GetExamDetailsAsync(params, bJSON, SuccesCallbackFunction) {
    var paramsString = "&resLinkID=" + params.resLinkID + "&resultID=" + params.resultID + "&nonce=" + params.nonce + "&launchCode=" + params.launchCode + "&launchMode=" + params.launchMode + "&userid=" + params.userid + "&username=" + params.username + "&simDefaultExamId=" + params.simDefaultExamId + "&lmsserviceurl=" + params.lmsserviceurl + "&title=" + params.title + "&simsRandCall=" + params.simsRandCall;
    var url = ServerURL + RelativePath + ServiceURL + "&Method=GetExamDetails" + paramsString;
    var examDetailsReceieved = function(strRet){
        strRet = bJSON === true ? JSON.parse(strRet) : strRet;
        SuccesCallbackFunction(strRet);
    };
    AsyncAjaxCall(url, "GET", "ExamDetails", examDetailsReceieved, examDetailsReceieved);
};

function CheckForAssignmentValidity(taskArr){
    for (var i = 0; i < taskArr.length; i++) 
    {
        if(taskArr[i].questionType==="SIM")
        {
            var appID = taskArr[i].appID!=null?taskArr[i].appID:SIMS.SharedData.AppIDs.NOTSPECIFIED;
            if(appID!==SIMS.SharedData.AppIDs.WINDOWS10 && appID!==SIMS.SharedData.AppIDs.NOTSPECIFIED)  //Enum required for appid.
            {   
                if(SIMS.SharedData.AppIdDictionary[appID].AssignmentVersion!==SIMS.SharedData.AssignmentVersion)
                {   
                    //Different handling or rerouting can be done on the basis of this assignment version in SIMPlayer or ExamManager.
                    SIMS.SharedData.AssignmentVersion = SIMS.SharedData.AssignmentVersions.OFFICE2016;
                    globalFilePath = "app/global2016.js" + SIMS.Core.PreloadData.RequestSuffix;
                    return;
                }
            }
        }
    }
};

function SetGlobalAppID(taskArr){
    for(var i in taskArr)
    {
        if(taskArr[i].questionType==="SIM")
        {
            var appID = taskArr[i].appID!=null?taskArr[i].appID:SIMS.SharedData.AppIDs.NOTSPECIFIED;

            if(appID!==SIMS.SharedData.AppIDs.WINDOWS10 && appID!==SIMS.SharedData.AppIDs.NOTSPECIFIED) 
            {   
                SIMS.SharedData.AssignmentVersion = SIMS.SharedData.AppIdDictionary[appID].AssignmentVersion;

                switch(SIMS.SharedData.AssignmentVersion)
                {
                    case SIMS.SharedData.AssignmentVersions.OFFICE2016:
                       globalFilePath = "app/global2016.js" + SIMS.Core.PreloadData.RequestSuffix;
                       break;

                    default:
                       globalFilePath = "app/global2013.js" + SIMS.Core.PreloadData.RequestSuffix;
                       break;  
                }
                return;  //returning after setting the assignment version once.
            }
        }
    }

    /*** load 2016 files in the case where Windows 10 tasks only are being launched in practice direct mode ***/
    /*** It is assumed dat assignment will be launched as 2013 application, if windows 10 tasks and 2013 tasks coexists in practice direct mode ***/
    if(SIMS.Objects.LaunchParams.launchMode === "practicedirect") {
        SIMS.SharedData.AssignmentVersion = SIMS.SharedData.AssignmentVersions.OFFICE2016;
        globalFilePath = "app/global2016.js" + SIMS.Core.PreloadData.RequestSuffix;
    }
    else {
        //setting default assignment version as appids are not set in task repo for 2013 tasks.
        SIMS.SharedData.AssignmentVersion = SIMS.SharedData.AssignmentVersions.DEFAULT;
        globalFilePath = "app/global2013.js" + SIMS.Core.PreloadData.RequestSuffix;
    }
};

function LoadLazyCSS() {

    LazyLoad.css(SIMS.Core.PreloadData.FileList.CSS,
        function () { LoadLazyJS(); }
        );
};

function LoadLazyJS() {
    LazyLoad.js(SIMS.Core.PreloadData.FileList.JS,
        function () { LoadInternalCSS(); }
        );
};

function LoadInternalCSS() {
    var client;

    if (XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari        
        client = new XMLHttpRequest();
    }
    else {// code for IE6, IE5        
        client = new ActiveXObject("Microsoft.XMLHTTP");
    }

    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            $("body").append("<style class='SIMCursors'>" + client.response + "</style>");
            AppInit();
        }
    };

    client.open("GET", SIMS.Core.PreloadData.FileList.CURSOR_FILE, true);
    client.send();
};

function GetCompVersion(appID) {
    if(appID===SIMS.SharedData.AppIDs.NOTSPECIFIED)
    {
        return "";
    }
    else
    {
        return SIMS.SharedData.AssignmentVersion;
    }
};

// if (window.console != null) {
//     window.console["log"] = function () { };
// }
