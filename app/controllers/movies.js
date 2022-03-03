'use strict';

const Movies = require('../models/movies');
const { ObjectId } = require('mongodb');

module.exports = class MovieController{
    static async create(document){
        return new Movies(document).save()
    }
    static get(){
        return Movies.find({})
    }

    static getById(id){
        return Movies.findOne({_id: ObjectId(id) })
    }

}