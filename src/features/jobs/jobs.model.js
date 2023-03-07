const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema(
    {
        company_name: String,
        position: String,
        contract: String,
        location: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model('job', jobSchema);