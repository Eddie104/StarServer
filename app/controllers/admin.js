"use strict";

const userModel      = require('../models/userModel');
const userController = require('./user');
const jsonUtil       = require('../utils/jsonUtil');
const encryptionUtil = require('../utils/encryptionUtil');
const dateUtil       = require('../utils/dateUtil');
const numberUtil     = require('../utils/numberUtil');

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
	const accountList = await userModel.find(condition, { _id:-1, id: 1, account: 1, registerDate: 1, source: 1 }).skip((page - 1) * count).limit(count);
	const total = await userModel.count(condition);
	let results = accountList.map((accountData, i) => {
		return {
			id: accountData.id,
			account: accountData.account,
			registerDate: dateUtil.toTimestamp(accountData.registerDate),
			source: accountData.source
		};
	});
	ctx.body = jsonUtil.createAPI(1, { results, total });
}