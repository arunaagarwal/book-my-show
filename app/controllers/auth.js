'use strict';

const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = class AuthController {
    static async login(document) {
        let is_match = false
        let user = await Users.findOne({
            $or: [
                {phone_number: document.phone_number},
                {email: document.email}
            ]
        })
        if (user) {
            is_match = await AuthController.comparePassword(document.password, user.password)
        }
        if (!is_match) {
            throw Error('Please enter correct credentials');
        }
        return user
    }

    static verify() {
        //OTP verification implementation goes here
    }

    static comparePassword(password, hash) {
        hash = hash.replace(/^\$2y/, '$2b'); // convert prefix from twin-bcrypt to bcrypt
        return bcrypt.compare(password, hash).then((result) => {
            return result;
        });
    }


}