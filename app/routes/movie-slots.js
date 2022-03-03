'use strict';

const router = require('express').Router();
const MovieSlotScheduleController = require('../controllers/movie-slots');

router.post('/movie-slots', (req, res, next) => {
    MovieSlotScheduleController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/movie-slots', (req, res, next) => {
    MovieSlotScheduleController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/movie-slots/:id', (req, res, next) => {
    MovieSlotScheduleController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/movie-slots/movie/:id', (req, res, next) => {
    MovieSlotScheduleController.getMovieScheduleByDate(req.params.id, req.query.date)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;