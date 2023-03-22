const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const uplinkSchema = new mongoose.Schema({
    device_id: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    meta_data: {
        type: Object,
        required: true
    },
    created_at: {
        type: Date, 
        required: true, 
        default: Date.now 
    }
})

module.exports = mongoose.model('Uplink', uplinkSchema)