'use strict';
function SIMFollowupState(stateId, attributeSet, originTaskNo, originStateNo) {
    this.StateId = stateId;
    this.AttributeSet = attributeSet;
    this.Result = false;
    this.IsEventPresent = false;
    this.OriginTaskNo = originTaskNo;
    this.OriginStateNo = originStateNo;
}

function CompMessageArgs(compid, messageid, messageName, messageDetails) {

    this.CompId = compid;
    this.MessageId = messageid;
    this.MessageName = messageName;    
    this.MessageDetails = messageDetails;
}

function SIMEventArgs(compid, eventid, type, desc, eventDetails, compName, bSafe) {

    this._compID = compid;
    this._eventId = eventid;
    this._type = type;
    this._desc = desc;
    this._eventDetails = eventDetails;
    this._compName = compName;
    this._isSafe = bSafe;
}

function TrackerEventsArgs(trackerid, followupaction, eventid, type, desc) {

    this._trackerID = trackerid;
    this._followupaction = followupaction;
    this._eventId = eventid;
    this._type = type;
    this._desc = desc;
}

function TaskInfo(taskInfo, assignmentMode) {
    if (taskInfo.id != undefined && taskInfo["@id"] == undefined) {
        taskInfo["@id"] = taskInfo.id;
    }
    this._id = taskInfo["@id"];
    this._appID = taskInfo.appID;
    this._Name = taskInfo.description;
    this._text = taskInfo.text;
	this._launchStepID = taskInfo.stepID;
    this._ActionDictionary = [];
    this._No = taskInfo.questionIndex;
    this._lmsQnId = taskInfo.lmsQnID != null ? taskInfo.lmsQnID.trim() : "";
    this.questionPoints = taskInfo.questionPoints != null ? taskInfo.questionPoints : "0";

    if (taskInfo.questionType != null) {
        switch (taskInfo.questionType) {

            case SIMS.SharedData.QuestionType.NATIVE_TRUEFALSE:
            case SIMS.SharedData.QuestionType.NATIVE_MATCHING:
            case SIMS.SharedData.QuestionType.NATIVE_RANKING:
            case SIMS.SharedData.QuestionType.NATIVE_FIB:
            case SIMS.SharedData.QuestionType.NATIVE_MC:
            case SIMS.SharedData.QuestionType.NATIVE_MR:
                this.questionType = taskInfo.questionType;
                this.questionXml = taskInfo.questionXml ? taskInfo.questionXml.trim() : "";
                break;
            case SIMS.SharedData.QuestionType.SIM:
            default:
                this.questionType = SIMS.SharedData.QuestionType.SIM;
                this.questionXml = "";
                break;
        }
    }
    else {
        this.questionType = SIMS.SharedData.QuestionType.SIM;
        this.questionXml = "";
    }

	
	
	this._userResponse = "";
   
    if (taskInfo.result != null) {
        //this._Status = taskInfo.result.questionAttemptStatus != null ? taskInfo.result.questionAttemptStatus : SIMS.SharedData.QuestionStatus.NOTATTEMPTED;

        if (taskInfo.result.questionAttemptStatus != null) {
            switch (taskInfo.result.questionAttemptStatus) {
                case SIMS.SharedData.QuestionStatus.NOTGRADED:
                case SIMS.SharedData.QuestionStatus.CORRECT:
                case SIMS.SharedData.QuestionStatus.INCORRECT:
                    if (this.questionType === SIMS.SharedData.QuestionType.SIM) {
                        this._Status = taskInfo.result.questionAttemptStatus;
                    }
                    else {
                        this._Status = SIMS.SharedData.QuestionStatus.NOTGRADED;
                    }
                    break;

                case SIMS.SharedData.QuestionStatus.INCOMPLETE:
                    this._Status = taskInfo.result.questionAttemptStatus;
                    break;
                default:
                    this._Status = SIMS.SharedData.QuestionStatus.NOTATTEMPTED;
                    break;
            }
        }
        else {
            this._Status = SIMS.SharedData.QuestionStatus.NOTATTEMPTED;
        }
        this._timeConsumed = taskInfo.result.timeConsumedInSec != null ? parseInt(taskInfo.result.timeConsumedInSec) : -1;
        this._attemptsLeft = taskInfo.result.remainingAttempts != null ? parseInt(taskInfo.result.remainingAttempts) : -1;
    }
    else {
        this._Status = SIMS.SharedData.QuestionStatus.NOTATTEMPTED;
        this._timeConsumed = -1;
        this._attemptsLeft = -1;
    }

    if (assignmentMode == SIMS.SharedData.AssignmentMode.TRAINING) {
        this.LearningAidViewed = { Practice: 0, Read: 0, Watch: 0};
    }
}

