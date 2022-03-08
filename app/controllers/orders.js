'use strict';

const Orders = require('../models/orders');
const MovieSlots = require('../models/movie-slots');
const Vouchers = require('../models/vouchers');
const FoodMenus = require('../models/food-menus');
const Carts = require('../models/carts');
const {ObjectId} = require('mongodb');
const CartsController = require("./carts")

module.exports = class OrderController {
    static async create(document) {
        let updateQueries = []
        let cart = await Carts.findOne({_id: document.cart_id})
        let isValidSeats = await CartsController.validSeats(cart)
        if(!isValidSeats){
            throw Error('These seats are already booked. Kindly choose some other seats');
        }
        document.booking_info = cart.booking_info

        if (cart.voucher.id) {
            document.total_price_after_discount = document.total_paid - document.total_discount
            document.voucher = {
                id: cart.voucher.id,
                code: cart.voucher.code,
                discount_type: 'amount',
                discount_info: {
                    amount: cart.voucher_amount
                },
                voucher_type: "food",
            }
        }
        document.reference_code = await OrderController.generateReference()
        let order = await new Orders(document).save()
        let bookingInfo = order.booking_info

        for (let i = 0; i < bookingInfo.seats_info.length; i++) {
            updateQueries.push(
                MovieSlots.updateOne({
                    _id: bookingInfo.movie_slot.id,
                    "seats_info._id": bookingInfo.seats_info[i].row_id
                }, {
                    'seats_info.$[row].status.$[seat].is_booked': true
                }, {
                    arrayFilters: [
                        {'row._id': bookingInfo.seats_info[i].row_id},
                        {'seat._id': bookingInfo.seats_info[i].seats_id},
                    ]

                })
            )
        }
        updateQueries.push(MovieSlots.findOneAndUpdate({_id: bookingInfo.movie_slot.id}, {
            $inc: {
                total_seats_booked: order.total_seats_booked
            }
        }))
        updateQueries.push(Carts.findOneAndUpdate({_id: order.cart_id}, {$set: {status: "ordered"}}));
        if (order.voucher.id) {
            let foodItemIds = bookingInfo.food_menu.map(ele => ele.id)
            updateQueries.push(Vouchers.findOneAndUpdate({_id: order.voucher.id}, {$inc: {total_quota: -1}}))
            updateQueries.push(FoodMenus.updateMany({_id: foodItemIds}, {$inc: {quantity: -1}}))
        }
        await Promise.all(updateQueries);
        return order
    }

    static get() {
        return Orders.find({})
    }

    static getById(id) {
        return Orders.findOne({_id: ObjectId(id)})
    }

    static getUsersOrder(user_id) {
        return Orders.find({"user.id": ObjectId(user_id)})
    }

    static async generateReference() {
        const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = '';
        for (let i = 0; i < 9; i++) {
            result += str.charAt(Math.floor(Math.random() * str.length));
        }
        return result;
    }

}