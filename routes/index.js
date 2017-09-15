"use strict";

const router     = require('koa-router')();
// const config     = require('../config');
// const dateUtil   = require("../app/utils/dateUtil");
// const jsonUtil   = require("../app/utils/jsonUtil");
// const numberUtil = require("../app/utils/numberUtil");
// const qiniuUtil  = require("../app/utils/qiniuUtil");
// const logUtil    = require("../app/utils/logUtil");
// const utils      = require('utility');
// const fs         = require('fs');
// const html2json  = require('html2json').html2json;

// const emController = require('../app/controllers/easy/emController');

// function encryption(input) {
// 	return utils.md5(input + config.appKey);
// }

// /**
//  * 确认下token
//  */
// async function checkToken(ctx, next) {
// 	const uid = numberUtil.toInt(ctx.query.id);
// 	// let pwd = this.query.a;
// 	// let adminType = numberUtil.toInt(ctx.query.b);

// 	const u = await userModel.findOne({id: uid}, {password: 1, adminType: 1, status: 1});
// 	// 看看是否被封号
// 	if (u && u.status !== 1) {
// 		ctx.body = jsonUtil.createAPI(-104, `账号状态为${u.status}`);
// 		return;
// 	}

// 	// // 看看密码和权限
// 	// if (uid > 0 && typeof(pwd) !== "undefined" && pwd !== "undefined") {
// 	// 	if (u) {
// 	// 		// 04NsQqdC2Scf是超级密码
// 	// 		if (u.password !== pwd) {
// 	// 			this.body = jsonUtil.createAPI(-102, "密码错误", u.password, pwd);
// 	// 			return;
// 	// 		}
// 	// 		if (u.adminType !== adminType) {
// 	// 			this.body = jsonUtil.createAPI(-103, "账号权限已被修改，请重新登录");
// 	// 			return;
// 	// 		}
// 	// 	}
// 	// }

// 	if (config.checkToken) {
// 		const time = numberUtil.toInt(ctx.query.time);
// 		// 只考虑三分钟内的请求
// 		// console.log(new Date().getTime(), time, new Date().getTime() - time);
// 		if (Math.abs(new Date().getTime() - time) < 180000000) {
// 			// 时间戳加上所有参数的值无缝拼成一个string，再加上appKey，然后再md5一下
// 			let s = ctx.query.time;
// 			for (let k in ctx.params) {
// 				s += `${encodeURIComponent(ctx.params[k])}`
// 			}
// 			// console.log(s);
// 			let token = encryption(s);
// 			if (ctx.query.token === token) {
// 				await next();
// 			} else {
// 				ctx.body = jsonUtil.createAPI(-101, "token错误");
// 			}
// 		} else {
// 			ctx.body = jsonUtil.createAPI(-100, "请求已过期");
// 		}
// 	} else {
// 		await next();
// 	}
// }

// router.get('/', async function (ctx, next) {
// 	ctx.state = {
// 		title: '图个轻松'
// 	};

// 	await ctx.render('index', {
// 	});
// });

// //------------------------------------------------other
// router.get('getTime', async function (ctx, next) {
// 	ctx.body = jsonUtil.createAPI(1, new Date().getTime());
// });

// router.get('test', /*emController.test*/ async function (ctx) {
// 	let t = '<你们现在粉我还来得及></你们现在粉我还来得及></span></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 3em; text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="max-width: 100%; color: rgb(0, 0, 0); box-sizing: border-box !important; word-wrap: break-word !important;">已经在和胡歌拍戏了 。</span><span style="max-width: 100%; font-size: 18px; color: rgb(0, 0, 0); box-sizing: border-box !important; word-wrap: break-word !important;">。</span></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; box-sizing: border-box !important; word-wrap: break-word !important;"><br style="max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; text-align: center; box-sizing: border-box !important; word-wrap: break-word !important;"><img data-ratio="1.6046875" data-s="300,640" data-type="jpeg" data-w="640" src="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=http://mmbiz.qpic.cn/mmbiz_jpg/gWFByuPulaZ08N7Ol7Phy1GOAj1lG2SLnibztKibnc6O3HaB66kdZmia5o9kyVYAAQyTU2QoLqR62ia2QMWgCn9QyQ/640?wx_fmt=jpeg" style="box-sizing: border-box !important; word-wrap: break-word !important; width: auto !important; visibility: visible !important;"><br style="max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important;"></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="font-size: 14px;"><br></span></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="color: rgb(217, 33, 66);"><strong><span style="font-size: 18px;">剧组还缺演员，如果你也想来一起玩，<br></span></strong></span></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="color: rgb(217, 33, 66);"><strong><span style="color: rgb(217, 33, 66); max-width: 100%; font-size: 18px; box-sizing: border-box !important; word-wrap: break-word !important;">点这里直接报名，就说猫哥介绍的😎</span></strong></span></p><p style="max-width: 100%; min-height: 1em; color: rgb(62, 62, 62); font-size: 16px; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em; box-sizing: border-box !important; word-wrap: break-word !important;"><span style="color: rgb(217, 33, 66);"><strong><span style="color: rgb(217, 33, 66); max-width: 100%; font-size: 18px; box-sizing: border-box !important; word-wrap: break-word !important;">👇👇👇</span></strong></span></p>';
// 	t = t.replace(/background-image: url\(.*\);/g, '');
// 	t = t.replace('<你们现在粉我还来得及></你们现在粉我还来得及>', '');
// 	const json = html2json(t);
// 	// console.log(json);
// 	ctx.body = json;
// });

// router.get('upload', async function (ctx) {
// 	// let r = await qiniuUtil.uploadImg(cover, coverPath, 'easycartoon');
// 	let r = null, imgName = null, path = null;
// 	for (let i = 3773; i < 10492; i++) {
// 		imgName = `${i}_cover.jpg`;
// 		path = `./cartoonImg/${imgName}`;
// 		if (await exists(path)) {
// 			r = await qiniuUtil.uploadImg(imgName, path, 'easycartoon');
// 			if (!r) {
// 				logUtil.error('error => ' + i);
// 			} else {
// 				console.log(`上传${i}成功`);
// 			}
// 		} else {
// 			console.log(`没有: ${i}`);
// 		}
// 	}
// 	ctx.body = 'ok';
// });

// async function exists(path) {
// 	return new Promise((resolve, reject) => {
// 		fs.exists(path, (result) => {
// 			resolve(result);
// 		});
// 	});
// }

router.get('/', async function (ctx, next) {
	ctx.state = {
		title: '番茄日语'
	};

	await ctx.render('index', { });
});

module.exports = router;
