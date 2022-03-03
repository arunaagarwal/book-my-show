'use strict';

const router = require('express').Router();
const ScreenController = require('../controllers/screens');

router.post('/screen', (req, res, next) => {
    ScreenController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/screen', (req, res, next) => {
    ScreenController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/screen/:id', (req, res, next) => {
    ScreenController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;