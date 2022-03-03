'use strict';

const router = require('express').Router();
const UserController = require('../controllers/users')

router.post('/users', (req, res, next) => {
    UserController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/users', (req, res, next) => {
    UserController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/users/:id', (req, res, next) => {
    UserController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;