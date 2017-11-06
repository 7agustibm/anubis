import {spy, match} from "sinon";
import {Proxy, ProxyError} from './proxy';
import {Request, Response} from "express";
import * as assert from "assert";

suite('Unit Test - Server - Proxy Controller', () => {
    test('Create proxy', () => {
        const proxy = {
            web: spy(),
            on: spy()
        };
        const target = 'target';
        const request = {} as Request;
        const response = {} as Response;
        Proxy(proxy, target)(request, response);
        assert(proxy.web.calledWith(request, response, {target}));
        assert(proxy.on.calledWith('error', match.func));
    });

    test('Proxy error', () => {
        const error = new Error();
        const request = {} as Request;
        const response = {
        } as Response;
        (response as any).send = spy();
        ProxyError(error, request, response);
        assert((response as any).send.calledWith(error));
    });
});