const mongoose = require("mongoose");

const Jewelry_Item_Information_Schema = new mongoose.Schema({
    finger_size: {
        type: Number,
        required: false
    },
    metal_weight_grams: {
        type: Number,
        required: false
    },
    number_of_stones_1: {
        type: Number,
        required: false
    },
    number_of_stones_2: {
        type: Number,
        required: false
    },
    number_of_stones_3: {
        type: Number,
        required: false
    },
    cttw_stones_1: {
        type: Number,
        required: false
    },
    cttw_stones_2: {
        type: Number,
        required: false
    },
    cttw_stones_3: {
        type: Number,
        required: false
    },
    price_stones_1: {
        type: Number,
        required: false
    },
    price_stones_2: {
        type: Number,
        required: false
    },
    price_stones_3: {
        type: Number,
        required: false
    },
    labor_1: {
        type: Number,
        required: false
    },
    labor_2: {
        type: Number,
        required: false
    },
    labor_3: {
        type: Number,
        required: false
    },
    item_condition: {
        type: String,
        required: false
    },
    appraisal_note: {
        type: String,
        required: false
    },
    item_description: {
        type: String,
        required: false
    }
});

    

module.exports = mongoose.model('jewelry_item_information', Jewelry_Item_Information_Schema);