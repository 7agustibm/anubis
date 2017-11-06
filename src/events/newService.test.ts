import {Server} from "../server/server";
import {NewService} from "./newService";
import * as assert from "assert";
import {SinonSpy, spy} from "sinon";

suite('Unit Test - New Service', () => {
    test('', () => {
        const server = new Server();
        server.addService = spy();
        const event = {
            service: 'service',
            host: 'host'
        };
        NewService(server)(event);

        assert.ok((server.addService as SinonSpy).calledWith(event), 'Add service to server');
    });
});