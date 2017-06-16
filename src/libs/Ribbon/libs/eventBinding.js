$.fn.noRepeatBind = function (eventName, globalScopeCallBackFunction) {
	this.unbind(eventName, globalScopeCallBackFunction);
	this.bind(eventName, globalScopeCallBackFunction);
};
$.fn.noRepeatBindWithArgs = function (eventName, globalScopeCallBackFunction, handlerArg) {
	
	this.unbind(eventName, globalScopeCallBackFunction);
	this.bind(eventName, handlerArg, globalScopeCallBackFunction);
	
};