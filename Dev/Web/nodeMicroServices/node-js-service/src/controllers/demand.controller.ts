import { Request, Response } from 'express';
import Demand, { IDemand } from '../models/demande';

export class DemandController {
  // Create a new demand
  public createDemand(req: Request, res: Response) {
    const { title, description, clientId } = req.body;
    const demand = new Demand({ title, description, clientId });

    demand.save()
      .then((demand: IDemand) => {
        res.status(201).json(demand);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Get a demand by ID
  public getDemand(req: Request, res: Response) {
    const demandId = req.params.id;

    Demand.findById(demandId)
      .then((demand: IDemand | null) => {
        if (demand) {
          res.status(200).json(demand);
        } else {
          res.status(404).json({ message: 'Demand not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Get all demands with limited information (title and description)
  public getAllDemands(req: Request, res: Response) {
    Demand.find({}, { id:1 ,title: 1, description: 1 })
      .then((demands: IDemand[]) => {
        res.status(200).json(demands);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Delete a demand by ID
  public deleteDemand(req: Request, res: Response) {
    const demandId = req.params.id;

    Demand.findByIdAndDelete(demandId)
      .then(() => {
        res.status(204).end(); // No content
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Update demand's title and description
  public updateDemand(req: Request, res: Response) {
    const demandId = req.params.id;
    const { title, description } = req.body;

    Demand.findByIdAndUpdate(demandId, { title, description }, { new: true })
      .then((demand: IDemand | null) => {
        if (demand) {
          res.status(200).json(demand);
        } else {
          res.status(404).json({ message: 'Demand not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Accept a demand
  public acceptDemand(req: Request, res: Response) {
    const demandId = req.params.id;

    Demand.findByIdAndUpdate(demandId, { acceptanceStatus: 1 }, { new: true })
      .then((demand: IDemand | null) => {
        if (demand) {
          res.status(200).json(demand);
        } else {
          res.status(404).json({ message: 'Demand not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }
}
