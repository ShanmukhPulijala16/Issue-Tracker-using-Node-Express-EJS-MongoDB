const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    labels: [
        {
            type: String,
            required: true,
            trim: true,
        }
    ],
}, {
    timestamps: true,
});

const issueModel = mongoose.model('issueTrackerIssuesCollection', issueSchema);
module.exports = issueModel;