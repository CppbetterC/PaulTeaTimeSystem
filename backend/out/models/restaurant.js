"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
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
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
