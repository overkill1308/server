const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Posts', PostSchema);