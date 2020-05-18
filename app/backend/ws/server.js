import _ from 'lodash'
import SocketIOServer from 'socket.io'

// Middleware Imports
import emitAsync from '../../shared/ws/middleware/emitAsync.js'
import onAsync from '../../shared/ws/middleware/onAsync.js'
import pino from '../../shared/ws/middleware/pino.js'

// Handler Imports
import systemAliveHandler from './handlers/system/alive.js'
import systemReadyHandler from './handlers/system/ready.js'
import userLoginHandler from './handlers/user/login.js'

const middlewares = [
    pino,
    emitAsync,
    onAsync
]

const handlers = [
    systemAliveHandler,
    systemReadyHandler,
    userLoginHandler
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

        _.each(handlers, function({ name, handler, options }) {
            socket.onAsync(name, handler, options)
        })

        // Special handler. Gets originalEvent as first parameter
        socket.onAsync('unhandled', async (request) => {
            const [originalEvent] = request.args

            throw new Error(`Unhandled event '${originalEvent}'`)
        }, { auth: 'optional' })
        // 'Unhandled' event handler
        socket.use((eventArgs, next) => {
            const eventName = eventArgs[0]

            if (!_.includes(socket.eventNames(), eventName)) {
                // For this event, change the event name to 'unhandled', and all args one to the right (including original event name)
                eventArgs.unshift('unhandled')
            }

            next()
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
