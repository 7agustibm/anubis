import {Server} from "../server/server";

export function NewService(server: Server) {
    return (event: any) => {
        console.log('New service.', event);
        server.addService(event);
    }
}
