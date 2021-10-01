"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRepoImpl = void 0;
var restaurant_1 = __importDefault(require("../models/restaurant"));
var RestaurantRepoImpl = /** @class */ (function () {
    function RestaurantRepoImpl() {
    }
    RestaurantRepoImpl.of = function () {
        return new RestaurantRepoImpl();
    };
    RestaurantRepoImpl.prototype.addRestaurant = function (restaurantBody) {
        return restaurant_1.default.create(restaurantBody);
    };
    return RestaurantRepoImpl;
}());
exports.RestaurantRepoImpl = RestaurantRepoImpl;
