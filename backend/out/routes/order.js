"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
var order_repo_1 = require("./../repo/order-repo");
var OrderRouter = function (server, opts, done) {
    var orderRepo = order_repo_1.OrderRepoImpl.of();
    server.get('/orders', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var order, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderRepo.getOrder()];
                case 1:
                    order = _a.sent();
                    return [2 /*return*/, reply.status(200).send({ order: order })];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, reply.status(500).send({ msg: 'Internal Server Error' })];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    server.post('/orders', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var orderBody, order, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    orderBody = request.body;
                    return [4 /*yield*/, orderRepo.addOrder(orderBody)];
                case 1:
                    order = _a.sent();
                    return [2 /*return*/, reply.status(201).send({ order: order })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, reply.status(500).send({ msg: 'Internal Server Error' })];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    server.put('/orders/:id', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var id, orderBody, order, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    orderBody = request.body;
                    return [4 /*yield*/, orderRepo.updateOrder(id, orderBody)];
                case 1:
                    order = _a.sent();
                    if (order) {
                        return [2 /*return*/, reply.status(200).send({ order: order })];
                    }
                    else {
                        return [2 /*return*/, reply.status(404).send({ msg: "Order #" + id + " Not Found" })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, reply.status(500).send({ msg: 'Internal Server Error' })];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    server.delete('/orders/:id', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var id, order, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    return [4 /*yield*/, orderRepo.deleteOrder(id)];
                case 1:
                    order = _a.sent();
                    if (order) {
                        return [2 /*return*/, reply.status(200).send({ order: order })];
                    }
                    else {
                        return [2 /*return*/, reply.status(404).send({ msg: "Order #" + id + " Not Found" })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    return [2 /*return*/, reply.status(500).send({ msg: 'Internal Server Error' })];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    done();
};
exports.OrderRouter = OrderRouter;
