"use strict";

const router = require('koa-router')();
const config = require('../config');
const user   = require("../app/controllers/user");

router.get('/', function (ctx, next) {
	ctx.body = 'this a users response!';
});

// router.get('register/:account/:password/:phone/:source', user.register);

router.post('login', user.login);

router.get('levelWin/:account/:level/:startTimer/:endTimer/:startNumItem1/:startNumItem2/:startNumItem3/:startNumItem4/:endNumItem1/:endNumItem2/:endNumItem3/:endNumItem4/:startDollar/:endDollar/:endDiamonds/:award', user.levelWin);
router.get('levelWin/:account/:level/:startTimer/:endTimer/:startNumItem1/:startNumItem2/:startNumItem3/:startNumItem4/:endNumItem1/:endNumItem2/:endNumItem3/:endNumItem4/:startDollar/:endDollar/:endDiamonds', user.levelFail);

// router.get('levelWin/:account/:level/:startTimer/:endTimer/:startNumItem1/:startNumItem2/:startNumItem3/:startNumItem4/:endNumItem1/:endNumItem2/:endNumItem3/:endNumItem4/:startDollar/:endDollar/:endDiamonds', async (ctx) => {
// 	ctx.body = 'dd';
// });
router.get('changeName/:account/:name', user.changeName);

router.get('dollarChanged/:account/:reason/:val', user.dollarChanged);
router.get('dollarChanged/:account/:reason/:val/:params', user.dollarChanged);

router.get('diamondsChanged/:account/:reason/:val', user.diamondsChanged);
router.get('diamondsChanged/:account/:reason/:val/:params', user.diamondsChanged);


router.get('updateLastLevel/:account/:lastLevel', user.updateLastLevel);
router.get('updateTotalScore/:account/:totalScore', user.updateTotalScore);
router.get('updateExp/:account/:exp', user.updateExp);
router.get('updateMaxTotalScore/:account/:maxTotalScore', user.updateMaxTotalScore);
router.get('updateLastFetchLoginAwardTime/:account/:lastFetchLoginAwardTime/:fetchLoginAwardCount', user.updateLastFetchLoginAwardTime);
router.get('updateLiuXingMax/:account/:liuXingMax', user.updateLiuXingMax);
router.post('updateLevelScore', user.updateLevelScore);

// lastLevel: {type: Number, default: 0},
// 	totalScore: {type: Number, default: 0},
// 	levelScore: {type: [Number], default: []},
// 	exp: {type: Number, default: 0},
// 	maxTotalScore: {type: Number, default: 0},
// 	lastFetchLoginAwardTime: {type: Number, default: 0},
// 	fetchLoginAwardCount: {type: Number, default: 0},
// 	liuXingMax: {type: Number, default: 0},
// 	lastFailedLevel: {type: Number, default: 0},
// 	weekRankRecord: {type: Number, default: 0},
// 	weekRank: {type: Number, default: 0},
// 	weekScore: {type: Number, default: 0},
// 	monthRankRecord: {type: Number, default: 0},
// 	monthRank: {type: Number, default: 0},
// 	monthScore: {type: Number, default: 0},
// 	maxLevel: {type: Number, default: 0}

module.exports = router;
