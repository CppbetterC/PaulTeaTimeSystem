"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishConnection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var host = process.env.MONGO_HOST || 'localhost';
var port = process.env.MONGO_PORT || 27017;
var database = process.env.MONGO_DATABASE || 'fastify';
var establishConnection = function () {
    if (!process.env.JEST_WORKER_ID && mongoose_1.default.connection.readyState === 0) {
        mongoose_1.default.connect("mongodb://" + host + ":" + port + "/" + database, function (err) {
            if (!err)
                console.log('MongoDB connection successful.');
            else
                console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
        });
    }
};
exports.establishConnection = establishConnection;
