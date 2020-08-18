const mongoose = require('mongoose');
const Medicine = require('./Medicine');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userLiki'
    }
    // liked: [Medicine],
    // toTake: [Medicine]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);