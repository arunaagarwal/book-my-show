'use strict';

const MovieSlots = require('../models/movie-slots');
const CinemaHalls = require('../models/cinema-halls');
const {ObjectId} = require('mongodb');

module.exports = class MovieSlotScheduleController {
    static async create(document) {
        let cinemaHall = {}
        let seats_info = []
        if (document.cinema_hall && document.cinema_hall.id) {
            cinemaHall = await CinemaHalls.findOne({_id: ObjectId(document.cinema_hall.id)}).lean()
        }
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
        document.seats_info = seats_info;
        document.total_seat = cinemaHall.total_seats;
        document.total_seats_booked = 0;
        return new MovieSlots(document).save()
    }

    static get() {
        return MovieSlots.find({})
    }

    static async getById(id) {
        let movieSlot = await MovieSlots.findOne({_id: ObjectId(id)}).lean()
        movieSlot.total_seat_available = movieSlot.total_seat - movieSlot.total_seats_booked
        //surge price
        let seats_info = []
        let status = []
        let surge_price_multiplier = MovieSlotScheduleController.getSurgePrice(movieSlot.total_seat_available, movieSlot.total_seat);
        if (surge_price_multiplier != 1) {
            for (let i = 0; i < movieSlot.seats_info.length; i++) {
                for (let j = 0; j < movieSlot.seats_info[i].status.length; j++) {
                    let seatInfo = movieSlot.seats_info[i].status[j]
                    status.push({
                        seat_type: seatInfo.seat_type,
                        seat_number: seatInfo.seat_number,
                        is_booked:  seatInfo.is_booked,
                        price: seatInfo.price * surge_price_multiplier
                    })
                }
                seats_info.push({
                    row_name: movieSlot.seats_info[i].row_name,
                    status: status
                })
            }
            movieSlot.seats_info = seats_info
        }
        return movieSlot
    }
    static getSurgePrice(available, total){
        let factor = available/total;
        if(factor >= 0.5) {
            return 1;
        } else if(factor < 0.5 && factor >= 0.3) {
            return 1.25;
        } else if(factor < 0.3 && factor >= 0.1) {
            return 1.5;
        } else {
            return 2;
        }

    }

    static getMovieScheduleByDate(movieId, onDate){
        let date = new Date(onDate)
        return MovieSlots.find({"movie.id": movieId, "screen_date_schedules.date": date} )
    }


}