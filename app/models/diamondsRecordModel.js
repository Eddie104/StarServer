"use strict";

/**
 * 钻石变化记录数据表
 */
const mongoose        = require('mongoose');
const autoIncrement   = require('./db');
const MODEL_NAME      = 'diamondsRecord';
const COLLECTION_NAME = 'diamondsRecords';

const schema = new mongoose.Schema({
	// 可查看指定用户的钻石记录，包括钻石数量，消耗时间 增加数量，增加时间，增加原因。
	uid: {type: Number, required: true, index: true},
	date: {type: Date, required: true},
	// 变化之前的数量
	oldVal: {type: Number, required: true},
	// 变化之后的数量
	newVal: {type: Number, required: true},
	// 变化的原因
	reason: {type: String, required: true},
	// 变化原因的参数
	params: {type: String, required: true}
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