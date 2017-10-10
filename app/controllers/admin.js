"use strict";

const userModel         = require('../models/userModel');
const levelModel        = require('../models/levelModel');
const dollarRecordModel = require('../models/dollarRecordModel');
const userController    = require('./user');
const jsonUtil          = require('../utils/jsonUtil');
const encryptionUtil    = require('../utils/encryptionUtil');
const dateUtil          = require('../utils/dateUtil');
const numberUtil        = require('../utils/numberUtil');

// exports.register = async function (ctx) {
	
// };

exports.login = async function (ctx, next) {
	let { account, password } = ctx.params;
	account = jsonUtil.myDecodeURIComponent(account);
	password = jsonUtil.myDecodeURIComponent(password);
	let me = await userModel.findOne({account}, {_id: -1, password: 1, id: 1, adminType: 1});
	if (me) {
		if (me.password === encryptionUtil.encryptionPassword(password)) {
			if (me.adminType > 0) {
				ctx.body = jsonUtil.createAPI(1, {
					account,
					id: me.id,
					adminType: me.adminType
				});
			} else {
				ctx.body = jsonUtil.createAPI(-3, '管理权限不足，禁止登录！');
			}
		} else {
			ctx.body = jsonUtil.createAPI(-2, `密码错误:${password}`);
		}
	} else {
		ctx.body = jsonUtil.createAPI(-1, `没有找到账号:${account}`);
	}
};

exports.getAccountData = async function (ctx, next) {
	let { source, page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const condition = {};
	if (source) {
		if (source === 'web' || source === 'android') {
			condition.source = source;
		}
	}
	const accountList = await userModel.find(condition, {
		_id: -1,
		id: 1,
		account: 1,
		registerDate: 1,
		source: 1,
		lastLoginDate: 1,
		name: 1,
		maxScore: 1,
		maxLevel: 1,
		dollar: 1,
		diamonds: 1,
		items: 1,
		payMoney: 1
	}).skip((page - 1) * count).limit(count);
	const total = await userModel.count(condition);
	let results = accountList.map((accountData, i) => {
		return {
			id: accountData.id,
			account: accountData.account,
			source: accountData.source,
			name: accountData.name,
			maxScore: accountData.maxScore,
			maxLevel: accountData.maxLevel,
			dollar: accountData.dollar,
			diamonds: accountData.diamonds,
			items: accountData.items,
			payMoney: accountData.payMoney,
			registerDate: dateUtil.toTimestamp(accountData.registerDate),
			lastLoginDate: dateUtil.toTimestamp(accountData.lastLoginDate)
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getUserData = async function (ctx) {
	let { source, page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const condition = {};
	if (source) {
		if (source === 'web' || source === 'android') {
			condition.source = source;
		}
	}
	const accountList = await userModel.find(condition, {
		_id: -1,
		id: 1,
		registerDate: 1,
		source: 1,
		registerIP: 1,
		name: 1,
		deviceMode: 1,
		deviceID: 1,
		deviceOperator: 1,
		phone: 1,
		dollar: 1,
		diamonds: 1,
		items: 1,
		payMoney: 1
	}).skip((page - 1) * count).limit(count);
	const total = await userModel.count(condition);
	let results = accountList.map((accountData, i) => {
		return {
			id: accountData.id,
			name: accountData.name,
			registerDate: dateUtil.toTimestamp(accountData.registerDate),
			registerIP: accountData.registerIP,
			deviceMode: accountData.deviceMode,
			deviceID: accountData.deviceID,
			deviceOperator: accountData.deviceOperator,
			phone: accountData.phone,
			dollar: accountData.dollar,
			diamonds: accountData.diamonds,
			items: accountData.items,
			payMoney: accountData.payMoney,
			source: accountData.source,
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getUserLoginData = async function (ctx) {
	let { source, page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const condition = {};
	if (source) {
		if (source === 'web' || source === 'android') {
			condition.source = source;
		}
	}
	const accountList = await userModel.find(condition, {
		_id: -1,
		id: 1,
		source: 1,
		lastLoginDate: 1,
		registerIP: 1,
		name: 1,
		deviceMode: 1,
		deviceID: 1,
		deviceOperator: 1,
		phone: 1,
	}).skip((page - 1) * count).limit(count);
	const total = await userModel.count(condition);
	let results = accountList.map((accountData, i) => {
		return {
			id: accountData.id,
			name: accountData.name,
			lastLoginDate: dateUtil.toTimestamp(accountData.lastLoginDate),
			registerIP: accountData.registerIP,
			deviceMode: accountData.deviceMode,
			deviceID: accountData.deviceID,
			deviceOperator: accountData.deviceOperator,
			phone: accountData.phone,
			source: accountData.source,
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getUserLevelData = async function (ctx) {
	let { uid, page, count } = ctx.params;
	uid = numberUtil.toInt(uid);
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const levelList = await levelModel.find({uid}).skip((page - 1) * count).limit(count);
	const total = await levelModel.count({uid});
	let results = levelList.map((levelData, i) => {
		return {
			numLevel: levelData.numLevel,
			startDate: dateUtil.toTimestamp(levelData.startDate),
			endDate: dateUtil.toTimestamp(levelData.endDate),
			startItems: levelData.startItems,
			endItems: levelData.endItems,
			startDollar: levelData.startDollar,
			endDollar: levelData.endDollar,
			awards: levelData.awards
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}