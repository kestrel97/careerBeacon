const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/authService')
const general_config = require('../config/general_config');

const authService = new AuthService();

router.post('/register', (req, res) => {
    let user = {
        "username": req.body.username,
        "std_password": req.body.std_password,
        "percentage": req.body.percentage,
        "background": req.body.background,
    }

    authService.registerUser(user, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            })
        } else {
            res.json({
                success: true,
                msg: 'Registered successfully.'
            })
        }
    });
});

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const std_password = req.body.std_password;

    authService.getUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.json({
                success: 0,
                msg: 'Failed authentication'
            });
        }

        authService.comparePassword(std_password, user.std_password, (err, isMatched) => {

            if (err || !isMatched) {
                return res.json({success: 0, msg: 'Wrong std_password'});
            }

            const token = jwt.sign(user, general_config.secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({
                success: 1,
                msg: "Logged in successfully",
                token: 'JWT ' + token,
                user: {
                    id: user.std_id,
                    username: user.username,

                }
            });
        })

    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user})
});

module.exports = router;
