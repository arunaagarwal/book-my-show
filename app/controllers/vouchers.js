'use strict';

const Vouchers = require('../models/vouchers');
const {ObjectId} = require('mongodb');

module.exports = class VoucherController {
    static async create(document) {
        return new Vouchers(document).save()
    }

    static get() {
        return Vouchers.find({})
    }

    static getById(id) {
        return Vouchers.findOne({_id: ObjectId(id)})
    }

    static deleteVoucher(id){
        return Vouchers.findOneAndUpdate({_id: ObjectId(id)}, {is_deleted: true}, {new: true})
    }

    static getByMovieId(movie_id){
        return Vouchers.findOne({"movie.id": ObjectId(movie_id), is_deleted: false})
    }

}