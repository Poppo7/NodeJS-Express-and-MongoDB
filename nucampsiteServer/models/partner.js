const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, {
    timestamps: true 
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
