import _ from 'lodash'

export default function onAsync(socket, next) {
    console.log('Registering emitAsync middleware...')

    /**
     *
     * @param {String} event
     * @param {Object[]} args
     * @param {Object} options
     * @param {Object} options.wait
     * @param {Object} [options.timeout=2000]
     */
    socket.emitAsync = async (event, args, options) => {
        let emitPromise

        if (options.wait) {
            const timeout = _.defaultTo(options.timeout, 2000)

            emitPromise = new Promise(function(resolve, reject) {
                socket.emit(event, ...args, (response) => {
                    resolve(response)
                })

                setTimeout(timeout, () => {
                    reject(new Error('Callback was never called'))
                })
            })
        } else {
            emitPromise = new Promise(function(resolve) {
                socket.emit(event, ...args)
                resolve(null)
            })
        }

        return await emitPromise
    }

    if (next) {
        next()
    }
}
