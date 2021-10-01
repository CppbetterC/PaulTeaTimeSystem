"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var catSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Cat', catSchema);
