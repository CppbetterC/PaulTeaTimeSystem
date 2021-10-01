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
        type: Number
    }
});
var participantSchema = new mongoose_1.Schema({
    PID: {
        type: String,
        required: true
    },
    items: {
        type: itemSchema,
        required: true
    }
});
var orderSchema = new mongoose_1.Schema({
    ownerID: {
        type: String,
        required: true
    },
    invitationCode: {
        type: String,
        required: true
    },
    authority: {
        type: Boolean
    },
    closeTimestamp: {
        type: String
    },
    restaurantID: {
        type: String,
        required: true
    },
    participant: {
        type: participantSchema,
        required: true
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Order', orderSchema);
