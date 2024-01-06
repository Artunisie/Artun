"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eureka_js_client_1 = require("eureka-js-client");
class EurekaClient {
    constructor() {
        this.client = new eureka_js_client_1.Eureka({
            instance: {
                app: 'Demande-proposition-service',
                hostName: 'localhost',
                ipAddr: 'localhost',
                port: {
                    '$': 8000,
                    '@enabled': true,
                },
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
exports.default = EurekaClient;
