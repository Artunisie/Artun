import express = require('express');
import { Request, Response } from 'express';
import bodyParser = require('body-parser');
import cors = require('cors'); // Import cors

import demandRouter from '../router/demande.router';
import propositionRouter from '../router/proposition.router';

export class Server {

    private app: express.Application;

    constructor(private port: number) {
        this.app = express();
        this.app.use(bodyParser.json());

        // Enable CORS for all routes
        this.app.use(cors());
    }

    public startServer(): void {
        this.app.use(demandRouter, propositionRouter);
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}...`);
        });
    }
}
