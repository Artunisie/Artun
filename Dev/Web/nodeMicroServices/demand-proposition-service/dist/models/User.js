"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let userShema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    pwd: { type: String, required: true },
    email: { type: String, required: true },
    ncin: { type: Number, required: true },
    ntel: { type: Number, required: true },
    adresse: { type: String, required: true }
});
userShema.plugin(mongoose_paginate_v2_1.default);
const User = mongoose_1.default.model("Book", userShema);
exports.default = User;
