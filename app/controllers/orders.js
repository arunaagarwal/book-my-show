'use strict';

const Orders = require('../models/orders');
const MovieSlots = require('../models/movie-slots');
const Vouchers = require('../models/vouchers')
const FoodMenus = require('../models/food-menus')
const {ObjectId} = require('mongodb');

module.exports = class OrderController {
    static async create(document) {
        let updateQueries = []
        // if (document.voucher.voucher_type === "movie") {
        //     document.total_discount = document.voucher.discount_info.amount
        //     document.price_after_discount = document.total_paid - document.total_discount
        // }
        let order = await new Orders(document).save()
        let bookingInfo = order.booking_info
        for (let i = 0; i < bookingInfo.seats_info.length; i++) {
            updateQueries.push(
                MovieSlots.update({
                    _id: bookingInfo.movie_slot_id,
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
        updateQueries.push(MovieSlots.findOneAndUpdate({_id: bookingInfo.movie_slot_id}, {
            $inc: {
                total_seats_booked: order.total_seats_booked
            }
        }))
        if(document.voucher.id && document.voucher.voucher_type == "food"){
            updateQueries.push(Vouchers.findOneAndUpdate({_id: "document.voucher.id"}, {$inc: {total_quota: -1}}) )
            updateQueries.push(FoodMenus.updateMany({_id: {$in: document.booking_info.food_menu_id }}))
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

}