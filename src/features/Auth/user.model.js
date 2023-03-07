const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        type: String
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model('user', userSchema);