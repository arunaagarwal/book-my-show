/**
 * @author: [Aruna Agarwal]
 **/
'use strict';

const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
    name: String,
    description: String,
    duration: String,
    image: String, //banner or main poster of movie
    video: String, // trailer of movie url
    genre: String,
    language: [{type: String, enum: ['hindi', 'english', 'telgu']}],
    view_type: [{type: String, enum: ['3D', '2D']}],
    certification: {type: String, enum: ['UA']},
    cast: [{type: String}],
    crew: [{type: String}],
    rating: Number,
    status: {type: String, enum: ["active", "upcoming", "deleted"]},
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})
//Assuming movies will be present in every city or selected city.
const movies = mongoose.model('movies', moviesSchema);

module.exports = movies;
