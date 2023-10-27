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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const demande_1 = __importDefault(require("../models/demande"));
const keycloakConfig_1 = __importDefault(require("../config/keycloakConfig"));
const demandeController = express_1.default.Router();
const keycloackConf = new keycloakConfig_1.default(demandeController);
// CREATE (POST) a new demand
demandeController.post('/demands', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDemand = new demande_1.default(req.body);
        const savedDemand = yield newDemand.save();
        res.status(201).json(savedDemand);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// READ (GET) all demands
demandeController.get('/demands', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demands = yield demande_1.default.find();
        res.json(demands);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// READ (GET) a single demand by ID
demandeController.get('/demands/:demandId', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demand = yield demande_1.default.findById(req.params.demandId);
        if (!demand) {
            return res.status(404).json({ message: 'Demand not found' });
        }
        res.json(demand);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// UPDATE (PUT) a demand by ID
demandeController.put('/demands/:demandId', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDemand = yield demande_1.default.findByIdAndUpdate(req.params.demandId, req.body, { new: true });
        if (!updatedDemand) {
            return res.status(404).json({ message: 'Demand not found' });
        }
        res.json(updatedDemand);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// DELETE a demand by ID
demandeController.delete('/demands/:demandId', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDemand = yield demande_1.default.findByIdAndRemove(req.params.demandId);
        if (!deletedDemand) {
            return res.status(404).json({ message: 'Demand not found' });
        }
        res.json({ message: 'Demand deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
demandeController.get('/test', keycloackConf.getKeycloak().protect('Client'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("test touched");
    try {
        res.json({ message: 'test fini' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = demandeController;
