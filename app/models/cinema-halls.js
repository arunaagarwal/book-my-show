/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const cinemaHallsSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    address: {
        name: String,
        address_line: {type: String},
        city: {type: String},
        district: {type: String},
        postal_code: String,
        phone: String,
    },
    is_food_available: {type: Boolean, default: true},
    facilities: [{type: String, default: "parking"}],
    seat_type: [{
        name: String, //executive, premium, gold etc.
        code: String,
        price: Number
    }], //tier
    seat_stats: {
        number_of_rows: Number, //total number of rows in multiplex
        rows_info: [{
            total_seats: Number, //total seats in each row
            row_type: String //executive, premium, gold etc.
        }]   // each row info
    },
    total_seats: Number,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const cinemaHalls = mongoose.model('cinema_halls', cinemaHallsSchema);

module.exports = cinemaHalls;
