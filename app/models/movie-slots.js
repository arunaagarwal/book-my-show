/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSlotsSchema = mongoose.Schema({
    time: String,
    movie: {
        id: Schema.Types.ObjectId,
        name: String
    },
    screen_date_schedules: {
        id: Schema.Types.ObjectId,
        date: Date
    },
    total_seat: Number,
    total_seats_booked: Number,
    cinema_hall: {
        id: Schema.Types.ObjectId,
        name: String
    },
    seats_info: [{
        row_name: String,
        status: [{
            seat_type: String,
            seat_number: Number,
            is_booked: {type: Boolean, default: false},
            price: Number
        }]
    }],
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const movieSlots = mongoose.model('movie_slots', movieSlotsSchema);

module.exports = movieSlots;