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
            console.log('in new handler')
            let cb = null

            if (typeof handlerArgs[handlerArgs.length - 1] === 'function') {
                cb = handlerArgs.pop()
            }

            let result = null
            let error = null

            try {
                result = await handler.apply(null, handlerArgs)
            } catch (err) {
                error = err

                console.error(`'${event}' error!`)
                console.error(err)
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
