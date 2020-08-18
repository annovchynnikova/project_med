const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symptom: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    }
});

module.exports = Medicine = mongoose.model('medicine', MedicineSchema);