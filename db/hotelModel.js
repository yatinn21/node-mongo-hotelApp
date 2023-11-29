const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    hotelKind: {
        type: String,
        required: true
    }
});

const Hotel = new mongoose.model('hotelData', hotelSchema);

module.exports = Hotel;