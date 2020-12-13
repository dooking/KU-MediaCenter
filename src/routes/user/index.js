const express = require("express");
const router = express.Router();
const passport = require('../../config/passport.js');
const userController = require('./controller');

/* GET home page. */
router.get("/login", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/login/callback',
    passport.authenticate('google',
        {
            successRedirect: '/user/login/success',
            failureRedirect: '/user/login/failure'
        }
    )
);
router.get("/login/success", userController.successLogin)
router.get("/login/failure", userController.failureLogin)
router.get("/logout", userController.logout)
module.exports = router;
