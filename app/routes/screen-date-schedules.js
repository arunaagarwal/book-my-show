'use strict';

const router = require('express').Router();
const ScreenDateScheduleController = require('../controllers/screen-date-schedules');

router.post('/screen-date-schedule', (req, res, next) => {
    ScreenDateScheduleController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/screen-date-schedule', (req, res, next) => {
    ScreenDateScheduleController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/screen-date-schedule/:id', (req, res, next) => {
    ScreenDateScheduleController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;