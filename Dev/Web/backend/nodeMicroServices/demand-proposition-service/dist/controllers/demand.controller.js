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
        const { jobTitle, jobDescription, hourlyRateMin, hourlyRateMax, applicationDeadline, requirements, category, clientId, } = req.body;
        const demand = new demande_1.default({
            jobTitle,
            jobDescription,
            hourlyRateMin,
            hourlyRateMax,
            applicationDeadline,
            requirements,
            category,
            clientId,
        });
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
    //getAllDemandeByClientId
    getAllDemandeByClientId(req, res) {
        const clientId = req.params.id;
        demande_1.default.find({ clientId })
            .then((demands) => {
            if (demands.length > 0) {
                res.status(200).json(demands);
            }
            else {
                res.status(404).json({ message: `No demands found for the given client ID ${clientId}` });
            }
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    ;
    // Get all demands with limited information (title and description)
    getAllDemands(req, res) {
        demande_1.default.find({})
            .then((demands) => {
            res.status(200).json(demands);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    getFilteredData(req, res) {
        const filters = req.body;
        console.log(filters);
        const query = {};
        // Handle urgent and not_urgent filter
        if (!filters.urgent && !filters.not_urgent) {
        }
        else {
            const urgencyArray = [];
            if (filters.urgent) {
                console.log("urgent");
                urgencyArray.push('urgent');
            }
            if (filters.nonUrgent) {
                console.log("not_urgent");
                urgencyArray.push('not_urgent');
            }
            query.applicationDeadline = { $in: urgencyArray };
        }
        if (!filters.plumbing && !filters.mechanical && !filters.Painting && !filters.Cleanign && !filters.others) {
            console.log("All false");
        }
        else {
            const requirementsArray = [];
            if (filters.plumbing) {
                requirementsArray.push('plumbing');
            }
            if (filters.mechanical) {
                requirementsArray.push('mechanic');
            }
            if (filters.Painting) {
                requirementsArray.push('painting');
            }
            if (filters.Cleaning) {
                requirementsArray.push('cleaning');
            }
            if (filters.others) {
                requirementsArray.push('others');
            }
            console.log(requirementsArray);
            // Include requirements in the query
            query.requirements = { $in: requirementsArray };
        }
        //  Handle salary range filter
        if (filters.startSalary && filters.endSalary) {
            query.hourlyRateMin = { $gte: filters.startSalary };
            query.hourlyRateMax = { $lte: filters.endSalary };
        }
        // // Handle distance range filter
        // if (filters.startDistance && filters.endDistance) {
        //   // Assuming you have a 'distance' field in your model
        //   query.distance = { $gte: filters.startDistance, $lte: filters.endDistance };
        // }
        demande_1.default.find(query).exec()
            .then((demands) => {
            res.status(200).json(demands);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
    //getts the data using the filter for the user wich he created 
    getFilteredDataByUserId(req, res) {
        const filters = req.body;
        const clientId = req.params.id;
        console.log(filters);
        const query = {};
        query.clientId = clientId;
        // Handle urgent and not_urgent filter
        var urgencyArray = [];
        if (filters.urgent) {
            console.log("urgent");
            urgencyArray.push('urgent');
        }
        if (filters.nonUrgent) {
            console.log("not_urgent");
            urgencyArray.push('not_urgent');
        }
        query.applicationDeadline = { $in: urgencyArray };
        if (!filters.plumbing && !filters.mechanical && !filters.Painting && !filters.Cleanign && !filters.others) {
            console.log("All false");
        }
        else {
            var requirementsArray = [];
            if (filters.plumbing) {
                requirementsArray.push('plumbing');
            }
            if (filters.mechanical) {
                requirementsArray.push('mechanic');
            }
            if (filters.Painting) {
                requirementsArray.push('painting');
            }
            if (filters.Cleaning) {
                requirementsArray.push('cleaning');
            }
            if (filters.others) {
                requirementsArray.push('others');
            }
            console.log(requirementsArray);
            // Include requirements in the query
            query.requirements = { $in: requirementsArray };
        }
        // Handle salary range filter
        // if (filters.startSalary && filters.endSalary) {
        //   query.hourlyRateMin = { $gte: filters.startSalary };
        //   query.hourlyRateMax = { $lte: filters.endSalary };
        // }
        demande_1.default.find(query).exec()
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
    // Update a demand
    updateDemand(req, res) {
        const demandId = req.params.id;
        const { jobTitle, jobDescription, hourlyRateMin, hourlyRateMax, applicationDeadline, requirements, technicians, } = req.body;
        demande_1.default.findByIdAndUpdate(demandId, {
            jobTitle,
            jobDescription,
            hourlyRateMin,
            hourlyRateMax,
            applicationDeadline,
            requirements,
            technicians,
        }, { new: true })
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
