import express from 'express';
import { DemandController } from '../controllers/demand.controller';
import keycloakConfig from '../config/keycloakConfig';
const demandRouter = express.Router();
const controller = new DemandController();
//const keycloackConf = new keycloakConfig(demandRouter) ; 
demandRouter.post('/demande', controller.createDemand);
demandRouter.get('/demande/:id', controller.getDemand);
demandRouter.get('/demande', controller.getAllDemands);
demandRouter.delete('/demande/:id', controller.deleteDemand);
demandRouter.put('/demande/:id', controller.updateDemand);
demandRouter.put('/demande/accept/:id', controller.acceptDemand);

export default demandRouter;
