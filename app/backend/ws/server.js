import _ from 'lodash'
import SocketIOServer from 'socket.io'

// Middleware Imports
import emitAsyncMiddleware from './middleware/emitAsyncMiddleware.js'

// Handler Imports
import greetingHandlerConfig from './handlers/greeting.js'

const middlewares = [
    emitAsyncMiddleware
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
        console.log(`Connected! ${socket.id}`)

        _.each(handlers, function({ name, handler }) {
            socket.on(name, handler)
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected. ${socket.id}`)
        })
    })

    return io
}
