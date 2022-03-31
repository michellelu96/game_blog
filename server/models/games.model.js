const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be present"]
    },
    image:{
        type:String,
    },
    rating:{
        type: Number,
    },
    description:{
        type:String,
        required:[true,"Description must be present"]
    }
}, { timestamps: true });

module.exports.Game = mongoose.model('Game', GameSchema)