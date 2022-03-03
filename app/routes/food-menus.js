'use strict';

const router = require('express').Router();
const FoodMenusController = require('../controllers/food-menus');

router.post('/food-menus', (req, res, next) => {
    FoodMenusController.create(req.body)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/food-menus', (req, res, next) => {
    FoodMenusController.get()
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/food-menus/:id', (req, res, next) => {
    FoodMenusController.getById(req.params.id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

router.get('/food-menus/cinema/:cinema_id', (req, res, next) => {
    FoodMenusController.getMenuByCinema(req.params.cinema_id)
        .then(function (result) {
            return res.send({success: true, data: result});
        }).catch(next)
});

module.exports = router;