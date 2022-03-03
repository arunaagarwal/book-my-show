'use strict';

const router = require('express').Router();
const CinemaHallController = require('../controllers/cinema-halls')

router.post('/cinema-hall', (req, res, next) => {
    CinemaHallController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/cinema-hall', (req, res, next) => {
    CinemaHallController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/cinema-hall/:id', (req, res, next) => {
    CinemaHallController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.put('/cinema-hall/:id', (req, res, next) => {
    CinemaHallController.update(req.params.id, req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;