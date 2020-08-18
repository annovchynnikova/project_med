const mongoose = require('mongoose');
const { Medicine } = require('./Medicine').schema;

const toTakeSchema = new mongoose.Schema({
    medicineId: String,
    begin: {
        type: Date,
        required: false
    },
    days: {
        type: Number,
        required: false
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    liked: {
        type: [String]
    },
    toTake: {
        type: [toTakeSchema]
    }
});

module.exports = User = mongoose.model('userLiki', UserSchema);
