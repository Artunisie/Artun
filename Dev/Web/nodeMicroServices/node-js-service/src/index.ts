import {Server} from './config/Server';
import {Connection} from './config/DataBase'
import EurekaClient from './config/eurika-client'; 

const server = new Server(8000)
const connection = new Connection();

server.startServer()
connection.dataBaseConnection()
console.log("Starting Eureka ");

const eureka = new EurekaClient();
eureka.start();
console.log("connection with eureka server established")
