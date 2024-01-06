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
exports.DemandController = void 0;
const demande_1 = __importDefault(require("../models/demande"));
const axios_1 = __importDefault(require("axios"));
class DemandController {
    // Create a new demand
    createDemand(req, res) {
<<<<<<< HEAD
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobTitle, jobDescription, hourlyRateMin, hourlyRateMax, applicationDeadline, requirements, clientId, } = req.body;
                const demand = new demande_1.default({
                    jobTitle,
                    jobDescription,
                    hourlyRateMin,
                    hourlyRateMax,
                    applicationDeadline,
                    requirements,
                    clientId,
                });
                // Save the demand in the MongoDB database
                const savedDemand = yield demand.save();
                try {
                    // Call the Spring Boot microservice with Axios to save the history
                    const requestData = {
                        jobTitle,
                        jobDescription,
                        hourlyRateMin,
                        hourlyRateMax,
                        applicationDeadline,
                        requirements,
                        clientId,
                    };
                    const url = 'http://localhost:8005/artun/history/client/demande/add';
                    // Envoi de la requête POST avec Axios
                    const response = yield axios_1.default.post(url, requestData);
                    console.log(savedDemand);
                    console.log('Response from the save create history method of the Spring Boot microservice:', response.data);
                }
                catch (error) {
                    console.error('Error communicating with the Spring Boot microservice:', error.message);
                    if (error.response) {
                        console.error('Response from the Spring Boot microservice:', error.response.data);
                        console.error('Status code:', error.response.status);
                    }
                    else if (error.request) {
                        console.error('No response received. Request made but no response from the server.');
                    }
                    else {
                        console.error('Error in making the request:', error.message);
                    }
                    // Assurez-vous de renvoyer une réponse à la demande Express en cas d'erreur
                    res.status(500).send('Error communicating with the Spring Boot microservice');
                }
            }
            catch (error) {
                console.error('Error saving demand in MongoDB:', error.message);
                // Assurez-vous de renvoyer une réponse à la demande Express en cas d'erreur
                res.status(500).send('Error saving demand in MongoDB');
            }
=======
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
>>>>>>> 62ec8f5eab42e7130f8c5bff2ebc8a773428c2a5
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
    // Get all demands with limited information (title and description) ( HHHHHHHHHH  limited information hhhhhhhhh)
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
