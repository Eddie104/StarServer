// 信鸽推送
"use strict";

//引入相关模块
const http        = require('http');
const url         = require('url');
const util        = require('util');
const querystring = require('querystring');
const crypto      = require('crypto');
const utils       = require('utility');
const config      = require('../../config');

//定义api地址
// const API_PUSH_TO_SINGLE_DEVICE      = 'http://openapi.xg.qq.com/v2/push/single_device';
const API_PUSH_TO_SINGLE_ACCOUNT     = 'http://openapi.xg.qq.com/v2/push/single_account';
const API_PUSH_BY_ACCOUNTS           = 'http://openapi.xg.qq.com/v2/push/account_list';
// const API_PUSH_TO_ALL_DEVICES        = 'http://openapi.xg.qq.com/v2/push/all_device';
// const API_PUSH_BY_TAGS               = 'http://openapi.xg.qq.com/v2/push/tags_device';
// const API_QUERY_PUSH_STATUS          = 'http://openapi.xg.qq.com/v2/push/get_msg_status';
// const API_QUERY_DEVICE_NUM           = 'http://openapi.xg.qq.com/v2/application/get_app_device_num';
// const API_QUERY_TAGS                 = 'http://openapi.xg.qq.com/v2/tags/query_app_tags';
// const API_CANCEL_TIMING_TASK         = 'http://openapi.xg.qq.com/v2/push/cancel_timing_task';
// const API_SET_TAGS                   = 'http://openapi.xg.qq.com/v2/tags/batch_set';
// const API_DELETE_TAGS                = 'http://openapi.xg.qq.com/v2/tags/batch_del';
// const API_QUERY_TAGS_BY_DEVICE_TOKEN = 'http://openapi.xg.qq.com/v2/tags/query_token_tags';
// const API_QUERY_DEVICE_NUM_BY_TAG    = 'http://openapi.xg.qq.com/v2/tags/query_tag_token_num';

exports.createMessage = function (title, content, custom_content, badge) {
	let androidMsg, iosMsg;
	let custom_content_str = '';
	if (custom_content) {
		custom_content_str = "{";
		let custom_contentArr = [];
		for (let key in custom_content) {
			custom_contentArr.push(`"${key}":"${custom_content[key]}"`);
		}
		custom_content_str += custom_contentArr.join(',') + '}';
	}
	if (custom_content_str === '') {
		androidMsg = `{"title":"${title}","content":"${content}","builder_id":0}`;
	} else {
		androidMsg = `{"title":"${title}","content":"${content}","builder_id":0, "custom_content":${custom_content_str}}`;
	}

	if (!badge) {
		badge = 0;
	}
	iosMsg = `{"aps":{"alert":"${content}","badge":${badge}}}`;

	return {androidMsg, iosMsg};
};

/**
 * 推送消息给单个账户或别名
 * @param {string}   account               账户或别名
 * @param {string}   message               推送的消息
 * @param {int}      message_type          消息类型：1：通知 2：透传消息。iOS平台请填0
 * @param {boolean}  isIOS                 是否是推送到ios设备上
 * @param {int}      environment           向iOS设备推送时必填，1表示推送生产环境；2表示推送开发环境。Android可不填
 * @param {Function} callback(err, result) 回调函数
 */
exports.pushToSingleAccount = function(account, message, message_type, isIOS, environment, callback) {
	// 构造请求参数
	const params = {
		account,
		message_type,
		message,
		environment
	};
	//调用API
	callAPI(API_PUSH_TO_SINGLE_ACCOUNT, params, isIOS, callback);
};

/**
 * 推送消息给批量账号
 * @param {array}    accounts     账号数组
 * @param {Message}  message      推送的消息
 * @param {int}      message_type 消息类型：1：通知 2：透传消息。iOS平台请填0
 * @param {boolean}  isIOS                 是否是推送到ios设备上
 * @param {int}      environment  向iOS设备推送时必填，1表示推送生产环境；2表示推送开发环境。Android可不填
 * @param {Function} callback     回调函数
 */
exports.pushByAccounts = function(accounts, message, message_type, isIOS, environment, callback) {
	//构造请求参数
	const params = {
		account_list: JSON.stringify(accounts),
		message_type,
		message
	};

	// //如果是Android平台,添加multi_pkg参数;如果是iOS平台，添加environment参数
	// if(message instanceof AndroidMessage){
	// 	params.message_type = message.type;
	// 	params.multi_pkg = message.multiPkg;
	// }else{
	// 	params.message_type = 0;
	// 	params.environment = environment;
	// }

	//调用API
	callAPI(API_PUSH_BY_ACCOUNTS, params, isIOS, callback);
};

/**
 * 调用API
 * @param  {string}   api                   api地址
 * @param  {object}   params                参数对象
 * @param  {int}	  timeout               超时时间，单位毫秒
 * @param  {Function} callback(err, result) 回调函数
 */
function callAPI(api, params, isIOS, callback) {
	let requestOption = null;
	let strParams = null;
	const method = "POST";
	try {
		params.access_id = isIOS ? config.XG.secret.ios.access_id : config.XG.secret.android.access_id;
		params.timestamp = Math.round((new Date()).getTime() / 1000);
		params.valid_time = 600;
		// 生成sign
		params.sign = generateSign(api, params, method, isIOS);
		strParams = querystring.stringify(params);

		let urlParams = url.parse(api);
		let host = urlParams.host;
		let path = urlParams.path;

		// if (method === 'GET') {
		// 	path += '?' + strParams;
		// }

		requestOption = {
			host: host,
			path: path,
			method: method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			}
		};

		// if (method === 'POST') {
			requestOption.headers['Content-Length'] = strParams.length;
		// }
	} catch(e) {
		return typeof callback === 'function' && callback(e);
	}

	let req = http.request(requestOption, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data) {
			typeof callback === 'function' && callback(null, data);
		});
	});

	req.on('error', function(e) {
		typeof callback === 'function' && callback(e);
	});

	// if (method === 'POST') {
		req.write(strParams);
	// }

	req.setTimeout(10000, function(){
		req.abort();
	});

	req.end();
}

/**
 * 生成sign
 * @param  {string} api       api地址
 * @param  {object} params    参数对象
 * @param  {string} method    请求方法，GET或POST
 * @return {string}           生成的sign
 */
function generateSign(api, params, method, isIOS) {
	// 将method转为大写
	method = method.toUpperCase();
	if (method !== 'GET' && method !== 'POST') {
		throw new Error('method is invalid');
	}

	if (typeof params !== 'object') {
		throw new Error('params is invalid');
	}

	// 提取host和path
	let urlParams = url.parse(api);
	let hostPath  = urlParams.host + urlParams.path;

	// 对params里的key进行排序
	let arrKey = [];
	for (let key in params) {
		arrKey.push(key);
	}
	arrKey.sort();

	// 拼接参数字符串
	let strParams = '';
	for (let i = 0; i < arrKey.length; i++) {
		let value = params[arrKey[i]];
		strParams += arrKey[i] + '=' + value;
	}
	return utils.md5(method + hostPath + strParams + (isIOS ? config.XG.secret.ios.secret_key : config.XG.secret.android.secret_key));
}