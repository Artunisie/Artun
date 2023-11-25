import { Request, Response } from 'express';
import Demand, { IDemand } from '../models/demande';
import { log } from 'console';

export class DemandController {
  // Create a new demand
  public createDemand(req: Request, res: Response) {
    const {
      jobTitle,
      jobDescription,
      hourlyRateMin,
      hourlyRateMax,
      applicationDeadline,
      requirements,
      clientId,
    } = req.body;

    const demand = new Demand({
      jobTitle,
      jobDescription,
      hourlyRateMin,
      hourlyRateMax,
      applicationDeadline,
      requirements,
      clientId,
    });

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
//getAllDemandeByClientId
public getAllDemandeByClientId(req: Request, res: Response) {
  const clientId = req.params.id;

  Demand.find({ clientId })
    .then((demands: IDemand[]) => {
      if (demands.length > 0) {
        res.status(200).json(demands);
      } else {
        res.status(404).json({ message: `No demands found for the given client ID ${clientId}` });
      }
    })
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

  // Get all demands with limited information (title and description)
  public getAllDemands(req: Request, res: Response) {
    Demand.find({})
      .then((demands: IDemand[]) => {
        res.status(200).json(demands);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: error.message });
      });
  }

public  getFilteredData(req: Request, res: Response){
  const filters = req.body;
console.log(filters);

  const query: any = {};

  // Handle urgent and not_urgent filter
  if(!filters.urgent && !filters.not_urgent){

  }
  else{
    const urgencyArray = [] ; 
    if (filters.urgent ) {
    console.log("urgent");
    urgencyArray.push('urgent')
  } if ( filters.nonUrgent) {
    console.log("not_urgent");
    urgencyArray.push('not_urgent')
  }
  query.applicationDeadline = { $in: urgencyArray };

  }

  if (!filters.plumbing && !filters.mechanical && !filters.Painting && !filters.Cleanign && !filters.others )
{
  console.log("All false");
}
else{
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
console.log(requirementsArray)
  // Include requirements in the query
  query.requirements = { $in: requirementsArray };

}
  // Handle salary range filter
  // if (filters.startSalary && filters.endSalary) {
  //   query.hourlyRateMin = { $gte: filters.startSalary };
  //   query.hourlyRateMax = { $lte: filters.endSalary };
  // }



  // // Handle distance range filter
  // if (filters.startDistance && filters.endDistance) {
  //   // Assuming you have a 'distance' field in your model
  //   query.distance = { $gte: filters.startDistance, $lte: filters.endDistance };

  // }

  Demand.find(query).exec()
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

  // Update a demand
  public updateDemand(req: Request, res: Response) {
    const demandId = req.params.id;
    const {
      jobTitle,
      jobDescription,
      hourlyRateMin,
      hourlyRateMax,
      applicationDeadline,
      requirements,
      technicians,
    } = req.body;

    Demand.findByIdAndUpdate(
      demandId,
      {
        jobTitle,
        jobDescription,
        hourlyRateMin,
        hourlyRateMax,
        applicationDeadline,
        requirements,
        technicians,
      },
      { new: true }
    )
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
