"use strict";

let utils  = require('utility');
let config = require('../../config');
let qiniu  = require('qiniu');

/**
 * 创建下载url
 * @param  {number} domainType 图片域名空间，1：图轻的avatar空间 2：校园传的头像 3:新闻的图片 4:动画片的图片 5:图轻社区的图片
 * @param  {string} imgName    图片名
 */
exports.createDownloadUrl = function (domainType, imgName, mode, w, h) {
	if (imgName === "") { return ""; }
	if (imgName.startsWith('http')) { return imgName; }
	// let url = `http://${domainType === 1 ? config.QiNiu.headDomain : config.QiNiu.imgDomain}/${imgName}?`;
	// if(typeof mode === "number"){
	// 	if(mode > -1 && mode < 6){
	// 		const isWidthLegal = typeof w === "number";
	// 		const isHeightLegal = typeof h === "number";
	// 		if(isWidthLegal || isHeightLegal){
	// 			url += `imageView2/${mode}`;
	// 			if(isWidthLegal){
	// 				url += `/w/${w}`;
	// 			}
	// 			if(isHeightLegal){
	// 				url += `/h/${h}`;
	// 			}
	// 			url += "&";
	// 		}
	// 	}
	// }
	// url = `${url}e=${Math.floor(Date.now() / 1000) + 3600}`;
	// const token = `${config.QiNiu.accessKey}:${utils.hmac('sha1', config.QiNiu.secretKey, url).replace(/\+/g, '-').replace(/\//g, '_')}`;
	// return `${url}&token=${token}`;
	
	let domain = null;
	if (domainType === 1) {
		domain = config.QiNiu.easyAvatarDomain;
	} else if (domainType === 2) {
		domain = config.QiNiu.secretHeadDomain;
	} else if (domainType === 3) {
		domain = config.QiNiu.newsDomain;
	} else if (domainType === 4) {
		domain = config.QiNiu.easyCartoonDomain;
	} else if (domainType === 5) {
		domain = config.QiNiu.easyCommunityDomain;
	}
	let url = `${domain}/${imgName}`;
	if(typeof mode === "number"){
		if(mode > -1 && mode < 6){
			const isWidthLegal = typeof w === "number";
			const isHeightLegal = typeof h === "number";
			if(isWidthLegal || isHeightLegal){
				url += `imageView2/${mode}`;
				if(isWidthLegal){
					url += `/w/${w}`;
				}
				if(isHeightLegal){
					url += `/h/${h}`;
				}
			}
		}
	}
	return url;
};

exports.uploadImg = async function(imgName, imgPath, bucket) {
	return new Promise((resolve, reject) => {
		qiniu.conf.ACCESS_KEY = config.QiNiu.accessKey;
		qiniu.conf.SECRET_KEY = config.QiNiu.secretKey;
		let key = imgName;
		let token = (new qiniu.rs.PutPolicy(`${bucket}:${key}`)).token();
		let extra = new qiniu.io.PutExtra();
		qiniu.io.putFile(token, key, imgPath, extra, function(err, ret) {
			if(!err) {
				resolve(ret.hash, ret.key);
			} else {
				reject(err);
			}
		});
	});
};

// exports.adminUploadImg = function(imgObj, prefix) {
// 	imgObj.filename += imgObj.originalname.substring(0, imgObj.originalname.lastIndexOf('.'));

// 	prefix = prefix || 'mission';

// 	qiniu.conf.ACCESS_KEY = config.QiNiu.accessKey;
// 	qiniu.conf.SECRET_KEY = config.QiNiu.secretKey;

// 	let bucket = 'easycartoon';
// 	let key = prefix+imgObj.filename;
// 	let token = (new qiniu.rs.PutPolicy(`${bucket}:${key}`)).token();
// 	let extra = new qiniu.io.PutExtra();
// 	qiniu.io.putFile(token, key, imgObj.path, extra, function(err, ret) {
// 		if(!err) {
// 			console.log(ret.hash, ret.key, ret.persistentId);
// 		} else {
// 			console.log(err);
// 		}
// 	});
// };

// exports.adminImgUrl = function (fileName, prefix) {
// 	prefix = prefix || 'mission';
// 	return `${prefix}${fileName}`;
// };
