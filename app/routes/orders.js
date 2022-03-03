'use strict';

const router = require('express').Router();
const OrderController = require('../controllers/orders');

router.post('/orders', (req, res, next) => {
    OrderController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/orders', (req, res, next) => {
    OrderController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/orders/:id', (req, res, next) => {
    OrderController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/orders/user/:user_id', (req, res, next) => {
    OrderController.getUsersOrder(req.params.user_id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;