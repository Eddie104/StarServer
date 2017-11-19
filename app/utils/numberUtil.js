"use strict";

exports.toInt = function (val) {
	val = parseInt(val);
	if(isNaN(val)) return 0;
	return val;
};

exports.toFloat = function (val) {
	val = parseFloat(val);
	if(isNaN(val)) return 0;
	return val;
};

exports.from10To36 = function (val) {
	return val.toString(36);
}

exports.from36To10 = function (val) {
	return parseInt(val, 36)
}