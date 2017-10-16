"use strict";

/**
 * 充值数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'pay';
const COLLECTION_NAME = 'pay';

const schema = new mongoose.Schema({
	// 可查看指定用户的充值记录，包括充值时间，数额，充值入口
	uid: {type: Number, required: true, index: true},
	date: {type: Date, required: true},
	// 数额
	val: {type: Number, required: true},
	// 充值入口
	source: {type: String, required: true}
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