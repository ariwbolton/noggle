// import logger from '../../../shared/lib/Logger.js'

export default {
    name: 'greeting.request',
    handler: function(request) {
        request.logger.info('logging greeting!!')

        return 'hello!!'
    }
}
