"use strict";

let utils      = require('utility');
let config     = require('../../config');
let jsonUtil   = require('../utils/jsonUtil');
let qiniuUtil  = require('../utils/qiniuUtil');
let numberUtil = require('../utils/numberUtil');

exports.getQiNiuUploadToken = async function (ctx) {
	const uid = ctx.params.uid;
	const imgName = ctx.params.imgName;
	// 图片域名空间，1：图轻的avatar空间 2：校园传的头像 3:新闻的图片 4:动画片的图片 5:图轻社区的图片
	const domainType = numberUtil.toInt(ctx.params.domainType);

	// 生成token
	let scope = null;
	if (domainType === 1) {
		scope = config.QiNiu.easyAvatarScope;
	} else if (domainType === 2) {
		scope = config.QiNiu.secretHeadScopr;
	} else if (domainType === 3) {
		scope = config.QiNiu.newsScope;
	} else if (domainType === 4) {
		scope = config.QiNiu.easyCartoonScope;
	} else if (domainType === 5) {
		scope = config.QiNiu.easyCommunityScope;
	}
	const encodedPutPolicy = utils.base64encode(JSON.stringify({
		scope: `${scope}:${imgName}`,
		deadline: Math.floor(Date.now() / 1000) + 600,
		endUser: uid.toString(),
		returnBody: '{"name":$(key),"w":$(imageInfo.width),"h":$(imageInfo.height),"userID":$(endUser)}'
	}), true);
	const encodedSign = utils.hmac('sha1', config.QiNiu.secretKey, encodedPutPolicy).replace(/\+/g, '-').replace(/\//g, '_');
	const uploadToken = `${config.QiNiu.accessKey}:${encodedSign}:${encodedPutPolicy}`;

	ctx.body = jsonUtil.createAPI(1, {"token": uploadToken});
};

exports.getQiNiuDownloadUrl = async function (ctx, next) {
	// 图片域名空间，1：图轻的avatar空间 2：校园传的头像 3:新闻的图片 4:动画片的图片 5:图轻社区的图片
	const domainType = numberUtil.toInt(ctx.params.domainType);
	const imgName = ctx.params.imgName;
	const model = ctx.params.model;
	const w = ctx.params.w;
	const h = ctx.params.h;

	ctx.body = jsonUtil.createAPI(1, {"url": qiniuUtil.createDownloadUrl(domainType, imgName, model, w, h)});
};