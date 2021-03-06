/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = mongoose.Schema({
    user: {
        id: {type: Schema.Types.ObjectId, ref: 'users'}
    },
    reference_code: String, //Unique to identify orders
    total_tickets_price: {type: Number, default: 0},
    total_food_price: {type: Number, default: 0},
    total_paid: {type: Number, default: 0}, //including tickets, food etc
    total_discount: {type: Number, default: 0},
    total_price_after_discount: {type: Number, default: 0},
    voucher: {
        id: {type: Schema.Types.ObjectId, ref: "vouchers"},
        code: String,
        discount_type: {type: String, enum: ['amount', 'percentage']},
        discount_info: {
            amount: Number,
            percentage: Number
        },
        voucher_type: {type: String},
    },
    total_seats_booked: Number,
    total_seats: Number,
    cart_id: {type: Schema.Types.ObjectId, ref: "carts"},
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
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const orders = mongoose.model('orders', ordersSchema);

module.exports = orders;