import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export default function onAsync(socket, next) {
    const on = socket.on

    // Initialize userId to null
    socket.userId = null

    /**
     *
     * @param {String} event
     * @param {Function} handler
     * @param {Object} [options]
     * @param {Object} [options.auth='required']
     */
    socket.onAsync = (event, handler, options) => {
        // TODO: Ensure auth is one of 'required', 'optional'
        options = _.defaults({}, options, {
            auth: 'required'
        })

        const newHandler = async (...handlerArgs) => {
            const requestLogger = socket.logger.child({
                name: 'socket-request',
                event,
                requestId: uuidv4()
            })

            let status = null
            let result = null
            let error = null

            let cb = null

            try {
                if (typeof handlerArgs[handlerArgs.length - 1] === 'function') {
                    cb = handlerArgs.pop()
                }

                if (options.auth === 'required' && _.isNil(socket.userId)) {
                    throw new Error('Unauthenticated')
                }

                result = await handler.call(socket, {
                    args: handlerArgs,
                    socket,
                    logger: requestLogger
                })
                status = 'success'
            } catch (err) {
                error = err
                status = 'failure'

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
                        status,
                        error: errorResponse,
                    },
                })
            }

        }

        on.call(socket, event, newHandler)
    }

    if (next) {
        next()
    }
}
