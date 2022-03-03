/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = mongoose.Schema({
    user: {
        id: Schema.Types.ObjectId,
    },
    total_tickets_price: {type: Number, default: 0},
    total_paid: {type: Number, default: 0}, //including tickets, food etc
    total_discount: {type: Number, default: 0},
    price_after_discount: {type: Number, default: 0},
    voucher: {
        id: Schema.Types.ObjectId,
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
    booking_info: {
        cinema_hall_id: Schema.Types.ObjectId,
        movie_id: Schema.Types.ObjectId,
        screen_id: Schema.Types.ObjectId,
        screen_date_schedule_id: Schema.Types.ObjectId,
        movie_slot_id: Schema.Types.ObjectId,
        time: String, //time and date both will be saved here or seperately
        date: Date,
        seats_info: [{
            row_id: Schema.Types.ObjectId,
            seats_id: Schema.Types.ObjectId,
            row_name: String,
            seat_number: Number,
            price: Number,
            name: String,
            seat_type: String,
        }],
        food_menu_id: [Schema.Types.ObjectId],
        city: String
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