function ActionsInfo(eventArgs, stepStatus) {
    if (eventArgs._desc != null && eventArgs._desc != "" && eventArgs._desc != undefined) {
        this._txt = eventArgs._desc;
    }
    else {
        this._txt = eventArgs._eventDetails.EventDesc;
    }
    this._StepStatus = stepStatus;
}

function ReportInfo(examDetails) {
    if (examDetails != null) {
        this.userid = examDetails.config.examsettings.userid;
        this.examid = examDetails.config.examsettings.examid;
        this.username = examDetails.config.examsettings.username;
        this.totaltime = examDetails.config.examsettings.totaltime;
        this.returnData = examDetails.config.examsettings.returnData;
        this.assessmentstatus = SIMS.Core.AssessmentStatus.InProgress;
        this.StartFromLMSQuestionID = -1;
        this.submittedtime = undefined;
        this.grade = undefined;
        this.correctattempts = undefined;
        this.incorrectAttemptPerTask = examDetails.config.examsettings.incorrectAttemptPerTask;        
        this.TaskDictionary = new jsDictionary();
    }
    else {
        this.userid = "";
        this.examid = "";
        this.username = "";
        this.totaltime = -1;
        this.returnData = null;
        this.assessmentstatus = SIMS.Core.AssessmentStatus.InProgress;
        this.StartFromLMSQuestionID = -1;
        this.submittedtime = undefined;
        this.grade = undefined;
        this.correctattempts = undefined;
        this.incorrectAttemptPerTask = -1;        
        this.TaskDictionary = new jsDictionary();
    }
}


function SIMComponent(compJS, compHTML, className) {

    this._compJS = compJS;
    this._compHTML = compHTML;
    this._className = className;
}


function ReportParams(jsonString, taskid, type) {

    this.jsonstring = jsonString;
    this.taskid = taskid;
    this.type = type;
}

function CompInfo(compname, id, comptype) {
    this.compName = compname;
    this.className = compname;
    this["@id"] = id;
    this["@name"] = compname;
    //this["@className"] = compname;
    this["@type"] = comptype;
    this["@mode"] = "new";
    this.compType = comptype;
}

function ComponentCachingData(compName, id, baseComp, lastUsed) {
    this.compName = compName;
    this.prevId = id;
    this.baseComp = baseComp;
    this.lastUsed = lastUsed;    
}

function SIMSTaskRelaunchData(key, taskSequence, activeLmsQnId, attemptsLeft) {
    this.key = key;
    this.taskSequence = taskSequence;
    this.activeLmsQnId = activeLmsQnId;
    this.attemptsLeft = attemptsLeft;

    this.parseJson = function (jsonStr) {
        var bSuccess = false, obj;

        try {
            obj = JSON.parse(jsonStr);    //excepted type - SIMSTaskRelaunchData
        }
        catch (err) {
            bSuccess = false;
            return bSuccess;
        }

        if (obj.key && obj.taskSequence && obj.activeLmsQnId && (obj.attemptsLeft!==undefined)) {
            bSuccess = true;

            this.key = obj.key;
            this.taskSequence = obj.taskSequence;
            this.activeLmsQnId = obj.activeLmsQnId;
            this.attemptsLeft = obj.attemptsLeft;
        }

        return bSuccess;
    };
}

function Win10TaskbarAppStruct(CompID, AppName, Title, TaskbarImage, IconPath, DesktopId) {
    this.CompID = CompID || -1;
    this.Title = Title || "";
    this.TaskbarImage = TaskbarImage || { imgPath: "" };
    this.IconPath = IconPath || "";
    this.AppName = AppName || "";
    this.DesktopId = DesktopId || "";
}