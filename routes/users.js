"use strict";

const router            = require('koa-router')();
const config            = require('../config');
const userController    = require("../app/controllers/userController");

router.get('/', function (ctx, next) {
	ctx.body = 'this a users response!';
});

router.get('register/:account/:password/:phone/:source', userController.register);

// router.get('register/:account/:password/:source', accountController.register);

// router.get('register/:account/:password/:source/:mail', accountController.register);

router.get('login/:account/:password', userController.login);

// router.post('thirdPartyLogin', accountController.thirdPartyLogin);

// router.get('checkAccount/:account', accountController.checkAccount);

// router.post('modifyPassword', accountController.modifyPassword);

// router.get('easy/getUserData/:accountID', userController.getUserData);

// router.get('easy/getUserAvatar/:id', userController.getUserAvatar);

// router.get('easy/setUserAvatar/:id/:avatarObj', userController.setUserAvatar);
// router.get('easy/setUserAvatar/:id/:gender/:avatarObj', userController.setUserAvatar);

// router.post('easy/modifyUserSignature', userController.modifyUserSignature);

// router.post('easy/modifyUserName', userController.modifyUserName);

// router.get('easy/getUserDetail/:id/:tid', userController.getUserDetail);

// router.get('easy/follow/:id/:tid', userController.follow);

// router.get('easy/unfollow/:id/:tid', userController.unfollow);

// router.get('easy/getUserFriendData/:id', userController.getUserFriendData);

module.exports = router;
