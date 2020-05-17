export default {
    name: 'system.ready',
    handler: function(request) {
        // No Auth
        // TODO: Check database
        return 'ready'
    }
}
