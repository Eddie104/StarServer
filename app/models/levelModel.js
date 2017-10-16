"use strict";

/**
 * 关卡数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'level';
const COLLECTION_NAME = 'levels';

const schema = new mongoose.Schema({
	// 可查看指定用户的关卡详细记录，包含关卡数，关卡打开时间，打开时的道具数量，金币数量
	// 关卡通过时间，关卡奖励，通关时道具数量，金币数量
	uid: {type: Number, required: true, index: true},
	numLevel: {type: Number, required: true},
	startDate: {type: Date, required: true},
	endDate: {type: Date, required: true},
	startItems: {type: [Number], required: true},
	endItems: {type: [Number], required: true},
	startDollar: {type: Number, required: true},
	endDollar: {type: Number, required: true},
	awards: {type: [], required: true}
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