import { Request, Response } from 'express';
import Demand, { IDemand } from '../models/demande';
import { log } from 'console';
import axios from 'axios';

export class DemandController {
  // Create a new demand
  public async createDemand(req: Request, res: Response) {
    try {
        const {
            jobTitle,
            jobDescription,
            hourlyRateMin,
            hourlyRateMax,
            applicationDeadline,
            requirements,
            category,
            clientId,
        } = req.body;

        const demand = new Demand({
            jobTitle,
            jobDescription,
            hourlyRateMin,
            hourlyRateMax,
            applicationDeadline,
            requirements,
            category,
            clientId,
        });

        // Save the demand in the MongoDB database
        const savedDemand = await demand.save();

        try {
            // get the object
            // Call the service with Axios to save the history
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
            const response = await axios.post(url, requestData);
            console.log('Response from the save create history method of the Spring Boot microservice:', response.data);

        } catch (error: any) {
            console.error('Error communicating with the Spring Boot microservice:', error.message);
            if (error.response) {
                console.error('Response from the Spring Boot microservice:', error.response.data);
            } else if (error.request) {
                console.error('No response received. Request made but no response from the server.');
            } else {
                console.error('Error in making the request:', error.message);
            }
            res.status(500).send('Error communicating with the Spring Boot microservice');
        }
    } catch (error:any) {
        console.error('Error saving demand in MongoDB:', error.message);
        res.status(500).send('Error saving demand in MongoDB');
    }
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

  Demand.find(query).exec()
  .then((demands: IDemand[]) => {
    res.status(200).json(demands);
  })
  .catch((error: Error) => {
    res.status(500).json({ error: error.message });
  });

}






//getts the data using the filter for the user wich he created 
public  getFilteredDataByUserId(req: Request, res: Response){
  const filters = req.body;
  const clientId  =  req.params.id ; 
console.log(filters);
  const query: any = {};
    query.clientId = clientId  ;

  // Handle urgent and not_urgent filter

    var urgencyArray = [] ; 
    if (filters.urgent ) {
    console.log("urgent");
    urgencyArray.push('urgent')
  } if ( filters.nonUrgent) {
    console.log("not_urgent");
    urgencyArray.push('not_urgent')
  }

  query.applicationDeadline = { $in: urgencyArray };

  

  if (!filters.plumbing && !filters.mechanical && !filters.Painting && !filters.Cleanign && !filters.others )
{
  console.log("All false");
}
else{
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
console.log(requirementsArray)
  // Include requirements in the query
  query.requirements = { $in: requirementsArray };

}
 // Handle salary range filter
  // if (filters.startSalary && filters.endSalary) {
  //   query.hourlyRateMin = { $gte: filters.startSalary };
  //   query.hourlyRateMax = { $lte: filters.endSalary };
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
