const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
    formID: {
        type: String
    },
    formName: {
        type: String
    },
    formDate: {
        type: String
    },
    formData: {
        type: JSON
    }
});

const ClientSchema = new Schema({
    clientID: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    formResults: {
        tags: [
            {
                type: FormSchema
            }
        ]
    }
});

module.exports = Client = mongoose.model('client', ClientSchema);
