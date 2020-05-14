import Hapi from '@hapi/hapi'

import config from '../config.js'
import routeGamesPost from './routes/games/post.js'

/**
 *
 * @param [options] Hapi.Server.options: https://github.com/hapijs/hapi/blob/master/API.md#server.options
 *
 * @returns {Promise<Hapi.Server>}
 */
export default async function initServer() {
    const server = new Hapi.Server({
        port: config.backend.port
    })

    server.ext('onPreResponse', function(request, h) {
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
    server.route(routeGamesPost)

    try {
        await server.start()
    } catch (err) {
        console.error('Problem during startup error; server should now exit', err)
        throw err
    }

    return server
}
