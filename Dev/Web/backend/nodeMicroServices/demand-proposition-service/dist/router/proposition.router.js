"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proposition_controller_1 = require("../controllers/proposition.controller");
//import keycloakConfig from '../config/keycloakConfig';
const propositionRouter = express_1.default.Router();
const controller = new proposition_controller_1.PropositionController();
//const keycloackConf = new keycloakConfig(demandRouter) ; 
propositionRouter.post('/proposition', controller.createProposition);
propositionRouter.get('/proposition/:id', controller.getProposition);
propositionRouter.get('/proposition/demand/:id', controller.getAllPropositionsForDemand);
propositionRouter.post('/acceptProposition/:id', controller.AcceptProposition);
propositionRouter.post('/refuseProposition/:id', controller.RefuseProposition);
propositionRouter.put('/proposition/price/:id', controller.updatePropositionPrice);
exports.default = propositionRouter;
