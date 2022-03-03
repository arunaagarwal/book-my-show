'use strict';

const Screens = require('../models/screens');
const { ObjectId } = require('mongodb');

module.exports = class ScreenController{
    static async create(document){
        return new Screens(document).save()
    }
    static get(){
        return Screens.find({})
    }

    static getById(id){
        return Screens.findOne({_id: ObjectId(id) })
    }

}