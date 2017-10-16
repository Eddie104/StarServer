"use strict";

/**
 * 金币兑换码数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'dollarCode';
const COLLECTION_NAME = 'dollarCodes';

const schema = new mongoose.Schema({
	date: {type: Date, required: true},
	usedDate: {type: Date, required: true},
	code: {type: String, required: true},
	dollar: {type: Number, required: true},
	isUsed: {type: Boolean, default: false}
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
	startAt: 1,
	// 自增值
	incrementBy: 1
});


module.exports = require('mongoose').model(MODEL_NAME, schema, COLLECTION_NAME);