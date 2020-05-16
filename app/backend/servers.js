import initHttpServer from './http/server.js'
import initWsServer from './ws/server.js'

export default async function initServers() {
    const httpServer = await initHttpServer()
    const socketIoServer = initWsServer(httpServer)

    return {
        http: httpServer,
        io: socketIoServer
    }
}
