"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const demand_controller_1 = require("../controllers/demand.controller");
const demandRouter = express_1.default.Router();
const controller = new demand_controller_1.DemandController();
//const keycloackConf = new keycloakConfig(demandRouter) ; 
demandRouter.post('/demande', controller.createDemand);
demandRouter.get('/demande/:id', controller.getDemand);
demandRouter.get('/demande', controller.getAllDemands);
demandRouter.delete('/demande/:id', controller.deleteDemand);
demandRouter.put('/demande/:id', controller.updateDemand);
demandRouter.put('/demande/accept/:id', controller.acceptDemand);
exports.default = demandRouter;