"use strict";

const userModel           = require('../models/userModel');
const levelModel          = require('../models/levelModel');
const dollarRecordModel   = require('../models/dollarRecordModel');
const itemRecordModel     = require('../models/itemRecordModel');
const diamondsRecordModel = require('../models/diamondsRecordModel');
const payModel            = require('../models/payModel');
const activityNoticeModel = require('../models/activityNoticeModel');
const dollarCodeModel     = require('../models/dollarCodeModel');
const IdentityCounter     = require('mongoose').model('IdentityCounter');
const userController      = require('./user');
const jsonUtil            = require('../utils/jsonUtil');
const encryptionUtil      = require('../utils/encryptionUtil');
const dateUtil            = require('../utils/dateUtil');
const numberUtil          = require('../utils/numberUtil');

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
			id: levelData.id,
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

exports.getLevelData = async function  (ctx) {
	let { page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const levelList = await levelModel.find({}).skip((page - 1) * count).limit(count);
	const total = await levelModel.count({});
	let results = levelList.map((levelData, i) => {
		return {
			id: levelData.id,
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

exports.getDollarRecord = async function (ctx) {
	let { uid, page, count } = ctx.params;
	uid = numberUtil.toInt(uid);
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const recordList = await dollarRecordModel.find({uid}).skip((page - 1) * count).limit(count);
	const total = await dollarRecordModel.count({uid});
	let results = recordList.map((record, i) => {
		return {
			id: record.id,
			uid: record.uid,
			date: dateUtil.toTimestamp(record.date),
			// 变化之前的数量
			oldVal: record.oldVal,
			// 变化之后的数量
			newVal: record.newVal,
			// 变化的原因
			reason: record.reason,
			// 变化原因的参数
			params: record.params
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getItemRecord = async function (ctx) {
	let { uid, page, count } = ctx.params;
	uid = numberUtil.toInt(uid);
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const recordList = await itemRecordModel.find({uid}).skip((page - 1) * count).limit(count);
	const total = await itemRecordModel.count({uid});
	let results = recordList.map((record, i) => {
		return {
			id: record.id,
			uid: record.uid,
			date: dateUtil.toTimestamp(record.date),
			// 变化之前的数量
			oldVal: record.oldVal,
			// 变化之后的数量
			newVal: record.newVal,
			// 变化的原因
			reason: record.reason,
			// 变化原因的参数
			params: record.params,
			// 关卡数
			level: record.level,
			// 道具类型
			type: record.type
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getDiamondsRecord = async function (ctx) {
	let { uid, page, count } = ctx.params;
	uid = numberUtil.toInt(uid);
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const recordList = await diamondsRecordModel.find({uid}).skip((page - 1) * count).limit(count);
	const total = await diamondsRecordModel.count({uid});
	let results = recordList.map((record, i) => {
		return {
			id: record.id,
			uid: record.uid,
			date: dateUtil.toTimestamp(record.date),
			// 变化之前的数量
			oldVal: record.oldVal,
			// 变化之后的数量
			newVal: record.newVal,
			// 变化的原因
			reason: record.reason,
			// 变化原因的参数
			params: record.params
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.getPay = async function (ctx) {
	let { uid, page, count } = ctx.params;
	uid = numberUtil.toInt(uid);
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const recordList = await payModel.find({uid}).skip((page - 1) * count).limit(count);
	const total = await payModel.count({uid});
	let results = recordList.map((record, i) => {
		return {
			id: record.id,
			uid: record.uid,
			date: dateUtil.toTimestamp(record.date),
			val: record.val,
			source: record.source
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

function createCode(nextID) {
	const chats = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	let code = nextID.toString(32) + "l";
	while (code.length < 6) {
		code += chats[Math.floor(Math.random() * 36)];
	}
	return code;
}

exports.createDollarCode = async function (ctx) {
	let { dollar, count } = ctx.params;
	dollar = numberUtil.toInt(dollar);
	count = numberUtil.toInt(count);
	let dollarCode = null;
	const now = dateUtil.now();
	const counter = await IdentityCounter.findOne({model: 'dollarCode', field: 'id'});
	let nextID = counter.count + 1;
	for (let i = 0; i < count; i++) {
		dollarCode = new dollarCodeModel({
			date: now,
			usedDate: now,
			code: createCode(nextID),
			dollar
		});
		await dollarCode.save();
		nextID += 1;
	}
	ctx.body = jsonUtil.createAPI(1);
}

exports.getDollarCode = async function (ctx) {
	let { page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const codeList = await dollarCodeModel.find({}).skip((page - 1) * count).limit(count);
	const total = await dollarCodeModel.count({});
	let results = codeList.map((record, i) => {
		return {
			id: record.id,
			date: dateUtil.toTimestamp(record.date),
			usedDate: dateUtil.toTimestamp(record.usedDate),
			code: record.code,
			dollar: record.dollar,
			isUsed: record.isUsed
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}

exports.createActivityNotice = async function (ctx) {
	let { content } = ctx.request.body;
	const notice = new activityNoticeModel({
		content,
		date: dateUtil.now()
	});
	await notice.save();
	ctx.body = jsonUtil.createAPI(1, { content });
}

exports.getActivityNotice = async function (ctx) {
	let { page, count } = ctx.params;
	page = numberUtil.toInt(page);
	count = numberUtil.toInt(count);
	const list = await activityNoticeModel.find({}).skip((page - 1) * count).limit(count);
	const total = await activityNoticeModel.count({});
	let results = list.map((record, i) => {
		return {
			id: record.id,
			date: dateUtil.toTimestamp(record.date),
			content: record.content
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}