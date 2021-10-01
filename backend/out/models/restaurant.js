"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 問題
// import mongooseFuzzySearching from 'mongoose-fuzzy-searching'
var restaurantSchema = new mongoose_1.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantURL: {
        type: String,
        required: true
    },
    restaurantMenu: {
        type: String
    }
}, {
    timestamps: true
});
// restaurantSchema.plugin(mongooseFuzzySearching, {field: ["restaurantName"]})
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
