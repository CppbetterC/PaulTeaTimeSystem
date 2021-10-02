"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var itemSchema = new mongoose_1.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemNumber: {
        type: Number,
        default: 0
    },
    restaurantID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
});
var participantSchema = new mongoose_1.Schema({
    PID: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        required: true
    }
});
0;
var orderSchema = new mongoose_1.Schema({
    ownerID: {
        type: String,
        required: true
    },
    invitationCode: {
        type: Number,
        required: true
    },
    authority: {
        type: Boolean,
        default: false
    },
    closeTimestamp: {
        type: String
    },
    restaurantID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    participant: {
        type: [participantSchema]
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Order', orderSchema);
