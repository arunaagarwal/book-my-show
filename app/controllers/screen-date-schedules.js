'use strict';

const ScreenDateSchedules = require('../models/screen-date-schedules');
const { ObjectId } = require('mongodb');

module.exports = class ScreenDateScheduleController{
    static async create(document){
        return new ScreenDateSchedules(document).save()
    }
    static get(){
        return ScreenDateSchedules.find({})
    }

    static getById(id){
        return ScreenDateSchedules.findOne({_id: ObjectId(id) })
    }

}