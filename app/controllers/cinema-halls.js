'use strict';

const CinemaHalls = require('../models/cinema-halls');
const MovieSlots = require('../models/movie-slots');
const { ObjectId } = require('mongodb');

module.exports = class CinemaHallController{
    static async create(document){
        return new CinemaHalls(document).save()
    }
    static get(){
        return CinemaHalls.find({})
    }

    static getById(id){
        return CinemaHalls.findOne({_id: ObjectId(id) })
    }

    static async update(id, document){
        let cinemaHall = await CinemaHalls.findOneAndUpdate({_id: id},document, {new: true});
        let seats_info = []
        let stats = cinemaHall.seat_stats;
        let seat_type = cinemaHall.seat_type;
        let status = []
        for (let i = 0; i < stats.number_of_rows; i++) {
            for (let j = 0; j < stats.rows_info[i].total_seats; j++) {
                status.push({
                    seat_type: stats.rows_info[i].row_type,
                    seat_number: j + 1,
                    is_booked: false,
                    price: seat_type.filter(ite => ite.code === stats.rows_info[i].row_type)[0].price
                })
            }
            seats_info.push({
                row_name: String.fromCharCode(65 + i),
                status: status
            })
        }
        MovieSlots.updateMany({_id: cinemaHall.id}, {seats_info: seats_info, total_seat: cinemaHall.total_seats}, {new: true})
    }
}