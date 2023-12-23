import express from 'express';
import { PropositionController } from '../controllers/proposition.controller';
//import keycloakConfig from '../config/keycloakConfig';
const propositionRouter = express.Router();
const controller = new PropositionController();
//const keycloackConf = new keycloakConfig(demandRouter) ; 
propositionRouter.post('/proposition', controller.createProposition);
propositionRouter.get('/proposition/:id', controller.getProposition);
propositionRouter.get('/proposition/demand/:id', controller.getAllPropositionsForDemand);
propositionRouter.post('/acceptProposition/:id', controller.AcceptProposition);
propositionRouter.post('/refuseProposition/:id', controller.RefuseProposition);
propositionRouter.put('/proposition/price/:id', controller.updatePropositionPrice);
//connect to mongo db database
export default propositionRouter;
