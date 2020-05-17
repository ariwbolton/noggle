import config from '../../../config.js'
import logger from '../../lib/Logger.js'

export default function pino(socket, next) {
    socket.logger = logger.child({
        level: config.logLevel,
        name: 'socket',
        socketId: socket.id,
        creation: socket.handshake.time,
        ipAddress: socket.handshake.address,
        secure: socket.handshake.secure
    })

    if (next) {
        next()
    }
}
