import _ from 'lodash'
import SocketIOServer from 'socket.io'

// Middleware Imports
import emitAsync from '../../shared/ws/middleware/emitAsync.js'
import onAsync from '../../shared/ws/middleware/onAsync.js'
import pino from '../../shared/ws/middleware/pino.js'

// Handler Imports
import greetingHandlerConfig from './handlers/greeting.js'

const middlewares = [
    emitAsync,
    onAsync,
    pino
]

const handlers = [
    greetingHandlerConfig
]

export default async function initWsServer(httpServer) {
    const io = new SocketIOServer(httpServer.listener, {
        // Engine.io options
        transports: ['websocket']
    })

    // Middlewares
    _.each(middlewares, function(middleware) {
        io.use(middleware)
    })

    // Handlers
    io.on('connection', socket => {
        socket.logger.debug('Connected!')

        _.each(handlers, function({ name, handler }) {
            socket.onAsync(name, handler)
        })

        socket.on('disconnect', () => {
            socket.logger.debug('Disconnected.')
        })

        socket.on('error', (value) => {
            socket.logger.error(value)
        })
    })

    return io
}
