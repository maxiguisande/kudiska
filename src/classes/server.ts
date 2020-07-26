import express from 'express';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    static init(port: number) {
        return new Server(port);
    }

    static app(){
        return this.app;
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }
}

