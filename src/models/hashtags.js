const mongoose=require('mongoose');

const hashtagSchema=new mongoose.Schema({
    title:{
        type: String,
        required: True,
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: True})

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
module.exports = Hashtag;