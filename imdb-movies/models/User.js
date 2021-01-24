const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: [true, 'This field is required.'],
        // unique: true,
        // minlength: [3, 'Username must be at least 3 characters.']
    }, 
    email: {
        type: String,
        // required: [true, 'This field is required.'],
        // unique: true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address.']
    },
    // password: {
    //     type: String,
    //     required: [true, 'This field is required.'],
    //     minlength: [8, 'Password must be at least 8 characters.']
    // },
    is_admin: {
        type: Boolean,
        // default: 0, 
        nullable: true
    },
    id_auth0: {
        type: String,
    },
    // rating: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Rate'
    //     }
    // ],
    favorite_movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);