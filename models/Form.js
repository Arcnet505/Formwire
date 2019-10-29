const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    form: {
        type: JSON,
        required: true
    }
});

module.exports = Form = mongoose.model('form', FormSchema);
