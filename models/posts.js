const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema -- json object that describes structure of data
const burgerSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    addressNum: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "United States"
    },
    description: {
        type: String,
        required: true
    },
    ingedients: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    restaurant: {
        type: String,
        required: true
    },
    web: {
        type: String,
        required: true
    }
});

// Object Burger that stores the model
const BurgerModel = mongoose.model('Burger', burgerSchema);

// Export schema 
module.exports = BurgerModel;