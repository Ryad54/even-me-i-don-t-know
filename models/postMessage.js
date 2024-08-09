const mongoose = require("mongoose");
const { Types } = mongoose;

const postSchema = mongoose.Schema({
    tilte: String,
    message: String,
    creator: String,
    tags:[String],
    selectedFile: String,
    likeCount: {
        type:Number,
        default:0,

    },
    
    createdAt:{
        type:Date,
        default: new Date(),
    },


})

var PostMessage = mongoose.model('PostMessage',postSchema)

module.exports = PostMessage;
