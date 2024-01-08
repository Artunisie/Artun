import {Eureka} from "eureka-js-client"
class EurekaClient {
client:Eureka ; 
  constructor() {
    this.client = new Eureka({
      instance: {
        app: 'Demande-proposition-service',
        hostName: 'localhost',
        ipAddr: 'localhost',
        port: {
          '$': 8000,
          '@enabled': true,
        }, // Your Node.js server's port
        vipAddress: 'node-service',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
      }
    });
    
    
  }

  start() {
    this.client.start(error => {
      if (error) {
        // Convert the error object to a JSON string for logging
        const errorDetails = JSON.stringify(error, null, 2);
        console.error(`Error starting the Eureka Client: ${error}`);
      }
    });
  }
  stop() {
    this.client.stop();
  }
}

export default EurekaClient;