import {Server} from './server';
import * as assert from "assert";
import * as morgan from 'morgan';
import {spy} from 'sinon';
import {NewService} from "../events/newService";
import {Proxy} from "./controllers/proxy";

suite('Unit Test - Server', () => {
    let server: Server;
    const event = {
        service: 'service',
        host: 'host'
    };
    setup(() => {
        server = new Server();
    });

    test('Create server instance', () => {
        (server as any).server.listen = spy();
        (server as any).server.use = spy();
        server.start();

        assert((server as any).server, 'Server have an Express server.');
        assert.equal((server as any).server.use.args[0][0].toString(), morgan('combined').toString(), 'Add morgan');
        assert((server as any).server.listen.calledWith(3000), 'Start server');
    });

    test('Subscribe events', () => {
        (server as any).bus.subscribe = spy();

        server.SubscribeEvents();
        assert.equal((server as any).bus.subscribe.args[0][0], 'newService', 'Add subscriber');
        assert.equal((server as any).bus.subscribe.args[0][1].toString(), NewService(server).toString(), 'Add action');
    });

    test('Add Service', () => {
        (server as any).server.all = spy();
        server.addService(event);
        assert.equal((server as any).server.all.args[0][0], event.service + '/*', 'Create path');
        assert.equal((server as any).server.all.args[0][1].toString(), Proxy({}, event.host).toString(), 'Create proxy');
    });
});
