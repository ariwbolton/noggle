import _ from 'lodash'
import SocketIOServer from 'socket.io'

// Middleware Imports
import emitAsync from '../../shared/ws/middleware/emitAsync.js'
import onAsync from '../../shared/ws/middleware/onAsync.js'

// Handler Imports
import greetingHandlerConfig from './handlers/greeting.js'

const middlewares = [
    emitAsync,
    onAsync
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

        socket.on('error', (value) => {
            console.log('bad error!!!!')
            console.log(`Error! ${value}`)
        })
    })

    return io
}
