"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const demande_router_1 = __importDefault(require("../router/demande.router"));
const proposition_router_1 = __importDefault(require("../router/proposition.router"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.app.use(bodyParser.json());
        // Enable CORS for all routes
        this.app.use(cors());
    }
    startServer() {
        this.app.use(demande_router_1.default, proposition_router_1.default);
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}...`);
        });
    }
}
exports.Server = Server;
