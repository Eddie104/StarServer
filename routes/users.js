"use strict";

const router = require('koa-router')();
const config = require('../config');
const user   = require("../app/controllers/user");

router.get('/', function (ctx, next) {
	ctx.body = 'this a users response!';
});

// router.get('register/:account/:password/:phone/:source', user.register);

router.get('login/:account/:source', user.login);

router.get('levelWin/:account/:level/:startTimer/:endTimer/:startNumItem1/:startNumItem2/:startNumItem3/:startNumItem4/:endNumItem1/:endNumItem2/:endNumItem3/:endNumItem4/:startDollar/:endDollar/:endDiamonds/:award', user.levelWin);

// router.get('levelWin/:account/:level/:startTimer/:endTimer/:startNumItem1/:startNumItem2/:startNumItem3/:startNumItem4/:endNumItem1/:endNumItem2/:endNumItem3/:endNumItem4/:startDollar/:endDollar/:endDiamonds', async (ctx) => {
// 	ctx.body = 'dd';
// });
router.get('changeName/:account/:name', user.changeName);

router.get('dollarChanged/:account/:reason/:val', user.dollarChanged);
router.get('dollarChanged/:account/:reason/:val/:params', user.dollarChanged);

router.get('diamondsChanged/:account/:reason/:val', user.diamondsChanged);
router.get('diamondsChanged/:account/:reason/:val/:params', user.diamondsChanged);

module.exports = router;
