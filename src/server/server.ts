import * as express from 'express';
import * as morgan from 'morgan';
import {NewService} from "../events/newService";
import {Proxy} from './controllers/proxy';

const asciiArt = require('ascii-art');

export class Server {
    private server: express.Express = express();
    private bus = require('servicebus').bus();
    private httpProxy = require('http-proxy');

    start() {
        this.server.use(morgan('combined'));
        this.server.listen(3000);
        asciiArt.font('Anubis', 'Doom',console.log);
    }

    SubscribeEvents() {
        this.bus.subscribe('newService', NewService(this));
    }

    addService(event: any) {
        this.server.all(event.service + '/*', Proxy(this.httpProxy.createProxyServer(), event.host));
    }
}