"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropositionController = void 0;
const proposition_1 = __importDefault(require("../models/proposition"));
class PropositionController {
    // Create a new proposition
    createProposition(req, res) {
        const { proposedPrice, userId, demandId } = req.body;
        const proposition = new proposition_1.default({ proposedPrice, userId, demandId });
        proposition.save()
            .then((proposition) => {
            res.status(201).json(proposition);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Get a proposition by ID
    getProposition(req, res) {
        const propositionId = req.params.id;
        proposition_1.default.findById(propositionId)
            .then((proposition) => {
            if (proposition) {
                res.status(200).json(proposition);
            }
            else {
                res.status(404).json({ message: 'Proposition not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Get all propositions for a demand
    getAllPropositionsForDemand(req, res) {
        const demandId = req.params.id;
        proposition_1.default.find({ demandId })
            .then((propositions) => {
            res.status(200).json(propositions);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Update proposition's acceptance status
    updatePropositionStatus(req, res) {
        const propositionId = req.params.id;
        proposition_1.default.findByIdAndUpdate(propositionId, { acceptanceStatus: 1 }, { new: true })
            .then((proposition) => {
            if (proposition) {
                res.status(200).json(proposition);
            }
            else {
                res.status(404).json({ message: 'Proposition not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    // Update proposition's price
    updatePropositionPrice(req, res) {
        const propositionId = req.params.id;
        const { proposedPrice } = req.body;
        proposition_1.default.findByIdAndUpdate(propositionId, { proposedPrice }, { new: true })
            .then((proposition) => {
            if (proposition) {
                res.status(200).json(proposition);
            }
            else {
                res.status(404).json({ message: 'Proposition not found' });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
}
exports.PropositionController = PropositionController;
