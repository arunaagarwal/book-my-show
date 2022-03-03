/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screenDateSchedulesSchema = mongoose.Schema({
    screen: {
        id: Schema.Types.ObjectId,
        name: String
    },
    cinema_hall: {
        id: Schema.Types.ObjectId,
        name: String
    },
    date: Date,
    description: String,
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const screenDateSchedules = mongoose.model('screen_date_schedules', screenDateSchedulesSchema);

module.exports = screenDateSchedules;