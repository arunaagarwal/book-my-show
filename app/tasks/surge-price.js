const MovieSlots = require('../models/movie-slots');
const MovieSlotScheduleController = require('../controllers/movie-slots');
const {ObjectId} = require('mongodb');

class Tasks {
    static async schedule(id) {
        try {
            let movieSlot = await MovieSlotScheduleController.getById(id);
            let seatsBookedCount = 0;
            let seats_info = []
            for (let i = 0; i < movieSlot.seats_info.length; i++) {
                let status = []
                for (let j = 0; j < movieSlot.seats_info[i].status.length; j++) { //assuming having 5 seats in each row
                    let seatInfo = movieSlot.seats_info[i].status[j]
                    if(j > 8){
                        status.push({
                            seat_type: seatInfo.seat_type,
                            seat_number: seatInfo.seat_number,
                            is_booked: false,
                            price: seatInfo.price
                        })
                    }else{
                        status.push({
                            seat_type: seatInfo.seat_type,
                            seat_number: seatInfo.seat_number,
                            is_booked: true,
                            price: seatInfo.price
                        })
                        seatsBookedCount += 1
                    }
                }
                seats_info.push({
                    row_name: movieSlot.seats_info[i].row_name,
                    status: status
                })
            }
            let updatedMovieSlots = await MovieSlots.findOneAndUpdate({_id: ObjectId(id)}, {seats_info: seats_info, total_seats_booked: seatsBookedCount}, {new: true})
            return updatedMovieSlots;
        } catch (err) {
            console.log("err", err)
        }
    }
}

Tasks.schedule('6226e44dcd21f55db9edebec')



