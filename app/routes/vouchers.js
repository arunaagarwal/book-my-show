'use strict';

const router = require('express').Router();
const VoucherController = require('../controllers/vouchers');

router.post('/vouchers', (req, res, next) => {
    VoucherController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/vouchers', (req, res, next) => {
    VoucherController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/vouchers/:id', (req, res, next) => {
    VoucherController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.delete('/vouchers/:id', (req, res, next) => {
    VoucherController.deleteVoucher(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/vouchers/movie/:movie_id', (req, res, next) => {
    VoucherController.getByMovieId(req.params.movie_id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});


module.exports = router;