import path from 'path'
import url from 'url'

import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import SocketIOServer from 'socket.io'

import config from '../config.js'
import routeIndex from './http/index.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

/**
 *
 * @returns {Promise<Hapi.Server>}
 */
export async function initHttpServer() {
    const server = new Hapi.Server({
        port: config.backend.port,
        routes: {
            files: {
                relativeTo: path.join(__dirname, '..', '..', 'dist', 'frontend')
            }
        }
    })

    await server.register(Inert)

    server.ext('onPreResponse', function(request) {
        if (request.response.isBoom) {
            request.response.output.payload = {
                error: {
                    id: request.response.output.payload.id || null,
                    message: request.response.output.payload.message
                }
            }
        }

        return request.response
    })

    // Routes
    server.route(routeIndex)

    try {
        console.log('Starting HTTP server...')
        await server.start()
        console.log('Started!')
    } catch (err) {
        console.error('Problem during startup error; server should now exit', err)
        throw err
    }

    return server
}

export async function initWsServer(httpServer) {
    const io = new SocketIOServer(httpServer.listener, {
        // Engine.io options
        transports: ['websocket']
    })

    io.on('connection', socket => {
        console.log(`Connected! ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`Disconnected. ${socket.id}`)
        })
    })

    return io
}

export default async function initServers() {
    const httpServer = await initHttpServer()
    const socketIoServer = initWsServer(httpServer)

    return {
        http: httpServer,
        io: socketIoServer
    }
}
