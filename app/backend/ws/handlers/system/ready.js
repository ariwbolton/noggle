export default {
    name: 'system.ready',
    options: {
        auth: 'optional'
    },
    handler: function(request) {
        // TODO: Check database
        return 'ready'
    }
}
