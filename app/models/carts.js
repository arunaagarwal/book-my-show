/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartsSchema = mongoose.Schema({
    user: {
        id: {type: Schema.Types.ObjectId, ref: 'users'},
        email: String,
        phone_number: String
    },
    voucher: {
        id: {type: Schema.Types.ObjectId, ref: 'vouchers'},
        code: String
    },
    voucher_amount: {type: Number, default: 0},
    booking_info: {
        cinema_hall: {
            id: {type: Schema.Types.ObjectId, ref: "cinema_halls"},
            name: String
        },
        movie: {
            id: {type: Schema.Types.ObjectId, ref: "movies"},
            name: String
        },
        screen: {
            id: {type: Schema.Types.ObjectId, ref: "movies"},
            name: String
        },
        screen_date_schedule: {
            id: {type: Schema.Types.ObjectId, ref: "screen_date_schedules"},
            date: Date
        },
        movie_slot: {
            id: {type: Schema.Types.ObjectId, ref: "movie_slots"},
            time: String
        },
        seats_info: [{
            row_id: Schema.Types.ObjectId,
            seats_id: Schema.Types.ObjectId,
            row_name: String,
            seat_number: Number,
            price: Number,
            name: String,
            seat_type: String,
        }],
        food_menu: [{
            id: {type: Schema.Types.ObjectId, ref: 'food-menus'},
            name: String,
            quantity: Number,
            price: Number
        }]
    },
    status: {type: String, enum: ['ordered', 'abandoned', 'active', 'payment_failed', 'order_failed']},
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})
const carts = mongoose.model('carts', cartsSchema);

module.exports = carts;
