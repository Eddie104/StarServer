"use strict";

const router = require('koa-router')();
const config = require('../config');
const admin  = require("../app/controllers/admin");

router.get('/', function (ctx, next) {
	ctx.body = 'this a admin response!';
});

// router.get('register/:account/:password/:phone/:source', user.register);

router.get('login/:account/:password', admin.login);

router.get('getAccountData/:page/:count', admin.getAccountData);
router.get('getAccountData/:page/:count/:source', admin.getAccountData);

router.get('getUserData/:page/:count', admin.getUserData);
router.get('getUserData/:page/:count/:source', admin.getUserData);

router.get('getUserLoginData/:page/:count', admin.getUserLoginData);
router.get('getUserLoginData/:page/:count/:source', admin.getUserLoginData);

router.get('getUserLevelData/:uid/:page/:count', admin.getUserLevelData);
router.get('getLevelData/:page/:count', admin.getLevelData);

router.get('getDollarRecord/:page/:count', admin.getDollarRecord);

router.get('getItemRecord/:uid/:page/:count', admin.getItemRecord);

router.get('getDiamondsRecord/:uid/:page/:count', admin.getDiamondsRecord);

router.get('getPay/:uid/:page/:count', admin.getPay);

router.get('createDollarCode/:dollar/:count', admin.createDollarCode);
router.get('getDollarCode/:page/:count', admin.getDollarCode);

router.post('createActivityNotice', admin.createActivityNotice);
router.get('getActivityNotice/:page/:count', admin.getActivityNotice);

module.exports = router;