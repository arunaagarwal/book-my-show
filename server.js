"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongoDBUrl = 'mongodb+srv://aruna:aruna123@cluster0.y6xb2.mongodb.net/sample';

app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '15mb', extended: false }));
app.use(express.json());

app.use('/', require('./app/routes'));

// Connecting to the database
mongoose
    .connect(mongoDBUrl)
    .then(() => {
        mongoose.set('maxTimeMS', 20000);
        console.log('Successfully connected to the database');
        app.listen('3008', function (err) {
            if (err) {
                throw err;
            }
            console.log('Server is running port: 3008' );
        });
    })
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });
