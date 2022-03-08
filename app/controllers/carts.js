'use strict';

const Carts = require('../models/carts');
const MovieSlots = require('../models/movie-slots');
const Vouchers = require('../models/vouchers');
const {ObjectId} = require('mongodb');

module.exports = class CartsController {
    static async create(document) {
        let isValidSeats = await this.validSeats(document)
        if(isValidSeats){
            return Carts.findOneAndUpdate({"user.id": document.user.id, status: "active"}, document, {new: true, upsert: true})
        }else{
            throw Error('These seats are already booked. Kindly choose some other seats')
        }

    }

    static get() {
        return Carts.find({})
    }

    static getById(id) {
        return Carts.findOne({_id: ObjectId(id)})
    }

    static async applyVoucher(cartId, doc) {
        let voucher = await Vouchers.findOne({_id: doc.voucher.id})
        doc.voucher_amount = voucher?.discount_info?.amount;
        return Carts.findOneAndUpdate({_id: ObjectId(cartId)}, doc, {new: true})
    }

    static removeVoucher(cartId) {
        return Carts.findOneAndUpdate({_id: ObjectId(cartId)}, {$unset: {voucher: 1, voucher_amount: 1}}, {new: true})
    }

    static async validSeats(doc){
        let movieSlots = await MovieSlots.findOne({_id: doc.booking_info.movie_slot.id}).lean()
        let stats = doc.booking_info.seats_info
        //Check for already booked seats. If anyone trying to book already booked seats then throw error.
        for(let i=0; i < stats.length; i++){
            let row = movieSlots.seats_info.find(r=> r._id.toString() == stats[i].row_id.toString())
            let seat = row.status.find(s=> s._id.toString() == stats[i].seats_id.toString())
            if(seat.is_booked){
                return false
            }
        }
        return true
    }

}