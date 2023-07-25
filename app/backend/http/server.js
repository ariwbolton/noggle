import path from 'path'

import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'

import config from '../../config.js'
import logger from '../../shared/lib/Logger.js'
import routeIndex from './routes/index.js'

/**
 *
 * @returns {Promise<Hapi.Server>}
 */
export default async function initHttpServer() {
    const server = new Hapi.Server({
        port: config.backend.port,
        routes: {
            files: {
                relativeTo: path.join(__dirname, '..', '..', '..', 'dist', 'frontend')
            }
        }
    })

    await server.register(Inert)

    server.ext('onPreResponse', function(request) {
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
    server.route(routeIndex)

    try {
        logger.info('Starting HTTP server...')
        await server.start()
        logger.info('Started!')
    } catch (err) {
        logger.error('Problem during startup error; server should now exit', err)

        throw err
    }

    return server
}
