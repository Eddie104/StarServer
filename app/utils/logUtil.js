"use strict";

let debugLog = null;
let infoLog = null;
let errorLog = null;

exports.debug = function (val) {
	if (!debugLog) {
		debugLog = require('../../app').logger('debug');
	}
	debugLog.info(val);
};

exports.info = function (val) {
	if (!infoLog) {
		infoLog = require('../../app').logger('info');
	}
	infoLog.info(val);
};

exports.error = function (val) {
	if (!errorLog) {
		errorLog = require('../../app').logger('error');
	}
	errorLog.info(val);
};