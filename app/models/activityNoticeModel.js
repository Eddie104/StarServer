"use strict";

/**
 * 活动通知数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'activityNotice';
const COLLECTION_NAME = 'activityNotices';

const schema = new mongoose.Schema({
	content: {type: String, required: true},
	date: {type: Date, required: true}
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