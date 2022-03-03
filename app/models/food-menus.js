/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodMenusSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    available_quantity: Number,
    type: {type: String, enum: ['popcorn', 'beverages', 'snacks']},
    is_veg: {type: Boolean, default: false},
    cinema_hall: {
        id: Schema.Types.ObjectId,
        name: String
    },
    price: Number,
    description: String,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const foodMenus = mongoose.model('food-menus', foodMenusSchema);

module.exports = foodMenus;
