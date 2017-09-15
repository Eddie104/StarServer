"use strict";

/**
 * 账号数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'user';
const COLLECTION_NAME = 'users';

const userSchema = new mongoose.Schema({
	account: {type: String, required: true, index: true},
	password: {type: String, required: true},
	// 生日
	birthday: {type: Date, require: true},
	// 创建时间
	registerDate: {type: Date, required: true},
	// 手机号
	phone: {type: String, default: ''},
	// 用户来源，是qq的还是微信的
	source: {type: String, default: "tomato"}
}, {collection: COLLECTION_NAME});

/**
 * 配置自增长的字段
 */
userSchema.plugin(autoIncrement.plugin, {
	// model名
	model: MODEL_NAME,
	// 自增长字段名
	field: 'id',
	// 起始数值
	startAt: 1000,
	// 自增值
	incrementBy: 1
});


module.exports = require('mongoose').model(MODEL_NAME, userSchema, COLLECTION_NAME);