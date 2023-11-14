"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./config/Server");
const DataBase_1 = require("./config/DataBase");
const eurika_client_1 = __importDefault(require("./config/eurika-client"));
const server = new Server_1.Server(8000);
const connection = new DataBase_1.Connection();
server.startServer();
connection.dataBaseConnection();
console.log("Starting Eureka ");
const eureka = new eurika_client_1.default();
eureka.start();
console.log("connection with eureka server established");
