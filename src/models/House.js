const mongoose = require('mongoose');


const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6,
    },
    type: {
        type: String,
        required: true,
        anum:['Apartment', 'Villa', 'House'],
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: 2021,
    },
    city: {
        type: String,
        required: true,
        minLength: 4,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^http:\/\/.*/.test(value);
            },
            message: 'The URL must start with "http://"',
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 60
    },
    availability: {
        type: Number,
        min: [0, "Minimum availability is 0."],
        max: [10, "Maximum availability is 10."],
        required: true
    },
    rentedBy: [
        {
            maxLength: this.availability,
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})


const House = mongoose.model('House', houseSchema);

module.exports = House