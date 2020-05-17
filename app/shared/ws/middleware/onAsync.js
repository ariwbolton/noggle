import { v4 as uuidv4 } from 'uuid'

export default function onAsync(socket, next) {
    const on = socket.on

    /**
     *
     * @param {String} event
     * @param {Function} handler
     * @param {Object} args
     */
    socket.onAsync = (event, handler, ...args) => {
        const newHandler = async (...handlerArgs) => {
            let cb = null

            if (typeof handlerArgs[handlerArgs.length - 1] === 'function') {
                cb = handlerArgs.pop()
            }

            let result = null
            let error = null

            const requestLogger = socket.logger.child({
                name: 'socket-request',
                event,
                requestId: uuidv4()
            })

            try {
                result = await handler.call(socket, {
                    args: handlerArgs,
                    socket,
                    logger: requestLogger
                })
            } catch (err) {
                error = err

                requestLogger.error(err)
            }

            let errorResponse = null

            if (error) {
                errorResponse = {
                    id: 'UNNAMED_ERROR',
                    title: 'Bad error!',
                    message: error.message,
                }
            }

            if (cb) {
                cb({
                    data: result || null,
                    meta: {
                        error: errorResponse,
                    },
                })
            }

        }

        on.call(socket, event, newHandler, ...args)
    }

    if (next) {
        next()
    }
}
