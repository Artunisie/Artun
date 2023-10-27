"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandController = void 0;
const demande_1 = __importDefault(require("../models/demande"));
class DemandController {
    // Create a new demand
    createDemand(req, res) {
        const { title, description, clientId } = req.body;
        const demand = new demande_1.default({ title, description, clientId });
        demand.save()
            .then((demand) => {
            res.status(201).json(demand);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Get a demand by ID
    getDemand(req, res) {
        const demandId = req.params.id;
        demande_1.default.findById(demandId)
            .then((demand) => {
            if (demand) {
                res.status(200).json(demand);
            }
            else {
                res.status(404).json({ message: 'Demand not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Get all demands with limited information (title and description)
    getAllDemands(req, res) {
        demande_1.default.find({}, { id: 1, title: 1, description: 1 })
            .then((demands) => {
            res.status(200).json(demands);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Delete a demand by ID
    deleteDemand(req, res) {
        const demandId = req.params.id;
        demande_1.default.findByIdAndDelete(demandId)
            .then(() => {
            res.status(204).end(); // No content
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Update demand's title and description
    updateDemand(req, res) {
        const demandId = req.params.id;
        const { title, description } = req.body;
        demande_1.default.findByIdAndUpdate(demandId, { title, description }, { new: true })
            .then((demand) => {
            if (demand) {
                res.status(200).json(demand);
            }
            else {
                res.status(404).json({ message: 'Demand not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Accept a demand
    acceptDemand(req, res) {
        const demandId = req.params.id;
        demande_1.default.findByIdAndUpdate(demandId, { acceptanceStatus: 1 }, { new: true })
            .then((demand) => {
            if (demand) {
                res.status(200).json(demand);
            }
            else {
                res.status(404).json({ message: 'Demand not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
}
exports.DemandController = DemandController;
