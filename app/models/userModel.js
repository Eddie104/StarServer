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
	// 创建时间
	registerDate: {type: Date, required: true},
	source: {type: String, default: "web"},
	// 是否是管理员，0：不是，1：是
	adminType: {type: Number, default: 0}
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