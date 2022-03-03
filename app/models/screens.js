/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screenSchema = mongoose.Schema({
    name: String,
    cinema_hall: {
        id: Schema.Types.ObjectId,
        name: String
    },
    description: String,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const screens = mongoose.model('screens', screenSchema);

module.exports = screens;