/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    email: String,
    password: String,
    phone_number: String,
    role: {type: String, enum: ['community', 'manager'], default: 'community'},
    city: String,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const users = mongoose.model('users', usersSchema);

module.exports = users;
