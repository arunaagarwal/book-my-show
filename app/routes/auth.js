'use strict';

const router = require('express').Router();
const AuthController = require('../controllers/auth')

router.post('/auth/login', (req, res, next) => {
    AuthController.login(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(err => res.status(401).send({"error": "Please enter correct credentials"}))
});

router.get('/auth/otp/verify', (req, res, next) => {
    AuthController.verify()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;