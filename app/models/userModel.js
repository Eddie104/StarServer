"use strict";

/**
 * 账号数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'user';
const COLLECTION_NAME = 'users';

const schema = new mongoose.Schema({
	account: {type: String, required: true, index: true},
	password: {type: String, required: true},
	// 创建时间
	registerDate: {type: Date, required: true},
	// 最后登录时间
	lastLoginDate: {type: Date, required: true},
	// 昵称
	name: {type: String, default: 'no name', index: true},
	// 来源
	source: {type: String, default: "web"},
	// 是否是管理员，0：不是，1：是
	adminType: {type: Number, default: 0},
	// 最高分数
	maxScore: {type: Number, default: 0},
	// 最高关卡数
	maxLevel: {type: Number, default: 0},
	// 当前金币数量
	dollar: {type: Number, default: 0},
	// 钻石数量
	diamonds: {type: Number, default: 0},
	// 道具数量
	items: {type: [Number], default: [0, 0, 0, 0 ]},
	// 总充值金额
	payMoney: {type: Number, default: 0},
	// 注册IP
	registerIP: {type: String, default: ''},
	// 用户设备型号
	deviceMode: {type: String, default: ''},
	// 设备唯一识别ID
	deviceID: {type: String, default: ''},
	// 运营商
	deviceOperator: {type: String, default: ''},
	// 手机号
	phone: {type: String, default: ''},
	// 以下的都是客户端的数据，之前都在存在客户端，现在放在数据库里
	lastLevel: {type: Number, default: 0},
	totalScore: {type: Number, default: 0},
	levelScore: {type: [Number], default: []},
	exp: {type: Number, default: 0},
	maxTotalScore: {type: Number, default: 0},
	lastFetchLoginAwardTime: {type: Number, default: 0},
	fetchLoginAwardCount: {type: Number, default: 0},
	liuXingMax: {type: Number, default: 0},
	lastFailedLevel: {type: Number, default: 0},
	weekRankRecord: {type: Number, default: 0},
	weekRank: {type: Number, default: 0},
	weekScore: {type: Number, default: 0},
	monthRankRecord: {type: Number, default: 0},
	monthRank: {type: Number, default: 0},
	monthScore: {type: Number, default: 0},
	maxLevel: {type: Number, default: 0}
}, {collection: COLLECTION_NAME});

/**
 * 配置自增长的字段
 */
schema.plugin(autoIncrement.plugin, {
	// model名
	model: MODEL_NAME,
	// 自增长字段名
	field: 'id',
	// 起始数值
	startAt: 1000,
	// 自增值
	incrementBy: 1
});


module.exports = require('mongoose').model(MODEL_NAME, schema, COLLECTION_NAME);