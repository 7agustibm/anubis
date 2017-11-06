import {Request, Response} from "express";


export function Proxy(proxy: any, target: string) {
    return (request: Request, response: Response) => {
        proxy.web(request, response, {target});
        proxy.on('error', ProxyError);
    }
}

export function ProxyError (error: any, request: Request, response: Response) {
    response.send(error);
}