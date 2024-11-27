const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        required: [true, 'Rating is required']
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Campsite name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Campsite description is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Campsite image URL is required']
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation is required']
    },
    cost: {
        type: Currency,
        required: [true, 'Campsite cost is required'],
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: {
        type: [commentSchema],
        default: []
    }
}, {
    timestamps: true
});

const Campsite = mongoose.models.Campsite || mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;
