"use strict";

/**
 * 去掉数组中的重复项
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
exports.unique = function (arr) {
	const result = [], hash = {};
	for (let i = 0, elem; (elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
};

exports.getItemFromArray = function (arr, key, val) {
	for (let i = 0; i < arr.length; i++) {
		if(arr[i][key] === val) return arr[i];
	}
	return null;
};