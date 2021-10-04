"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var participantItemSchema = new mongoose_1.Schema({
    itemName: {
        type: String,
        required: true
    },
    orderedNum: {
        type: Number,
        default: 0
    }
});
var participantSchema = new mongoose_1.Schema({
    PID: {
        type: String,
        required: true
    },
    items: {
        type: [participantItemSchema],
        required: true
    }
});
var orderItemSchema = new mongoose_1.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemNum: {
        type: String,
        required: true
    }
});
var orderSchema = new mongoose_1.Schema({
    ownerID: {
        type: String,
        required: true
    },
    invitationCode: {
        type: Number,
        unique: true,
        required: true
    },
    authority: {
        type: Boolean,
        default: false
    },
    orderStatus: {
        type: Boolean,
        default: true
    },
    orderItem: {
        type: [orderItemSchema]
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
