'use strict';

const FoodMenus = require('../models/food-menus');
const {ObjectId} = require('mongodb');

module.exports = class FoodMenusController {
    static async create(document) {
        return new FoodMenus(document).save();
    }

    static get() {
        return FoodMenus.find({});
    }

    static getById(id) {
        return FoodMenus.findOne({_id: ObjectId(id)});
    }

    static getMenuByCinema(cinema_id) {
        return FoodMenus.find({"cinema_hall.id": cinema_id});
    }


}