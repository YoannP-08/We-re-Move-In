const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    rate: {
        type: Number,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movie_id: {
        type: String,
    }
})

export default mongoose.model.RateSchema || mongoose.model('Rate', RateSchema);