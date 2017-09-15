"use strict";

let utils          = require('utility');
let qiniuUtil      = require('./qiniuUtil');
let dateUtil       = require('./dateUtil');
let lvUtil         = require('./lvUtil');
let numberUtil     = require('./numberUtil');
let encryptionUtil = require('./encryptionUtil');

exports.myDecodeURIComponent = function (str) {
	return decodeURIComponent(str).replace(/`/g, "%");
	// return decodeURIComponent(escape(str));
};

exports.createAPI = function (status, jsonData) {
	status = utils.toSafeNumber(status);
	return (jsonData || jsonData === 0) ? {
		status: status,
		data: jsonData
	} : {
		status: status
	};
};
// ---------------user---------------------
// function _user2Json(user) {
// 	const result = {
// 		id: user.id,
// 		name: user.name,		
// 		adminType: user.adminType
// 	};
// 	// 头像
// 	if (user.headName) { result.headName = user.headName.startsWith('http') ? user.headName : qiniuUtil.createDownloadUrl(1, user.headName); }
// 	if (user.phone) { result.phone = user.phone; }
// 	if (user.source) { result.source = user.source; }
// 	if (user.mail) { result.mail = user.mail; }
// 	if (user.remarks) { result.remarks = user.remarks; }
// 	if (user.modifyPwdCount) { result.modifyPwdCount = user.modifyPwdCount; }
// 	// if (user.birthday) { result.birthday = dateUtil.toTimestamp(user.birthday); }
// 	// if (user.registerDate) { result.registerDate = dateUtil.toTimestamp(user.registerDate); }
// 	if (user.accountID) { result.accountID = user.accountID; }
// 	if (user.account) { result.account = user.account; }
// 	// 环信的密码
// 	if (user.password) {
// 		if (user.id === 1000) {
// 			result.emPwd = 'hongjie104';
// 		} else {
// 			result.emPwd = encryptionUtil.encryptionPassword(user.password);
// 		}
// 	}
// 	if (user.avatar) { result.avatar = user.avatar; }
// 	if (user.avatarBoy) { result.avatarBoy = user.avatarBoy; }
// 	if (user.signature) { result.signature = user.signature; }
// 	if (typeof(user.modifyNameCount) !== "undefined") { result.modifyNameCount = user.modifyNameCount; }
// 	if (user.following) { result.followingCount = user.following.length; }
// 	if (user.followed) { result.followedCount = user.followed.length; }
// 	if (user.followed && user.following) {
// 		result.friendCount = 0;
// 		let a, b;
// 		if (result.followedCount > result.followingCount) {
// 			a = user.followed;
// 			b = user.following;
// 		} else {
// 			b = user.followed;
// 			a = user.following;
// 		}
// 		for (let i = 0; i < a.length; i++) {
// 			if (b.indexOf(a[i]) !== -1) {
// 				result.friendCount++;
// 			}
// 		}
// 	}
// 	result.gender = user.gender || 0;
// 	result.tuMoney = user.tuMoney || 0;
// 	// 已购买的衣服
// 	if (user.avatarOwned) {
// 		result.avatarOwned = user.avatarOwned
// 	}
// 	return result;
// }

// exports.user2Json = function (user) {
// 	return _user2Json(user);
// };

// exports.users2Json = function (users) {
// 	const result = [];
// 	for (let i = 0; i < users.length; i++) {
// 		result[i] = _user2Json(users[i]);
// 	}
// 	return result;
// };