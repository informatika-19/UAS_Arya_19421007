const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
    Judul: {
        type: String
    },
    harga: {
        type: Number
    },
    game: {
        type: String
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('game', GameSchema)