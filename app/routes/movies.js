'use strict';

const router = require('express').Router();
const MovieController = require('../controllers/movies')

router.post('/movies', (req, res, next) => {
    MovieController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/movies', (req, res, next) => {
    MovieController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/movies/:id', (req, res, next) => {
    MovieController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;