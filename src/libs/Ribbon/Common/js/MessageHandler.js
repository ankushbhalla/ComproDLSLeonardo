function MESSAGE_HANDLER() {
    if (MESSAGE_HANDLER._MsgHandler) {
        return MESSAGE_HANDLER._MsgHandler;
    }
    else {
        this._listeners = {};
        this._classObj = {};
        this.RegisterMessage = function (event, ClsObj, listener) {
            if (this._listeners[event] == undefined) {
                this._listeners[event] = listener;
                this._classObj[event] = ClsObj;
            }
            else {
                alert("Duplicate event registration request. Note that Event [" + event + "] is already defined. ");
            }
        }

        this.SendMessage = function (event) {
            if (this._listeners[event] != undefined) {
                var func = this._listeners[event];
                var clsObj = this._classObj[event];
                if (func) {
                    func.apply(clsObj);
                }
            }
            else {
                alert("Failed to SEND_MESSAGE. Event [" + event + "] is not defined.");
            }
        }

        this.SendMessageWithParam = function (event, paramData) {
            if (this._listeners[event] != undefined) {
                var func = this._listeners[event];
                var clsObj = this._classObj[event];
                if (func) {
                    func.apply(clsObj, [paramData]);
                }
            }
            else {
                alert("Failed to SEND_MESSAGE. Event [" + event + "] is not defined.");
            }
        }

        MESSAGE_HANDLER._MsgHandler = this;
    }
}

function REGISTER_MSG(event, clsObj, listener) {
    var msgHandler = new MESSAGE_HANDLER();
    msgHandler.RegisterMessage(event, clsObj, listener);
}

function SEND_MESSAGE(event, paramData) {
    var msgHandler = new MESSAGE_HANDLER();

    if (paramData == undefined) {
        msgHandler.SendMessage(event);
    }
    else {
        msgHandler.SendMessageWithParam(event, paramData);
    }
}

