import { Application } from "express";
import express = require("express");
var cors = require('cors');

export class App {
    public app: Application;

    
    constructor(
        private port: number,
        routes: Array<express.Router>,
    ) {
        this.app = express();
        this.middleware();
        this.routes(routes);
    }


    private middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
    }

    private routes(routes: Array<express.Router>) {
        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });
    }

    /**
     * Start the Express app
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}