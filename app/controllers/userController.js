"use strict";

// const userModel          = require('../models/userModel');
const userModel             = require('../models/userModel');
// const easyUserController = require('./easy/userController');
const jsonUtil              = require('../utils/jsonUtil');
const dateUtil              = require('../utils/dateUtil');
const regUtil               = require('../utils/regUtil');
const encryptionUtil        = require('../utils/encryptionUtil');
const numberUtil            = require('../utils/numberUtil');
const config                = require('../../config');
const co                    = require('co');

// co(init);

// async function init() {
// 	let me = await userModel.findOne({account: '13801872620'});
// 	if (!me) {
// 		me = new userModel({
// 			account: '13801872620',
// 			password: encryptionUtil.encryptionPassword('hongjie104'),
// 			birthday: dateUtil.now(),
// 			registerDate: dateUtil.now(),
// 			phone: '13801872620'
// 		});
// 		await me.save();
// 	}
// 	const accountID = me.id;
// 	me = await userModel.findOne({accountID});
// 	if (!me) {
// 		me = new userModel({
// 			accountID,
// 			name: '鸿杰',
// 			adminType: 5
// 		});
// 		await me.save();
// 	}
// }

exports.register = async function (ctx) {
	let { account, password, source, phone } = ctx.params;
	let newUser = await userModel.findOne({account}, {id: 1});
	if (!newUser) {
		newUser = new userModel({
			account,
			password: encryptionUtil.encryptionPassword(password),
			// 生日
			birthday: dateUtil.now(),
			// 创建时间
			registerDate: dateUtil.now(),
			source,
			phone: phone
		});
		await newUser.save();
		ctx.body = jsonUtil.createAPI(1, '注册成功');
	} else {
		ctx.body = jsonUtil.createAPI(-1, `账号已经被注册了:${account}`);
	}
};

exports.login = async function (ctx, next) {
	let { account, password } = ctx.params;
	account = jsonUtil.myDecodeURIComponent(account);
	password = jsonUtil.myDecodeURIComponent(password);
	let me = await userModel.findOne({account}, {password: 1, id: 1});
	if (me) {
		if (me.password === encryptionUtil.encryptionPassword(password)) {
			ctx.body = jsonUtil.createAPI(1, me.id);
		} else {
			ctx.body = jsonUtil.createAPI(-2, `密码错误:${password}`);
		}
	} else {
		ctx.body = jsonUtil.createAPI(-1, `没有找到账号:${account}`);
	}
};

// exports.thirdPartyLogin = async function (ctx, next) {
// 	const { account, headURL, source, app } = ctx.request.body;
// 	let myAccount = await userModel.findOne({account}, {id: 1, password: 1});
// 	if (!myAccount) {
// 		// 没有账号，就新建一个
// 		myAccount = new userModel({
// 			account,
// 			password: account,
// 			// 生日
// 			birthday: dateUtil.now(),
// 			// 创建时间
// 			registerDate: dateUtil.now(),
// 			source
// 		});
// 		await myAccount.save();
// 	}
// 	if (app === 'easy') {
// 		const me = await easyUserController.register(myAccount.id, myAccount. id, myAccount.password, jsonUtil.myDecodeURIComponent(headURL));
// 		me.account = account;
// 		me.password = myAccount.password;
// 		me.source = source;
// 		me.modifyPwdCount = myAccount.modifyPwdCount;
// 		ctx.body = jsonUtil.createAPI(1, jsonUtil.user2Json(me));
// 	} else {
// 		ctx.body = jsonUtil.createAPI(-1, `未知的应用:${app}`);
// 	}
// };

// exports.checkAccount = async function (ctx, next) {
// 	let { account } = ctx.params;
// 	account = jsonUtil.myDecodeURIComponent(account);
// 	const me = await userModel.findOne({account: account}, {id: 1});
// 	ctx.body = jsonUtil.createAPI(1, me ? 1 : 0);
// };

// exports.modifyPassword = async function (ctx, next) {
// 	let { account, password } = ctx.request.body;
// 	let myAccount = await userModel.findOne({account}, {id: 1, password: 1});
// 	if (myAccount) {
// 		password = encryptionUtil.encryptionPassword(password);
// 		await userModel.update({account}, {$set: {password}, $inc: {modifyPwdCount: 1}});
// 		ctx.body = jsonUtil.createAPI(1);
// 	} else {
// 		ctx.body = jsonUtil.createAPI(-1, `没有找到账号:${account}`);
// 	}
// };