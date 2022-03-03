'use strict';

const Users = require('../models/users');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

module.exports = class UserController{
    static async create(document){
        document.password = document.password ? await UserController.hashPassword(document.password) : '';
        return Users.findOneAndUpdate({phone_number: document.phone_number}, document, {new: true, upsert: true})
    }
    static get(){
        return Users.find({})
    }

    static getById(id){
        return Users.findOne({_id: ObjectId(id) })
    }

    static hashPassword(password) {
        return bcrypt.hash(password, 10).then((hash) => {
            hash = hash.replace(/^\$2b/, '$2y'); // backward compatability for twin-bcrypt
            return hash;
        });
    }

}