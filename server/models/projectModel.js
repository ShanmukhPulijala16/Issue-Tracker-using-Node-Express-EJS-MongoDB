const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'issueTrackerIssuesCollection'
        }
    ],
    labels: [
        {
            type: String
        }
    ],
}, {
    timestamps: true
});

const projectModel = mongoose.model('issueTrackerProjectCollection', projectSchema);
module.exports = projectModel;