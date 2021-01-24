const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    id_movieDb: {
        type: String,
    },
    ratings: [
        {
            type: Number,
        }
    ],
    title: {
        type: String,
    },
    overview: {
        type: String,
    },
    backdrop: {
        type: String,
    },
    poster: {
        type: String,
    },
    release_date: {
        type: String,
    },
    genres: [
        {
            type: String,
        }
    ],
    director: {
        type: String
    },
    actors: [
        {
            type: String
        }
    ]
    
})

module.exports =  mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
