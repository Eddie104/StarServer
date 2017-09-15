"use strict";

let utils  = require('utility');
let config = require('../../config');

exports.encryptionPassword = function (password) {
	return utils.md5(password + config.appKey);
};