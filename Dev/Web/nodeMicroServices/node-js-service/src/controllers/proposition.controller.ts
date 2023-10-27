import { Request, Response } from 'express';
import Proposition, { IProposition } from '../models/proposition';

export class PropositionController {
  // Create a new proposition
  public createProposition(req: Request, res: Response) {
    const { proposedPrice, userId, demandId } = req.body;
    const proposition = new Proposition({ proposedPrice, userId, demandId });

    proposition.save()
      .then((proposition: IProposition) => {
        res.status(201).json(proposition);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Get a proposition by ID
  public getProposition(req: Request, res: Response) {
    const propositionId = req.params.id;

    Proposition.findById(propositionId)
      .then((proposition: IProposition | null) => {
        if (proposition) {
          res.status(200).json(proposition);
        } else {
          res.status(404).json({ message: 'Proposition not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Get all propositions for a demand
  public getAllPropositionsForDemand(req: Request, res: Response) {
    const demandId = req.params.id;

    Proposition.find({ demandId })
      .then((propositions: IProposition[]) => {
        res.status(200).json(propositions);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Update proposition's acceptance status
  public updatePropositionStatus(req: Request, res: Response) {
    const propositionId = req.params.id;

    Proposition.findByIdAndUpdate(propositionId, { acceptanceStatus:1 }, { new: true })
      .then((proposition: IProposition | null) => {
        if (proposition) {
          res.status(200).json(proposition);
        } else {
          res.status(404).json({ message: 'Proposition not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

  // Update proposition's price
  public updatePropositionPrice(req: Request, res: Response) {
    const propositionId = req.params.id;
    const { proposedPrice } = req.body;

    Proposition.findByIdAndUpdate(propositionId, { proposedPrice }, { new: true })
      .then((proposition: IProposition | null) => {
        if (proposition) {
          res.status(200).json(proposition);
        } else {
          res.status(404).json({ message: 'Proposition not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }
}
