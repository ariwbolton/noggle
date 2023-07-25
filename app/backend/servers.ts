import { Server } from 'socket.io'
import Hapi from '@hapi/hapi'

import logger from '../shared/lib/Logger.js'

import initHttpServer from './http/server.js'
import initWsServer from './ws/server.js'

export class Servers {
    public http: Hapi.Server
    public io: Server

    constructor({ http, io }: { http: Hapi.Server, io: Server }) {
        this.http = http
        this.io = io
    }

    static async init() {
        const httpServer = await initHttpServer()
        const socketIoServer = await initWsServer(httpServer)

        return new Servers({
            http: httpServer,
            io: socketIoServer
        })
    }

    async shutdown() {
        logger.debug('Triggering WebSocket server shutdown')
        this.io.close(() => logger.debug('WebSocket server shut down'))

        try {
            logger.debug('Triggering HTTP server shutdown')
            await this.http.stop({ timeout: 10 * 1000 }) // 10 seconds
            logger.debug('HTTP server shut down')
        } catch (err) {
            logger.error('An error occurred while stopping the HTTP server', err)
            process.exit(1)
        }
    }

}
