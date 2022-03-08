'use strict';

const router = require('express').Router();
const CartsController = require('../controllers/carts');

router.post('/carts', (req, res, next) => {
    CartsController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(err => res.send({success: false, error: "These seats are already booked. Kindly choose some other seats"}))
});

router.get('/carts', (req, res, next) => {
    CartsController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/carts/:id', (req, res, next) => {
    CartsController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.post('/carts/:id/voucher', (req, res, next) => {
    CartsController.applyVoucher(req.params.id, req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.delete('/carts/:id/voucher', (req, res, next) => {
    CartsController.removeVoucher(req.params.id, req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;