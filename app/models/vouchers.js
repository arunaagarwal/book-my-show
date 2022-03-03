/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vouchersSchema = mongoose.Schema({
    name: String,
    code: String,
    cinema_hall: {
        id: Schema.Types.ObjectId,
        name: String
    },
    movie: {
        id: Schema.Types.ObjectId,
        name: String
    },
    voucher_type: {type: String, enum: ['food', 'movie']}, //Asumming here only food voucher available
    minimum_seats: Number, //minium requirement to get the offer.
    discount_type: {type: String, enum: ['amount', 'percentage']},
    discount_info: {
        amount: Number,
        percentage: Number
    },
    total_quota: Number,
    quota_per_user: Number,
    voucher_info: {
        tnc: String,
        description: String
    },
    is_active: {type: Boolean, default: false},
    valid_from: Date,
    valid_to: Date,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const vouchers = mongoose.model('vouchers', vouchersSchema);

module.exports = vouchers;